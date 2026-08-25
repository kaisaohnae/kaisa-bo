import {apiConfig} from '@/config/api-config';

/**
 * 사용자
 */
class UserService {
  async getUser(json?: any) { // 사용자 조회
    const res = await apiConfig('/at/get-user', json || {});
    return res.data;
  }
  async getUserList(json?: any) { // 사용자 리스트
    const res = await apiConfig('/at/get-user-list', json || {});
    return res.data;
  }
  async setUser(json?: any) { // 사용자 등록
    const res = await apiConfig('/at/set-user', json || {});
    return res.data;
  }
  async setUserList(json?: any) { // 사용자 리스트등록
    const res = await apiConfig('/at/set-user-list', json || {});
    return res.data;
  }
}

export default new UserService();