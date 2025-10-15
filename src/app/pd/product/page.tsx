'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import ProductService from '@/service/pd/product-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import Detail from '@/components/common/detail';
import ProductDetail from './product-detail';




export default function ProductPage() {
  const gridRef: any = useRef(null);
  const auth = useAuthStore();
  const setting = useSettingStore();
  const mounted = useRef<boolean>(false);
  const handsontable = useRef<Handsontable>(null);

  const [detailData, setDetailData]:any = useState({});
  const [detailShow, setDetailShow]:any = useState(false);


  const [search, setSearch] = useState({
    companyId: '',
    productName: '',
    updater: '',
    creator: '',
    startUpdateDt: '',
    endUpdateDt: '',
    createDt: '',
  });

  const [data, setData]: any = useState({
    required: [
      'companyId',
      'seasonPriceNo',
      'productName',
      'headCount',
      'maxHeadCount',
      'm2',
      'isDisplay',
      'isPet',
      'isBBQ',
      'isPickup',
      'isStone',
      'fileNo',
    ],
    grid: null,
    list: [],
    audit: false,
    totalCount: 0,
    currentPage: 1,
    lastPage: 1,
  });

  const gridProps = {
    unique: ['productNo'],
    required: [
      'companyId',
      'seasonPriceNo',
      'productName',
      'headCount',
      'maxHeadCount',
      'm2',
      'isDisplay',
      'isPet',
      'isBBQ',
      'isPickup',
      'isStone',
      'fileNo',
    ],
  };

  const [selectedRow, setSelectedRow]: any = useState(null);

  const getList = async () => {
    ProductService.getProductList({ ...search, page: data.currentPage }).then(res => {
      setData(prev => ({
        ...prev,
        list: res.data?.list || [],
        totalCount: res.data?.totalCount || 0,
        currentPage: res.data?.currentPage || 1,
        lastPage: res.data?.lastPage || 1,
      }));
      if (handsontable.current) {
        handsontable.current?.updateSettings({ data: res.data?.list });
      }
    });
  };

  const handlePageChange = async (page) => {
    setData(prev => ({ ...prev, currentPage: page }));
  };

  const add = () => {
    const newRow = {
      ...gridUtil.commonAddColumns,
      productNo: '',
      companyId: auth.userInfo.companyId,
      seasonPriceNo: '',
      productName: '',
      headCount: '',
      maxHeadCount: '',
      m2: '',
      isDisplay: '',
      isPet: '',
      isBBQ: '',
      isPickup: '',
      isStone: '',
      memo: '',
      fileNo: '',
      ...gridUtil.auditAddColumns,
    };
    const newList = gridUtil.add({ newRow, list: data.list, grid: handsontable.current });
    setData(prev => ({ ...prev, list: newList }));
  };

  const del = () => {
    gridUtil.del({ selectedRow, grid: handsontable.current });
  };

  const save = async () => {
    const saveList = gridUtil.valid({ list: data.list, required: gridProps.required });
    if (!saveList) return;
    ProductService.setProductList(saveList).then(async () => {
      await getList();
    });
  };

  const handleSearchChange = (key, value) => {
    setSearch(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    handsontable.current = new Handsontable(gridRef.current, {
      data: data.list,
      colHeaders: [
        ...gridUtil.commonColumnNames,
      '상품번호',
      '업체아이디',
      '시즌가격번호',
      '상품명',
      '인원수',
      '최대인원수',
      '평형',
      '전시여부',
      '애완동물여부',
      '바베큐여부',
      '픽업여부',
      '온돌여부',
      '메모',
      '파일번호',
        ...gridUtil.auditColumnNames,
      ],
      hiddenColumns: gridUtil.hiddenColumns([]),
      columns: [
        ...gridUtil.commonColumns,
      {data: 'productNo', type: 'numeric', width: 150, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'seasonPriceNo', type: 'numeric', width: 150,   },
      {data: 'productName', type: 'text', width: 150,  className: 'underline', },
      {data: 'headCount', type: 'numeric', width: 150,   },
      {data: 'maxHeadCount', type: 'numeric', width: 150,   },
      {data: 'm2', type: 'numeric', width: 150,   },
      {data: 'isDisplay', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isDisplay']?.map((o: any) => o.codeValue)) }},
      {data: 'isPet', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isPet']?.map((o: any) => o.codeValue)) }},
      {data: 'isBBQ', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isBBQ']?.map((o: any) => o.codeValue)) }},
      {data: 'isPickup', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isPickup']?.map((o: any) => o.codeValue)) }},
      {data: 'isStone', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isStone']?.map((o: any) => o.codeValue)) }},
      {data: 'memo', type: 'text', width: 150,   },
      {data: 'fileNo', type: 'numeric', width: 150,   },
        ...gridUtil.auditColumns,
      ],
      cells: function (row, col) {
        return gridUtil.cellsEvent({
          row,
          col,
          grid: handsontable.current,
          self: this,
          pk: [],
        });
      },
      afterChange: function (changes, source) {
        return gridUtil.afterChangeEvent({
          changes,
          source,
          gridProps,
          grid: handsontable.current,
          self: this,
        });
      },
      afterSelectionEnd: function (row: number) {
        setSelectedRow(row)
      },
      afterOnCellMouseDown: (event, coords) => {
        const colHeader = handsontable.current?.getColHeader(coords.col); // 칼럼 헤더 확인
        const rowData = handsontable.current?.getSourceDataAtRow(coords.row); // 선택된 행의 데이터
        if (colHeader === '상품명' && rowData) {
          setDetailData(rowData);
          setDetailShow(true);
        }
      },
      ...gridUtil.defaultProps,
    });
    setData(prev => ({ ...prev, grid: handsontable.current }));

  }, [gridRef.current]);

  useEffect(() => {
    if (!handsontable.current) return;
    (async () => {
      await getList();
    })();
  }, [data.currentPage]);

  return (
    <>
      <form
        className="search"
        onSubmit={async (e) => {
          e.preventDefault();
          await getList();
        }}
      >
        <div className="field">
          <table>
            <tbody>
            <tr className={auth.userInfo.companyId === 'kaisa' ? '' : 'hide'}>
              <th scope="row">업체아이디</th>
              <td colSpan={3}><input type="text" value={search.companyId} onChange={e => handleSearchChange('companyId', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">상품명</th>
              <td colSpan={3}><input type="text" value={search.productName} onChange={e => handleSearchChange('productName', e.target.value)} /></td>
            </tr>
            </tbody>
            {data.audit && (
            <tbody className="audit">
              <tr>
                <th>수정기간</th>
                <td colSpan={3}>
                  <SelectGroupDate
                    format="yyyy-MM-dd"
                    date={[search.startUpdateDt, search.endUpdateDt]}
                    onSetStartDate={o => handleSearchChange('startUpdateDt', o.date)}
                    onSetEndDate={o => handleSearchChange('endUpdateDt', o.date)}
                  />
                </td>
              </tr>
              <tr>
                <th>등록일</th>
                <td colSpan={3}>
                  <SelectDate
                    format="yyyy-MM-dd"
                    date={[search.createDt]}
                    onSetStartDate={o => handleSearchChange('createDt', o.date)}
                  />
                </td>
              </tr>
              <tr>
                <th>수정ID</th>
                <td>
                  <input type="text" value={search.updater} onChange={e => handleSearchChange('updater', e.target.value)} />
                </td>
                <th>등록ID</th>
                <td>
                  <input type="text" value={search.creator} onChange={e => handleSearchChange('creator', e.target.value)} />
                </td>
              </tr>
            </tbody>
            )}

          </table>
        </div>
        <div className="buttons">
          <span className="crud">
            <button type="button" className="button add" onClick={add}><span className="icon">&#xe813;</span>추가</button>
            <button type="button" className="button del" onClick={del}><span className="icon">&#xe815;</span>삭제</button>
            <button type="button" className="button save" onClick={save}><span className="icon">&#xe814;</span>저장</button>
            <button type="button" className="button reset" onClick={() => window.location.reload()}><span className="icon">&#x22;</span>초기화</button>
          </span>
          <button type="button" className="audit" onClick={() => setData(prev => ({...prev, audit: !prev.audit}))}>상세조회</button>
          <button type="submit" className="button3"><span className="icon">&#xe096;</span></button>
          <button type="reset" onClick={() => window.location.reload()}><span className="icon">&#x22;</span></button>
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(handsontable.current, '상품')}>
            <span className="icon">&#xf1c3;</span>
          </button>
          <div className="totalCount">총 {data.totalCount}건</div>
        </div>
      </form>
      <div>
        <div id="grid" className="grid-container" ref={gridRef}></div>
      </div>
      {data.list.length === 0 && <div className="no-list">조회 내역이 없습니다.</div>}
      <Pagination currentPage={data.currentPage} lastPage={data.lastPage} onChangePage={handlePageChange} />
      {detailShow && (
       <>
         <Detail component={ProductDetail} detailData={detailData} detailShow={detailShow} setDetailShow={setDetailShow} />
       </>
      )}

    </>
  );
}