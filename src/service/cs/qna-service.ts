import {apiConfig} from '@/config/api-config';

/**
 * 문의
 */
class QnaService {
  async getQna(json?: any) { // 문의 조회
    const res = await apiConfig('/cs/get-qna', json || {});
    return res.data;
  }
  async getQnaList(json?: any) { // 문의 리스트
    const res = await apiConfig('/cs/get-qna-list', json || {});
    return res.data;
  }
  async setQna(json?: any) { // 문의 등록
    const res = await apiConfig('/cs/set-qna', json || {});
    return res.data;
  }
  async setQnaList(json?: any) { // 문의 리스트등록
    const res = await apiConfig('/cs/set-qna-list', json || {});
    return res.data;
  }
}

export default new QnaService();