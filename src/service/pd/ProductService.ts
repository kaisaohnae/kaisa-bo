import {apiConfig} from '@src/utils/apiConfig';

/**
 * 상품
 */
class ProductService {
  async getProduct(json?: any) { // 상품 조회
    const res = await apiConfig('/pd/getProduct', json || {});
    return res.data;
  }
  async getProductList(json?: any) { // 상품 리스트
    const res = await apiConfig('/pd/getProductList', json || {});
    return res.data;
  }
  async setProduct(json?: any) { // 상품 등록
    const res = await apiConfig('/pd/setProduct', json || {});
    return res.data;
  }
  async setProductList(json?: any) { // 상품 리스트등록
    const res = await apiConfig('/pd/setProductList', json || {});
    return res.data;
  }
}

export default new ProductService();