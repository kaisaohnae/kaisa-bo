<template>
  <form class="search" @submit="getList" @keyup.enter="getList">
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
              <th>메뉴명</th>
              <td colspan="3"><input type="text" v-model="search.menuName"/></td>
            </tr>
        </tbody>
        <tbody class="audit" v-show="data.audit">
        <tr>
          <th>수정기간</th>
          <td colspan="3">
            <SelectGroupDate
              :format="'yyyy-MM-dd'"
              :date="[search.startUpdateDt, search.endUpdateDt]"
              @set-start-date="(o) => { search.startUpdateDt = o.date; }"
              @set-end-date="(o) => { search.endUpdateDt = o.date; }"
            />
          </td>
        </tr>
        <tr>
          <th>등록일</th>
          <td colspan="3">
            <SelectDate
              :format="'yyyy-MM-dd'"
              :date="[search.createDt]"
              @set-start-date="(o) => { search.createDt = o.date; }"
            />
          </td>
        </tr>
        <tr>
          <th>수정ID</th>
          <td><input type="text" v-model="search.updater"/></td>
          <th>등록ID</th>
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
      </span>
      <button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>

      <button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
      <button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
      <button type="button" class="button excel" @click="excelUtil.excelExport(data.grid, '메뉴')">
        <span class="icon">&#xf1c3;</span>
      </button>
      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="grid" class="grid-container"></div>
  <div class="no-list" v-show="data.list.length === 0">조회 내역이 없습니다.</div>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@src/utils/gridUtil';
import excelUtil from '@src/utils/excelUtil';
import MenuService from '@src/service/at/MenuService';
import dateUtil from "@src/utils/dateUtil";
import SelectDate from "@src/components/SelectDate.vue";
import SelectGroupDate from "@src/components/SelectGroupDate.vue";
import CommonCodeRadio from "@src/components/CommonCodeRadio.vue";
import {useAuthStore} from "@src/store/authStore";

const auth = useAuthStore();

const search = reactive({
  menuName: '',
  updater: '',
  creator: '',
  startUpdateDt: '',
  endUpdateDt: '',
  createDt: '',
});
const data = reactive({
  required: [
    'menuId',
    'menuName',
    'menuGroupCode',
    'path',
    'isDisplay',
    'isLast',
    'depth',
    'sortOrder',
  ],
  grid: {} as Handsontable,
  totalCount: 0,
  list: [] as any,
  audit: false,
});
const gridProps = {
  unique: ['menuId'],
  required: [
    'menuId',
    'menuName',
    'menuGroupCode',
    'path',
    'isDisplay',
    'isLast',
    'depth',
    'sortOrder',
  ],
}
let selectedRow = null as any;

const getList = (event: Event) => {
  event?.preventDefault(); // submit 기본 동작을 막음
  data.totalCount = 0;
  MenuService.getMenuList(search).then(
    (res: any) => {
      data.list = res.data?.list;
      data.totalCount = res.data?.totalCount;
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
const add = () => {
  const newRow = {
    ...gridUtil.commonAddColumns,
    menuId: '',
    menuName: '',
    menuGroupCode: '',
    path: '',
    icon: '',
    isDisplay: '',
    isLast: '',
    depth: '',
    sortOrder: '',
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
  MenuService.setMenuList(saveList).then(() => {
    getList(); // 저장 후 목록 갱신
  });
};
onMounted(() => {
  const container = document.querySelector('#grid');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: [
      ...gridUtil.commonColumnNames,
      '메뉴아이디',
      '메뉴명',
      '메뉴그룹코드',
      '경로',
      '아이콘',
      '전시여부',
      '마지막여부',
      '깊이',
      '정렬순서',
      ...gridUtil.auditColumnNames
    ],
    hiddenColumns: gridUtil.hiddenColumns([]), // 0 mode 는 감추기
    columns: [
      ...gridUtil.commonColumns,
      {data: 'menuId', type: 'text', width: 150, readOnly: true, },
      {data: 'menuName', type: 'text', width: 150,  },
      {data: 'menuGroupCode', type: 'dropdown', width: 150,  source: function (query, process) { process(auth.codeList['menuGroupCode']?.map(o => o.codeValue)) }},
      {data: 'path', type: 'text', width: 150,  },
      {data: 'icon', type: 'text', width: 150,  },
      {data: 'isDisplay', type: 'numeric', width: 150,  },
      {data: 'isLast', type: 'numeric', width: 150,  },
      {data: 'depth', type: 'numeric', width: 150,  },
      {data: 'sortOrder', type: 'numeric', width: 150,  },
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