'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import UserService from '@/service/at/user-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import CrudButtons from '@/components/common/crud-buttons';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import Detail from '@/components/common/detail';
import UserDetail from './user-detail';


import CommonCodeRadio from '@/components/common/common-code-radio';

export default function UserPage() {
  const gridRef: any = useRef(null);
  const auth = useAuthStore();
  const setting = useSettingStore();
  const mounted = useRef<boolean>(false);
  const handsontable = useRef<Handsontable>(null);

  const [detailData, setDetailData]:any = useState({});
  const [detailShow, setDetailShow]:any = useState(false);


  const [search, setSearch] = useState({
    userId: '',
    companyId: '',
    userName: '',
    phoneNo: '',
    userStateCode: '',
    updater: '',
    creator: '',
    startUpdateDt: '',
    endUpdateDt: '',
    createDt: '',
  });

  const [data, setData]: any = useState({
    required: [
      'userId',
      'companyId',
      'userName',
      'phoneNo',
      'passwordUpdateDt',
      'loginDt',
      'userStateCode',
    ],
    grid: null,
    list: [],
    audit: false,
    totalCount: 0,
    currentPage: 1,
    lastPage: 1,
  });

  const gridProps = {
    unique: ['companyId'],
    required: [
      'userId',
      'companyId',
      'userName',
      'phoneNo',
      'passwordUpdateDt',
      'loginDt',
      'userStateCode',
    ],
  };

  const [selectedRow, setSelectedRow]: any = useState(null);

  const getList = async () => {
    UserService.getUserList({ ...search, page: data.currentPage }).then(res => {
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
      userId: '',
      companyId: auth.userInfo.companyId,
      userName: '',
      phoneNo: '',
      pwd: 'dlatl123!',
      passwordUpdateDt: '',
      memo: '',
      loginDt: '',
      userStateCode: '',
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
    UserService.setUserList(saveList).then(async () => {
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
      '사용자아이디',
      '업체아이디',
      '사용자이름',
      '전화번호',
      '비밀번호수정일시',
      '메모',
      '로그인일시',
      '사용자상태코드',
        ...gridUtil.auditColumnNames,
      ],
      hiddenColumns: gridUtil.hiddenColumns([]),
      columns: [
        ...gridUtil.commonColumns,
      {data: 'userId', type: 'text', width: 100, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 80, readOnly: true,  },
      {data: 'userName', type: 'text', width: 80,  className: 'underline', },
      {data: 'phoneNo', type: 'text', width: 120,   },
      {data: 'passwordUpdateDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'memo', type: 'text', width: 150,   },
      {data: 'loginDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'userStateCode', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['userStateCode']?.map((o: any) => o.codeValue)) }},
        ...gridUtil.auditColumns,
      ],
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
              <td colSpan={5}><input type="text" value={search.companyId} onChange={e => handleSearchChange('companyId', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">사용자아이디</th>
              <td><input type="text" value={search.userId} onChange={e => handleSearchChange('userId', e.target.value)} /></td>
              <th scope="row">사용자이름</th>
              <td><input type="text" value={search.userName} onChange={e => handleSearchChange('userName', e.target.value)} /></td>
              <th scope="row">전화번호</th>
              <td><input type="text" value={search.phoneNo} onChange={e => handleSearchChange('phoneNo', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">사용자상태코드</th>
              <td colSpan={5}><CommonCodeRadio cd="userStateCode" model={search.userStateCode} onSetData={(val) => { setSearch((prev: any) => ({ ...prev, userStateCode: val })); }} /></td>
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
          <CrudButtons menuId="at-user" add={add} del={del} save={save} />
          <button type="button" className="audit" onClick={() => setData(prev => ({...prev, audit: !prev.audit}))}>상세조회</button>
          <button type="submit" className="button3"><span className="icon">&#xe096;</span></button>
          <button type="reset" onClick={() => window.location.reload()}><span className="icon">&#x22;</span></button>
          <button type="button" className="button excel" onClick={() => excelUtil.excelExport(handsontable.current, '사용자')}>
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
         <Detail component={UserDetail} detailData={detailData} detailShow={detailShow} setDetailShow={setDetailShow} getList={getList} />
       </>
      )}

    </>
  );
}