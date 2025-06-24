import {apiConfig} from '@/config/api-config';

/**
 * 휴일가격
 */
class HolidayPriceService {
  async getHolidayPrice(json?: any) { // 휴일가격 조회
    const res = await apiConfig('/od/get-holiday-price', json || {});
    return res.data;
  }
  async getHolidayPriceList(json?: any) { // 휴일가격 리스트
    const res = await apiConfig('/od/get-holiday-price-list', json || {});
    return res.data;
  }
  async setHolidayPrice(json?: any) { // 휴일가격 등록
    const res = await apiConfig('/od/set-holiday-price', json || {});
    return res.data;
  }
  async setHolidayPriceList(json?: any) { // 휴일가격 리스트등록
    const res = await apiConfig('/od/set-holiday-price-list', json || {});
    return res.data;
  }
}

export default new HolidayPriceService();