<template>
  <form class="search" @submit="submitList" @keyup.enter="submitList">
    <fieldset>
      <legend>검색</legend>
      <table>
        <colgroup>
          <col style="width: 80px">
          <col style="width: 30%">
          <col style="width: 80px">
          <col>
        </colgroup>
        <tbody>
            <tr>
              <th scope="row">사용자아이디</th>
              <td colspan="3"><input type="text" v-model="search.userId"/></td>
            </tr>
            <tr v-show="auth.userInfo.companyId === 'kaisa'">
              <th scope="row">업체아이디</th>
              <td colspan="3"><input type="text" v-model="search.companyId"/></td>
            </tr>
            <tr>
              <th scope="row">사용자이름</th>
              <td colspan="3"><input type="text" v-model="search.userName"/></td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td colspan="3"><input type="text" v-model="search.phoneNo"/></td>
            </tr>
            <tr>
              <th scope="row">메모</th>
              <td colspan="3"><input type="text" v-model="search.memo"/></td>
            </tr>
            <tr>
              <th scope="row">사용자상태코드</th>
              <td colspan="3"><CommonCodeRadio :cd="'userStateCode'" :model="search.userStateCode" @set-data="(val) => { search.userStateCode = val; }" /></td>
            </tr>
        </tbody>
        <tbody class="audit" v-show="data.audit">
          <tr>
            <th scope="row">수정기간</th>
            <td colspan="3">
              <SelectGroupDate
                :format="'yyyy-MM-dd'"
                :date="[search.startUpdateDt, search.endUpdateDt]"
                @set-start-date="(o: any) => { search.startUpdateDt = o.date; }"
                @set-end-date="(o: any) => { search.endUpdateDt = o.date; }"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">등록일</th>
            <td colspan="3">
              <SelectDate
                :format="'yyyy-MM-dd'"
                :date="[search.createDt]"
                @set-start-date="(o: any) => { search.createDt = o.date; }"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">수정ID</th>
            <td><input type="text" v-model="search.updater"/></td>
            <th scope="row">등록ID</th>
            <td><input type="text" v-model="search.creator"/></td>
          </tr>
        </tbody>

      </table>
    </fieldset>
    <div class="btnWrap">
      <span class="crud">
        <button type="button" class="button add" @click="add"><span class="icon">&#xe813;</span>추가</button>
        <button type="button" class="button del" @click="del"><span class="icon">&#xe815;</span>삭제</button>
        <button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
        <button type="button" class="button reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span>초기화</button>
      </span>
      <button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>

      <button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
      <button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
      <button type="button" class="button excel" @click="excelUtil.excelExport(data.grid, '사용자')">
        <span class="icon">&#xf1c3;</span>
      </button>
      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="grid" class="grid-container"></div>
  <div class="no-list" v-show="data.list.length === 0">조회 내역이 없습니다.</div>
  <Pagination
    :currentPage="data.currentPage"
    :lastPage="data.lastPage"
    @update:page="handlePageChange"
  />
  <Detail
    :component="UserDetail"
    :data="showDetailData"
    :show="showDetail"
    v-if="showDetail"
    @close="showDetail = false"
  />
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@src/utils/gridUtil';
import excelUtil from '@src/utils/excelUtil';
import UserService from '@src/service/at/UserService';
import dateUtil from "@src/utils/dateUtil";
import SelectDate from "@src/components/SelectDate.vue";
import SelectGroupDate from "@src/components/SelectGroupDate.vue";
import CommonCodeRadio from "@src/components/CommonCodeRadio.vue";
import {useAuthStore} from "@src/store/authStore";
import Pagination from "@src/components/Pagination.vue";
import VueDatePicker from "@vuepic/vue-datepicker";



const auth = useAuthStore();
const search = reactive({
  userId: '',
  companyId: '',
  userName: '',
  phoneNo: '',
  memo: '',
  userStateCode: '',
  updater: '',
  creator: '',
  startUpdateDt: '',
  endUpdateDt: '',
  createDt: '',
});
const data = reactive({
  required: [
    'userId',
    'companyId',
    'userName',
    'pwd',
    'phoneNo',
    'passwordUpdateDt',
    'loginDt',
    'userStateCode',
  ],
  grid: {} as Handsontable,
  list: [] as any,
  audit: false,
  totalCount: 0,
  currentPage: 1,
  totalPage: 50,
  lastPage: 1,
});
const gridProps = {
  unique: ['companyId'],
  required: [
    'userId',
    'companyId',
    'userName',
    'pwd',
    'phoneNo',
    'passwordUpdateDt',
    'loginDt',
    'userStateCode',
  ],
}
let selectedRow = null as any;
const submitList = (event: Event) => {
  event?.preventDefault(); // submit 기본 동작을 막음
  getList();
}
const getList = () => {
  UserService.getUserList({
    ...search,
    page: data.currentPage,
    totalPage: data.totalPage,
  }).then(
    (res: any) => {
      data.list = res.data?.list;
      data.totalCount = res.data?.totalCount;
      data.currentPage = res.data?.currentPage;
      data.lastPage = res.data?.lastPage;
      if (data.grid) {
        data.grid.updateSettings({
          data: data.list,
        });
      }
    },
    (err) => {
      console.log(err);
    },
  );
};
const handlePageChange = (page: number) => {
  data.currentPage = page;
  getList();
};
const add = () => {
  const newRow = {
    ...gridUtil.commonAddColumns,
    userId: '',
    companyId: '',
    userName: '',
    pwd: '',
    phoneNo: '',
    passwordUpdateDt: '',
    memo: '',
    loginDt: '',
    userStateCode: '',
      ...gridUtil.auditAddColumns,
  };
  data.list = gridUtil.add({newRow, list: data.list, grid: data.grid});
};
const del = () => {
  gridUtil.del({selectedRow, grid: data.grid});
};

// 수정된 데이터를 저장하는 기능
const save = () => {
  const saveList = gridUtil.valid({list: data.list, required: gridProps.required});
  if (!saveList) {
    return;
  }
  UserService.setUserList(saveList).then(() => {
    getList(); // 저장 후 목록 갱신
  });
};
onMounted(() => {
  const container = document.querySelector('#grid');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: [
      ...gridUtil.commonColumnNames,
      '사용자아이디',
      '업체아이디',
      '사용자이름',
      '비밀번호',
      '전화번호',
      '비밀번호수정일시',
      '메모',
      '로그인일시',
      '사용자상태코드',
      ...gridUtil.auditColumnNames
    ],
    hiddenColumns: gridUtil.hiddenColumns([]), // 0 mode 는 감추기
    columns: [
      ...gridUtil.commonColumns,
      {data: 'userId', type: 'text', width: 150, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'userName', type: 'text', width: 150,   },
      {data: 'pwd', type: 'text', width: 150,   },
      {data: 'phoneNo', type: 'text', width: 150,   },
      {data: 'passwordUpdateDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'memo', type: 'text', width: 150,   },
      {data: 'loginDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'userStateCode', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['userStateCode']?.map((o: any) => o.codeValue)) }},
      ...gridUtil.auditColumns,
    ],
    cells: function (row, col) {
      return gridUtil.cellsEvent({row, col, grid: data.grid, self: this, pk: []}); // pk 배열 추가시 수정은 된다.
    },
    afterChange(changes, source) {
      gridUtil.afterChangeEvent({changes, source, gridProps, grid: data.grid, self: this});
    },
    afterSelectionEnd: function (row, col, row2, col2) {
      selectedRow = row;
    },
    ...gridUtil.defaultProps,
  });
  getList();
});
</script>
