import {apiConfig} from '@/config/api-config';

/**
 * cr_code
 */
class CodeService {
  async getCodeList(json?: any) { // 코드 리스트
    const res = await apiConfig('/cr/get-code-list', json || {});
    return res.data;
  }

  async setCodeList(json?: any) { // 코드 리스트등록
    const res = await apiConfig('/cr/set-code-list', json || {});
    return res.data;
  }
}

export default new CodeService();

