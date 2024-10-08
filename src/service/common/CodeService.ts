import {apiConfig} from '@src/utils/apiConfig';

/**
 * cr_code
 */
class CodeService {
  async getCodeList(json?: any) { // 코드 리스트
    const res = await apiConfig('/cr/getCodeList', json || {});
    return res.data;
  }

  async setCodeList(json?: any) { // 코드 리스트등록
    const res = await apiConfig('/cr/setCodeList', json || {});
    return res.data;
  }
}

export default new CodeService();

