# coding tip

``` javascript
      cells: function (row, col) {
        const cellProperties: any = {};
        const rowData: any = handsontable.current?.getSourceDataAtRow(row);
        const colHeader = handsontable.current?.getColHeader(col);
        if(colHeader === '사용자아이디' || colHeader === '업체아이디') {
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
        const rowData = hot.getSourceDataAtRow(coords.row); // 행 데이터
        const cellValue = hot.getDataAtCell(coords.row, coords.col); // 셀 값
        // 헤더가 '사용자이름'이고, 행 데이터와 셀 값이 모두 존재할 때만 실행
        if (colHeader === '사용자이름' && rowData && cellValue) {
          setDetailData(rowData);
          setDetailShow(true);
        }
      },
```



