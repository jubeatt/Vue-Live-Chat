import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import Home from '../views/Home.vue'
import ChatRoom from '../views/ChatRoom.vue'
import { auth } from '@/firebase/config'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const currentUser = auth.currentUser
      if (currentUser) {
        next({ name: 'ChatRoom' })
      } else {
        next()
      }
    }
  },
  {
    path: '/chatroom',
    name: 'ChatRoom',
    component: ChatRoom,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const currentUser = auth.currentUser
      if (currentUser) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
