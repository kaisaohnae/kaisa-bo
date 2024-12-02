import {apiConfig} from '@src/utils/apiConfig';

/**
 * 메뉴업체권한
 */
class MenuCompanyRoleService {
  async getMenuCompanyRoleList(json?: any) { // 메뉴업체권한 리스트
    const res = await apiConfig('/at/getMenuCompanyRoleList', json || {});
    return res.data;
  }

  async setMenuCompanyRoleList(json?: any) { // 메뉴업체권한 리스트등록
    const res = await apiConfig('/at/setMenuCompanyRoleList', json || {});
    return res.data;
  }
}

export default new MenuCompanyRoleService();