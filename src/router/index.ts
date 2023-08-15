import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home.vue";
import Pedido from "../views/pedido.vue";
import Produto from "../views/produto.vue";
import Login from "../views/login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/pedidos",
    name: "pedido",
    component: Pedido,
  },
    {
    path: "/login",
    name: "login",
    component: Login,
  },
    {
    path: "/produtos",
    name: "produto",
    component: Produto,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
