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
<!--      <button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
      <button type="button" class="button excel" @click="gridUtil.excelExport(data.grid, '사전')"><span class="icon">&#xf1c3;</span></button>-->

      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="grid" class="grid-container"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Handsontable from 'handsontable';
import gridUtil from '@src/utils/gridUtil';
import DictionaryService from '@src/service/cr/DictionaryService';
import moment from 'moment';
import 'moment/locale/ko'; // 한글 로케일을 불러옵니다

moment.locale('ko'); // Moment.js의 로케일을 한글로 설정합니다

const search = reactive({
  abb: '',
});

const data = reactive({
  required: ['abb', 'korean', 'english'],
  grid: {} as Handsontable,
  totalCount: 0,
  list: [] as any,
  audit: false,
});

// 목록 조회
const getList = () => {
  data.totalCount = 0;
  DictionaryService.getDictionaryList(search).then(
    (res: any) => {
      data.list = res.data?.list.map((item: any) => ({ ...item, mode: 'R' })); // 초기 상태는 'R'
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
  data.list.unshift(newRow);
  data.grid.loadData(data.list);
};

// 행 삭제 기능
const del = () => {
  const selectedRanges = data.grid.getSelected();
  // 선택된 범위가 없는 경우
  if (!selectedRanges?.length) {
    return;
  }
  selectedRanges.forEach((range: any) => { // 선택된 셀 범위에 대해 처리
    for (let row = range.from.row; row <= range.to.row; row++) {
      const rowData = data.grid.getSourceDataAtRow(row) as any;
      if (rowData.mode === 'C') {
        // 선택된 행 삭제
        data.grid.alter('remove_row', row);
      } else {
        // 기존 데이터는 'D'로 마크
        data.grid.setDataAtRowProp(row, 'mode', 'D');
      }
    }
  });
};

// 수정된 데이터를 저장하는 기능
const save = () => {
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
  }
};

onMounted(() => {
  const container = document.querySelector('#grid');
  data.grid = new Handsontable(container as any, {
    data: data.list,
    rowHeaders: true, // 행번호
    colHeaders: ['mode', '약어', '한국어', '영어', '설명', '등록자', '등록일시', '수정자', '수정일시'],
    columns: [
      { data: 'mode', type: 'text', readOnly: true, hidden: true },
      { data: 'abb', type: 'text' }, // className: 'tr',
      { data: 'korean', type: 'text', width: 150 },
      { data: 'english', type: 'text', width: 150 },
      { data: 'memo', type: 'text', width: 150 },
      { data: 'creator', type: 'text', readOnly: true, editor: false },
      { data: 'createDt', type: 'date', readOnly: false, dateFormat: 'YYYY-MM-DD hh:mm', correctFormat: true, },
      { data: 'updater', type: 'text', readOnly: true },
      { data: 'updateDt', type: 'text', readOnly: true },
    ],
    cells: function(row, col) {
      const cellProperties: any = {};
      if (col === 0) { // 'abb' 컬럼의 경우
        const rowData = this.instance.getDataAtRowProp(row, 'mode');
        const mode = rowData || ''; // rowData가 null일 경우 빈 객체를 반환하여 에러 방지
        if (mode !== 'C') {
          cellProperties.readOnly = true;
        }
      }
      return cellProperties;
    },
    afterChange(changes, source) {
      // source => loadData, updateData
      if (source === 'edit' || source === 'CopyPaste.paste' || source === 'Autofill.fill') {
        changes?.forEach(([row, prop, oldValue, newValue]) => {
          if (oldValue !== newValue) {
            const rowData = data.grid.getSourceDataAtRow(row) as any;
            if (rowData.mode !== 'C') {
              data.grid.setDataAtRowProp(row, 'mode', 'U'); // 기존 행에서 수정된 경우 'U'로 설정
            }
          }
        });
      }
    },
    ...gridUtil.defaultProps,
  });
  getList();
});
// Remove aria-hidden attribute if it's being added to textarea
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
  textarea.removeAttribute('aria-hidden');
});
</script>

