import React, {useEffect, useState} from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

interface Props {
  date?: any[];
  format?: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm';
  isAll?: boolean;
  timer?: boolean;
  onSetStartDate: (val: {date: string | null}) => void;
}

export default function SelectDate({date = [new Date().toISOString().slice(0, 10)], format = 'yyyy-MM-dd', isAll = true, onSetStartDate}: Props) {
  const [allChecked, setAllChecked] = useState(isAll);
  const [startDate, setStartDate] = useState<Date | null>(!isAll && date[0] ? new Date(date[0]) : null);
  const placeholder = format === 'yyyy-MM-dd' ? '날짜 선택' : '날짜 및 시간 선택';

  const handleToggleAll = () => {
    const newAll = !allChecked;
    setAllChecked(newAll);
    if (newAll) {
      setStartDate(null);
      onSetStartDate({date: null});
    } else {
      const now = new Date();
      setStartDate(now);
      onSetStartDate({
        date: format === 'yyyy-MM-dd' ? now.toISOString().slice(0, 10) : now.toISOString().slice(0, 16).replace('T', ' ')
      });
    }
  };

  useEffect(() => {
    if (startDate && !allChecked) {
      onSetStartDate({
        date: format === 'yyyy-MM-dd' ? startDate.toISOString().slice(0, 10) : startDate.toISOString().slice(0, 16).replace('T', ' ')
      });
    }
  }, [startDate]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div className="all-wrap">
        {isAll && (
          <label>
            <input type="checkbox" checked={allChecked} onChange={handleToggleAll} /> 전체
          </label>
        )}
      </div>
      {!allChecked && (
        <div className="picker-wrap" style={{paddingRight: 5}}>
          <ReactDatePicker locale={ko} selected={startDate} onChange={date => setStartDate(date)} dateFormat={format === 'yyyy-MM-dd' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'} placeholderText={placeholder} showTimeSelect={format !== 'yyyy-MM-dd'} timeIntervals={30} timeCaption="시간" disabled={allChecked} className="input" />
        </div>
      )}
    </div>
  );
}
