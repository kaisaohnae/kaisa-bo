import {apiConfig} from '@src/utils/apiConfig';

/**
 * 메뉴
 */
class MenuService {
  async getMenuList(json?: any) { // 메뉴 리스트
    const res = await apiConfig('/cr/getMenuList', json || {});
    return res.data;
  }

  async setMenuList(json?: any) { // 메뉴 리스트등록
    const res = await apiConfig('/cr/setMenuList', json || {});
    return res.data;
  }
}

export default new MenuService();