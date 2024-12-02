import {apiConfig} from '@src/utils/apiConfig';

/**
 * cr_dictionary
 */
class DictionaryService {
  async getDictionaryList(json?: any) { // 사전 리스트
    const res = await apiConfig('/cr/getDictionaryList', json || {});
    return res.data;
  }

  async setDictionaryList(json?: any) { // 사전 리스트등록
    const res = await apiConfig('/cr/setDictionaryList', json || {});
    return res.data;
  }
}

export default new DictionaryService();

