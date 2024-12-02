import {apiConfig} from '@src/utils/apiConfig';

/**
 * 업체
 */
class CompanyService {
  async getCompanyList(json?: any) { // 업체 리스트
    const res = await apiConfig('/at/getCompanyList', json || {});
    return res.data;
  }

  async setCompanyList(json?: any) { // 업체 리스트등록
    const res = await apiConfig('/at/setCompanyList', json || {});
    return res.data;
  }
}

export default new CompanyService();