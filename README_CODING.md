# coding tip

``` javascript
      cells: function (row, col) {
        const cellProperties: any = {};
        const rowData: any = handsontable.current?.getSourceDataAtRow(row);
        const colHeader = handsontable.current?.getColHeader(col);
        if((colHeader === '사용자아이디' || colHeader === '업체아이디') && rowData?.isNew) {
          // 기존 행은 readOnly, 새 행만 수정 가능
          cellProperties.readOnly = !(!rowData?.userId || !rowData?.companyId);
        }
        const customProps = gridUtil.cellsEvent({
          row,
          col,
          grid: handsontable.current,
          self: this,
          pk: [],
        });
        return { ...cellProperties, ...customProps };
      },
      afterOnCellMouseDown: (event, coords) => {
        const hot = handsontable.current;
        if (!hot) return;
        const colHeader = hot.getColHeader(coords.col); // 칼럼 헤더
        const rowData: any = hot.getSourceDataAtRow(coords.row); // 행 데이터
        const cellValue = hot.getDataAtCell(coords.row, coords.col); // 셀 값
        // 헤더가 '사용자이름'이고, 행 데이터와 셀 값이 모두 존재할 때만 실행
        if (colHeader === '사용자이름' && rowData && cellValue && !rowData?.isNew) {
          setDetailData(rowData);
          setDetailShow(true);
        }
      },
```
## UTC → KST 보정
```javascript
<ReactDatePicker
  locale={ko}
  selected={search.holiday ? new Date(search.holiday + '-01') : null} // YYYY-MM 기준으로 변환
  onChange={(date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      handleSearchChange('holiday', `${year}-${month}`); // "YYYY-MM" 형태로 전송
    } else {
      handleSearchChange('holiday', '');
    }
  }}
  dateFormat="yyyy-MM"
  showMonthYearPicker // ✅ 월 단위 선택 모드
  placeholderText="월 선택"
  disabled={false}
/>
```



