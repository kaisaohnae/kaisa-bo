import {apiConfig} from '@/config/api-config';

/**
 * 사전
 */
class DictionaryService {
  async getDictionary(json?: any) { // 사전 조회
    const res = await apiConfig('/cr/get-dictionary', json || {});
    return res.data;
  }
  async getDictionaryList(json?: any) { // 사전 리스트
    const res = await apiConfig('/cr/get-dictionary-list', json || {});
    return res.data;
  }
  async setDictionary(json?: any) { // 사전 등록
    const res = await apiConfig('/cr/set-dictionary', json || {});
    return res.data;
  }
  async setDictionaryList(json?: any) { // 사전 리스트등록
    const res = await apiConfig('/cr/set-dictionary-list', json || {});
    return res.data;
  }
}

export default new DictionaryService();