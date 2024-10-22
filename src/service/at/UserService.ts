import {apiConfig} from '@src/utils/apiConfig';

/**
 * 사용자
 */
class UserService {
  async getUserList(json?: any) { // 사용자 리스트
    const res = await apiConfig('/at/getUserList', json || {});
    return res.data;
  }

  async setUserList(json?: any) { // 사용자 리스트등록
    const res = await apiConfig('/at/setUserList', json || {});
    return res.data;
  }
}

export default new UserService();