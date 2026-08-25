'use client';

import React, { useEffect, useState, useRef } from 'react';
import CompanyService from '@/service/at/company-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';
import useAlertStore from '@/store/use-alert-store';

export default function CompanyDetail({ detailData, detailShow, setDetailShow }) {
  const editor: any = useRef({});
  const {showAlert, hideAlert} = useAlertStore();
  const [formData, setFormData]: any = useState({
    companyId: '',
    companyTypeCode: '',
    companyName: '',
    lttd: '',
    lotd: '',
    address: '',
    phoneNo: '',
    creator: '',
    createDt: '',
    updater: '',
    updateDt: '',

  });

  const drawDetail = () => {

  };

  const getDetail = async () => {
    if (detailData.companyId) {
      CompanyService.getCompany({ companyId: detailData.companyId }).then(
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
    if (detailData.companyId) {
      CompanyService.setCompany({
        companyId: formData.companyId,
        companyTypeCode: formData.companyTypeCode,
        companyName: formData.companyName,
        lttd: formData.lttd,
        lotd: formData.lotd,
        address: formData.address,
        phoneNo: formData.phoneNo,
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
    if (formData.companyId) {
      drawDetail();
    }
  }, [formData]);

  return (
    <div className="detail-content">
      <h2>업체 상세</h2>
      <div className="detail-scroll">
        <table className="detail-table">
          <caption>업체 상세</caption>
          <tbody>
          <tr>
            <th scope="col" className="required">업체아이디</th>
            <td>
              {formData.companyId}
            </td>
          </tr>
            <tr>
              <th scope="col">업체유형코드</th>
              <td>
                <CommonCode cd="companyTypeCode" model={formData.companyTypeCode} onSetData={(val) => setFormData(prev => ({ ...prev, companyTypeCode: val }))} />
              </td>
            </tr>
            <tr>
              <th scope="col">업체명</th>
              <td>
                <input type="text" value={formData.companyName || ''} onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">위도</th>
              <td>
                <input type="text" value={formData.lttd || ''} onChange={(e) => setFormData(prev => ({ ...prev, lttd: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">경도</th>
              <td>
                <input type="text" value={formData.lotd || ''} onChange={(e) => setFormData(prev => ({ ...prev, lotd: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">주소</th>
              <td>
                <input type="text" value={formData.address || ''} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">전화번호</th>
              <td>
                <input type="text" value={formData.phoneNo || ''} onChange={(e) => setFormData(prev => ({ ...prev, phoneNo: e.target.value }))}  />
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