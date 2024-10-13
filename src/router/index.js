import { createRouter, createWebHistory } from "vue-router"
import Login from "@/views/Login.vue"

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
