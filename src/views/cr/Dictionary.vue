<template>
  <form class="search" @submit="getList" @keyup.enter="getList">
    <fieldset>
      <legend>검색</legend>
      <table>
        <colgroup>
          <col width="100"/>
          <col width="*"/>
          <col width="100"/>
          <col width="*"/>
        </colgroup>
        <tbody>
        <tr>
          <th>약어</th><!-- class="required"-->
          <td colspan="2"><input type="text" v-model="search.abb"/></td>
        </tr>
        </tbody>
        <tbody class="audit" v-show="data.audit">
        <tr>
          <th>수정기간</th>
          <td colspan="2">
          </td>
        </tr>
        <tr>
          <th>등록일</th>
          <td colspan="2">

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
      <button type="button" class="button excel" @click="excelUtil.excelExport(data.grid, '사전')"><span class="icon">&#xf1c3;</span></button>
      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="grid" class="grid-container"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@src/utils/gridUtil';
import excelUtil from '@src/utils/excelUtil';
import DictionaryService from '@src/service/cr/DictionaryService';

const search = reactive({
  abb: '',
  updater: '',
  creator: '',
});
const data = reactive({
  required: ['abb', 'korean', 'english'],
  grid: {} as Handsontable,
  totalCount: 0,
  list: [] as any,
  audit: false,
});
const gridProps = {
  unique : ['abb'],
  required: ['abb', 'korean', 'english'],
}
let selectedRow = null as any;

const getList = () => {
  data.totalCount = 0;
  DictionaryService.getDictionaryList(search).then(
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
    abb: '',
    korean: '',
    english: '',
    memo: '',
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
  if(!saveList) {
    return;
  }
  DictionaryService.setDictionaryList(saveList).then(() => {
    getList(); // 저장 후 목록 갱신
  });
};
onMounted(() => {
  // console.log(route.query.ch);
  const container = document.querySelector('#grid');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: ['mode', '약어', '한국어', '영어', '설명', '등록자', '등록일시', '수정자', '수정일시'],
    hiddenColumns: gridUtil.hiddenColumns([]), // 0 mode 는 감추기
    columns: [
      ...gridUtil.commonColumns,
      { data: 'abb', type: 'text', readOnly: true},
      { data: 'korean', type: 'text', width: 150},
      { data: 'english', type: 'text', width: 150 },
      { data: 'memo', type: 'text', width: 200 },
      ...gridUtil.auditColumns,
    ],
    cells: function(row, col) {
      return gridUtil.cellsEvent({row, col, grid: data.grid, self: this, pk: [1] });
    },
    afterChange(changes, source) {
      gridUtil.afterChangeEvent({changes, source, gridProps, grid: data.grid, self: this });
    },
    afterSelectionEnd: function(row, col, row2, col2) {
      selectedRow = row;
    },
    ...gridUtil.defaultProps,
  });
  getList();
});
</script>

