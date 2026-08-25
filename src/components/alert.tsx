'use client';

import React, { useCallback } from 'react';
import useAlertStore from '@/store/use-alert-store';

export default function Alert() {
  const alert = useAlertStore(useCallback((state) => state.alert, []));
  const { hideAlert } = useAlertStore.getState();
  if (!alert) {
    return null;
  }
  return (
    <div id="alert">
      <div className="box">
        <div className="message">{alert.message}</div>
        <div className="buttons">
          {alert.buttons && alert.buttons.length > 0 ? (
            alert.buttons.map((btn: any, index: number) => (
              <button
                key={index}
                className={btn.type === 'on' ? 'on' : 'off'}
                style={btn.rate ? { flex: btn.rate } : { flex: 1 }}
                onClick={btn.callback}
              >
                {btn.text}
              </button>
            ))
          ) : (
            <button className="on" onClick={hideAlert}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
