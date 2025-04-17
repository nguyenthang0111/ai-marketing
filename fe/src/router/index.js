import { createRouter, createWebHistory } from 'vue-router'
import { handleLoading, handleLoginByGoogleProvider, handleReloadPage } from './middleware'
import DashboardView from '@/views/Dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'Login' } },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/LoginView.vue'),
      meta: { hasSidebar: false, requiresAuth: false }
    },
    {
      path:'/forget-password',
      name: 'ForgetPassword',
      component: () => import('@/views/ForgetPassword/ForgetPassword.vue'),
      meta: { hasSidebar: false, requiresAuth: false }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: () => import('@/views/ResetPassword/ResetPassword.vue'),
      meta: { hasSidebar: false, requiresAuth: false }
    },
    {
      path: '/auth-google',
      name:'Auth-Google',
      meta: { hasSidebar: false, requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { hasSidebar: true }
    },
    {
      path: '/project',
      name: 'Project List',
      component: () => import('@/views/Project/ProjectListView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path: '/project/:projectId',
      name: 'Project Detail',
      component: () => import('@/views/Project/ProjectDetailView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path: '/project/:projectId/bot-social/:botId',
      name: 'Bot Social Detail',
      component: () => import('@/views/BotSocial/BotSocialView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path: '/bot-library',
      name: 'Bot Library',
      component: () => import('@/views/BotLibrary/BotLibraryView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path: '/credit',
      name: 'Credit',
      component: () => import('@/views/Credit/CreditView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path: '/member',
      name: 'Member',
      component: () => import('@/views/Member/Member.vue'),
      meta: { hasSidebar: true }
    },
    {
      path: '/custom-store',
      name: 'Custom AI Store',
      component: () => import('@/views/CustomStore/CustomStoreView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path: '/ui-element',
      name: 'UI Element',
      component: () => import('@/views/UIElement/UIElementView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path:'/profile',
      name: 'Profile',
      component: () => import('@/views/Profile/ProfileView.vue'),
      meta: { hasSidebar: true }
    },
    {
      path:'/setting',
      name:'Setting',
      component: () => import('@/views/Setting/SettingView.vue'),
      meta: {hasSidebar: true}
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('@/views/Error/ErrorView.vue'),
      meta: { hasSidebar: false, requiresAuth: false }
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: '/error?status_code=404'
    }
  ]
})

router.beforeEach(handleLoginByGoogleProvider);
router.beforeEach(handleReloadPage);
router.beforeEach(handleLoading);

export default router
