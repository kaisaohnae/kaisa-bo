'use client';

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import gridUtil from '@/utils/grid-util';
import excelUtil from '@/utils/excel-util';
import UserService from '@/service/at/user-service';
import SelectDate from '@/components/common/select-date';
import SelectGroupDate from '@/components/common/select-group-date';
import Pagination from '@/components/common/pagination';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import Detail from '@/components/common/detail';
import UserDetail from './user-detail';


import CommonCodeRadio from '@/components/common/common-code-radio';

export default function UserPage() {
  const gridRef = useRef(null);
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
    await getList();
  };

  const add = () => {
    const newRow = {
      ...gridUtil.commonAddColumns,
    userId: '',
    companyId: '',
    userName: '',
    phoneNo: '',
    passwordUpdateDt: '',
    memo: '',
    loginDt: '',
    userStateCode: '',
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
    const container = gridRef.current;
    handsontable.current = new Handsontable(container, {
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
      {data: 'userId', type: 'text', width: 150, readOnly: true,  },
      {data: 'companyId', type: 'text', width: 100, readOnly: true,  },
      {data: 'userName', type: 'text', width: 150,  className: 'underline', },
      {data: 'phoneNo', type: 'text', width: 150,   },
      {data: 'passwordUpdateDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'memo', type: 'text', width: 150,   },
      {data: 'loginDt', type: 'date', width: 170,   ...gridUtil.dateTimePickerConfig },
      {data: 'userStateCode', type: 'dropdown', width: 150,   source: function (query, process) { process(setting.codeList['userStateCode']?.map((o: any) => o.codeValue)) }},
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
        if (colHeader === '사용자이름' && rowData) {
          setDetailData(rowData);
          setDetailShow(true);
        }
      },
      ...gridUtil.defaultProps,
    });
    setData(prev => ({ ...prev, grid: handsontable.current }));

  }, []);

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, [data.grid]);

  return (
    <>
      <form
        className="search"
        onSubmit={async (e) => {
          e.preventDefault();
          await getList();
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
              <th scope="row">사용자아이디</th>
              <td colSpan={3}><input type="text" value={search.userId} onChange={e => handleSearchChange('userId', e.target.value)} /></td>
            </tr>
            <tr className={auth.userInfo.companyId === 'kaisa' ? '' : 'hide'}>
              <th scope="row">업체아이디</th>
              <td colSpan={3}><input type="text" value={search.companyId} onChange={e => handleSearchChange('companyId', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">사용자이름</th>
              <td colSpan={3}><input type="text" value={search.userName} onChange={e => handleSearchChange('userName', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td colSpan={3}><input type="text" value={search.phoneNo} onChange={e => handleSearchChange('phoneNo', e.target.value)} /></td>
            </tr>
            <tr>
              <th scope="row">사용자상태코드</th>
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
         <Detail component={UserDetail} detailData={detailData} detailShow={detailShow} setDetailShow={setDetailShow} />
       </>
      )}

    </>
  );
}