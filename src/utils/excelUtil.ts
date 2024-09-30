import XLSX from 'xlsx-js-style';
import dateUtil from '@src/utils/dateUtil';

/**
 * 엑셀
 * @param grid
 * @param gridName
 */
const excelExport = (grid: any, gridName: string) => {
  var alertConfirm = confirm('엑셀 다운로드 받겠습니까?');
  if (!alertConfirm) {
    return;
  }
  ;
  const workBook = XLSX.utils.book_new();
  // data 만들기
  let dataList = [];
  for (const o of grid.getData()) {
    let obj = {} as any;
    for (const c of grid.getColumns()) {
      for (const key in o) {
        if (key === c.name && key !== 'regUser' && key !== 'modUser' && key !== 'rowKey' && key !== '_attributes') {
          obj[c.header] = (o[key]) ? o[key] : '';
          break;
        }
      }
    }
    dataList.push(obj);
  }
  const workSheet = XLSX.utils.json_to_sheet(dataList);
  const headerBorderStyle = {style: 'thin', color: {rgb: '333333'}};
  const headerFgStyle = {rgb: 'eeeeee'};
  const xlsxUtilHeaderStyle = {
    fill: {fgColor: headerFgStyle},
    alignment: {vertical: 'center', horizontal: 'center'},
    border: {
      top: headerBorderStyle,
      bottom: headerBorderStyle,
      left: headerBorderStyle,
      right: headerBorderStyle,
    },
  };
  let charCode = String.fromCharCode(...Array(91).keys()).slice(65);
  let wscols = [];
  let idx = 0;
  for (let o of grid.getColumns()) {
    workSheet[charCode[idx] + '1'].s = xlsxUtilHeaderStyle;
    wscols.push({width: o.name.length * 4});
    XLSX.utils.cell_set_number_format(workSheet[charCode[idx] + '2'], ';@');
    idx++;
  }
  workSheet['!cols'] = wscols;
  // 그리기
  XLSX.utils.book_append_sheet(workBook, workSheet, gridName);
  XLSX.writeFile(workBook, gridName + '_' + dateUtil.format(new Date(), dateUtil.DATE_FORMAT_NUMBER) + '.xlsx');
}
export default {
  excelExport,
};
