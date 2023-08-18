<template>
  <div>
    <div class="m-5">
      <input class="border rounded py-2 px-3 w-full text-black bg-white border-black" type="text" placeholder="Pesquisar"
        v-model="pesquisa" />
    </div>

    <div class="m-5 bg-white border-black h-fit border rounded cursor-pointer ">
      <div v-for="cliente in clientes" :key="cliente.codigo" class=" relative " @click="detalha(cliente.codigo)">
        <div class="pl-2 py-1 ">
          <p class="text-lg">{{ cliente.razao }}</p>
          <p class="text-xs" v-if="cliente.juridico == 0">
            CNPJ: {{ cliente.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") }} - FANTASIA: {{
              cliente.fantasia }}
          </p>
          <p class="text-xs" v-if="cliente.juridico == 1">
            CPF: {{ cliente.cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4") }} - APELIDO: {{
              cliente.fantasia }}
          </p>
        </div>
        <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700"></ul>
      </div>
    </div>

    <paginacao class="m-5" :itens-pages="10" :total-pages="totalPaginas" @update="buscaClientes" ref="pagination">
    </paginacao>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, Ref } from "vue";
import { clienteRecords } from "../store/clientes";
import paginacao from "../components/paginacao.vue";

interface cliBody {
  codigo: number
  razao: string
  fantasia: string
  juridico: number
  cnpj: string
  ativo: boolean
}

const pagination = ref(null)
let pesquisa = ref("");
let totalPaginas = ref(0)
let clientes = ref([]) as Ref<cliBody[]>;

onMounted(() => {
  buscaClientes("page=0&size=10");
})

watch(pesquisa, async () => {
  buscaClientes('page=0&size=10')
  // @ts-ignore: Object is possibly 'null'.
  pagination.value.reinicia()
})

const buscaClientes = async (paginacao: string) => {
  let body = {
    pesquisa: pesquisa.value,
    status: ""
  }
  console.log("pesquisa ", pesquisa.value)

  let response = await clienteRecords.listaClientes(paginacao, body);
  if (response.sucess == true) {
    clientes.value = response.body.content;
  }
  totalPaginas.value = response.body.totalPages
}

const detalha = async (codigo: number) => {
  console.log("detalaha ", codigo)
}
</script>