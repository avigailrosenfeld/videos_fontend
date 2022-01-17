import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/modal/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/modal/Signup.vue')
    },
    
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../components/modal/ForgotPassword.vue')
    },
    {
      path: "/",
      name: "users",
      component: () => import("../views/Users")
    }
  ]


export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});