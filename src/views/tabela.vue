<template>
  <div>
    <div class="m-5">
      <input class="border rounded py-2 px-3 w-full text-black bg-white border-black" type="text" placeholder="Pesquisar"
        v-model="pesquisa" />
    </div>

    <div class="m-5 bg-white border-black h-fit border rounded cursor-pointer ">
      <div v-for="tabela in tabelas" :key="tabela.cdId" class=" relative " @click="detalha(tabela.cdId)">
        <div class="pl-2 py-1 ">
          <p class="text-lg">{{ tabela.nome }} </p>
          <p class="text-xs">
            Codigo: {{ tabela.codigo }} - Moeda: {{ tabela.moeda }}
          </p>
        </div>
        <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700"></ul>
      </div>
    </div>

    <paginacao class="m-5" :itens-pages="10" :total-pages="totalPaginas" @update="buscaTabelas" ref="pagination">
    </paginacao>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, Ref } from "vue";
import { tabelaRecords } from "../store/tabela";
import paginacao from "../components/paginacao.vue";

interface tabBody {
  nome: string
  codigo: number
  cdId: number
  moeda: string
  ativa: boolean
}

const pagination = ref(null)
let pesquisa = ref("");
let totalPaginas = ref(0)
let tabelas = ref([]) as Ref<tabBody[]>;

onMounted(() => {
  buscaTabelas("page=0&size=10");
})

watch(pesquisa, async () => {
  buscaTabelas('page=0&size=10')
  // @ts-ignore: Object is possibly 'null'.
  pagination.value.reinicia()
})

const buscaTabelas = async (paginacao: string) => {
  let body = {
    pesquisa: pesquisa.value,
    status: ""
  }
  console.log("pesquisa ", pesquisa.value)

  let response = await tabelaRecords.listaTabela(paginacao, body);
  if (response.sucess == true) {
    tabelas.value = response.body.content;
  }
  totalPaginas.value = response.body.totalPages
}

const detalha = async (codigo: number) => {
  console.log("detalaha ", codigo)
}
</script>