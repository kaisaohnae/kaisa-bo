import {apiConfig} from '@/config/api-config';

class MainService {

  async calendar(json?: any) {
    const res = await apiConfig('/front/calendar', json || {});
    return res.data;
  }
}

export default new MainService();

