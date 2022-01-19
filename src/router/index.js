import Vue from "vue";
import Router from "vue-router";
import store from '../store/index.js'

Vue.use(Router);

const routes = [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/Signup.vue')
    },
    
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../components/ForgotPassword.vue')
    },
    {
      path: "/admin/users",
      name: "users",
      component: () => import("../components/admin/Users.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]


let router = new Router({
  mode: "history",  
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router