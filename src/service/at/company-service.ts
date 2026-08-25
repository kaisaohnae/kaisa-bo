import {apiConfig} from '@/config/api-config';

/**
 * 업체
 */
class CompanyService {
  async getCompany(json?: any) { // 업체 조회
    const res = await apiConfig('/at/get-company', json || {});
    return res.data;
  }
  async getCompanyList(json?: any) { // 업체 리스트
    const res = await apiConfig('/at/get-company-list', json || {});
    return res.data;
  }
  async setCompany(json?: any) { // 업체 등록
    const res = await apiConfig('/at/set-company', json || {});
    return res.data;
  }
  async setCompanyList(json?: any) { // 업체 리스트등록
    const res = await apiConfig('/at/set-company-list', json || {});
    return res.data;
  }
}

export default new CompanyService();