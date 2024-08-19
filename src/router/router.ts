import {createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Home from '@src/views/Home.vue';
import { useAuthStore } from '@src/store/authStore'; // 경로 확인

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'login',
    },
    component: () => import('@src/views/Login.vue'),
  },
  {path: '/403', name: '403', meta: {title: '403'}, component: () => import('@src/views/error/403.vue')},
  {path: '/500', name: '500', meta: {title: '403'}, component: () => import('@src/views/error/500.vue')},
  {path: '/:pathMatch(.*)*', name: '404', meta: {title: '404'}, component: () => import('@src/views/error/404.vue')},
  {
    path: '/',
    name: '',
    component: Home,
    children: [
      {
        path: '/main',
        name: 'main',
        meta: {
          title: 'main',
          auth: true,
        },
        component: () => import('@src/views/main/Main.vue'),
      },
      // 프로그램으로 만들지 않는...
      {
        path: '/cr/calendar',
        name: 'calendar',
        meta: {title: 'calendar', auth: true,},
        component: () => import( '@src/views/common/Calendar.vue'),
      },
      // 프로그램으로 자동생성
      /*{ path: '/at/auth', name: 'auth', meta: { title: '인증', auth: true }, component: () => import('@src/views/bs/Auth.vue'), },
      { path: '/at/company', name: 'company', meta: { title: '업체', auth: true }, component: () => import('@src/views/bs/Company.vue'), },
      { path: '/at/member', name: 'member', meta: { title: '회원', auth: true }, component: () => import('@src/views/bs/Member.vue'), },
      { path: '/at/menu', name: 'menu', meta: { title: '메뉴', auth: true }, component: () => import('@src/views/bs/Menu.vue'), },
      { path: '/at/menuCompanyRole', name: 'menuCompanyRole', meta: { title: '메뉴업체권한', auth: true }, component: () => import('@src/views/bs/MenuCompanyRole.vue'), },
      { path: '/at/user', name: 'user', meta: { title: '사용자', auth: true }, component: () => import('@src/views/bs/User.vue'), },
      { path: '/cr/code', name: 'code', meta: { title: '코드', auth: true }, component: () => import('@src/views/bs/Code.vue'), },
      { path: '/cr/dictionary', name: 'dictionary', meta: { title: '사전', auth: true }, component: () => import('@src/views/bs/Dictionary.vue'), },
      { path: '/cr/file', name: 'file', meta: { title: '파일', auth: true }, component: () => import('@src/views/bs/File.vue'), },
      { path: '/cr/fileDetail', name: 'fileDetail', meta: { title: '파일상세', auth: true }, component: () => import('@src/views/bs/FileDetail.vue'), },
      { path: '/cr/log', name: 'log', meta: { title: '로그', auth: true }, component: () => import('@src/views/bs/Log.vue'), },
      { path: '/cs/qna', name: 'qna', meta: { title: '문의', auth: true }, component: () => import('@src/views/bs/Qna.vue'), },
      { path: '/cs/qnaReply', name: 'qnaReply', meta: { title: '문의답변', auth: true }, component: () => import('@src/views/bs/QnaReply.vue'), },
      { path: '/od/holidayPrice', name: 'holidayPrice', meta: { title: '휴일가격', auth: true }, component: () => import('@src/views/bs/HolidayPrice.vue'), },
      { path: '/od/order', name: 'order', meta: { title: '주문', auth: true }, component: () => import('@src/views/bs/Order.vue'), },
      { path: '/od/season', name: 'season', meta: { title: '시즌', auth: true }, component: () => import('@src/views/bs/Season.vue'), },
      { path: '/od/seasonPrice', name: 'seasonPrice', meta: { title: '시즌가격', auth: true }, component: () => import('@src/views/bs/SeasonPrice.vue'), },
      { path: '/pd/board', name: 'board', meta: { title: '게시판', auth: true }, component: () => import('@src/views/bs/Board.vue'), },
      { path: '/pd/boardCategory', name: 'boardCategory', meta: { title: '게시판카테고리', auth: true }, component: () => import('@src/views/bs/BoardCategory.vue'), },
      { path: '/pd/boardReply', name: 'boardReply', meta: { title: '게시판댓글', auth: true }, component: () => import('@src/views/bs/BoardReply.vue'), },
      { path: '/pd/product', name: 'product', meta: { title: '상품', auth: true }, component: () => import('@src/views/bs/Product.vue'), },*/
      { path: '/at/auth', name: 'auth', meta: { title: '인증', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/at/company', name: 'company', meta: { title: '업체', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/at/member', name: 'member', meta: { title: '회원', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/at/menu', name: 'menu', meta: { title: '메뉴', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/at/menuCompanyRole', name: 'menuCompanyRole', meta: { title: '메뉴업체권한', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/at/user', name: 'user', meta: { title: '사용자', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/cr/code', name: 'code', meta: { title: '코드', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/cr/dictionary', name: 'dictionary', meta: { title: '사전', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/cr/file', name: 'file', meta: { title: '파일', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/cr/fileDetail', name: 'fileDetail', meta: { title: '파일상세', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/cr/log', name: 'log', meta: { title: '로그', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/cs/qna', name: 'qna', meta: { title: '문의', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/cs/qnaReply', name: 'qnaReply', meta: { title: '문의답변', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/od/holidayPrice', name: 'holidayPrice', meta: { title: '휴일가격', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/od/order', name: 'order', meta: { title: '주문', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/od/season', name: 'season', meta: { title: '시즌', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/od/seasonPrice', name: 'seasonPrice', meta: { title: '시즌가격', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/pd/board', name: 'board', meta: { title: '게시판', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/pd/boardCategory', name: 'boardCategory', meta: { title: '게시판카테고리', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/pd/boardReply', name: 'boardReply', meta: { title: '게시판댓글', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
      { path: '/pd/product', name: 'product', meta: { title: '상품', auth: true }, component: () => import('@src/views/common/Calendar.vue'), },
    ]
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `kaisa ${to.meta.title}`;
  /*
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const codeList = JSON.parse(localStorage.getItem('codeList') || '{}');
    const menuList = JSON.parse(localStorage.getItem('menuList') || '[]');

    const isUser = (
           userInfo.cmpId
        && codeList
        && settings
        && menuList.length > 0
        && userInfo.token
    );

    let isRole = (to.path == '/' || to.path == '/main') ? true : false;
    if(!isRole) {
        for(let o of menuList) {
            if(to.path === o.url) {
                isRole = true;
                break;
            }
        }
    }*/
  const authStore = useAuthStore();
  const userInfo = authStore.userInfo;

  if (!userInfo.companyId && to.path !== '/login') {
    next('/login');
  } else if (to.meta.auth && !userInfo.companyId) {
    next('/403');
  } else if (to.path === '/') {
    next('/main');
  } else {
    next();
  }
});

export default router;
