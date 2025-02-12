/* eslint-disable no-debugger */
import {apiConfig} from '@/config/api-config';

class UserService {
  async login(param: any) {
    const res = await apiConfig('/login', param);
    return res.data;
  }
}

export default new UserService();
