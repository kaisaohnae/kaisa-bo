import React, {useState} from 'react';

const Bank = () => {
    return (
      <>
        <div id="cs">
          <div className="cs">
            <dl>
              <dt><a href="tel:01071902632"><img src="/img/icon/ico_cs.png" alt=""/></a></dt>
              <dd>
                <p>09시 ~ 21시</p>
                <a href="tel:01071902632">전화 : <strong>010-7190-2632</strong></a>
              </dd>
            </dl>
          </div>
          <div className="info">
            <dl>
              <dt><img src="/img/icon/ico_bank_kb.png" alt=""/></dt>
              <dd>국민은행 : <strong>807502-04-127894</strong>
                예금주 : <strong>최원호</strong>
              </dd>
            </dl>
          </div>
        </div>
      </>
    );
  }
;

export default Bank;
