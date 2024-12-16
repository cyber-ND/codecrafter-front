import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import UsersPage from '../views/UsersPage.vue'
import EditUser from '../views/EditUser.vue'
import LoginUser from '../views/Loginpage.vue'
import RegisterUser from '../views/Registerpage.vue'


const routes = [
  { path: '/', component: Homepage },
  { path: '/login', component: LoginUser },
  { path: '/register', component: RegisterUser },

  { path: '/users', component: UsersPage, meta:{requiresAuth: true} },
  { path: '/users/edit/:id', component: EditUser, meta:{requiresAuth: true}, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  else {
    next();
  }
})
export default router