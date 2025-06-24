import {apiConfig} from '@/config/api-config';

/**
 * 메뉴
 */
class MenuService {
  async getMenu(json?: any) { // 메뉴 조회
    const res = await apiConfig('/at/get-menu', json || {});
    return res.data;
  }
  async getMenuList(json?: any) { // 메뉴 리스트
    const res = await apiConfig('/at/get-menu-list', json || {});
    return res.data;
  }
  async setMenu(json?: any) { // 메뉴 등록
    const res = await apiConfig('/at/set-menu', json || {});
    return res.data;
  }
  async setMenuList(json?: any) { // 메뉴 리스트등록
    const res = await apiConfig('/at/set-menu-list', json || {});
    return res.data;
  }
}

export default new MenuService();