'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import HolidayPriceService from '@/service/od/holiday-price-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import CrudButtons from '@/components/common/crud-buttons';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';


import CommonCodeRadio from '@/components/common/common-code-radio';

export default function HolidayPricePage() {
  const gridRef: any = useRef(null);
  const auth = useAuthStore();
  const setting = useSettingStore();
  const mounted = useRef<boolean>(false);
  const handsontable = useRef<Handsontable>(null);

  const now = new Date();
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const [search, setSearch] = useState({
    holiday: '',
    year: currentYear,
    month: '',
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

  const getList = async () => {
    HolidayPriceService.getHolidayPriceList({ ...search, page: data.currentPage }).then(res => {
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
      holiday: '',
      companyId: auth.userInfo.companyId,
      holidayName: '',
      price: '',
      holidayCode: '',
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
    HolidayPriceService.setHolidayPriceList(saveList).then(async () => {
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
      {data: 'holiday', type: 'date', width: 110, readOnly: true,  ...gridUtil.datePickerConfig },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'holidayName', type: 'text', width: 120,   },
      {data: 'price', type: 'numeric', width: 100,   },
      {data: 'holidayCode', type: 'dropdown', width: 100,   source: function (query, process) { process(setting.codeList['holidayCode']?.map((o: any) => o.codeValue)) }},
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
            <tr className={auth.userInfo.companyId === 'kaisa' ? '' : 'hide'}>
              <th scope="row">업체아이디</th>
              <td colSpan={6}><input type="text" value={search.companyId} onChange={e => handleSearchChange('companyId', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">휴일 <span>(개월단위)</span></th>
              <td>
                {/*
                <ReactDatePicker locale={ko} selected={search.holiday ? new Date(search.holiday) : null} onChange={(date: Date | null) => handleSearchChange('holiday', date)} dateFormat={'yyyy-MM-dd'} placeholderText={''} showTimeSelect={false} timeIntervals={30} timeCaption="시간" disabled={false} />
                UTC → KST 보정
                */}
                <ReactDatePicker
                  locale={ko}
                  selected={search.year ? new Date(Number(search.year), 0, 1) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const year = date.getFullYear();
                      setSearch((prev: any) => ({
                        ...prev,
                        year: year.toString(),
                        month: '', // 연도 변경 시 월 초기화
                      }));
                    } else {
                      setSearch((prev: any) => ({ ...prev, year: '', month: '' }));
                    }
                  }}
                  dateFormat="yyyy"
                  showYearPicker
                  placeholderText="연도 선택"
                  minDate={new Date(lastYear, 0, 1)} // 과거는 작년까지만
                  maxDate={new Date(2100, 11, 31)}  // 미래는 원하는 만큼
                />
              </td>
              <td>
                {/* 월 선택 */}
                <ReactDatePicker
                  locale={ko}
                  selected={
                    search.year && search.month
                      ? new Date(Number(search.year), Number(search.month) - 1, 1)
                      : null
                  }
                  onChange={(date: Date | null) => {
                    if (!search.year) return; // 연도 없으면 월 선택 불가
                    if (date) {
                      const month = date.getMonth() + 1;
                      setSearch(prev => ({
                        ...prev,
                        month: month.toString().padStart(2, '0'),
                      }));
                    } else {
                      setSearch(prev => ({ ...prev, month: '' }));
                    }
                  }}
                  dateFormat="MM"
                  showMonthYearPicker
                  placeholderText="월 선택"
                  disabled={!search.year} // 연도 선택 전에는 비활성화
                />

              </td>
              <th scope="row">휴일명</th>
              <td><input type="text" value={search.holidayName} onChange={e => handleSearchChange('holidayName', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">휴일코드</th>
              <td colSpan={6}><CommonCodeRadio cd="holidayCode" model={search.holidayCode} onSetData={(val) => { setSearch((prev: any) => ({ ...prev, userStateCode: val })); }} /></td>
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
          <CrudButtons menuId="od-holiday-price" add={add} del={del} save={save} />
          <button type="button" className="audit" onClick={() => setData(prev => ({...prev, audit: !prev.audit}))}>상세조회</button>
          <button type="submit" className="button3"><span className="icon">&#xe096;</span></button>
          <button type="reset" onClick={() => window.location.reload()}><span className="icon">&#x22;</span></button>
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(handsontable.current, '휴일가격')}>
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