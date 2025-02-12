import {apiConfig} from '@/config/api-config';

/**
 * 상품
 */
class ProductService {
  async getProduct(json?: any) { // 상품 조회
    const res = await apiConfig('/pd/get-product', json || {});
    return res.data;
  }
  async getProductList(json?: any) { // 상품 리스트
    const res = await apiConfig('/pd/get-product-list', json || {});
    return res.data;
  }
  async setProduct(json?: any) { // 상품 등록
    const res = await apiConfig('/pd/set-product', json || {});
    return res.data;
  }
  async setProductList(json?: any) { // 상품 리스트등록
    const res = await apiConfig('/pd/set-product-list', json || {});
    return res.data;
  }
}

export default new ProductService();