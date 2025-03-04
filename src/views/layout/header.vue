<template>
  <div id="header" v-bind:class="{menuOn : setting.menu.active}">
    <div class="btnMenu" @click="toggleMenu()">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <ul class="userInfo">
      <li class="name">
        <b><span class="icon user">&#xe809;</span>{{ auth.userInfo.userName }}님</b>
      </li>
      <li class="btn">
        <u v-on:click="auth.logout(router)" style="cursor:pointer;">로그아웃</u>
      </li>
    </ul>
    <div class="tab">
      <ul>
        <li v-bind:class="{ active: setting.hash == '/main' }"><span class="icon home" @click="clickHome()">&#xe819;</span></li>
        <template v-for="(fav) in setting.favList" :key="fav">
          <li v-bind:class="{ active: setting.hash == fav.path }"><span class="name" @click="clickFav(fav)">{{ fav.menuName }}</span> <span class="icon close" @click="toggleFav(fav)">&#xe042;</span></li>
        </template>
      </ul>
      <span class="icon closeAll" @click="closeAll">&#xe0de;</span>
    </div>
  </div>

  <div id="side" v-bind:class="{menuOn : setting.menu.active}">
    <h1 @click="clickHome()"><img :src="logoImgUrl" alt=""/></h1>
    <div class="search">
      <input v-model="data.searchKeyword" @input="menuSearch" placeholder="메뉴 검색"/>
    </div>
    <div class="wrap">
      <div class="searchList" v-show="data.searchList.length > 0">
        <ul>
          <li v-for="(menu, idx) in data.searchList" :key="idx" @click="clickMenu(menu)" v-bind:class="{ active: setting.hash === menu.path }">
            <span class="icon pre" v-html="menu.icon"></span>
            <span class="name" v-html="menu.menuName"></span>
            <span class="icon fav" v-bind:class="{on : menu.fav}" @click="toggleFav(menu)">&#xe807;</span>
          </li>
        </ul>
      </div>
      <div class="menu" v-for="(o, i) in menuList" :key="i" v-bind:class="{'on': o.active }" v-show="o.menu.length > 0 && data.searchList.length === 0">
        <h2>{{ o.pathName }}</h2>
        <ul>
          <li v-for="(menu, idx) in o.menu" :key="idx" @click="clickMenu(menu)" v-bind:class="{ active: setting.hash === menu.path }">
            <span class="icon pre" v-html="menu.icon"></span>
            <span class="name">{{ menu.menuName }}</span>
            <span class="icon fav" v-bind:class="{on : menu.fav}" @click="toggleFav(menu)">&#xe807;</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/store/auth-store';
import {useSettingStore} from '@/store/setting-store';
import logoImgUrl from '@/assets/img/common/kaisa.png';

const auth = useAuthStore();
const setting = useSettingStore();
const router = useRouter();
const menuList = computed(() => auth.menuList);

const data = reactive({
  path: '',
  searchKeyword: '',
  searchList: [] as any,
});
const menuSearch = () => {
  const keyword = data.searchKeyword.trim().toLowerCase();
  if (keyword) {
    data.searchList = menuList.value
      .flatMap((group: any) => group.menu)
      .filter((menu: any) =>
        menu.menuName.toLowerCase().includes(keyword)
      );
  } else {
    data.searchList = [];
  }
}
const toggleFav = (menu: any) => {
  auth.menuList = auth.menuList.map((group: any) => ({
    ...group,
    menu: group.menu.map((m: any) => {
      if (m.menuId === menu.menuId) {
        return { ...m, fav: !m.fav }; // 즐겨찾기 상태 반전
      }
      return m;
    }),
  }));
  const idx = setting.favList.findIndex((fav: any) => fav.menuId === menu.menuId);
  if (idx !== -1) {
    setting.favList.splice(idx, 1);
  } else {
    setting.favList.push(menu);
  }
  setting.setState();
}
const closeAll = () => {
  if (confirm('즐겨찾기를 모두 지우시겠습니까?')) {
    setting.favList = [];
    setting.setState();
  }
}
const toggleMenu = () => {
  setting.menu.active = !setting.menu.active;
  setting.setState();
}
const clickMenu = (menu: any) => {
  setting.hash = menu.path;
  setting.setState();
  router.push(menu.path);
}
const clickHome = () => {
  setting.hash = '/main';
  setting.setState();
  router.push('/main');
}
const clickFav = (fav: any) => {
  setting.hash = fav.path;
  setting.setState();
  router.push(fav.path);
}
</script>

<style scoped>
#header {width:100%; height:100px; overflow:hidden; padding:10px 10px 0 10px; position:relative; z-index:2;}
#header .userInfo {text-align:right; padding:0 0 0 0; color:#333;}
#header .userInfo li {display:inline-block; padding:0 5px;}
#header .btnMenu {width:30px; height:50px; position:fixed; z-index:91; left:13px; top:13px; cursor:pointer;}
#header .btnMenu ul {width:30px; position:relative;}
#header .btnMenu ul li {position:absolute; width:30px; height:3px; background:#111; margin-bottom:5px; border-radius:3px;}
#header .btnMenu ul li:nth-child(1) {left:0; top:0;}
#header .btnMenu ul li:nth-child(2) {left:0; top:10px;}
#header .btnMenu ul li:nth-child(3) {left:0; top:20px;}
#header .btnMenu:hover ul li {background:#000;}
#header .btnMenu:hover ul li:nth-child(1) {transform: rotate(45deg); width:20px; left:14px; top:4px;}
#header .btnMenu:hover ul li:nth-child(3) {transform: rotate(-45deg); width:20px; left:14px; top:16px;}

#header .tab {height:40px; padding:0; margin-top:27px; width:100%; overflow:auto; text-align:left; white-space: nowrap;}
#header .tab ul {width:calc(100% - 32px); overflow:hidden; height:40px;}
#header .tab ul li {height:40px; border:1px solid #ccc; color:#777; border-radius:0 8px 0 0; background:#eee; line-height:40px; padding:0 15px 0 10px; display:inline-block; position:relative;}
#header .tab ul li.active {background:#fff; color:#222; border-bottom:1px solid #fff;}
#header .tab ul li .name {cursor:pointer; display:inline-block; padding:0 10px;}
#header .tab ul li .name:hover {color:#000;}
#header .tab ul li a {color:#333;}
#header .tab ul li .icon.home  {font-size:23px; color:#333; vertical-align:middle; cursor:pointer;}
#header .tab ul li .close {position:absolute; right:-4px; top:-3px; color:#aaa; cursor:pointer; width:20px; height:20px; overflow:hidden;}
#header .tab ul li .close:hover {transform: rotate(90deg); right:-5px; top:-2px; color:#666;}
#header .tab .closeAll {cursor:pointer; border:1px solid #aaa; position:absolute; right:2px; color:#666; bottom:4px; width:31px; height:30px; line-height:30px;}
#header .tab .closeAll:hover {color:#000; background:rgba(255,255,255,0.2);}
#header.menuOn .btnMenu {left:230px;}
#header.menuOn .btnMenu ul li:nth-child(1) {transform: rotate(-45deg); width:20px; left:-4px; top:4px;}
#header.menuOn .btnMenu ul li:nth-child(3) {transform: rotate(45deg); width:20px; left:-4px; top:16px;}
#side.menuOn {left:0;}
#side {width:220px; box-shadow:0 0 3px 1px rgba(0,0,0,0.5); background:#222; border-right:1px solid #000; height:100%; position:fixed; left:-230px; top:0; z-index:200; white-space:nowrap;}
#side h1 {width:100%; text-align:left; overflow:hidden; cursor:pointer;}
#side h1 img {width:50%; margin:10px 0 -20px 0;}
#side .search {padding:10px;}
#side .search input {width:100%; background:#333; border:0; color:#000; padding: 0 15px;}
#side .search input::placeholder {color:#777;}
#side .wrap {width:100%; padding-bottom:10px; height:calc(100% - 135px); border-right:1px solid rgba(255,255,255,0.1); overflow:auto;}
#side .menu {width:220px; height:40px; overflow:hidden;}
#side .menu.on {height:auto;}
#side .menu h2 {padding:0 20px; background:#222; color:#555; height:40px; line-height:40px; display:none;}
#side ul {width:100%;}
#side ul li {padding:0; color:#bbb; cursor:pointer; height:45px; line-height:45px; position:relative; overflow:hidden;}
#side ul li span.pre {position:absolute; font-size:13px; left:15px; top: 10px; opacity: 0.5;}
#side ul li span.name {display:block; padding:0 45px; border-bottom:1px dashed #2e2e2e; height:45px; line-height:45px;}
#side ul li span.fav {position:absolute; right:0; width:45px; height: 45px; top:0; line-height:45px; opacity: 0.5;}
#side ul li span.fav.on {opacity:1; color:rgb(229, 255, 0);}
#side ul li.active {color:#FF9933;}
</style>
