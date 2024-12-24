import {apiConfig} from '@src/utils/apiConfig';

/**
 * 메뉴업체권한
 */
class MenuCompanyRoleService {
  async getMenuCompanyRole(json?: any) { // 메뉴업체권한 조회
    const res = await apiConfig('/at/getMenuCompanyRole', json || {});
    return res.data;
  }
  async getMenuCompanyRoleList(json?: any) { // 메뉴업체권한 리스트
    const res = await apiConfig('/at/getMenuCompanyRoleList', json || {});
    return res.data;
  }
  async setMenuCompanyRole(json?: any) { // 메뉴업체권한 등록
    const res = await apiConfig('/at/setMenuCompanyRole', json || {});
    return res.data;
  }
  async setMenuCompanyRoleList(json?: any) { // 메뉴업체권한 리스트등록
    const res = await apiConfig('/at/setMenuCompanyRoleList', json || {});
    return res.data;
  }
}

export default new MenuCompanyRoleService();