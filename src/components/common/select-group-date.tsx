import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  date: any[];
  format?: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm';
  isAll?: boolean;
  isTerm?: boolean;
  term?: number;
  onSetStartDate: (val: {date: string | null}) => void;
  onSetEndDate: (val: {date: string | null}) => void;
}

export default function SelectGroupDate({date, format = 'yyyy-MM-dd', isAll = true, isTerm = true, term = 0, onSetStartDate, onSetEndDate}: Props) {
  const [allChecked, setAllChecked] = useState(isAll);
  const [currentTerm, setCurrentTerm] = useState(term);
  const [startDate, setStartDate] = useState<Date | null>(date[0] ? new Date(date[0]) : null);
  const [endDate, setEndDate] = useState<Date | null>(date[1] ? new Date(date[1]) : null);

  const handleTermClick = (n: number) => {
    setCurrentTerm(n);
    let selectDate = new Date();
    switch (n) {
      case 1: // 1주일
        selectDate.setDate(selectDate.getDate() - 7);
        break;
      case 2: // 3개월
        selectDate.setMonth(selectDate.getMonth() - 3);
        break;
      case 3: // 6개월
        selectDate.setMonth(selectDate.getMonth() - 6);
        break;
      default:
        break;
    }
    setAllChecked(false);
    setStartDate(selectDate);
    onSetStartDate({date: formatDate(selectDate)});
    setEndDate(new Date());
    onSetEndDate({date: formatDate(new Date())});
  };

  const handleAllChecked = () => {
    setCurrentTerm(0);
    setAllChecked(!allChecked);
    if (allChecked) {
      setStartDate(null);
      onSetStartDate({date: null});
      setEndDate(null);
      onSetEndDate({date: null});
    } else {
      handleTermClick(1);
    }
  };

  useEffect(() => {
    if (startDate) {
      onSetStartDate({date: formatDate(startDate)});
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      onSetEndDate({date: formatDate(endDate)});
    }
  }, [endDate]);

  const formatDate = (date: Date | null) => {
    return date ? (format === 'yyyy-MM-dd' ? date.toISOString().slice(0, 10) : date.toISOString().slice(0, 16).replace('T', ' ')) : null;
  };

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div className="all-wrap" style={{display: isTerm ? 'inline-block' : 'none'}}>
        {isTerm && (
          <label>
            <input type="checkbox" checked={allChecked} onChange={handleAllChecked} /> 전체
          </label>
        )}
      </div>
      {isTerm && (
        <div className="term-wrap" style={{display: isTerm ? 'inline-block' : 'none'}}>
          <button type="button" className={`button small gray ${currentTerm === 1 ? 'on' : ''}`} onClick={() => handleTermClick(1)}>
            1주일
          </button>
          <button type="button" className={`button small gray ${currentTerm === 2 ? 'on' : ''}`} onClick={() => handleTermClick(2)}>
            3개월
          </button>
          <button type="button" className={`button small gray ${currentTerm === 3 ? 'on' : ''}`} onClick={() => handleTermClick(3)}>
            6개월
          </button>
        </div>
      )}
      {!allChecked && (
        <>
          <div className="picker-wrap" style={{paddingRight: 5}}>
            <DatePicker selected={startDate} onChange={(date: Date | null) => setStartDate(date)} dateFormat={format === 'yyyy-MM-dd' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'} placeholderText={format === 'yyyy-MM-dd' ? '날짜 선택' : '날짜 및 시간 선택'} showTimeSelect={format !== 'yyyy-MM-dd'} timeIntervals={30} timeCaption="시간" disabled={allChecked} />
          </div>
          <div className="picker-wrap">
            <DatePicker selected={endDate} onChange={(date: Date | null) => setEndDate(date)} dateFormat={format === 'yyyy-MM-dd' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'} placeholderText={format === 'yyyy-MM-dd' ? '날짜 선택' : '날짜 및 시간 선택'} showTimeSelect={format !== 'yyyy-MM-dd'} timeIntervals={30} timeCaption="시간" disabled={allChecked} />
          </div>
        </>
      )}
    </div>
  );
}
