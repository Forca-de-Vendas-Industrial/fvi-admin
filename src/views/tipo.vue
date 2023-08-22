<template>
  <div>
    <div class="m-5">
      <input class="border rounded py-2 px-3 w-full text-black bg-white border-black" type="text" placeholder="Pesquisar"
        v-model="pesquisa" />
    </div>

    <div class="m-5 bg-white border-black h-fit border rounded cursor-pointer ">
      <div v-for="tipo in tipos" :key="tipo.id" class=" relative " @click="detalha(tipo.id)">
        <div class="pl-2 py-1 ">
          <p class="text-lg">{{ tipo.descricao }}</p>
        </div>
        <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700"></ul>
      </div>
    </div>

    <paginacao class="m-5" :itens-pages="10" :total-pages="totalPaginas" @update="buscaProdutos" ref="pagination">
    </paginacao>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, Ref } from "vue";
import { tipoRecords } from "../store/tipo";
import paginacao from "../components/paginacao.vue";

interface proBody {
  id: number
  codigo: number
  descricao: string
}

const pagination = ref(null)
let pesquisa = ref("");
let totalPaginas = ref(0)
let tipos = ref([]) as Ref<proBody[]>;

onMounted(() => {
  buscaProdutos("page=0&size=10");
})

watch(pesquisa, async () => {
  buscaProdutos('page=0&size=10')
  // @ts-ignore: Object is possibly 'null'.
  pagination.value.reinicia()
})

const buscaProdutos = async (paginacao: string) => {
  let body = {
    pesquisa: pesquisa.value,
    status: ""
  }
  console.log("pesquisa ", pesquisa.value)

  let response = await tipoRecords.listaTipos(paginacao, body);
  if (response.sucess == true) {
    tipos.value = response.body.content;
  }
  console.log("pedidos ", tipos.value)
  totalPaginas.value = response.body.totalPages
}

const detalha = async (codigo: number) => {
  console.log("detalaha ", codigo)
}
</script>