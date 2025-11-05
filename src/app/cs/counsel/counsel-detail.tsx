'use client';

import React, { useEffect, useState, useRef } from 'react';
import CounselService from '@/service/cs/counsel-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';
import useAlertStore from '@/store/use-alert-store';

export default function CounselDetail({ detailData, detailShow, setDetailShow }) {
  const editor: any = useRef({});
  const {showAlert, hideAlert} = useAlertStore();
  const [formData, setFormData]: any = useState({
    counselNo: '',
    companyId: '',
    memberName: '',
    phoneNo: '',
    email: '',
    title: '',
    content: '',
    latitude: '',
    longitude: '',
    address: '',
    managerNo: '',
    managerCompanyId: '',
    creator: '',
    createDt: '',
    updater: '',
    updateDt: '',

  });

  const drawDetail = () => {

  };

  const getDetail = async () => {
    if (detailData.counselNo) {
      CounselService.getCounsel({ counselNo: detailData.counselNo }).then(
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
    if (detailData.counselNo) {
      CounselService.setCounsel({
        counselNo: formData.counselNo,
        companyId: formData.companyId,
        memberName: formData.memberName,
        phoneNo: formData.phoneNo,
        email: formData.email,
        title: formData.title,
        content: editor.current?.getMarkdown?.() || '',
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        managerNo: formData.managerNo,
        managerCompanyId: formData.managerCompanyId,
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
    if (formData.counselNo) {
      drawDetail();
    }
  }, [formData]);

  return (
    <div className="detail-content">
      <h2>상담 상세</h2>
      <div className="detail-scroll">
        <table className="detail-table">
          <caption>상담 상세</caption>
          <tbody>
          <tr>
            <th scope="col" className="required">상담번호</th>
            <td>
              {formData.counselNo}
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
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">내용</th>
              <td>
                <input type="text" value={formData.content || ''} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">위도</th>
              <td>
                <input type="text" value={formData.latitude || ''} onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">경도</th>
              <td>
                <input type="text" value={formData.longitude || ''} onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">주소</th>
              <td>
                <input type="text" value={formData.address || ''} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">담당자번호</th>
              <td>
                <input type="number" value={formData.managerNo || ''} onChange={(e) => setFormData(prev => ({ ...prev, managerNo: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">담당자자업체아이디</th>
              <td>
                <input type="text" value={formData.managerCompanyId || ''} onChange={(e) => setFormData(prev => ({ ...prev, managerCompanyId: e.target.value }))} required />
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