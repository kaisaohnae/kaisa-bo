import {apiConfig} from '@/config/api-config';

/**
 * 코드
 */
class CodeService {
  async getCode(json?: any) { // 코드 조회
    const res = await apiConfig('/cr/get-code', json || {});
    return res.data;
  }
  async getCodeList(json?: any) { // 코드 리스트
    const res = await apiConfig('/cr/get-code-list', json || {});
    return res.data;
  }
  async setCode(json?: any) { // 코드 등록
    const res = await apiConfig('/cr/set-code', json || {});
    return res.data;
  }
  async setCodeList(json?: any) { // 코드 리스트등록
    const res = await apiConfig('/cr/set-code-list', json || {});
    return res.data;
  }
}

export default new CodeService();