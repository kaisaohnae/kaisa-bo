import {apiConfig} from '@/config/api-config';

class AuthService {
  async login(param: any) {
    const res = await apiConfig('/auth/login', param);
    return res.data;
  }
  async changePassword(param: any) {
    const res = await apiConfig('/auth/change-password', param);
    return res.data;
  }
}

export default new AuthService();
