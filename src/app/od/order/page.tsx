'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import OrderService from '@/service/od/order-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';


import CommonCodeRadio from '@/components/common/common-code-radio';

export default function OrderPage() {
  const gridRef = useRef(null);
  const auth = useAuthStore();
  const setting = useSettingStore();



  const [search, setSearch] = useState({
    orderNo: '',
    companyId: '',
    reserveDay: '',
    orderStateCode: '',
    phoneNo: '',
    orderName: '',
    email: '',
    updater: '',
    creator: '',
    startUpdateDt: '',
    endUpdateDt: '',
    createDt: '',
  });

  const [data, setData]: any = useState({
    required: [
      'companyId',
      'productNo',
      'reserveDay',
      'orderStateCode',
      'phoneNo',
      'orderName',
      'price',
      'addPrice',
      'salePrice',
      'headCount',
      'isHotWater',
      'isPickup',
      'isBBQ',
      'isPet',
    ],
    grid: null,
    list: [],
    audit: false,
    totalCount: 0,
    currentPage: 1,
    lastPage: 1,
  });

  const gridProps = {
    unique: ['orderNo'],
    required: [
      'companyId',
      'productNo',
      'reserveDay',
      'orderStateCode',
      'phoneNo',
      'orderName',
      'price',
      'addPrice',
      'salePrice',
      'headCount',
      'isHotWater',
      'isPickup',
      'isBBQ',
      'isPet',
    ],
  };

  const [selectedRow, setSelectedRow]: any = useState(null);

  const getList = () => {
    OrderService.getOrderList({ ...search, page: data.currentPage }).then(res => {
      setData(prev => ({
        ...prev,
        list: res.data?.list || [],
        totalCount: res.data?.totalCount || 0,
        currentPage: res.data?.currentPage || 1,
        lastPage: res.data?.lastPage || 1,
      }));
      if (data.grid) {
        data.grid?.updateSettings({ data: res.data?.list });
      }
    });
  };

  const handlePageChange = (page) => {
    setData(prev => ({ ...prev, currentPage: page }));
    getList();
  };

  const add = () => {
    const newRow = {
      ...gridUtil.commonAddColumns,
    orderNo: '',
    companyId: '',
    productNo: '',
    reserveDay: '',
    orderStateCode: '',
    reserveCode: '',
    phoneNo: '',
    orderName: '',
    email: '',
    price: '',
    addPrice: '',
    salePrice: '',
    headCount: '',
    isHotWater: '',
    isPickup: '',
    isBBQ: '',
    isPet: '',
    memo: '',
      ...gridUtil.auditAddColumns,
    };
    const newList = gridUtil.add({ newRow, list: data.list, grid: data.grid });
    setData(prev => ({ ...prev, list: newList }));
  };

  const del = () => {
    gridUtil.del({ selectedRow, grid: data.grid });
  };

  const save = () => {
    const saveList = gridUtil.valid({ list: data.list, required: gridProps.required });
    if (!saveList) return;
    OrderService.setOrderList(saveList).then(() => getList());
  };

  const handleSearchChange = (key, value) => {
    setSearch(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!gridRef.current) return;
    const container = gridRef.current;
    let hot: Handsontable;
    hot = new Handsontable(container, {
      data: data.list,
      colHeaders: [
        ...gridUtil.commonColumnNames,
      '주문번호',
      '업체아이디',
      '상품번호',
      '예약일',
      '주문상태코드',
      '예약코드',
      '전화번호',
      '이름',
      '이메일',
      '가격',
      '추가요금',
      '할인요금',
      '인원수',
      '온수여부',
      '픽업여부',
      '바베큐여부',
      '애완동물여부',
      '메모',
        ...gridUtil.auditColumnNames,
      ],
      hiddenColumns: gridUtil.hiddenColumns([]),
      columns: [
        ...gridUtil.commonColumns,
      {data: 'orderNo', type: 'numeric', width: 150, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'productNo', type: 'numeric', width: 150,   },
      {data: 'reserveDay', type: 'date', width: 170,   ...gridUtil.datePickerConfig },
      {data: 'orderStateCode', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['orderStateCode']?.map((o: any) => o.codeValue)) }},
      {data: 'reserveCode', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['reserveCode']?.map((o: any) => o.codeValue)) }},
      {data: 'phoneNo', type: 'text', width: 150,   },
      {data: 'orderName', type: 'text', width: 150,   },
      {data: 'email', type: 'text', width: 150,   },
      {data: 'price', type: 'numeric', width: 150,   },
      {data: 'addPrice', type: 'numeric', width: 150,   },
      {data: 'salePrice', type: 'numeric', width: 150,   },
      {data: 'headCount', type: 'numeric', width: 150,   },
      {data: 'isHotWater', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isHotWater']?.map((o: any) => o.codeValue)) }},
      {data: 'isPickup', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isPickup']?.map((o: any) => o.codeValue)) }},
      {data: 'isBBQ', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isBBQ']?.map((o: any) => o.codeValue)) }},
      {data: 'isPet', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['isPet']?.map((o: any) => o.codeValue)) }},
      {data: 'memo', type: 'text', width: 150,   },
        ...gridUtil.auditColumns,
      ],
      cells: function (row, col) {
        return gridUtil.cellsEvent({
          row,
          col,
          grid: hot,
          self: this,
          pk: [],
        });
      },
      afterChange: function (changes, source) {
        return gridUtil.afterChangeEvent({
          changes,
          source,
          gridProps,
          grid: hot,
          self: this,
        });
      },
      afterSelectionEnd: function (row: number) {
        setSelectedRow(row)
      },
      ...gridUtil.defaultProps,
    });
    setData(prev => ({ ...prev, grid: hot }));
    getList();
  }, []);

  return (
    <>
      <form
        className="search"
        onSubmit={e => {
          e.preventDefault();
          getList();
        }}
      >
        <fieldset>
          <legend>검색</legend>
          <table>
            <colgroup>
              <col style={{ width: '80px' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '80px' }} />
              <col />
            </colgroup>
            <tbody>
            <tr>
              <th scope="row">주문번호</th>
              <td colSpan={3}><input type="text" value={search.orderNo} onChange={e => handleSearchChange('orderNo', e.target.value)} /></td>
            </tr>
            <tr className={auth.userInfo.companyId === 'kaisa' ? 'show' : 'hide'}>
              <th scope="row">업체아이디</th>
              <td colSpan={3}><input type="text" value={search.companyId} onChange={e => handleSearchChange('companyId', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">예약일</th>
              <td colSpan={3}>
                <ReactDatePicker locale={ko} selected={startDate} onChange={date => setStartDate(date)} dateFormat={format === 'yyyy-MM-dd' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'} placeholderText={placeholder} showTimeSelect={format !== 'yyyy-MM-dd'} timeIntervals={30} timeCaption="시간" disabled={allChecked} className="input" />
              </td>
            </tr>
            <tr>
              <th scope="row">주문상태코드</th>
              <td colSpan={3}><CommonCodeRadio cd="userStateCode" model={search.userStateCode} onSetData={(val) => { setSearch((prev: any) => ({ ...prev, userStateCode: val })); }} /></td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td colSpan={3}><input type="text" value={search.phoneNo} onChange={e => handleSearchChange('phoneNo', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td colSpan={3}><input type="text" value={search.orderName} onChange={e => handleSearchChange('orderName', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">이메일</th>
              <td colSpan={3}><input type="text" value={search.email} onChange={e => handleSearchChange('email', e.target.value)} /></td>
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
        </fieldset>
        <div className="btnWrap">
          <span className="crud">
            <button type="button" className="button add" onClick={add}><span className="icon">&#xe813;</span>추가</button>
            <button type="button" className="button del" onClick={del}><span className="icon">&#xe815;</span>삭제</button>
            <button type="button" className="button save" onClick={save}><span className="icon">&#xe814;</span>저장</button>
            <button type="button" className="button reset" onClick={() => window.location.reload()}><span className="icon">&#x22;</span>초기화</button>
          </span>
          {data.audit && (
      <button type="button" className="audit" onClick={() => setData(prev => ({...prev, audit: !prev.audit}))}>상세조회</button>
          )}

          <button type="submit" className="button3"><span className="icon">&#xe096;</span></button>
          <button type="reset" onClick={() => window.location.reload()}><span className="icon">&#x22;</span></button>
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(data.grid, '주문')}>
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


    </>
  );
}