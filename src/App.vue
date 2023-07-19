<template>
  <div class="relative">
      <div class="h-screen w-[15%] bg-[#27248D] absolute top-0" v-if="logado">
        <div class="relative h-full w-full">
          <div class="absolute w-full inset-x-0 top-0">
            <ul>
              <li v-for="item in menus" :key="item.path">
                <router-link :to=item.path>
                <a
                      href="#"
                      class="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-[#197FDF]"
                    >
                      <svg-icon type="mdi" :path="item.icone"></svg-icon>
                      <span class="ml-3">{{ item.nome }}</span>
                    </a></router-link>
              </li>
            </ul>
          </div>
          <div class="absolute w-full inset-x-0 bottom-0">
            <p class="text-white text-center">API v1.2.0</p>
            <p class="text-white text-center">FRONT v{{ versaoFront }}</p>
          </div>
        </div>
      </div>
      <div class="h-screen w-[85%] absolute left-[15%]">
        <RouterView></RouterView>
      </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance, watch, onMounted } from "vue";
import { useRoute } from "vue-router"
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHome, mdiShopping, mdiAccountGroup, mdiCurrencyUsd, mdiCog, mdiLogout, mdiAccountTag, mdiBallot, mdiBarcode, mdiDomain } from "@mdi/js";

let currentInstance = getCurrentInstance();
const route = useRoute()
let logado = ref(true);
let versaoFront = currentInstance?.appContext.config.globalProperties.msg;
let menus = reactive([
  { path: "/", nome: "INICIO", icone: mdiHome   },
  { path: "/pedidos", nome: "PEDIDOS", icone: mdiShopping  },
  { path: "/produtos", nome: "PRODUTOS", icone:  mdiBarcode  },
  { path: "/clientes", nome: "CLIENTES", icone: mdiAccountGroup  },
  { path: "/vendedores", nome: "VENDEDORES", icone: mdiAccountTag },
  { path: "/tabelas", nome: "TABELAS DE PREÇO", icone: mdiCurrencyUsd  },
  { path: "/tipoPedido", nome: "TIPO PEDIDO", icone: mdiBallot },
  { path: "/empresas", nome: "EMPRESA", icone: mdiDomain  },
  { path: "/configuracoes", nome: "CONFIGURAÇÕES", icone: mdiCog  },
  { path: "/login", nome: "SAIR", icone: mdiLogout  },
]);

watch(route, (to) => {
  if (to.fullPath == "/login") {
    logado.value = false;
  }
  else {
    logado.value = true;
  }
});

onMounted(() => {

})
</script>

