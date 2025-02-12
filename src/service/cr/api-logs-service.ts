import {apiConfig} from '@/config/api-config';

/**
 * 로그
 */
class ApiLogService {
  async getApiLog(json?: any) { // 로그 조회
    const res = await apiConfig('/cr/get-api-logs', json || {});
    return res.data;
  }
  async getApiLogList(json?: any) { // 로그 리스트
    const res = await apiConfig('/cr/get-api-logs-list', json || {});
    return res.data;
  }
  async setApiLog(json?: any) { // 로그 등록
    const res = await apiConfig('/cr/set-api-logs', json || {});
    return res.data;
  }
  async setApiLogList(json?: any) { // 로그 리스트등록
    const res = await apiConfig('/cr/set-api-logs-list', json || {});
    return res.data;
  }
}

export default new ApiLogService();