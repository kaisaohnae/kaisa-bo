import {apiConfig} from '@src/utils/apiConfig';

/**
 * 회원
 */
class MemberService {
  async getMemberList(json?: any) { // 회원 리스트
    const res = await apiConfig('/at/getMemberList', json || {});
    return res.data;
  }

  async setMemberList(json?: any) { // 회원 리스트등록
    const res = await apiConfig('/at/setMemberList', json || {});
    return res.data;
  }
}

export default new MemberService();