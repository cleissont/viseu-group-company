import { createRouter, createWebHistory } from "vue-router"
import store from "@/store"
import CompanyList from "@/views/CompanyList.vue"
import CompanyCreate from "@/views/CompanyCreate.vue"

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/companies",
    name: "CompanyList",
    component: CompanyList,
    meta: { requiresAuth: true },
  },
  {
    path: "/companies/create",
    name: "CompanyCreate",
    component: CompanyCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/companies/edit/:id",
    name: "CompanyEdit",
    component: CompanyCreate,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard to protect authenticated routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "Login" })
  } else {
    next()
  }
})

export default router
