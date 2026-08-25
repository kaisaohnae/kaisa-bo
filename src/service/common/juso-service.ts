import {apiConfig} from '@/config/api-config';

class JusoService {
  /**
   * 주소정보
   * @param form
   * @returns
   */
  async getJuso(form?: any) {
    const res = await apiConfig('/juso/get-juso', form ? form : {});
    return res.data;
  }

  /**
   * 주소/좌표 정보
   * @param form
   * @returns
   */
  async getPosition(form?: any) {
    const res = await apiConfig('/juso/get-position', form ? form : {});
    return res.data;
  }
}

export default new JusoService();

