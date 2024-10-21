import {apiConfig} from '@src/utils/apiConfig';

/**
 * 시즌가격
 */
class SeasonPriceService {
  async getSeasonPriceList(json?: any) { // 시즌가격 리스트
    const res = await apiConfig('/cr/getSeasonPriceList', json || {});
    return res.data;
  }

  async setSeasonPriceList(json?: any) { // 시즌가격 리스트등록
    const res = await apiConfig('/cr/setSeasonPriceList', json || {});
    return res.data;
  }
}

export default new SeasonPriceService();