import Vue from "vue";
import Router from "vue-router";
import store from '../store/index.js'

Vue.use(Router);

const routes = [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/register/Login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/register/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/register/Signup.vue')
    },
    
    {
      path: '/forgot_password',
      name: 'forgot_password',
      component: () => import('../components/register/ForgotPassword.vue')
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../components/users/UsersList.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/videos_list",
      name: "videos_list",
      component: () => import("../components/videos/VideosList.vue")
    },
    {
      path: "/about_page",
      name: "about_page",
      component: () => import("../components/theme/AboutPage.vue")
    },
    {
      path: "/create_video",
      name: "create_video",
      component: () => import("../components/videos/CreateVideo.vue")
    },
    {
      path: "/video_details/:id",
      name: "video_details",
      component: () => import("../components/videos/VideoDetail.vue"),
      props: true,
    },
    {
      path: "/update_video/:id",
      name: "update_video",
      component: () => import("../components/videos/UpdateVideo.vue"),
      props: true,
    },
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