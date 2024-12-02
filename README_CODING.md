# vue productNo

``` javascript
      {
        data: 'productNo',
        type: 'dropdown',
        width: 150,
        source: function (query, process) {
          process(auth.codeList['chloisProductCode']?.map((o: any) => {
            return o.codeName
          }))
        },
        renderer: function (instance, td, row, col, prop, value, cellProperties) {
          const option = auth.codeList['chloisProductCode']?.find((o: any) => o.codeValue == value);
          td.innerHTML = option ? option.codeName : value;
          return td;
        }
      },
```


```
afterOnCellMouseDown: (event, coords) => {
  const colHeader = data.grid.getColHeader(coords.col); // 칼럼 헤더 확인
  if (colHeader === '제목') {
    const rowData = data.grid.getSourceDataAtRow(coords.row); // 선택된 행의 데이터
    console.log('제목 칼럼 클릭:', rowData);
  }
},
```
