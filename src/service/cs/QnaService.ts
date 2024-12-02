import {apiConfig} from '@src/utils/apiConfig';

/**
 * 문의
 */
class QnaService {
  async getQnaList(json?: any) { // 문의 리스트
    const res = await apiConfig('/cs/getQnaList', json || {});
    return res.data;
  }

  async setQnaList(json?: any) { // 문의 리스트등록
    const res = await apiConfig('/cs/setQnaList', json || {});
    return res.data;
  }
}

export default new QnaService();