import {apiConfig} from '@/config/api-config';

/**
 * 시즌
 */
class SeasonService {
  async getSeason(json?: any) { // 시즌 조회
    const res = await apiConfig('/od/get-season', json || {});
    return res.data;
  }
  async getSeasonList(json?: any) { // 시즌 리스트
    const res = await apiConfig('/od/get-season-list', json || {});
    return res.data;
  }
  async setSeason(json?: any) { // 시즌 등록
    const res = await apiConfig('/od/set-season', json || {});
    return res.data;
  }
  async setSeasonList(json?: any) { // 시즌 리스트등록
    const res = await apiConfig('/od/set-season-list', json || {});
    return res.data;
  }
}

export default new SeasonService();