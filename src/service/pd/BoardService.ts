import {apiConfig} from '@src/utils/apiConfig';

/**
 * 게시판
 */
class BoardService {
  async getBoard(json?: any) { // 게시판 조회
    const res = await apiConfig('/pd/getBoard', json || {});
    return res.data;
  }
  async getBoardList(json?: any) { // 게시판 리스트
    const res = await apiConfig('/pd/getBoardList', json || {});
    return res.data;
  }
  async setBoard(json?: any) { // 게시판 등록
    const res = await apiConfig('/pd/setBoard', json || {});
    return res.data;
  }
  async setBoardList(json?: any) { // 게시판 리스트등록
    const res = await apiConfig('/pd/setBoardList', json || {});
    return res.data;
  }
}

export default new BoardService();