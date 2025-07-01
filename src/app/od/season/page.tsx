'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import SeasonService from '@/service/od/season-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';



export default function SeasonPage() {
  const gridRef = useRef(null);
  const auth = useAuthStore();



  const [search, setSearch] = useState({
    companyId: '',
    seasonName: '',
  updater: '',
  creator: '',
  startUpdateDt: '',
  endUpdateDt: '',
  createDt: '',
  });

  const [data, setData]: any = useState({
    required: [
      'seasonPriceNo',
      'companyId',
      'sortOrder',
      'seasonName',
      'seasonStartDay',
      'seasonEndDay',
      'price',
      'friPrice',
      'satPrice',
      'sunPrice',
    ],
    grid: null,
    list: [],
    audit: false,
    totalCount: 0,
    currentPage: 1,
    lastPage: 1,
  });

  const gridProps = {
    unique: ['seasonNo'],
    required: [
      'seasonPriceNo',
      'companyId',
      'sortOrder',
      'seasonName',
      'seasonStartDay',
      'seasonEndDay',
      'price',
      'friPrice',
      'satPrice',
      'sunPrice',
    ],
  };

  const [selectedRow, setSelectedRow]: any = useState(null);

  const getList = () => {
    SeasonService.getSeasonList({ ...search, page: data.currentPage }).then(res => {
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
    seasonNo: '',
    seasonPriceNo: '',
    companyId: '',
    sortOrder: '',
    seasonName: '',
    seasonStartDay: '',
    seasonEndDay: '',
    price: '',
    friPrice: '',
    satPrice: '',
    sunPrice: '',
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
    SeasonService.setSeasonList(saveList).then(() => getList());
  };

  const handleSearchChange = (key, value) => {
    setSearch(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!gridRef.current) return;
    const container = gridRef.current;
    const hot = new Handsontable(container, {
      data: data.list,
      colHeaders: [
        ...gridUtil.commonColumnNames,
      '시즌번호',
      '시즌가격번호',
      '업체아이디',
      '정렬순서',
      '시즌명',
      '시즌시작일시',
      '시즌종료일시',
      '가격',
      '금요일가격',
      '토요일가격',
      '일요일가격',
        ...gridUtil.auditColumnNames,
      ],
      hiddenColumns: gridUtil.hiddenColumns([]),
      columns: [
        ...gridUtil.commonColumns,
      {data: 'seasonNo', type: 'numeric', width: 150, readOnly: true,  },
      {data: 'seasonPriceNo', type: 'numeric', width: 150,   },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'sortOrder', type: 'numeric', width: 150,   },
      {data: 'seasonName', type: 'text', width: 150,   },
      {data: 'seasonStartDay', type: 'text', width: 170,   ...gridUtil.datePickerConfig },
      {data: 'seasonEndDay', type: 'text', width: 170,   ...gridUtil.datePickerConfig },
      {data: 'price', type: 'numeric', width: 150,   },
      {data: 'friPrice', type: 'numeric', width: 150,   },
      {data: 'satPrice', type: 'numeric', width: 150,   },
      {data: 'sunPrice', type: 'numeric', width: 150,   },
        ...gridUtil.auditColumns,
      ],
      // @ts-ignore
      cells: (row, col) => gridUtil.cellsEvent({ row, col, grid: hot, self: this, pk: [] }),
      afterChange: (changes, source) => {
        // @ts-ignore
        gridUtil.afterChangeEvent({ changes, source, gridProps, grid: hot, self: this })
      },
      afterSelectionEnd: (row: number) => setSelectedRow(row),
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
            <tr v-show="auth.userInfo.companyId === 'kaisa'">
              <th scope="row">업체아이디</th>
              <td colSpan={3}><input type="text" value={search.companyId} onChange={e => handleSearchChange('search.companyId', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">시즌명</th>
              <td colSpan={3}><input type="text" value={search.seasonName} onChange={e => handleSearchChange('search.seasonName', e.target.value)} /></td>
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
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(data.grid, '시즌')}>
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