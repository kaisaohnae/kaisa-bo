'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import HolidayPriceService from '@/service/od/holiday-price-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';


import CommonCodeRadio from '@/components/common/common-code-radio';

export default function HolidayPricePage() {
  const gridRef = useRef(null);
  const auth = useAuthStore();
  const setting = useSettingStore();



  const [search, setSearch] = useState({
    holiday: '',
    companyId: '',
    holidayName: '',
    holidayCode: '',
    updater: '',
    creator: '',
    startUpdateDt: '',
    endUpdateDt: '',
    createDt: '',
  });

  const [data, setData]: any = useState({
    required: [
      'holiday',
      'companyId',
      'price',
      'holidayCode',
    ],
    grid: null,
    list: [],
    audit: false,
    totalCount: 0,
    currentPage: 1,
    lastPage: 1,
  });

  const gridProps = {
    unique: ['holiday'],
    required: [
      'holiday',
      'companyId',
      'price',
      'holidayCode',
    ],
  };

  const [selectedRow, setSelectedRow]: any = useState(null);

  const getList = () => {
    HolidayPriceService.getHolidayPriceList({ ...search, page: data.currentPage }).then(res => {
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
    holiday: '',
    companyId: '',
    holidayName: '',
    price: '',
    holidayCode: '',
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
    HolidayPriceService.setHolidayPriceList(saveList).then(() => getList());
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
      '휴일',
      '업체아이디',
      '휴일명',
      '가격',
      '휴일코드',
        ...gridUtil.auditColumnNames,
      ],
      hiddenColumns: gridUtil.hiddenColumns([]),
      columns: [
        ...gridUtil.commonColumns,
      {data: 'holiday', type: 'date', width: 170, readOnly: true,  ...gridUtil.datePickerConfig },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'holidayName', type: 'text', width: 150,   },
      {data: 'price', type: 'numeric', width: 150,   },
      {data: 'holidayCode', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['holidayCode']?.map((o: any) => o.codeValue)) }},
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
              <th scope="row">휴일</th>
              <td colSpan={3}>
                <ReactDatePicker locale={ko} selected={startDate} onChange={date => setStartDate(date)} dateFormat={format === 'yyyy-MM-dd' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'} placeholderText={placeholder} showTimeSelect={format !== 'yyyy-MM-dd'} timeIntervals={30} timeCaption="시간" disabled={allChecked} className="input" />
              </td>
            </tr>
            <tr v-show="auth.userInfo.companyId === 'kaisa'">
              <th scope="row">업체아이디</th>
              <td colSpan={3}><input type="text" value={search.companyId} onChange={e => handleSearchChange('companyId', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">휴일명</th>
              <td colSpan={3}><input type="text" value={search.holidayName} onChange={e => handleSearchChange('holidayName', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">휴일코드</th>
              <td colSpan={3}><CommonCodeRadio cd="userStateCode" model={search.userStateCode} onSetData={(val) => { setSearch((prev: any) => ({ ...prev, userStateCode: val })); }} /></td>
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
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(data.grid, '휴일가격')}>
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