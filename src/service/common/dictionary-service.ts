import {apiConfig} from '@/config/api-config';

/**
 * cr_dictionary
 */
class DictionaryService {
  async getDictionaryList(json?: any) { // 사전 리스트
    const res = await apiConfig('/cr/get-dictionary-list', json || {});
    return res.data;
  }

  async setDictionaryList(json?: any) { // 사전 리스트등록
    const res = await apiConfig('/cr/set-dictionary-list', json || {});
    return res.data;
  }
}

export default new DictionaryService();

