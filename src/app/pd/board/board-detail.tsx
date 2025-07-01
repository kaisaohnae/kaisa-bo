import React, { useEffect, useState } from 'react';
import BoardService from '@/service/pd/board-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';

export default function BoardDetail({ detailData, onChange }) {
  const [edit, setEdit] = useState({ editor: {}, editorOption: {} });
  const [formData, setFormData]: any = useState({});

  const drawDetail = () => {
  edit.editor = gridUtil.createEditor({name: '#BoardEditor', cnts: formData }); // formData.contents
  };

  const getDetail = () => {
    if (detailData.boardNo) {
      BoardService.getBoard({ boardNo: detailData.boardNo }).then(
        (res) => {
          setFormData(res.data);
          drawDetail();
        },
        (err) => {
          console.error(err);
        },
      );
    } else {
      drawDetail();
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

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
                <input type="number" value={formData.boardCategoryId} onChange={(e) => setFormData(prev => ({ ...prev, boardCategoryId: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">업체아이디</th>
              <td>
                <input type="text" value={formData.companyId} onChange={(e) => setFormData(prev => ({ ...prev, companyId: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">제목</th>
              <td>
                <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}  />
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
                <input type="text" value={formData.tag} onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))} required />
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
        <button type="button">저장</button>
        <button type="button">취소</button>
      </div>
    </div>
  );
}