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
          <th>코드</th><!-- class="required"-->
          <td colspan="3"><input type="text" v-model="search.code"/></td>
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
      <button type="button" class="button excel" @click="excelUtil.excelExport(data.grid, '사전')">
        <span class="icon">&#xf1c3;</span>
      </button>
      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="code" class="grid-container"></div>
  <div class="no-list" v-show="!data.list || data.list.length === 0">조회 내역이 없습니다.</div>
  <Pagination
    :currentPage="data.currentPage"
    :lastPage="data.lastPage"
    @update:page="handlePageChange"
  />
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@src/utils/gridUtil';
import excelUtil from '@src/utils/excelUtil';
import CodeService from '@src/service/common/CodeService';
import SelectDate from "@src/components/SelectDate.vue";
import SelectGroupDate from "@src/components/SelectGroupDate.vue";
import Pagination from "@src/components/Pagination.vue";

const search = reactive({
  code: '',
  updater: '',
  creator: '',
  startUpdateDt: null,
  endUpdateDt: null,
  createDt: null,
});
const data = reactive({
  required: ['code', 'codeValue'],
  grid: {} as Handsontable,
  list: [] as any,
  audit: false,
  totalCount: 0,
  currentPage: 1,
  lastPage: 1,
});
const gridProps = {
  unique: ['code', 'codeValue'],
  required: ['code', 'codeValue'],
}
let selectedRow = null as any;

const getList = (event: Event) => {
  event?.preventDefault(); // submit 기본 동작을 막음
  data.totalCount = 0;
  CodeService.getCodeList({
    ...search,
    page: data.currentPage,
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
    code: '',
    codeValue: '',
    codeName: '',
    memo: '',
    sortOrder: 0,
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
  CodeService.setCodeList(saveList).then(() => {
    getList(); // 저장 후 목록 갱신
  });
};
onMounted(() => {
  const container = document.querySelector('#code');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: [
      ...gridUtil.commonColumnNames,
      '코드',
      '코드값',
      '코드명',
      '설명',
      '정렬순서',
      ...gridUtil.auditColumnNames
    ],
    hiddenColumns: gridUtil.hiddenColumns([]), // 0 mode 는 감추기
    columns: [
      ...gridUtil.commonColumns,
      {data: 'code', type: 'text', readOnly: true},
      {data: 'codeValue', type: 'text', readOnly: true},
      {data: 'codeName', type: 'text'},
      {data: 'memo', type: 'text', width: 200},
      {data: 'sortOrder', type: 'text', width: 150},
      ...gridUtil.auditColumns,
    ],
    cells: function (row, col) {
      return gridUtil.cellsEvent({row, col, grid: data.grid, self: this, pk: [1, 2]}); // pk 는 readOnly 지만 추가는 가능
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

