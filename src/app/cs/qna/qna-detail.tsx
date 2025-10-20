'use client';

import React, { useEffect, useState, useRef } from 'react';
import QnaService from '@/service/cs/qna-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';
import useAlertStore from '@/store/use-alert-store';

export default function QnaDetail({ detailData, detailShow, setDetailShow }) {
  const editor: any = useRef({});
  const {showAlert, hideAlert} = useAlertStore();
  const [formData, setFormData]: any = useState({
    qnaNo: '',
    companyId: '',
    memberName: '',
    phoneNo: '',
    email: '',
    title: '',
    content: '',
    creator: '',
    createDt: '',
    updater: '',
    updateDt: '',

  });

  const drawDetail = () => {

  };

  const getDetail = async () => {
    if (detailData.qnaNo) {
      QnaService.getQna({ qnaNo: detailData.qnaNo }).then(
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
    if (detailData.qnaNo) {
      QnaService.setQna({
        qnaNo: formData.qnaNo,
        companyId: formData.companyId,
        memberName: formData.memberName,
        phoneNo: formData.phoneNo,
        email: formData.email,
        title: formData.title,
        // content: editor.current?.getMarkdown?.() || '',
        content: formData.content, // 여기 수정
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
    if (formData.qnaNo) {
      drawDetail();
    }
  }, [formData]);

  return (
    <div className="detail-content">
      <h2>문의 상세</h2>
      <div className="detail-scroll">
        <table className="detail-table">
          <caption>문의 상세</caption>
          <tbody>
          <tr>
            <th scope="col" className="required">질문번호</th>
            <td>
              {formData.qnaNo}
            </td>
          </tr>
            <tr>
              <th scope="col">업체아이디</th>
              <td>
                <input type="text" value={formData.companyId || ''} onChange={(e) => setFormData(prev => ({ ...prev, companyId: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">회원명</th>
              <td>
                <input type="text" value={formData.memberName || ''} onChange={(e) => setFormData(prev => ({ ...prev, memberName: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">전화번호</th>
              <td>
                <input type="text" value={formData.phoneNo || ''} onChange={(e) => setFormData(prev => ({ ...prev, phoneNo: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">이메일</th>
              <td>
                <input type="text" value={formData.email || ''} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">제목</th>
              <td>
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">내용</th>
              <td>
                <textarea value={formData.content || ''} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}  />
              </td>
            </tr>
          <tr>
            <th scope="col" className="audit">등록자</th>
            <td>
              {formData.creator}
            </td>
          </tr>
          <tr>
            <th scope="col" className="audit">등록일시</th>
            <td>
              {formData.createDt}
            </td>
          </tr>
          <tr>
            <th scope="col" className="audit">수정자</th>
            <td>
              {formData.updater}
            </td>
          </tr>
          <tr>
            <th scope="col" className="audit">수정일시</th>
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