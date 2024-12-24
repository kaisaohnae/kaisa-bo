import {apiConfig} from '@src/utils/apiConfig';

/**
 * 시즌
 */
class SeasonService {
  async getSeason(json?: any) { // 시즌 조회
    const res = await apiConfig('/od/getSeason', json || {});
    return res.data;
  }
  async getSeasonList(json?: any) { // 시즌 리스트
    const res = await apiConfig('/od/getSeasonList', json || {});
    return res.data;
  }
  async setSeason(json?: any) { // 시즌 등록
    const res = await apiConfig('/od/setSeason', json || {});
    return res.data;
  }
  async setSeasonList(json?: any) { // 시즌 리스트등록
    const res = await apiConfig('/od/setSeasonList', json || {});
    return res.data;
  }
}

export default new SeasonService();