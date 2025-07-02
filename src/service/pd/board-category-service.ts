import {apiConfig} from '@/config/api-config';

/**
 * 게시판카테고리
 */
class BoardCategoryService {
  async getBoardCategory(json?: any) { // 게시판카테고리 조회
    const res = await apiConfig('/pd/get-board-category', json || {});
    return res.data;
  }
  async getBoardCategoryList(json?: any) { // 게시판카테고리 리스트
    const res = await apiConfig('/pd/get-board-category-list', json || {});
    return res.data;
  }
  async setBoardCategory(json?: any) { // 게시판카테고리 등록
    const res = await apiConfig('/pd/set-board-category', json || {});
    return res.data;
  }
  async setBoardCategoryList(json?: any) { // 게시판카테고리 리스트등록
    const res = await apiConfig('/pd/set-board-category-list', json || {});
    return res.data;
  }
}

export default new BoardCategoryService();