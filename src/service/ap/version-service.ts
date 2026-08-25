import {apiConfig} from '@/config/api-config';

/**
 * 버전
 */
class VersionService {
  async getVersion(json?: any) { // 버전 조회
    const res = await apiConfig('/ap/get-version', json || {});
    return res.data;
  }
  async getVersionList(json?: any) { // 버전 리스트
    const res = await apiConfig('/ap/get-version-list', json || {});
    return res.data;
  }
  async setVersion(json?: any) { // 버전 등록
    const res = await apiConfig('/ap/set-version', json || {});
    return res.data;
  }
  async setVersionList(json?: any) { // 버전 리스트등록
    const res = await apiConfig('/ap/set-version-list', json || {});
    return res.data;
  }
}

export default new VersionService();