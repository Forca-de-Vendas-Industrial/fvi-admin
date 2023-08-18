<template>
  <div>
    <div class="m-5">
      <input class="border rounded py-2 px-3  text-black bg-white  w-[90%] border-black" type="text"
        placeholder="Pesquisar" v-model="pesquisa" />
      <button class="bg-[#27248D] text-white px-5 ml-[2%] py-2 rounded-lg w-[8%]"
        @click="showFiltro = true">FILTROS</button>
    </div>

    <div class="m-5 bg-white border-black h-fit border rounded cursor-pointer">
      <div v-for="pedido in pedidos" :key="pedido.codigo" class="" @click="detalha(pedido.codigo)">
        <div class="justify-start pl-2 py-1">
          <p class="text-lg">{{ pedido.codigo }} - {{ pedido.cliente }}</p>
          <p class="text-xs">
            {{ pedido.vendedor }} - {{ pedido.dataPedido }}
          </p>
        </div>
        <div>
          <p v-if="pedido.status == 1">INTEGRADO</p>
          <p v-if="pedido.status == 0">NÃO INTEGRADO</p>
        </div>

        <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700"></ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { pedidoRecords } from "../store/pedidos";

let pesquisa = ref("");
let showFiltro = ref(false);
let pedidos = ref([]);

onMounted(() => {
  buscaPedidos("");
})

const buscaPedidos = async (paginacao: string) => {
  let body = {
    pesquisa: pesquisa.value,
    status: ""
  }
  let response = await pedidoRecords.buscaPedidos(paginacao, body);
  if (response.sucess == true) {
    pedidos.value = response.body.content;
  }
  console.log("pedidos ", pedidos.value)
}

const detalha = async (codigo: number) => {
  console.log("detalaha ", codigo)
}

</script>