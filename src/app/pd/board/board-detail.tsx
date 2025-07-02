'use client';

import React, { useEffect, useState, useRef } from 'react';
import BoardService from '@/service/pd/board-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';
import useAlertStore from '@/store/use-alert-store';

export default function BoardDetail({ detailData, detailShow, setDetailShow }) {
  const editor: any = useRef({});
  const {showAlert, hideAlert} = useAlertStore();
  const [formData, setFormData]: any = useState({
    boardNo: '',
    boardCategoryId: '',
    companyId: '',
    title: '',
    content: '',
    isDisplay: '',
    tag: '',
    creator: '',
    createDt: '',
    updater: '',
    updateDt: '',

  });

  const drawDetail = () => {
    editor.current = gridUtil.createEditor({name: '#BoardEditor', cnts: formData.content });
  };

  const getDetail = async () => {
    if (detailData.boardNo) {
      BoardService.getBoard({ boardNo: detailData.boardNo }).then(
        (res) => {
          setFormData(res.data);
        },
        (err) => {
          console.error(err);
        },
      );
    }
  };

  const save = async () => {
    if (detailData.boardNo) {
      BoardService.setBoard({
        boardNo: formData.boardNo,
        boardCategoryId: formData.boardCategoryId,
        companyId: formData.companyId,
        title: formData.title,
        content: editor.current?.getMarkdown?.() || '',
        isDisplay: formData.isDisplay,
        tag: formData.tag,
      }).then(
        (res) => {
          console.log('save: ', res.data);
          showAlert({
            message: '저장되었습니다.',
            buttons: [{
              type: 'on',
              text: '확인',
              callback: () => {
                hideAlert();
                setDetailShow(false);
              }
            }]
          })
        },
        (err) => {
          console.error(err);
        },
      );
    }
  };

  const cancel = () => {
    setDetailShow(false);
  }

  useEffect(() => {
    (async () => {
      await getDetail();
    })();
  }, []);

  useEffect(() => {
    if (formData.boardNo) {
      drawDetail();
    }
  }, [formData]);

  return (
    <div className="detail-content">
      <h2>게시판 상세</h2>
      <div className="detail-scroll">
        <table className="detail-table">
          <caption>게시판 상세</caption>
          <tbody>
          <tr>
            <th scope="col">게시판번호</th>
            <td>
              {formData.boardNo}
            </td>
          </tr>
            <tr>
              <th scope="col">게시판카테고리아이디</th>
              <td>
                <input type="number" value={formData.boardCategoryId || ''} onChange={(e) => setFormData(prev => ({ ...prev, boardCategoryId: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">업체아이디</th>
              <td>
                <input type="text" value={formData.companyId || ''} onChange={(e) => setFormData(prev => ({ ...prev, companyId: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">제목</th>
              <td>
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}  />
              </td>
            </tr>
          <tr>
            <th scope="col" colSpan={2}>내용</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <div id="BoardEditor" />
            </td>
          </tr>
            <tr>
              <th scope="col">전시여부</th>
              <td>
                <CommonCode cd="isDisplay" model={formData.isDisplay} onSetData={(val) => setFormData(prev => ({ ...prev, isDisplay: val }))} />
              </td>
            </tr>
            <tr>
              <th scope="col">태그</th>
              <td>
                <input type="text" value={formData.tag || ''} onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))} required />
              </td>
            </tr>
          <tr>
            <th scope="col">등록자</th>
            <td>
              {formData.creator}
            </td>
          </tr>
          <tr>
            <th scope="col">등록일시</th>
            <td>
              {formData.createDt}
            </td>
          </tr>
          <tr>
            <th scope="col">수정자</th>
            <td>
              {formData.updater}
            </td>
          </tr>
          <tr>
            <th scope="col">수정일시</th>
            <td>
              {formData.updateDt}
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      <div className="detail-bottom">
        <button type="button" onClick={save}>저장</button>
        <button type="button" onClick={cancel}>취소</button>
      </div>
    </div>
  );
}