import {createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Home from '@/views/home.vue';
import {useAuthStore} from '@/store/auth-store'; // 경로 확인

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'login',
    },
    component: () => import('@/views/login.vue'),
  },
  {path: '/403', name: '403', meta: {title: '403'}, component: () => import('@/views/error/403.vue')},
  {path: '/500', name: '500', meta: {title: '403'}, component: () => import('@/views/error/500.vue')},
  {path: '/:pathMatch(.*)*', name: '404', meta: {title: '404'}, component: () => import('@/views/error/404.vue')},
  {
    path: '/',
    name: '',
    component: Home,
    children: [
      // 프로그램으로 만들지 않는...
      {path: '/main', name: 'main', meta: {title: '홈'}, component: () => import('@/views/main/main.vue'),},
      {path: '/common/calendar', name: 'calendar', meta: {title: 'calendar', auth: true,}, component: () => import( '@/views/common/calendar.vue'),},
      {path: '/cr/dictionary', name: 'dictionary', meta: {title: '사전', auth: true}, component: () => import('@/views/common/dictionary.vue'),},
      {path: '/cr/code', name: 'code', meta: {title: '코드', auth: true}, component: () => import('@/views/common/code.vue'),},
      // 프로그램으로 자동생성 (xf274)
      {path: '/at/company', name: 'company', meta: {title: '업체', auth: true}, component: () => import('@/views/at/company.vue'),},
      {path: '/at/user', name: 'user', meta: {title: '사용자', auth: true}, component: () => import('@/views/at/user.vue'),},
      {path: '/at/member', name: 'member', meta: {title: '회원', auth: true}, component: () => import('@/views/at/member.vue'),},
      {path: '/at/menu', name: 'menu', meta: {title: '메뉴', auth: true}, component: () => import('@/views/at/menu.vue'),},
      {path: '/at/menu-company-role', name: 'menu-company-role', meta: {title: '메뉴업체권한', auth: true}, component: () => import('@/views/at/menu-company-role.vue'),},
      {path: '/cr/file', name: 'file', meta: {title: '파일', auth: true}, component: () => import('@/views/cr/file.vue'),},
      {path: '/cs/qna', name: 'qna', meta: {title: '문의', auth: true}, component: () => import('@/views/cs/qna.vue'),},
      {path: '/od/holiday-price', name: 'holiday-price', meta: {title: '휴일가격', auth: true}, component: () => import('@/views/od/holiday-price.vue'),},
      {path: '/od/order', name: 'order', meta: {title: '주문', auth: true}, component: () => import('@/views/od/order.vue'),},
      {path: '/od/season', name: 'season', meta: {title: '시즌', auth: true}, component: () => import('@/views/od/season.vue'),},
      {path: '/od/season-price', name: 'season-price', meta: {title: '시즌가격', auth: true}, component: () => import('@/views/od/season-price.vue'),},
      {path: '/pd/board', name: 'board', meta: {title: '게시판', auth: true}, component: () => import('@/views/pd/board.vue'),},
      {path: '/pd/product', name: 'product', meta: {title: '상품', auth: true}, component: () => import('@/views/pd/product.vue'),},
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

  const authStore = useAuthStore();
  const userInfo = authStore.userInfo;

  /*if (!to.query.ch) {
    const defaultCh = '1'; // 기본 ch 값 설정
    next({
      path: to.path,
      query: { ...to.query, ch: defaultCh }, // 기존 쿼리 파라미터를 유지하면서 ch 추가
    });
  } else {
    next();
  }*/
  if(!userInfo) {
    next('/login');
  }
  if (!userInfo?.companyId && to.path !== '/login') {
    next('/login');
  } else if (to.meta.auth && !userInfo?.companyId) {
    next('/403');
  } else if (to.path === '/') {
    next('/main');
  } else {
    next();
  }
});

export default router;
