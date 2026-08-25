'use client';

import React from 'react';
import useSettingStore from '@/store/use-setting-store';

interface CrudButtonsProps {
  menuId: string;
  add: () => void;
  del: () => void;
  save: () => void;
  showReset?: boolean; // 초기화 버튼 표시 여부
}

const CrudButtons: React.FC<CrudButtonsProps> = ({ menuId, add, del, save, showReset = true }) => {
  const menuList = useSettingStore(state => state.menuList);

  const currentMenu = menuList.find(m => m.menuId === menuId);
  const buttonRole = currentMenu?.buttonRole || '';

  const canCreate = buttonRole.includes('C');
  const canUpdate = buttonRole.includes('U');
  const canDelete = buttonRole.includes('D');

  return (
    <span className="crud">
      {canCreate && (
        <button type="button" className="button add" onClick={add}>
          <span className="icon">&#xe813;</span>추가
        </button>
      )}
      {canDelete && (
        <button type="button" className="button del" onClick={del}>
          <span className="icon">&#xe815;</span>삭제
        </button>
      )}
      {canUpdate && (
        <button type="button" className="button save" onClick={save}>
          <span className="icon">&#xe814;</span>저장
        </button>
      )}
      {showReset && (
        <button type="button" className="button reset" onClick={() => window.location.reload()}>
          <span className="icon">&#x22;</span>취소
        </button>
      )}
    </span>
  );
};

export default CrudButtons;
