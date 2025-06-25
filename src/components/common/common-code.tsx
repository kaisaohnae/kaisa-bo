import React, {useEffect, useMemo, useState} from 'react';
import useSettingStore from '@/store/use-setting-store';

interface Props {
  cd: string;
  model: string | number;
  defaultText?: string;
  onSetData: (value: string | number) => void;
}

export default function SelectBox({cd, model, defaultText = '선택하세요.', onSetData}: Props) {
  const setting = useSettingStore();
  const [value, setValue] = useState<string | number>(model);

  const codeList = useMemo(() => {
    // if (cd.startsWith('is')) {
    //   return [
    //     { codeName: '예', codeValue: 1 },
    //     { codeName: '아니오', codeValue: 0 },
    //   ];
    // }
    return setting.codeList[cd] || [];
  }, [cd, setting.codeList]);

  useEffect(() => {
    setValue(model); // model이 바뀌면 동기화
  }, [model]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setValue(selected);
    onSetData(selected);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option disabled value="">
        {defaultText}
      </option>
      {codeList.map((o: any, idx: number) => (
        <option key={idx} value={o.codeValue}>
          {o.codeName}
        </option>
      ))}
    </select>
  );
}
