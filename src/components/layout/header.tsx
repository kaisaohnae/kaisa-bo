'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/use-auth-store';
import { useSettingStore } from '@/store/use-setting-store';
import IconLogo from "@/components/icons/common/icon-logo";

export default function HeaderSideLayout() {
  const auth = useAuthStore();
  const setting = useSettingStore();
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState('');

  const menuList = useMemo(() => auth.menuList, [auth.menuList]);

  const searchList = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return [];
    return menuList.flatMap(group => group.menu).filter(menu => menu.menuName.toLowerCase().includes(keyword));
  }, [searchKeyword, menuList]);

  const toggleFav = (menu) => {
    auth.setMenus(
      auth.menuList.map(group => ({
        ...group,
        menu: group.menu.map(m =>
          m.menuId === menu.menuId ? { ...m, fav: !m.fav } : m
        ),
      }))
    );

    const idx = setting.favList.findIndex(fav => fav.menuId === menu.menuId);
    if (idx !== -1) setting.favList.splice(idx, 1);
    else setting.favList.push(menu);

    useSettingStore.setState({ favList: setting.favList });
  };

  const clickMenu = (menu) => {
    setting.hash = menu.path;

    useSettingStore.setState({ menu: setting.menu });

    router.push(menu.path);
  };

  const clickHome = () => {
    setting.hash = '/';
    useSettingStore.setState({ hash: setting.hash });
    router.push('/');
  };

  const clickFav = (fav) => {
    setting.hash = fav.path;
    useSettingStore.setState({ hash: setting.hash });
    router.push(fav.path);
  };

  const closeAll = () => {
    if (confirm('즐겨찾기를 모두 지우시겠습니까?')) {
      setting.favList = [];
      useSettingStore.setState({ favList: [] });

    }
  };

  const toggleMenu = () => {
    setting.menu.active = !setting.menu.active;
    useSettingStore.setState({ menu: setting.menu });
  };

  return (
    <>
      <div id="header" className={setting.menu.active ? 'menuOn' : ''}>
        <div className="btnMenu" onClick={toggleMenu}>
          <ul>
            <li></li><li></li><li></li>
          </ul>
        </div>
        <ul className="userInfo">
          <li className="name">
            <b><span className="icon user">&#xe809;</span>{auth.userInfo.userName}님</b>
          </li>
          <li className="btn">
            <u onClick={() => auth.logout(router.push)} style={{ cursor: 'pointer' }}>로그아웃</u>
          </li>
        </ul>
        <div className="tab">
          <ul>
            <li className={setting.hash === '/main' ? 'active' : ''}>
              <span className="icon home" onClick={clickHome}>&#xe819;</span>
            </li>
            {setting.favList.map((fav, i) => (
              <li key={i} className={setting.hash === fav.path ? 'active' : ''}>
                <span className="name" onClick={() => clickFav(fav)}>{fav.menuName}</span>
                <span className="icon close" onClick={() => toggleFav(fav)}>&#xe042;</span>
              </li>
            ))}
          </ul>
          <span className="icon closeAll" onClick={closeAll}>&#xe0de;</span>
        </div>
      </div>

      <div id="side" className={setting.menu.active ? 'menuOn' : ''}>
        <h1 onClick={clickHome}><IconLogo width={100} /></h1>
        <div className="search">
          <input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="메뉴 검색"
          />
        </div>
        <div className="wrap">
          {searchList.length > 0 ? (
            <div className="searchList">
              <ul>
                {searchList.map((menu, i) => (
                  <li
                    key={i}
                    className={setting.hash === menu.path ? 'active' : ''}
                    onClick={() => clickMenu(menu)}
                  >
                    <span className="icon pre" dangerouslySetInnerHTML={{ __html: menu.icon }} />
                    <span className="name" dangerouslySetInnerHTML={{ __html: menu.menuName }} />
                    <span className={`icon fav${menu.fav ? ' on' : ''}`} onClick={(e) => { e.stopPropagation(); toggleFav(menu); }}>
                      &#xe807;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            menuList.map((group, i) => (
              group.menu.length > 0 && (
                <div key={i} className={`menu${group.active ? ' on' : ''}`}>
                  <h2>{group.pathName}</h2>
                  <ul>
                    {group.menu.map((menu, j) => (
                      <li
                        key={j}
                        className={setting.hash === menu.path ? 'active' : ''}
                        onClick={() => clickMenu(menu)}
                      >
                        <span className="icon pre" dangerouslySetInnerHTML={{ __html: menu.icon }} />
                        <span className="name">{menu.menuName}</span>
                        <span className={`icon fav${menu.fav ? ' on' : ''}`} onClick={(e) => { e.stopPropagation(); toggleFav(menu); }}>
                          &#xe807;
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))
          )}
        </div>
      </div>
    </>
  );
}
