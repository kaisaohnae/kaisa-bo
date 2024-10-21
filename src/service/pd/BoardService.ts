import {apiConfig} from '@src/utils/apiConfig';

/**
 * 게시판
 */
class BoardService {
  async getBoardList(json?: any) { // 게시판 리스트
    const res = await apiConfig('/cr/getBoardList', json || {});
    return res.data;
  }

  async setBoardList(json?: any) { // 게시판 리스트등록
    const res = await apiConfig('/cr/setBoardList', json || {});
    return res.data;
  }
}

export default new BoardService();