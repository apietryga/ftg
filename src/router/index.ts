import { createRouter, createWebHistory } from 'vue-router'
import list from '../views/list-view.vue'
import user from '../views/user-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/new',
      name: 'new',
      component: user
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: user
    },
  ]
})

export default router
