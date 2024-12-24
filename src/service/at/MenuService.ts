import {apiConfig} from '@src/utils/apiConfig';

/**
 * 메뉴
 */
class MenuService {
  async getMenu(json?: any) { // 메뉴 조회
    const res = await apiConfig('/at/getMenu', json || {});
    return res.data;
  }
  async getMenuList(json?: any) { // 메뉴 리스트
    const res = await apiConfig('/at/getMenuList', json || {});
    return res.data;
  }
  async setMenu(json?: any) { // 메뉴 등록
    const res = await apiConfig('/at/setMenu', json || {});
    return res.data;
  }
  async setMenuList(json?: any) { // 메뉴 리스트등록
    const res = await apiConfig('/at/setMenuList', json || {});
    return res.data;
  }
}

export default new MenuService();