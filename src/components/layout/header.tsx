'use client';

import React, {useState, useMemo, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import useAuthStore from '@/store/use-auth-store';
import useSettingStore from '@/store/use-setting-store';
import SvgLogo from '@/components/icons/common/svg-logo';
import {usePathname} from 'next/navigation';
import useAlertStore from '@/store/use-alert-store';
import ModalSettings from '@/components/modal/modal-settings';

export default function Header() {
  const auth = useAuthStore();
  const setting = useSettingStore();
  const {showAlert} = useAlertStore();
  const [showModalSettings, setShowModalSettings] = useState(false);
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const menuList = useMemo(() => setting.menuList, [setting.menuList]);

  useEffect(() => {
    // showAlert({message: 'alert 테스트'})
  }, []);

  const searchList = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return [];
    return menuList.filter(menu => menu.menuName?.toLowerCase().includes(keyword));
  }, [searchKeyword, menuList]);

  const toggleFav = menu => {
    const favList = setting.favList;
    const idx = favList.findIndex(fav => fav.menuId === menu.menuId);
    if (idx !== -1) {
      favList.splice(idx, 1);
    } else {
      favList.push(menu);
    }
    setting.setFavList(favList);
  };

  const clickMenu = menu => {
    setting.setHash(menu.path);
    router.push(menu.path);
    // setting.setMenuActive(false);
  };

  const clickHome = () => {
    setting.setHash('/');
    router.push('/');
  };

  const clickFav = fav => {
    setting.setHash(fav.path);
    router.push(fav.path);
  };

  const closeAll = () => {
    if (confirm('즐겨찾기를 모두 지우시겠습니까?')) {
      setting.setFavList([]);
    }
  };

  const toggleMenu = () => {
    setting.setMenuActive(!setting.menuActive);
  };

  const openSetting = () => {
    setShowModalSettings(!showModalSettings);
  }

  return (
      <>
        {showModalSettings && (
          <ModalSettings onClose={() => setShowModalSettings(false)} />
        )}
        <div id="header" className={setting.menuActive ? 'menu-on' : 'menu'}>
          <div className="btnMenu" onClick={toggleMenu}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <ul className="userInfo">
            <li className="name">
              <b>
                <span className="icon user">&#xe809;</span>
                {auth.userInfo.userName}님
              </b>
            </li>
            <li className="btn">
              <u onClick={() => auth.logout(router.push)} style={{cursor: 'pointer'}}>
                로그아웃
              </u>
              <u className="icon setting" style={{cursor: 'pointer', paddingLeft: 10}} onClick={openSetting}>&#xe0cb;</u>
            </li>
          </ul>
          <div className="tab">
            <ul>
              <li className={setting.hash === '/main' ? 'active' : ''}>
                <span className="icon home" onClick={clickHome}>
                  &#xe819;
                </span>
              </li>
              {setting.favList.map((fav, i) => (
                <li key={i} className={setting.hash === fav.path ? 'active' : ''}>
                  <span className="name" onClick={() => clickFav(fav)}>
                    {fav.menuName}
                  </span>
                  <span className="icon close" onClick={() => toggleFav(fav)}>
                    &#xe042;
                  </span>
                </li>
              ))}
            </ul>
            <span className="icon closeAll" onClick={closeAll}>
              &#xe0de;
            </span>
          </div>
        </div>

        <div id="side" className={setting.menuActive ? 'menu-on' : ''}>
          <h1 onClick={clickHome}>
            {auth.userInfo.companyId === 'kaisa' ? (<SvgLogo width={100} fill="#666666" />) : (<span className="logo">{auth.userInfo.companyId} <b>admin</b></span>)}
          </h1>
          <div className="search">
            <input value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} placeholder="메뉴 검색" />
          </div>
          <div className="wrap">
            {searchList.length > 0 ? (
              <div className="searchList">
                <ul>
                  {searchList.map((menu, i) => (
                    <li key={i} className={setting.hash === menu.path ? 'active' : ''} onClick={() => clickMenu(menu)}>
                      <span className="icon pre" dangerouslySetInnerHTML={{__html: menu.icon}} />
                      <span className="name" dangerouslySetInnerHTML={{__html: menu.menuName}} />
                      <span
                        className={`icon fav${menu.fav ? ' on' : ''}`}
                        onClick={e => {
                          e.stopPropagation();
                          toggleFav(menu);
                        }}
                      >
                        &#xe807;
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="menuList">
                <ul>
                  {menuList.map((menu, j) => (
                    <li key={j} className={setting.hash === menu.path ? 'active' : ''} onClick={() => clickMenu(menu)}>
                      <span className="icon pre" dangerouslySetInnerHTML={{__html: menu.icon}} />
                      <span className="name">{menu.menuName}</span>
                      <span
                        className={`icon fav${setting.favList.some(fav => fav.menuId === menu.menuId) ? ' on' : ''}`}
                        onClick={e => {
                          e.stopPropagation();
                          toggleFav(menu);
                        }}
                      >
                        &#xe807;
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {setting.menuActive && <div id="mask" onClick={toggleMenu}></div>}
      </>
  );
}
