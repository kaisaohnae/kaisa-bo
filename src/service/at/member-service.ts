import {apiConfig} from '@/config/api-config';

/**
 * 회원
 */
class MemberService {
  async getMember(json?: any) { // 회원 조회
    const res = await apiConfig('/at/get-member', json || {});
    return res.data;
  }
  async getMemberList(json?: any) { // 회원 리스트
    const res = await apiConfig('/at/get-member-list', json || {});
    return res.data;
  }
  async setMember(json?: any) { // 회원 등록
    const res = await apiConfig('/at/set-member', json || {});
    return res.data;
  }
  async setMemberList(json?: any) { // 회원 리스트등록
    const res = await apiConfig('/at/set-member-list', json || {});
    return res.data;
  }
}

export default new MemberService();