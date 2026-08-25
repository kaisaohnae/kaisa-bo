import React, { useEffect, useRef, useState } from 'react';

interface Company {
  cmpId: string;
  cmpNm: string;
}

interface Props {
  cmpId?: string;
  required?: boolean;
  onSelectCompany: (company: { cmpId: string }) => void;
  authUser: { cmpId: string; cmpNm: string };
}

export default function SelectCompany({ cmpId = '', required = false, onSelectCompany, authUser }: Props) {
  const [inputValue, setInputValue] = useState(cmpId);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [searchList, setSearchList] = useState<Company[]>([]);
  const [active, setActive] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load company list on mount
  useEffect(() => {
    if (authUser.cmpId === 'kaisa') {
      const stored = localStorage.getItem('companyList');
      setCompanyList(stored ? JSON.parse(stored) : []);
    } else {
      setCompanyList([{ cmpId: authUser.cmpId, cmpNm: authUser.cmpNm }]);
    }
  }, [authUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (!val) {
      setActive(false);
      setSearchList([]);
      return;
    }

    const matches = companyList.filter(c => c.cmpId.includes(val)).slice(0, 6);
    setSearchList(matches);
    setHighlightIdx(0);
    setActive(matches.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!active) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx(prev => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx(prev => (prev < searchList.length - 1 ? prev + 1 : prev));
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const selected = searchList[highlightIdx];
      if (selected) {
        selectCompany(selected);
      }
    }
  };

  const selectCompany = (company: Company) => {
    setInputValue(company.cmpId);
    setActive(false);
    onSelectCompany({ cmpId: company.cmpId });
  };

  const handleBlur = () => {
    setTimeout(() => setActive(false), 100); // allow click to register
    onSelectCompany({ cmpId: inputValue });
  };

  return (
    <span className="selectCompanyWrap">
      <input
        type="text"
        className="cmpId"
        required={required}
        placeholder="업체ID를 입력하세요"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />

      {active && searchList.length > 0 && (
        <div className="layerCompany">
          <ul>
            {searchList.map((c, idx) => (
              <li
                key={idx}
                className={highlightIdx === idx ? 'on' : ''}
                onClick={() => selectCompany(c)}
              >
                {c.cmpId}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
}
