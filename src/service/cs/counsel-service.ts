import {apiConfig} from '@/config/api-config';

/**
 * 상담
 */
class CounselService {
  async getCounsel(json?: any) { // 상담 조회
    const res = await apiConfig('/cs/get-counsel', json || {});
    return res.data;
  }
  async getCounselList(json?: any) { // 상담 리스트
    const res = await apiConfig('/cs/get-counsel-list', json || {});
    return res.data;
  }
  async setCounsel(json?: any) { // 상담 등록
    const res = await apiConfig('/cs/set-counsel', json || {});
    return res.data;
  }
  async setCounselList(json?: any) { // 상담 리스트등록
    const res = await apiConfig('/cs/set-counsel-list', json || {});
    return res.data;
  }
}

export default new CounselService();