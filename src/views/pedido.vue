<template>
  <div>
    <div class="m-5">
      <input class="border rounded py-2 px-3  text-black bg-white  w-[90%] border-black" type="text"
        placeholder="Pesquisar" v-model="pesquisa" />
      <button class="bg-[#27248D] text-white px-5 ml-[2%] py-2 rounded-lg w-[8%]"
        @click="showFiltro = true">FILTROS</button>
    </div>

    <div class="m-5 bg-white border-black h-fit border rounded cursor-pointer ">
      <div v-for="pedido in pedidos" :key="pedido.codigo" class=" relative " @click="detalha(pedido.codigo)">
        <div class="pl-2 py-1 ">
          <p class="text-lg">{{ pedido.codigo }} - {{ pedido.cliente }}</p>
          <p class="text-xs">
            {{ pedido.vendedor }} - {{ pedido.dataPedido }}
          </p>
        </div>
        <div class="pr-2 absolute inset-y-0 right-0 grid place-items-center">
          <div v-if="pedido.status == 1" class="text-green-500 font-bold">INTEGRADO</div>
          <div v-if="pedido.status == 0" class="text-red-500 font-bold">NÃO INTEGRADO</div>
        </div>
        <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700"></ul>
      </div>
    </div>
    <paginacao class="m-5" :itens-pages="10" :total-pages="totalPaginas" @update="buscaPedidos" ref="pagination">
    </paginacao>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, watch } from "vue";
import { pedidoRecords } from "../store/pedidos";
import paginacao from "../components/paginacao.vue";

interface pedBody {
  codigo: number
  dataPedido: string
  status: number
  cliente: string
  vendedor: string
}

const pagination = ref(null)
let pesquisa = ref("");
let showFiltro = ref(false);
let pedidos = ref([]) as Ref<pedBody[]>;
let totalPaginas = ref(0)

onMounted(() => {
  buscaPedidos("page=0&size=10");
})

watch(pesquisa, async () => {
  buscaPedidos('page=0&size=10')
  // @ts-ignore: Object is possibly 'null'.
  pagination.value.reinicia()
})

const buscaPedidos = async (paginacao: string) => {
  let body = {
    pesquisa: pesquisa.value,
    status: ""
  }
  console.log("pesquisa ", pesquisa.value)

  let response = await pedidoRecords.listaPedidos(paginacao, body);
  if (response.sucess == true) {
    pedidos.value = response.body.content;
  }
  console.log("pedidos ", pedidos.value)
  totalPaginas.value = response.body.totalPages
}

const detalha = async (codigo: number) => {
  console.log("detalaha ", codigo)
}

</script>