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
              <th scope="row">회원아이디</th>
              <td colspan="3"><input type="text" v-model="search.memberId"/></td>
            </tr>
            <tr>
              <th scope="row">회원이름</th>
              <td colspan="3"><input type="text" v-model="search.memberName"/></td>
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
      <button type="button" class="button excel" @click="excelUtil.excelExport(data.grid, '회원')">
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
    :component="MemberDetail"
    :data="showDetailData"
    :show="showDetail"
    v-if="showDetail"
    @close="showDetail = false"
  />

</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import MemberService from '@/service/at/member-service';
import dateUtil from "@/utils/date-util";
import SelectDate from "@/components/select-date.vue";
import SelectGroupDate from "@/components/select-group-date.vue";
import CommonCodeRadio from "@/components/common-code-radio.vue";
import {useAuthStore} from "@/store/auth-store";
import Pagination from "@/components/pagination.vue";
import VueDatePicker from "@vuepic/vue-datepicker";

import Detail from "@/views/common/detail.vue";
import MemberDetail from "@/views/at/member-detail.vue";

const showDetailData = ref<any>(null); // 선택된 데이터를 저장
const showDetail = ref(false); // Detail 컴포넌트 표시 여부


const auth = useAuthStore();
const search = reactive({
  memberId: '',
  memberName: '',
  updater: '',
  creator: '',
  startUpdateDt: '',
  endUpdateDt: '',
  createDt: '',
});
const data = reactive({
  required: [
    'memberId',
    'companyId',
    'memberName',
    'phoneNo',
    'passwordUpdateDt',
    'loginDt',
    'memberStateCode',
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
    'memberId',
    'companyId',
    'memberName',
    'phoneNo',
    'passwordUpdateDt',
    'loginDt',
    'memberStateCode',
  ],
}
let selectedRow = null as any;
const submitList = (event: Event) => {
  event?.preventDefault(); // submit 기본 동작을 막음
  getList();
}
const getList = () => {
  MemberService.getMemberList({
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
    memberId: '',
    companyId: '',
    memberName: '',
    email: '',
    phoneNo: '',
    passwordUpdateDt: '',
    loginDt: '',
    memo: '',
    memberStateCode: '',
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
  MemberService.setMemberList(saveList).then(() => {
    getList(); // 저장 후 목록 갱신
  });
};
onMounted(() => {
  const container = document.querySelector('#grid');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: [
      ...gridUtil.commonColumnNames,
      '회원아이디',
      '업체아이디',
      '회원이름',
      '이메일',
      '전화번호',
      '비밀번호수정일시',
      '로그인일시',
      '메모',
      '회원상태코드',
      ...gridUtil.auditColumnNames
    ],
    hiddenColumns: gridUtil.hiddenColumns([]), // 0 mode 는 감추기
    columns: [
      ...gridUtil.commonColumns,
      {data: 'memberId', type: 'text', width: 150, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'memberName', type: 'text', width: 150,  className: 'underline', },
      {data: 'email', type: 'text', width: 150,   },
      {data: 'phoneNo', type: 'text', width: 150,   },
      {data: 'passwordUpdateDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'loginDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'memo', type: 'text', width: 150,   },
      {data: 'memberStateCode', type: 'dropdown', width: 150,   source: function (query, process) { process(auth.codeList['memberStateCode']?.map((o: any) => o.codeValue)) }},
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
    afterOnCellMouseDown: (event, coords) => {
      const colHeader = data.grid.getColHeader(coords.col); // 칼럼 헤더 확인
      const rowData = data.grid.getSourceDataAtRow(coords.row); // 선택된 행의 데이터
      if (colHeader === '회원이름' && rowData) {
        showDetailData.value = rowData;
        showDetail.value = true;
      }
    },
    ...gridUtil.defaultProps,
  });
  getList();
});
</script>
