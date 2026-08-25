import {apiConfig} from '@/config/api-config';

/**
 * 시즌가격
 */
class SeasonPriceService {
  async getSeasonPrice(json?: any) { // 시즌가격 조회
    const res = await apiConfig('/od/get-season-price', json || {});
    return res.data;
  }
  async getSeasonPriceList(json?: any) { // 시즌가격 리스트
    const res = await apiConfig('/od/get-season-price-list', json || {});
    return res.data;
  }
  async setSeasonPrice(json?: any) { // 시즌가격 등록
    const res = await apiConfig('/od/set-season-price', json || {});
    return res.data;
  }
  async setSeasonPriceList(json?: any) { // 시즌가격 리스트등록
    const res = await apiConfig('/od/set-season-price-list', json || {});
    return res.data;
  }
}

export default new SeasonPriceService();