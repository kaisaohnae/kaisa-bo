import {apiConfig} from '@/config/api-config';

/**
 * 메뉴업체권한
 */
class MenuCompanyRoleService {
  async getMenuCompanyRole(json?: any) { // 메뉴업체권한 조회
    const res = await apiConfig('/at/get-menu-company-role', json || {});
    return res.data;
  }
  async getMenuCompanyRoleList(json?: any) { // 메뉴업체권한 리스트
    const res = await apiConfig('/at/get-menu-company-role-list', json || {});
    return res.data;
  }
  async setMenuCompanyRole(json?: any) { // 메뉴업체권한 등록
    const res = await apiConfig('/at/set-menu-company-role', json || {});
    return res.data;
  }
  async setMenuCompanyRoleList(json?: any) { // 메뉴업체권한 리스트등록
    const res = await apiConfig('/at/set-menu-company-role-list', json || {});
    return res.data;
  }
}

export default new MenuCompanyRoleService();