<template>
  <div>
    <div class="m-5">
      <input class="border rounded py-2 px-3  text-black bg-white  w-[90%] border-black" type="text"
        placeholder="Pesquisar" v-model="pesquisa" />
      <button class="bg-[rgb(39,36,141)] text-white px-5 ml-[2%] py-2 rounded-lg w-[8%]">NOVO</button>
    </div>

    <div class="m-5 bg-white border-black h-fit border rounded cursor-pointer ">
      <div v-for="vendedor in vendedores" :key="vendedor.id" class=" relative " @click="detalha(vendedor.id)">
        <div class="pl-2 py-1 ">
          <p class="text-lg">{{ vendedor.nome }} {{ vendedor.sobrenome }}</p>
          <p class="text-xs">
            {{ vendedor.email }}
          </p>
        </div>
        <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700"></ul>
      </div>
    </div>

    <paginacao class="m-5" :itens-pages="10" :total-pages="totalPaginas" @update="buscaVendedores" ref="pagination">
    </paginacao>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, Ref } from "vue";
import { usuarioRecords } from "../store/usuarios";
import paginacao from "../components/paginacao.vue";

interface vendBody {
  id: number
  nome: string
  sobrenome: string
  email: string
  ativo: boolean
}

const pagination = ref(null)
let pesquisa = ref("");
let totalPaginas = ref(0)
let vendedores = ref([]) as Ref<vendBody[]>;

onMounted(() => {
  buscaVendedores("page=0&size=10");
})

watch(pesquisa, async () => {
  buscaVendedores('page=0&size=10')
  // @ts-ignore: Object is possibly 'null'.
  pagination.value.reinicia()
})

const buscaVendedores = async (paginacao: string) => {
  let body = {
    pesquisa: pesquisa.value,
    status: ""
  }
  console.log("pesquisa ", pesquisa.value)

  let response = await usuarioRecords.listaVendedores(paginacao, body);
  if (response.sucess == true) {
    vendedores.value = response.body.content;
  }
  totalPaginas.value = response.body.totalPages
}

const detalha = async (codigo: number) => {
  console.log("detalaha ", codigo)
}
</script>