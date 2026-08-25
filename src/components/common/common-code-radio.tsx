import React, {useEffect, useState} from 'react';
import useSettingStore from '@/store/use-setting-store';

interface Props {
  cd: string;
  model: string;
  defaultText?: string;
  onSetData: (value: string) => void;
}

export default function CommonCodeRadio({cd, model, defaultText = '전체', onSetData}: Props) {
  const setting = useSettingStore();
  const [value, setValue] = useState<string>(model);

  useEffect(() => {
    setValue(model); // 외부에서 model이 바뀔 경우 동기화
  }, [model]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onSetData(selectedValue);
  };

  const codeList = setting.codeList[cd] || [];

  return (
    <div className="common-code-radio" style={{padding: '7px 0 4px 0'}}>
      <label>
        <input type="radio" value="" checked={value === ''} onChange={handleChange} />
        {defaultText}
      </label>
      {codeList.map((o: any, idx: number) => (
        <label key={idx}>
          <input type="radio" value={o.codeValue} checked={value === o.codeValue} onChange={handleChange} />
          {o.codeName}
        </label>
      ))}
    </div>
  );
}
