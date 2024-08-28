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
      <button type="button" class="button excel" @click="gridUtil.excelExport(data.grid, '사전')"><span class="icon">&#xf1c3;</span></button>
      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="grid" class="grid-container"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@src/utils/gridUtil';
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

let selectedRow = null as any;

// 목록 조회
const getList = () => {
  data.totalCount = 0;
  DictionaryService.getDictionaryList(search).then(
    (res: any) => {
      data.list = res.data?.list; // 초기 상태는 'R'
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

// 행 추가 기능
const add = () => {
  const newRow = {
    abb: '',
    korean: '',
    english: '',
    memo: '',
    creator: '',
    createDt: '',
    updater: '',
    updateDt: '',
    mode: 'C'  // 새로 추가된 행의 상태를 'C'로 설정합니다.
  };
  data.list = gridUtil.add({newRow, list: data.list, grid: data.grid});
};

// 행 삭제 기능
const del = () => {
  gridUtil.del({selectedRow, grid: data.grid});
};

// 수정된 데이터를 저장하는 기능
const save = () => {
  /*if (confirm('등록 ' + count[0] + '건, 수정 ' + count[1] + '건, 삭제 ' + count[2] + '건을 정말 저장하시겠습니까?')) {
    return saveList;
  }

  const saveList = data.list.filter((item: any) => item.mode !== 'R'); // 변경된 데이터만 필터링
  if (saveList.length > 0) {
    DictionaryService.setDictionaryList(saveList).then(
      () => {
        getList(); // 저장 후 목록 갱신
      },
      (err) => {
        console.error(err);
      },
    );
  }*/
};

onMounted(() => {
  const container = document.querySelector('#grid');
  const gridProps = {
    unique : ['abb'],
    required: ['abb', 'korean', 'english'],
  }
  data.grid = new Handsontable(container as any, {
    data: data.list,
    colHeaders: ['mode', '약어', '한국어', '영어', '설명', '등록자', '등록일시', '수정자', '수정일시'],
    hiddenColumns: gridUtil.hiddenColumns([]),
    columns: [
      { data: 'mode', type: 'text', readOnly: true, hidden: true },
      { data: 'abb', type: 'text', readOnly: true}, // className: 'tr',
      { data: 'korean', type: 'text', width: 150, readOnly: true},
      { data: 'english', type: 'text', width: 150 },
      { data: 'memo', type: 'text', width: 150 },
      { data: 'creator', type: 'text', readOnly: true, editor: false },
      { data: 'createDt', type: 'date', width: 150, readOnly: false, ...gridUtil.datePickerConfig },
      { data: 'updater', type: 'text', readOnly: true },
      { data: 'updateDt', type: 'text', width: 150, readOnly: true },
    ],
    cells: function(row, col) {
      return gridUtil.cellsEvent({row, col, grid: data.grid, self: this, pk: [1, 2] });
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

