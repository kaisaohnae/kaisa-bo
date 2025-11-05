import {apiConfig} from '@/config/api-config';

/**
 * 담당자
 */
class ManagerService {
  async getManager(json?: any) { // 담당자 조회
    const res = await apiConfig('/cs/get-manager', json || {});
    return res.data;
  }
  async getManagerList(json?: any) { // 담당자 리스트
    const res = await apiConfig('/cs/get-manager-list', json || {});
    return res.data;
  }
  async setManager(json?: any) { // 담당자 등록
    const res = await apiConfig('/cs/set-manager', json || {});
    return res.data;
  }
  async setManagerList(json?: any) { // 담당자 리스트등록
    const res = await apiConfig('/cs/set-manager-list', json || {});
    return res.data;
  }
}

export default new ManagerService();