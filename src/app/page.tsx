'use client';

import {useEffect, useState, useCallback, useMemo} from 'react';
import {
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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

interface DashboardResponseType {
  monthlyData?: Array<{reserveMonth?: string; sumPrice?: number | string}>;
  orderStateData?: Array<{orderStateCode?: string; orderStateCount?: number | string}>;
}

export default function MainDashboard() {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataType[]>([]);
  const [orderStateData, setOrderStateData] = useState<OrderStateType[]>([]);

  const ORDER_STATE_META = useMemo(() => ([
    {code: '예약중', key: 'reserving', color: '#ff7b36'},
    {code: '예약취소', key: 'canceled', color: '#a3aab8'},
    {code: '결제취소', key: 'paymentCanceled', color: '#7e8699'},
    {code: '결제완료', key: 'paymentCompleted', color: '#4f46e5'},
  ]), []);

  const parseNumber = useCallback((value: number | string | null | undefined) => {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : 0;
    }
    if (typeof value === 'string') {
      const normalized = value.replace(/,/g, '').trim();
      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
  }, []);

  const getStateCount = useCallback((code: string) => {
    return orderStateData.find(o => o.orderStateCode === code)?.orderStateCount ?? 0;
  }, [orderStateData]);

  useEffect(() => {
    MainService.dashboard({}).then((res: DashboardResponseType) => {
      const normalizedMonthlyData: MonthlyDataType[] = (res.monthlyData || []).map(item => ({
        reserveMonth: String(item.reserveMonth || ''),
        sumPrice: parseNumber(item.sumPrice),
      }));

      const normalizedOrderStateData: OrderStateType[] = (res.orderStateData || []).map(item => ({
        orderStateCode: String(item.orderStateCode || ''),
        orderStateCount: parseNumber(item.orderStateCount),
      }));

      setMonthlyData(normalizedMonthlyData);
      setOrderStateData(normalizedOrderStateData);
    }).catch(console.error);
  }, [parseNumber]);

  const yDomain = useMemo(() => {
    const prices = monthlyData.map(d => d.sumPrice);
    const max = Math.max(...prices, 0);
    const min = Math.min(...prices, 0);
    return [Math.floor(min * 0.9), Math.ceil(max * 1.1)];
  }, [monthlyData]);

  const totalOrderCount = useMemo(() => {
    return orderStateData.reduce((sum, item) => sum + item.orderStateCount, 0);
  }, [orderStateData]);

  const completionRate = useMemo(() => {
    if (totalOrderCount === 0) {
      return 0;
    }
    return (getStateCount('결제완료') / totalOrderCount) * 100;
  }, [getStateCount, totalOrderCount]);

  const averageMonthlySales = useMemo(() => {
    if (monthlyData.length === 0) {
      return 0;
    }
    const total = monthlyData.reduce((sum, item) => sum + item.sumPrice, 0);
    return total / monthlyData.length;
  }, [monthlyData]);

  const getYearFromReserveMonth = useCallback((value?: string) => {
    if (!value) {
      return null;
    }

    const normalized = value.trim();
    const directYear = normalized.match(/^(19|20)\d{2}/);
    if (directYear) {
      return directYear[0];
    }

    const shortYearAtStart = normalized.match(/^(\d{2})([-./]|\s|$)/);
    if (shortYearAtStart) {
      const yy = Number(shortYearAtStart[1]);
      const fullYear = yy >= 70 ? 1900 + yy : 2000 + yy;
      return String(fullYear);
    }

    const compactYear = normalized.match(/(19|20)\d{2}/);
    if (compactYear) {
      return compactYear[0];
    }

    return null;
  }, []);

  const currentYearSales = useMemo(() => {
    const currentYear = new Date().getFullYear().toString();
    const rowsWithYear = monthlyData.filter(item => getYearFromReserveMonth(item.reserveMonth));

    if (rowsWithYear.length === 0) {
      // API가 월 텍스트만 주는 경우 전체를 당해년도 데이터로 간주
      return monthlyData.reduce((sum, item) => sum + item.sumPrice, 0);
    }

    return monthlyData
      .filter(item => getYearFromReserveMonth(item.reserveMonth) === currentYear)
      .reduce((sum, item) => sum + item.sumPrice, 0);
  }, [getYearFromReserveMonth, monthlyData]);

  const bestMonth = useMemo(() => {
    if (monthlyData.length === 0) {
      return {reserveMonth: '-', sumPrice: 0};
    }
    return monthlyData.reduce((best, current) => current.sumPrice > best.sumPrice ? current : best, monthlyData[0]);
  }, [monthlyData]);

  const pieData = useMemo(() => {
    return ORDER_STATE_META.map(item => ({
      name: item.code,
      value: getStateCount(item.code),
      color: item.color,
    }));
  }, [ORDER_STATE_META, getStateCount]);

  const stateBarData = useMemo(() => {
    return ORDER_STATE_META.map(item => ({
      name: item.code,
      count: getStateCount(item.code),
      fill: item.color,
      ratio: totalOrderCount === 0 ? 0 : (getStateCount(item.code) / totalOrderCount) * 100,
    }));
  }, [ORDER_STATE_META, getStateCount, totalOrderCount]);

  return (
    <div id="main">
      <div className="dashboardKpi">
        <article className="kpiCard">
          <p className="kpiTitle">이번년도 매출</p>
          <p className="kpiValue">{currentYearSales.toLocaleString('ko-KR')}원</p>
        </article>
        <article className="kpiCard">
          <p className="kpiTitle">월 평균 매출</p>
          <p className="kpiValue">{Math.round(averageMonthlySales).toLocaleString('ko-KR')}원</p>
        </article>
        <article className="kpiCard">
          <p className="kpiTitle">최고 매출 월</p>
          <p className="kpiValue">{bestMonth.reserveMonth}</p>
          <p className="kpiSub">{bestMonth.sumPrice.toLocaleString('ko-KR')}원</p>
        </article>
        <article className="kpiCard">
          <p className="kpiTitle">결제완료 비율</p>
          <p className="kpiValue">{completionRate.toFixed(1)}%</p>
          <p className="kpiSub">총 {totalOrderCount.toLocaleString('ko-KR')}건 기준</p>
        </article>
      </div>

      <ul className="orderState orderStateModern">
        {ORDER_STATE_META.map(({code, key, color}) => (
          <li key={code} className={key}>
            <p className="stateName">{code}</p>
            <p className="stateCount" style={{color}}>{getStateCount(code).toLocaleString('ko-KR')}</p>
          </li>
        ))}
      </ul>

      <section className="chartGrid">
        <article className="chartCard">
          <h3>월별 매출 추이</h3>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyData} margin={{top: 20, right: 10, left: 0, bottom: 0}}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6d5efc" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6d5efc" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="reserveMonth"/>
              <YAxis
                domain={yDomain}
                tickFormatter={(value) => `${Math.floor(value / 10000)}만`}
              />
              <Tooltip formatter={(value: number) => `${value.toLocaleString('ko-KR')}원`}/>
              <Area
                type="monotone"
                dataKey="sumPrice"
                stroke="#6d5efc"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </article>

        <article className="chartCard">
          <h3>주문 상태 분포</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color}/>
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value.toLocaleString('ko-KR')}건`, name]}/>
            </PieChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className="chartGridSecondary">
        <article className="chartCard">
          <h3>주문 진행 요약</h3>
          <ul className="stateRatioList">
            {stateBarData.map((item) => (
              <li key={item.name}>
                <div className="stateRatioMeta">
                  <span>{item.name}</span>
                  <strong>{item.count.toLocaleString('ko-KR')}건</strong>
                </div>
                <div className="stateRatioBar">
                  <span style={{width: `${item.ratio}%`, backgroundColor: item.fill}}/>
                </div>
                <p className="stateRatioText">{item.ratio.toFixed(1)}%</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="chartCard chartCardWide">
          <h3>상태별 주문 건수</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stateBarData} margin={{top: 20, right: 10, left: 0, bottom: 0}}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6d5efc" stopOpacity={0.95}/>
                  <stop offset="95%" stopColor="#a89fff" stopOpacity={0.85}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="name"/>
              <YAxis allowDecimals={false}/>
              <Tooltip formatter={(value: number) => `${value.toLocaleString('ko-KR')}건`}/>
              <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>
    </div>
  );
}
