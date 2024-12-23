import {apiConfig} from '@src/utils/apiConfig';

class JusoService {
  /**
   * 주소정보
   * @param form
   * @returns
   */
  async getJuso(form?: any) {
    const res = await apiConfig('/juso/getJuso', form ? form : {});
    return res.data;
  }

  /**
   * 주소/좌표 정보
   * @param form
   * @returns
   */
  async getPosition(form?: any) {
    const res = await apiConfig('/juso/getPosition', form ? form : {});
    return res.data;
  }
}

export default new JusoService();

