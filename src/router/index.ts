import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home.vue";
import Pedido from "../views/pedido.vue";
import Produto from "../views/produto.vue";
import Login from "../views/login.vue";
import Cliente from "../views/cliente.vue";
import Vendedor from "../views/vendedor.vue";
import Tabela from "../views/tabela.vue";
import Tipo from "../views/tipo.vue";
import Prazo from "../views/prazo.vue";
import Empresa from "../views/empresa.vue";
import Configuracao from "../views/configuracao.vue";



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
  {
    path: "/clientes",
    name: "cliente",
    component: Cliente,
  },
  {
    path: "/vendedores",
    name: "vendedor",
    component: Vendedor,
  },
  {
    path: "/tabelas",
    name: "tabela",
    component: Tabela,
  },
  {
    path: "/tipoPedido",
    name: "tipoPedido",
    component: Tipo,
  },
  {
    path: "/prazo",
    name: "prazo",
    component: Prazo,
  },
  {
    path: "/empresas",
    name: "empresa",
    component: Empresa,
  },
  {
    path: "/configuracoes",
    name: "configuracao",
    component: Configuracao,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
