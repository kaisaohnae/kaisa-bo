'use client';

import {useEffect, useState, useCallback, useMemo} from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import MainService from '@/service/common/main-service';

interface MonthlyDataType {
  reserveMonth: string;
  sumPrice: number;
}

interface OrderStateType {
  orderStateCode: string;
  orderStateCount: number;
}

export default function MainDashboard() {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataType[]>([]);
  const [orderStateData, setOrderStateData] = useState<OrderStateType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const getStateCount = useCallback((code: string) => {
    return orderStateData.find(o => o.orderStateCode === code)?.orderStateCount ?? 0;
  }, [orderStateData]);

  useEffect(() => {
    MainService.dashboard({}).then(res => {
      setTotalPrice(res.totalPrice);
      setMonthlyData(res.monthlyData);
      setOrderStateData(res.orderStateData);
    }).catch(console.error);
  }, []);

  const yDomain = useMemo(() => {
    const prices = monthlyData.map(d => d.sumPrice);
    const max = Math.max(...prices, 0);
    const min = Math.min(...prices, 0);
    return [Math.floor(min * 0.9), Math.ceil(max * 1.1)];
  }, [monthlyData]);

  return (
    <div id="main">
      <ul className="orderState">
        {[
          {code: '예약중', className: 'reserving'},
          {code: '예약취소', className: 'canceled'},
          {code: '결제취소', className: 'paymentCanceled'},
          {code: '결제완료', className: 'paymentCompleted'},
        ].map(({code, className}) => (
          <li key={code} className={className}>
            <p className="codeName">{code}</p>
            <p className="count">{getStateCount(code)}</p>
          </li>
        ))}
      </ul>

      <div style={{width: '100%', padding: '10px 0 20px 0', overflow: 'auto'}}>
        <ResponsiveContainer width={1670} height={300}>
          <LineChart data={monthlyData} margin={{top: 10, right: 0, left: 0, bottom: 0}}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#be90ff" stopOpacity={1}/>
                <stop offset="100%" stopColor="white" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2"/>
            <XAxis dataKey="reserveMonth"/>
            <YAxis
              domain={yDomain}
              tickFormatter={(value) => `${Math.floor(value / 10000)}`} // 만 단위
            />
            <Tooltip/>
            <Line
              type="monotone"
              dataKey="sumPrice"
              stroke="#9f7aea"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*<div className="totalPrice">총 매출: {totalPrice.toLocaleString()}</div>*/}
    </div>
  );
}
