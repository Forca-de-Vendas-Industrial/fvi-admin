<template>
  <notifications classes="n-light" position="top right" />
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
      <div :class="layoutTela" >
        <RouterView></RouterView>
      </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onMounted, computed } from "vue";
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

const layoutTela = computed(() => {
  if (route.fullPath == "/login") {
    logado.value = false;
    return "h-screen w-screen" 
  } else {
    logado.value = true;
    return "h-screen w-[85%] absolute left-[15%]"
  }
})

onMounted(() => {

})
</script>

<style lang="scss">
.n-light {
  // styling
  padding: 10px;
  font-size: 12px;
  width: 300px;
  color: #000000;
  border-right: 5px solid #187fe7;

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
    border-right: 5px solid #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
    border-right: 5px solid #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
    border-right: 5px solid #b82e24;
  }
}
</style>

