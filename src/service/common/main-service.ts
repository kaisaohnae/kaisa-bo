import {apiConfig} from '@/config/api-config';

class MainService {
  async dashboard(json?: any) {
    const res = await apiConfig('/common/dashboard', json || {});
    return res.data;
  }

  async calendar(json?: any) {
    const res = await apiConfig('/common/calendar', json || {});
    return res.data;
  }
}

export default new MainService();

