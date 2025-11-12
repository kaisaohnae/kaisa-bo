'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import OrderService from '@/service/od/order-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import CrudButtons from '@/components/common/crud-buttons';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';


import CommonCodeRadio from '@/components/common/common-code-radio';

export default function OrderPage() {
  const gridRef: any = useRef(null);
  const auth = useAuthStore();
  const setting = useSettingStore();
  const mounted = useRef<boolean>(false);
  const handsontable = useRef<Handsontable>(null);

  const now = new Date();
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const [search, setSearch] = useState({
    orderNo: '',
    companyId: '',
    reserveDay: '',
    reserveMonth: defaultMonth,
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

  const getList = async () => {
    OrderService.getOrderList({ ...search, page: data.currentPage }).then(res => {
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
      orderNo: '',
      companyId: auth.userInfo.companyId,
      //productNo: '',
      productName: '',
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
      isNew: true,
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
    OrderService.setOrderList(saveList).then(async () => {
      await getList();
    });
  };

  const handleSearchChange = (key, value) => {
    setSearch(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!gridRef.current) return; // ref 확인 (for 배포시 초기 조회)
    if (mounted.current) return;
    mounted.current = true;
 
    handsontable.current = new Handsontable(gridRef.current, {
      data: data.list,
      colHeaders: [
        ...gridUtil.commonColumnNames,
      '주문번호',
      '업체아이디',
      //'상품번호',
      '상품명',
      '예약일',
      '주문상태코드',
      '예약코드',
      '전화번호',
      '이름',
      '메모',
      '이메일',
      '가격',
      '추가요금',
      '할인요금',
      '인원수',
      '온수여부',
      '픽업여부',
      '바베큐여부',
      '애완동물여부',
        ...gridUtil.auditColumnNames,
      ],
      hiddenColumns: gridUtil.hiddenColumns([]),
      columns: [
        ...gridUtil.commonColumns,
      {data: 'orderNo', type: 'numeric', width: 80, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 90, readOnly: true,  },
      //{data: 'productNo', type: 'numeric', width: 100,   },
      {data: 'productName', type: 'text', width: 100, readOnly: true,  },
      {data: 'reserveDay', type: 'date', width: 120,   ...gridUtil.datePickerConfig },
      {data: 'orderStateCode', type: 'dropdown', width: 100,   source: function (query, process) { process(setting.codeList['orderStateCode']?.map((o: any) => o.codeValue)) }},
      {data: 'reserveCode', type: 'dropdown', width: 100,   source: function (query, process) { process(setting.codeList['reserveCode']?.map((o: any) => o.codeValue)) }},
      {data: 'phoneNo', type: 'text', width: 110,   },
      {data: 'orderName', type: 'text', width: 100,   },
      {data: 'memo', type: 'text', width: 200,   },
      {data: 'email', type: 'text', width: 150,   },
      {data: 'price', type: 'numeric', width: 100,   },
      {data: 'addPrice', type: 'numeric', width: 100,   },
      {data: 'salePrice', type: 'numeric', width: 100,   },
      {data: 'headCount', type: 'numeric', width: 90,   },
      {data: 'isHotWater', type: 'dropdown', width: 90,   source: function (query, process) { process(setting.codeList['isHotWater']?.map((o: any) => o.codeValue)) }},
      {data: 'isPickup', type: 'dropdown', width: 90,   source: function (query, process) { process(setting.codeList['isPickup']?.map((o: any) => o.codeValue)) }},
      {data: 'isBBQ', type: 'dropdown', width: 90,   source: function (query, process) { process(setting.codeList['isBBQ']?.map((o: any) => o.codeValue)) }},
      {data: 'isPet', type: 'dropdown', width: 90,   source: function (query, process) { process(setting.codeList['isPet']?.map((o: any) => o.codeValue)) }},
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
      ...gridUtil.defaultProps,
    });
    setData(prev => ({ ...prev, grid: handsontable.current }));

  }, []);

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
            <tr>
              <th scope="row">예약일</th>
              <td>
                <ReactDatePicker
                  locale={ko}
                  selected={search.reserveDay ? new Date(search.reserveDay) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      handleSearchChange('reserveDay', `${year}-${month}-${day}`); // "YYYY-MM-DD"
                    } else {
                      handleSearchChange('reserveDay', '');
                    }
                  }}
                  dateFormat="yyyy-MM-dd"
                  showTimeSelect={false}
                  timeIntervals={30}
                  timeCaption="시간"
                  placeholderText="예약일 선택"
                />
              </td>
              <th scope="row">예약월</th>
              <td>
                <ReactDatePicker
                  locale={ko}
                  selected={search.reserveMonth ? new Date(search.reserveMonth) : null}
                  /*selected={
                    search.reserveMonth
                      ? new Date(search.reserveMonth + '-01')
                      : new Date()
                  }*/
                  onChange={(date: Date | null) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      handleSearchChange('reserveMonth', `${year}-${month}`); // "YYYY-MM" 형식으로 전송
                    } else {
                      handleSearchChange('reserveMonth', '');
                    }
                  }}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                  placeholderText="예약월 선택"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">주문상태코드</th>
              <td colSpan={5}><CommonCodeRadio cd="orderStateCode" model={search.orderStateCode} onSetData={(val) => { setSearch((prev: any) => ({ ...prev, orderStateCode: val })); }} /></td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td><input type="text" value={search.phoneNo} onChange={e => handleSearchChange('phoneNo', e.target.value)} /></td>
              <th scope="row">이름</th>
              <td><input type="text" value={search.orderName} onChange={e => handleSearchChange('orderName', e.target.value)} /></td>
              <th scope="row">이메일</th>
              <td><input type="text" value={search.email} onChange={e => handleSearchChange('email', e.target.value)} /></td>
            </tr>
            <tr className={auth.userInfo.companyId === 'kaisa' ? '' : 'hide'}>
              <th scope="row">업체아이디</th>
              <td colSpan={5}><input type="text" value={search.companyId} onChange={e => handleSearchChange('companyId', e.target.value)} /></td>
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
          <CrudButtons menuId="od-order" add={add} del={del} save={save} />
          <button type="button" className="audit" onClick={() => setData(prev => ({...prev, audit: !prev.audit}))}>상세조회</button>
          <button type="submit" className="button3"><span className="icon">&#xe096;</span></button>
          <button type="reset" onClick={() => window.location.reload()}><span className="icon">&#x22;</span></button>
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(handsontable.current, '주문')}>
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