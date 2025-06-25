import * as XLSX from 'xlsx-js-style';
import dateUtil from '@/utils/date-util';

/**
 * 엑셀 내보내기
 * @param gridInstance - Handsontable 인스턴스
 * @param gridName - 엑셀 파일 이름
 */
const excelExport = (gridInstance: any, gridName: any) => {
  const alertConfirm = confirm('엑셀 다운로드 받겠습니까?');
  if (!alertConfirm) {
    return;
  }
  // 워크북 생성
  const workBook = XLSX.utils.book_new();
  // Handsontable 인스턴스에서 열 정보 가져오기
  const columns = gridInstance.getSettings().columns;
  const colHeaders = gridInstance.getColHeader(); // 헤더 제목 가져오기
  // 데이터 만들기
  const rawData = gridInstance.getData();
  let dataList = [] as any;
  rawData.forEach((row: any) => {
    let obj = {} as any;
    row.forEach((col: any, j: number) => {
      if(colHeaders[j] !== 'mode') {
        obj[colHeaders[j]] = col;
      }
    })
    dataList.push(obj);
  });

  if (dataList.length === 0) {
    console.error('엑셀 데이터가 없습니다.'); // 에러 메시지 출력
    return;
  }
  // 워크시트 생성
  const workSheet = XLSX.utils.json_to_sheet(dataList);
  // 열 너비 조정 (map 내부에 debugger 추가)
  workSheet['!cols'] = columns && Array.isArray(columns) ? columns.map((col, index) => {
    return {width: (colHeaders[index] ? colHeaders[index].length : 0) * 4};
  }) : [];
  // 워크북에 워크시트 추가
  XLSX.utils.book_append_sheet(workBook, workSheet, gridName);
  // 파일로 다운로드
  const fileName = `${gridName}_${dateUtil.format(new Date(), dateUtil.DATE_FORMAT_NUMBER)}.xlsx`;
  XLSX.writeFile(workBook, fileName);
};

export default {
  excelExport,
};
