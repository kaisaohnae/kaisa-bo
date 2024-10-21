import {apiConfig} from '@src/utils/apiConfig';

/**
 * 상품
 */
class ProductService {
  async getProductList(json?: any) { // 상품 리스트
    const res = await apiConfig('/cr/getProductList', json || {});
    return res.data;
  }

  async setProductList(json?: any) { // 상품 리스트등록
    const res = await apiConfig('/cr/setProductList', json || {});
    return res.data;
  }
}

export default new ProductService();