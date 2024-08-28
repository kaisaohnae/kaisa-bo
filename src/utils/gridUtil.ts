import XLSX from 'xlsx-js-style';
import dateUtil from '@src/utils/dateUtil';
import moment from 'moment';
import 'moment/locale/ko'; // 한글 로케일을 불러옵니다

moment.locale('ko'); // Moment.js의 로케일을 한글로 설정합니다

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
	datePickerConfig : {
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
}
const hiddenColumns = (arr: any) => {
	return {
		columns: arr, // 0 숨기려는 열의 인덱스 배열
		indicators: true // 숨김 열을 표시할지 여부
	}
}

/**
 * 행추가
 * @param grid
 * @param n
 */
const add = ({newRow, list, grid}: any) => {
	list.unshift(newRow);
	grid.loadData(list);
	return list;
}

/**
 * 삭제
 */
const del = ({selectedRow, grid}: any) => {
	if(selectedRow !== null) {
		const rowElement = grid.getCell(selectedRow, 0)?.parentNode as any;
		rowElement.classList?.add('row-deleted');
		grid.setDataAtRowProp(selectedRow, 'mode', 'D');
	}
}
/**
 * 새로고침
 */
const reload = () => {
	location.reload();
}

/**
 *
 */
const makeFileData = (obj: any) => {
	let form = new FormData();
	form.append('fileNo', obj.props.data.fileNo + '');
	form.append('path', obj.name);
	// 추가파일
	let addCount = 0;
	for (let file of obj.data.addFileList) {
		form.append('addFileList', file);
		addCount++;
	}
	// 삭제파일
	let delCount = 0;
	if (obj.props.data.fileList) {
		for (let file of obj.props.data.fileList) {
			if (file.delYn == 'Y') {
				form.append('deleteFileDtlNo', file.fileDtlNo);
				delCount++;
			}
		}
	}
	return {
		form: form,
		addCount: addCount,
		delCount: delCount,
	}
}
const excelExport = (grid: any, gridName: string) => {
	var alertConfirm = confirm('엑셀 다운로드 받겠습니까?');
	if (!alertConfirm) {
		return;
	};
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
	const headerBorderStyle = { style: 'thin', color: { rgb: '333333' } };
	const headerFgStyle = { rgb: 'eeeeee' };
	const xlsxUtilHeaderStyle = {
		fill: { fgColor: headerFgStyle },
		alignment: { vertical: 'center', horizontal: 'center' },
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
		wscols.push({ width: o.name.length * 4 });
		XLSX.utils.cell_set_number_format(workSheet[charCode[idx] + '2'], ';@');
		idx++;
	}
	workSheet['!cols'] = wscols;
	// 그리기
	XLSX.utils.book_append_sheet(workBook, workSheet, gridName);
	XLSX.writeFile(workBook, gridName + '_' + dateUtil.format(new Date(), dateUtil.DATE_FORMAT_NUMBER) + '.xlsx');
}

const valid = (o: any, required: any) => {
	for (let c in o) {
		for (let r of required) {
			if (c == r && !o[c]) {
				alert('필수값이 없습니다.');
				return false;
			}
		}
	}
	return true;
}

const save = (grid: any, required: any) => {
	grid.blur();
	let saveList = [];
	let count = [0, 0, 0];
	for (let o of grid.getModifiedRows().createdRows as any) {
		o.crud = 'C';
		if (!valid(o, required)) {
			return [];
		}
		saveList.push(o);
		count[0]++;
	}
	for (let o of grid.getModifiedRows().updatedRows as any) {
		o.crud = 'U';
		if (!valid(o, required)) {
			return [];
		}
		saveList.push(o);
		count[1]++;
	}
	for (let o of grid.getModifiedRows().deletedRows as any) {
		o.crud = 'D';
		saveList.push(o);
		count[2]++;
	}
	if (count[0] == 0 && count[1] == 0 && count[2] == 0) {
		alert('변경사항이 없습니다.');
		return [];
	}
	if (confirm('등록 ' + count[0] + '건, 수정 ' + count[1] + '건, 삭제 ' + count[2] + '건을 정말 저장하시겠습니까?')) {
		return saveList;
	}
}

const cellsEvent = ({row, col, grid, self, pk}: any) => {
	const cellProperties: any = {};
	const rowData = self.instance.getDataAtRowProp(row, 'mode');
	const mode = rowData || '';


	if(col === 0) {
		switch (mode){
			case 'C':

				const rowElement = grid.getCell(row, 0)?.parentNode as any;
				rowElement.classList?.add('row-updated');

				break;
		}
	}

	if (mode === 'C') {
		pk.forEach(arr => {
			console.log(col, arr);
			if (col === arr) { // 'abb' 컬럼의 경우
				console.log(cellProperties);
				cellProperties.readOnly = false;
				return cellProperties;
			}
		});
	}
	return cellProperties;
}

const afterChangeEvent = ({changes, source, gridProps, grid, self}: any) => {
	if (source === 'edit' || source === 'CopyPaste.paste' || source === 'Autofill.fill') {
		changes?.forEach(([row, prop, oldValue, newValue]: any) => {
			if(prop === 'mode') {
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

					const rowElement = grid.getCell(row, 0)?.parentNode as any;
					rowElement.classList?.add('row-updated');
				}
			} else {
				const rowElement = grid.getCell(row, 0)?.parentNode as any;
				rowElement.classList?.remove('row-updated');
			}
		});
	}
};

export default {
	defaultProps,
	searchProps,
	datePickerConfig,
	hiddenColumns,
	afterChangeEvent,
	cellsEvent,
	add,
	save,
	reload,
	del,
	makeFileData,
	excelExport,
};
