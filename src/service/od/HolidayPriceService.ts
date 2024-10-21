import {apiConfig} from '@src/utils/apiConfig';

/**
 * 휴일가격
 */
class HolidayPriceService {
  async getHolidayPriceList(json?: any) { // 휴일가격 리스트
    const res = await apiConfig('/cr/getHolidayPriceList', json || {});
    return res.data;
  }

  async setHolidayPriceList(json?: any) { // 휴일가격 리스트등록
    const res = await apiConfig('/cr/setHolidayPriceList', json || {});
    return res.data;
  }
}

export default new HolidayPriceService();