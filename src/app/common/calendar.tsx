'use client';

import React, {useEffect, useState} from 'react';
import MainService from '@/service/common/main-service';
import dateUtil from '@/utils/date-util';

export default function Calendar() {
  const [calendar, setCalendar] = useState({
    date: new Date(),
    year: dateUtil.format(new Date(), 'YYYY'),
    month: dateUtil.format(new Date(), 'MM'),
    days: []
  });

  const getClassForOrderState = orderStateCode => {
    switch (orderStateCode) {
      case '결제완료':
        return 'paid';
      case '예약중':
        return 'pending';
      case '예약가능':
        return 'available';
      default:
        return 'default';
    }
  };

  const move = direction => {
    const newDate = new Date(calendar.date);
    newDate.setMonth(direction === 'prev' ? newDate.getMonth() - 1 : newDate.getMonth() + 1);
    setCalendar(prev => ({
      ...prev,
      date: newDate,
      year: dateUtil.format(newDate, 'YYYY'),
      month: dateUtil.format(newDate, 'MM')
    }));
  };

  const getFirstDay = () => {
    return new Date(calendar.date.getFullYear(), calendar.date.getMonth(), 1).getDay();
  };

  const getList = () => {
    MainService.calendar({
      year: calendar.year,
      month: calendar.month
    }).then(res => {
      const data = res.data || [];
      const daysArray: any[] = [];
      const firstDayOfMonth = getFirstDay();
      const totalDaysInMonth = new Date(calendar.date.getFullYear(), calendar.date.getMonth() + 1, 0).getDate();

      for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push({day: 0, reservations: []});
      }

      for (let i = 1; i <= totalDaysInMonth; i++) {
        const dateStr = `${calendar.year}-${calendar.month}-${i.toString().padStart(2, '0')}`;
        const dayData = data.find(item => item.day === dateStr);
        daysArray.push({
          day: i,
          reservations: dayData?.reservations || []
        });
      }

      setCalendar((prev: any) => ({...prev, days: daysArray}));
    });
  };

  useEffect(() => {
    getList();
  }, [calendar.year, calendar.month]);

  return (
    <div id="calendar">
      <div className="calendar-controls">
        <h2>
          <span className="icon" onClick={() => move('prev')}>
            ➖
          </span>
          <span className="calendar-nav">
            {calendar.year} 년 {calendar.month} 월
          </span>
          <span className="icon" onClick={() => move('next')}>
            ➕
          </span>
        </h2>
      </div>
      <div className="calendar-grid">
        {calendar.days.map((o: any, index) => (
          <div className="calendar-day" key={index}>
            <div className="day-number">{o.day > 0 ? o.day : ''}</div>
            {o.reservations.length > 0 && (
              <div>
                {o.reservations.map((rsv, rsvIndex) => (
                  <div key={rsvIndex} className="product">
                    <p className={getClassForOrderState(rsv.orderStateCode)}>
                      <span className="productName">{rsv.productName}</span>
                      <span className="price">{rsv.price}</span>
                      <span className="orderStateCode">{rsv.orderStateCode}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
