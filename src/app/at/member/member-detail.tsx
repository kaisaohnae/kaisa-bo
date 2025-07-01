import React, { useEffect, useState } from 'react';
import MemberService from '@/service/at/member-service';
import CommonCode from '@/components/common/common-code';
import gridUtil from '@/utils/grid-util';

export default function MemberDetail({ detailData, onChange }) {
  const [edit, setEdit] = useState({ editor: {}, editorOption: {} });
  const [formData, setFormData]: any = useState({});

  const drawDetail = () => {

  };

  const getDetail = () => {
    if (detailData.companyId) {
      MemberService.getMember({ companyId: detailData.companyId }).then(
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
                <input type="text" value={formData.memberName} onChange={(e) => setFormData(prev => ({ ...prev, memberName: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">이메일</th>
              <td>
                <input type="text" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
              </td>
            </tr>
            <tr>
              <th scope="col">전화번호</th>
              <td>
                <input type="text" value={formData.phoneNo} onChange={(e) => setFormData(prev => ({ ...prev, phoneNo: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">비밀번호수정일시</th>
              <td>
                <input type="datetime" value={formData.passwordUpdateDt} onChange={(e) => setFormData(prev => ({ ...prev, passwordUpdateDt: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">로그인일시</th>
              <td>
                <input type="datetime" value={formData.loginDt} onChange={(e) => setFormData(prev => ({ ...prev, loginDt: e.target.value }))}  />
              </td>
            </tr>
            <tr>
              <th scope="col">메모</th>
              <td>
                <input type="text" value={formData.memo} onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))} required />
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
        <button type="button">저장</button>
        <button type="button">취소</button>
      </div>
    </div>
  );
}