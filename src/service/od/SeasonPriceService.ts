import {apiConfig} from '@src/utils/apiConfig';

/**
 * 시즌가격
 */
class SeasonPriceService {
  async getSeasonPrice(json?: any) { // 시즌가격 조회
    const res = await apiConfig('/od/getSeasonPrice', json || {});
    return res.data;
  }
  async getSeasonPriceList(json?: any) { // 시즌가격 리스트
    const res = await apiConfig('/od/getSeasonPriceList', json || {});
    return res.data;
  }
  async setSeasonPrice(json?: any) { // 시즌가격 등록
    const res = await apiConfig('/od/setSeasonPrice', json || {});
    return res.data;
  }
  async setSeasonPriceList(json?: any) { // 시즌가격 리스트등록
    const res = await apiConfig('/od/setSeasonPriceList', json || {});
    return res.data;
  }
}

export default new SeasonPriceService();