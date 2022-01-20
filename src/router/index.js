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
    },
    {
      path: "/videolist",
      name: "videolist",
      component: () => import("../components/video/VideosList.vue")
    },
    {
      path: "/about_page",
      name: "about",
      component: () => import("../components/AboutPage.vue")
    },
    {
      path: "/create_video",
      name: "create",
      component: () => import("../components/video/CreateVideo.vue")
    },
    {
      path: "/video_details/:id",
      name: "video_details",
      component: () => import("../components/video/VideoDetail.vue"),
      props: true,
    },
    {
      path: "/update_video/:id",
      name: "update_video",
      component: () => import("../components/video/UpdateVideo.vue"),
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