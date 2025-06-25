'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import DictionaryService from '@/service/common/dictionary-service';
import dateUtil from '@/utils/date-util';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import Pagination from '@/components/common/pagination';

export default function DictionaryPage() {
  const gridRef = useRef(null);
  const [search, setSearch] = useState({
    abb: '',
    updater: '',
    creator: '',
    startUpdateDt: null,
    endUpdateDt: null,
    createDt: null,
  });
  const [data, setData] = useState({
    grid: null as any,
    list: [],
    audit: false,
    totalCount: 0,
    currentPage: 1,
    lastPage: 1,
  });
  const gridProps = {
    unique: ['abb'],
    required: ['abb', 'korean', 'english'],
  };
  const [selectedRow, setSelectedRow]: any = useState(null);

  const getList = () => {
    DictionaryService.getDictionaryList({ ...search, page: data.currentPage }).then((res) => {
      setData((prev) => ({
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
    setData((prev) => ({ ...prev, currentPage: page }));
    getList();
  };

  const add = () => {
    const newRow = {
      ...gridUtil.commonAddColumns,
      abb: '',
      korean: '',
      english: '',
      memo: '',
      ...gridUtil.auditAddColumns,
    };
    const newList = gridUtil.add({ newRow, list: data.list, grid: data.grid });
    setData((prev) => ({ ...prev, list: newList }));
  };

  const del = () => {
    gridUtil.del({ selectedRow, grid: data.grid });
  };

  const save = () => {
    const saveList = gridUtil.valid({ list: data.list, required: gridProps.required });
    if (!saveList) return;
    DictionaryService.setDictionaryList(saveList).then(() => getList());
  };

  useEffect(() => {
    if (!gridRef.current) return;

    const container = gridRef.current;
    let hot: Handsontable;

    hot = new Handsontable(container!, {
      data: data.list,
      colHeaders: [
        ...gridUtil.commonColumnNames,
        '약어',
        '한국어',
        '영어',
        '설명',
        ...gridUtil.auditColumnNames,
      ],
      hiddenColumns: gridUtil.hiddenColumns([]),
      columns: [
        ...gridUtil.commonColumns,
        { data: 'abb', type: 'text', readOnly: true },
        { data: 'korean', type: 'text', width: 150 },
        { data: 'english', type: 'text', width: 150 },
        { data: 'memo', type: 'text', width: 200 },
        ...gridUtil.auditColumns,
      ],
      cells: function (row, col) {
        // 이 시점에 hot 은 이미 선언되어 있어야 함
        return gridUtil.cellsEvent({ row, col, grid: hot, self: this, pk: [1] });
      },
      afterChange(changes, source) {
        gridUtil.afterChangeEvent({ changes, source, gridProps, grid: hot, self: this });
      },
      afterSelectionEnd(row: number) {
        setSelectedRow(row);
      },
      ...gridUtil.defaultProps,
    });

    setData((prev) => ({ ...prev, grid: hot }));
    getList();
  }, []);


  const handleSearchChange = (key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  };

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
              <col style={{width: '80px'}} />
              <col style={{width: '30%'}} />
              <col style={{width: '80px'}} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>약어</th>
                <td colSpan={3}>
                  <input type="text" value={search.abb} onChange={e => handleSearchChange('abb', e.target.value)} />
                </td>
              </tr>
            </tbody>
            {data.audit && (
              <tbody className="audit">
                <tr>
                  <th>수정기간</th>
                  <td colSpan={3}>
                    <SelectGroupDate format="yyyy-MM-dd" date={[search.startUpdateDt, search.endUpdateDt]} onSetStartDate={o => handleSearchChange('startUpdateDt', o.date)} onSetEndDate={o => handleSearchChange('endUpdateDt', o.date)} />
                  </td>
                </tr>
                <tr>
                  <th>등록일</th>
                  <td colSpan={3}>
                    <SelectDate format="yyyy-MM-dd" date={[search.createDt]} onSetStartDate={o => handleSearchChange('createDt', o.date)} />
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
            <button type="button" className="button add" onClick={add}>
              <span className="icon">&#xe813;</span>추가
            </button>
            <button type="button" className="button del" onClick={del}>
              <span className="icon">&#xe815;</span>삭제
            </button>
            <button type="button" className="button save" onClick={save}>
              <span className="icon">&#xe814;</span>저장
            </button>
            <button type="button" className="button reset" onClick={() => window.location.reload()}>
              <span className="icon">&#x22;</span>초기화
            </button>
          </span>
          <button type="button" className="audit" onClick={() => setData(prev => ({...prev, audit: !prev.audit}))}>
            상세조회
          </button>
          <button type="submit" className="button3">
            <span className="icon">&#xe096;</span>
          </button>
          <button type="reset" onClick={() => window.location.reload()}>
            <span className="icon">&#x22;</span>
          </button>
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(data.grid, '코드')}>
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
