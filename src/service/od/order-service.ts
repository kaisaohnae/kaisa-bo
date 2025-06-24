import {apiConfig} from '@/config/api-config';

/**
 * 주문
 */
class OrderService {
  async getOrder(json?: any) { // 주문 조회
    const res = await apiConfig('/od/get-order', json || {});
    return res.data;
  }
  async getOrderList(json?: any) { // 주문 리스트
    const res = await apiConfig('/od/get-order-list', json || {});
    return res.data;
  }
  async setOrder(json?: any) { // 주문 등록
    const res = await apiConfig('/od/set-order', json || {});
    return res.data;
  }
  async setOrderList(json?: any) { // 주문 리스트등록
    const res = await apiConfig('/od/set-order-list', json || {});
    return res.data;
  }
}

export default new OrderService();