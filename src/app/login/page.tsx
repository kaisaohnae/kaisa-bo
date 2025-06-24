'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import AuthService from '@/service/common/auth-service';
import { useSettingStore } from '@/store/use-setting-store';
import { useAuthStore } from '@/store/use-auth-store';
import { useAlertStore } from '@/store/use-alert-store';

interface LoginInfo {
  userId: string;
  pwd: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const setting = useSettingStore();
  const auth = useAuthStore();
  const alert = useAlertStore();

  const savedSettings = null;

  const [param, setParam] = useState<LoginInfo>({
    userId: '',
    pwd: '',
    remember: false,
  });

  useEffect(() => {
    if (!savedSettings) {
      // setting.setState();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setParam((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (param.remember) {
      // setting.userId = param.userId;
    } else {
      // setting.userId = '';
    }

    try {
      const res = await AuthService.login(param);
      if (res) {
        // setting.setState();
        auth.loginSuccess(res.data, router.push);
      } else {
        auth.loginFail();
        alert.open({ title: null, message: '회원정보와 일치하지 않습니다.' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="login">
      <form onSubmit={submitForm} method="POST" ref={formRef}>
        <fieldset>
          <legend>로그인</legend>
          <h1>관리자 로그인</h1>

          <label className="label">
            <span className="icon">&#xe809;</span>
            <input
              type="text"
              name="userId"
              value={param.userId}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              required
            />
          </label>

          <label className="label">
            <span className="icon">&#xe81c;</span>
            <input
              type="password"
              name="pwd"
              value={param.pwd}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              required
            />
          </label>

          <label>
            <input
              type="checkbox"
              name="remember"
              checked={param.remember}
              onChange={handleChange}
            />{' '}
            <span className="remember">아이디 저장</span>
          </label>

          <button type="submit">로그인</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
