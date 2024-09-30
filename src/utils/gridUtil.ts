/**
 * 속성
 */
const defaultProps = {
  /*hiddenColumns: {
    columns: [0], // 0부터 시작하는 인덱스에서 0번째 컬럼('mode')을 숨깁니다.
    indicators: false, // 숨겨진 컬럼에 대한 표시를 비활성화합니다.
  },*/
  rowHeaders: true, // 행번호
  columnSorting: false,
  manualColumnResize: true,
  comments: true,
  autoWrapRow: true,
  autoWrapCol: true,
  height: 'auto',
  width: '100%',
  licenseKey: 'non-commercial-and-evaluation',
}
const datePickerConfig = {
  dateFormat: 'YYYY-MM-DD HH:mm',
  correctFormat: true,
  datePickerConfig: {
    i18n: {
      previousMonth: '이전 달',
      nextMonth: '다음 달',
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
    },
    format: 'YYYY-MM-DD HH:mm',
    firstDay: 1,  // 월요일을 주의 첫 번째 날로 설정
    /*disableDayFn: function(date: any) { // 특정 날짜를 비활성화하려면 여기에 로직을 추가
      return date.getDay() === 0 || date.getDay() === 6; // 주말을 비활성화 예시
    },
    minDate: today // 오늘 이후의 날짜만 선택 가능
    */
  }
};
const searchProps = {
  creator: '',
  createDt: '',
  updater: '',
  updateDt: '',
  startUpdateDt: '', // dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'),
  endUpdateDt: '', // dateUtil.format(new Date(),'YYYY-MM-DD'),
};
const commonColumns = [
  {data: 'mode', type: 'text', readOnly: true},
];
const auditColumns = [
  {data: 'creator', type: 'text', width: 100, readOnly: true, editor: false},
  {data: 'createDt', type: 'date', width: 170, ...datePickerConfig}, // type: 'date', ...datePickerConfig
  {data: 'updater', type: 'text', width: 100, readOnly: true, editor: false},
  {data: 'updateDt', type: 'text', width: 170, readOnly: true, editor: false},
];
const commonAddColumns = {
  mode: 'C',
};
const auditAddColumns = {
  creator: '',
  createDt: '',
  updater: '',
  updateDt: '',
};
/**
 * 숨김 컬럼
 */
const hiddenColumns = (arr: any) => {
  return {
    columns: arr, // 0 숨기려는 열의 인덱스 배열
    indicators: true // 숨김 열을 표시할지 여부
  }
};
/**
 * 행추가
 */
const add = ({newRow, list, grid}: any) => {
  list.unshift(newRow);
  grid.loadData(list);
  return list;
};
/**
 * 삭제
 */
const del = ({selectedRow, grid}: any) => {
  if (selectedRow !== null) {
    const mode = grid.getDataAtRowProp(selectedRow, 'mode');
    if (mode === 'C') {
      grid.alter('remove_row', selectedRow); // 신규로 추가된 데이터이므로 완전히 삭제
    } else {
      grid.setDataAtRowProp(selectedRow, 'mode', 'D'); // 기존 데이터이므로 'D'로 표시
    }
  }
};
/**
 * 새로고침
 */
const reload = () => {
  location.reload();
};
/**
 * 유효검사
 */
const valid = ({list, required}: any) => {
  const invalidRows = list.filter((item: any) => {
    return required.some((field: string) => !item[field]);
  });
  if (invalidRows.length > 0) {
    alert('모든 필수 항목을 입력해야 합니다.');
    return;
  }
  // 변경된 데이터를 필터링
  const saveList = list.filter((item: any) => item.mode);
  if (saveList.length === 0) {
    alert('저장할 데이터가 없습니다.');
    return null;
  }
  const count = {
    C: saveList.filter((item: any) => item.mode === 'C').length,
    U: saveList.filter((item: any) => item.mode === 'U').length,
    D: saveList.filter((item: any) => item.mode === 'D').length,
  };
  if (!confirm(`등록 ${count.C}건, 수정 ${count.U}건, 삭제 ${count.D}건을 저장하시겠습니까?`)) {
    return null;
  }
  return saveList;
}
/**
 * 셀이벤트
 */
const cellsEvent = ({row, col, grid, self, pk}: any) => {
  const cellProperties: any = {};
  const mode = self.instance.getDataAtRowProp(row, 'mode') || '';
  if (grid.getCell && col === 0) { // mode 체크
    const rowElement = grid.getCell(row, 0)?.parentNode as any;
    if (rowElement) {
      rowElement.classList.remove('row-updated');
      rowElement.classList.remove('row-deleted');
      switch (mode) {
        case 'C':
          break;
        case 'R':
          break;
        case 'U':
          rowElement.classList?.add('row-updated');
          break;
        case 'D':
          rowElement.classList?.add('row-deleted');
          break;
        default:
          break;
      }
    }
  }
  if (mode === 'C') { // pk 체크
    pk.forEach(arr => {
      if (col === arr) { // pk 는 readOnly 지만 추가는 가능
        cellProperties.readOnly = false;
        return cellProperties;
      }
    });
  }
  return cellProperties;
}
/**
 * 변경 이벤트
 */
const afterChangeEvent = ({changes, source, gridProps, grid, self}: any) => {
  if (source === 'edit' || source === 'CopyPaste.paste' || source === 'Autofill.fill') {
    changes?.forEach(([row, prop, oldValue, newValue]: any) => {
      if (prop === 'mode') {
        return;
      }
      if (gridProps.required.includes(prop) && !newValue) {
        self.setCellMeta(row, self.propToCol(prop), 'className', 'cell-required');
      } else {
        self.removeCellMeta(row, self.propToCol(prop), 'className'); // 값이 입력된 경우 빨간색을 제거
      }
      if (oldValue !== newValue) {
        const rowData = grid.getSourceDataAtRow(row) as any;
        if (rowData.mode !== 'C') {
          grid.setDataAtRowProp(row, 'mode', 'U'); // 기존 행에서 수정된 경우 'U'로 설정
        }
      }
    });
  }
};
export default {
  defaultProps,
  searchProps,
  datePickerConfig,
  commonColumns,
  auditColumns,
  commonAddColumns,
  auditAddColumns,
  hiddenColumns,
  afterChangeEvent,
  cellsEvent,
  add,
  valid,
  reload,
  del,
};
