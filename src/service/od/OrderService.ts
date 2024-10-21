import {apiConfig} from '@src/utils/apiConfig';

/**
 * 주문
 */
class OrderService {
  async getOrderList(json?: any) { // 주문 리스트
    const res = await apiConfig('/cr/getOrderList', json || {});
    return res.data;
  }

  async setOrderList(json?: any) { // 주문 리스트등록
    const res = await apiConfig('/cr/setOrderList', json || {});
    return res.data;
  }
}

export default new OrderService();