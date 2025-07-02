'use client';

import React, { useEffect, useState, useRef } from 'react';
import MemberService from '@/service/at/member-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';
import useAlertStore from '@/store/use-alert-store';

export default function MemberDetail({ detailData, detailShow, setDetailShow }) {
  const editor: any = useRef({});
  const {showAlert, hideAlert} = useAlertStore();
  const [formData, setFormData]: any = useState({
    memberId: '',
    companyId: '',
    memberName: '',
    email: '',
    phoneNo: '',
    passwordUpdateDt: '',
    loginDt: '',
    memo: '',
    memberStateCode: '',
    creator: '',
    createDt: '',
    updater: '',
    updateDt: '',

  });

  const drawDetail = () => {

  };

  const getDetail = async () => {
    if (detailData.companyId) {
      MemberService.getMember({ companyId: detailData.companyId }).then(
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
      MemberService.setMember({
        memberId: formData.memberId,
        companyId: formData.companyId,
        memberName: formData.memberName,
        email: formData.email,
        phoneNo: formData.phoneNo,
        passwordUpdateDt: formData.passwordUpdateDt,
        loginDt: formData.loginDt,
        memo: formData.memo,
        memberStateCode: formData.memberStateCode,
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
      <h2>회원 상세</h2>
      <div className="detail-scroll">
        <table className="detail-table">
          <caption>회원 상세</caption>
          <tbody>
          <tr>
            <th scope="col">회원아이디</th>
            <td>
              {formData.memberId}
            </td>
          </tr>
          <tr>
            <th scope="col">업체아이디</th>
            <td>
              {formData.companyId}
            </td>
          </tr>
            <tr>
              <th scope="col">회원이름</th>
              <td>
                <input type="text" value={formData.memberName || ''} onChange={(e) => setFormData(prev => ({ ...prev, memberName: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">이메일</th>
              <td>
                <input type="text" value={formData.email || ''} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">전화번호</th>
              <td>
                <input type="text" value={formData.phoneNo || ''} onChange={(e) => setFormData(prev => ({ ...prev, phoneNo: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">비밀번호수정일시</th>
              <td>
                <input type="datetime" value={formData.passwordUpdateDt || ''} onChange={(e) => setFormData(prev => ({ ...prev, passwordUpdateDt: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">로그인일시</th>
              <td>
                <input type="datetime" value={formData.loginDt || ''} onChange={(e) => setFormData(prev => ({ ...prev, loginDt: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">메모</th>
              <td>
                <input type="text" value={formData.memo || ''} onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">회원상태코드</th>
              <td>
                <CommonCode cd="memberStateCode" model={formData.memberStateCode} onSetData={(val) => setFormData(prev => ({ ...prev, memberStateCode: val }))} />
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