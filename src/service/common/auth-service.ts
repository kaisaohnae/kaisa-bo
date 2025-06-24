import {apiConfig} from '@/config/api-config';

class AuthService {
  async login(param: any) {
    const res = await apiConfig('/login', param);
    return res.data;
  }
}

export default new AuthService();
