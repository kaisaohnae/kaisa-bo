import {apiConfig} from '@src/utils/apiConfig';

/**
 * 시즌
 */
class SeasonService {
  async getSeasonList(json?: any) { // 시즌 리스트
    const res = await apiConfig('/od/getSeasonList', json || {});
    return res.data;
  }

  async setSeasonList(json?: any) { // 시즌 리스트등록
    const res = await apiConfig('/od/setSeasonList', json || {});
    return res.data;
  }
}

export default new SeasonService();