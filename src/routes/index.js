
import { createWebHashHistory } from "vue-router";
import { createRouter } from "vue-router";
// page layout
import BaseAuthLayout from "@/layouts/BaseAuthLayout.vue";
import BaseLayoutVue from "@/layouts/BaseLayout.vue";
import AuthLayout from '@/views/auth/Auth.Main.vue'
// page after auth

const SignInPage = () => import('@/views/auth/SignIn/SignIn.Main.vue')
const SignUpPage = () => import('@/views/auth/SignUp/SignUp.Main.vue')

const MessagerPage = () => import('@/views/messager/Messager.Main.vue')
// page not found
import NotFound from '@/components/NotFound.vue';

import { generatorTitlePage } from "@/utils/generator"
import Cookies from "js-cookie"
import { ACCESS_TOKEN } from "@/constants/cookie"


export const routes = [
  {
    path: "/auth",
    name: "main-authenticate",
    component: BaseAuthLayout,
    redirect: {
      name: "auth-layout",
    },
    children: [ 
      {
        path: "",
        name: "auth-layout",
        component: AuthLayout,
        redirect: {
          name: "sign-in",
        },
        children: [
          {
            path: "/auth/sign-in",
            name: "sign-in",
            component: SignInPage,
            meta: {
              requiresGuest: true,
              title: generatorTitlePage("Đăng nhập"),
            },
          },
          {
            path: "/auth/sign-up",
            name: "sign-up",
            component: SignUpPage,
            meta: {
              requiresGuest: true,
              title: generatorTitlePage("Đăng ký"),
            },
          },
        ],
        meta: {
          requiresGuest: true
        },
      },
    ],
    meta: { requiresGuest: true },
  },
  {
    path: "",
    name: "main-layout",
    component: BaseLayoutVue,
    redirect: {
      name: "messenger-main",
    },
    children:[
      {
        path: "/messenger",
        name: "messenger-main",
        component: MessagerPage,
        meta: {
          requiresAuth: true,
          title: generatorTitlePage("Messenger"),
        },
      },
    ],
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { requiresAuth: false }}, 
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

router.beforeEach(async (to, from, next) => { 
  const isLoggin = Cookies.get(ACCESS_TOKEN) 
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !isLoggin) {
    // Nếu route yêu cầu đăng nhập và người dùng chưa đăng nhập
    next({ path: '/auth', query: { redirect: to.fullPath } });
  } else if (requiresGuest && isLoggin) {
    // Nếu route yêu cầu là khách (ví dụ: trang đăng nhập) và người dùng đã đăng nhập
    next('/'); // hoặc đưa người dùng đến trang họ cần truy cập khi đã đăng nhập
  } else {
    // Ngược lại, tiếp tục điều hướng bình thường
    next();
  }
  document.title = to.meta.title || generatorTitlePage('NO TITLE');
})


export default router;