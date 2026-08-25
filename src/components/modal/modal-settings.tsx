'use client';

import React, { useState } from 'react';
import AuthService from '@/service/common/auth-service';
import useAlertStore from '@/store/use-alert-store';

interface Props {
  onClose: () => void;
}

export default function ModalSettings({ onClose }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showAlert } = useAlertStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 form 제출 막기

    if (!currentPassword || !newPassword || !confirmPassword) {
      showAlert({ message: '모든 항목을 입력해주세요.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert({ message: '새 비밀번호가 일치하지 않습니다.' });
      return;
    }

    try {
      const res = await AuthService.changePassword({
        currentPassword,
        newPassword,
      });

      if (res.success) {
        showAlert({ message: '비밀번호가 변경되었습니다.' });
        onClose();
      } else {
        showAlert({ message: res.message || '현재 비밀번호가 일치하지 않습니다.' });
      }
    } catch (error) {
      showAlert({ message: '비밀번호 변경 중 오류가 발생했습니다.' });
    }
  };

  return (
    <form className="modal-settings" autoComplete="off" onSubmit={handleSubmit}>
      <h2>비밀번호 변경</h2>

      <label>
        <h3>현재 비밀번호</h3>
        <input
          type="password"
          name="currentPassword"
          autoComplete="off"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          placeholder="현재 비밀번호 입력"
        />
      </label>

      <label>
        <h3>새 비밀번호</h3>
        <input
          type="password"
          name="newPassword"
          autoComplete="off"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="새 비밀번호 입력"
        />
      </label>

      <label>
        <h3>새 비밀번호 확인</h3>
        <input
          type="password"
          name="confirmPassword"
          autoComplete="off"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호 확인"
        />
      </label>

      <div className="buttons">
        <button type="submit">변경</button>
        <button type="button" onClick={onClose}>
          취소
        </button>
      </div>
    </form>
  );
}
