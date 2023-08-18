<template >
  <loading v-if="carregando"></loading>

  <div class="grid grid-cols-5">

    <div class="m-5 bg-white p-2 shadow-2xl rounded-lg justify-center items-center">
      <div class="flex flex-col items-center">PRODUTOS</div>
      <div class="mt-2 grid grid-cols-2 divide-x justify-center items-center">
        <div class="flex flex-col items-center">
          <button class="bg-[#27248D] text-white w-20 h-20 rounded-full" @click="syncProduto">SYNC</button>
        </div>
        <div class="p-2">
          <div>ULTIMA</div>
          <div>{{ lastSyncProduto.data }}</div>
          <div>{{ lastSyncProduto.hora }}</div>
        </div>
      </div>
    </div>

    <div class="m-5 bg-white p-2 shadow-2xl rounded-lg justify-center items-center">
      <div class="flex flex-col items-center">CLIENTES</div>
      <div class="mt-2 grid grid-cols-2 divide-x justify-center items-center">
        <div class="flex flex-col items-center">
          <button class="bg-[#27248D] text-white w-20 h-20 rounded-full" @click="syncCliente">SYNC</button>
        </div>
        <div class="p-2">
          <div>ULTIMA</div>
          <div>{{ lastSyncCliente.data }}</div>
          <div>{{ lastSyncCliente.hora }}</div>
        </div>
      </div>
    </div>

    <div class="m-5 bg-white p-2 shadow-2xl rounded-lg justify-center items-center">
      <div class="flex flex-col items-center">TABELAS DE PREÇO</div>
      <div class="mt-2 grid grid-cols-2 divide-x justify-center items-center">
        <div class="flex flex-col items-center">
          <button class="bg-[#27248D] text-white w-20 h-20 rounded-full" @click="syncTabela">SYNC</button>
        </div>
        <div class="p-2">
          <div>ULTIMA</div>
          <div>{{ lastSyncTabela.data }}</div>
          <div>{{ lastSyncTabela.hora }}</div>
        </div>
      </div>
    </div>

    <div class="m-5 bg-white p-2 shadow-2xl rounded-lg justify-center items-center">
      <div class="flex flex-col items-center">PRAZOS DE PAGAMENTO</div>
      <div class="mt-2 grid grid-cols-2 divide-x justify-center items-center">
        <div class="flex flex-col items-center">
          <button class="bg-[#27248D] text-white w-20 h-20 rounded-full" @click="syncPrazo">SYNC</button>
        </div>
        <div class="p-2">
          <div>ULTIMA</div>
          <div>{{ lastSyncPrazo.data }}</div>
          <div>{{ lastSyncPrazo.hora }}</div>
        </div>
      </div>
    </div>

    <div class="m-5 bg-white p-2 shadow-2xl rounded-lg justify-center items-center">
      <div class="flex flex-col items-center">TIPOS DE PEDIDO</div>
      <div class="mt-2 grid grid-cols-2 divide-x justify-center items-center">
        <div class="flex flex-col items-center">
          <button class="bg-[#27248D] text-white w-20 h-20 rounded-full" @click="syncTipo">SYNC</button>
        </div>
        <div class="p-2">
          <div>ULTIMA</div>
          <div>{{ lastSyncTipo.data }}</div>
          <div>{{ lastSyncTipo.hora }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import loading from "../components/loading.vue";
import { reactive, ref, onMounted } from "vue";
import { syncRecords } from "../store/sync";
import { clienteRecords } from "../store/clientes";
import { prazoRecords } from "../store/prazo";
import { produtoRecords } from "../store/produtos";
import { tabelaRecords } from "../store/tabela";
import { tipoRecords } from "../store/tipo";


let lastSyncProduto = reactive({ data: "", hora: "", codigo: 1 })
let lastSyncCliente = reactive({ data: "", hora: "", codigo: 2 })
let lastSyncTabela = reactive({ data: "", hora: "", codigo: 3 })
let lastSyncPrazo = reactive({ data: "", hora: "", codigo: 4 })
let lastSyncTipo = reactive({ data: "", hora: "", codigo: 5 })
let carregando = ref(false)

onMounted(() => {
  buscaUltimaSync();
})

const syncProduto = async () => {
  carregando.value = true;
  await produtoRecords.buscaGestor();
  buscaUltimaSync();
}

const syncCliente = async () => {
  carregando.value = true;
  await clienteRecords.buscaGestor();
  buscaUltimaSync();
}

const syncTabela = async () => {
  carregando.value = true;
  await tabelaRecords.buscaGestor();
  buscaUltimaSync();
}

const syncPrazo = async () => {
  carregando.value = true;
  await prazoRecords.buscaGestor();
  buscaUltimaSync();
}

const syncTipo = async () => {
  carregando.value = true;
  await tipoRecords.buscaGestor();
  buscaUltimaSync();
}

const buscaUltimaSync = async () => {
  let response = await syncRecords.buscaUltimas();
  response.body.forEach((e: { tipo: any; date: EpochTimeStamp; }) => {
    let dt = new Date(e.date);
    switch (e.tipo) {
      case 1:
        lastSyncProduto.data = dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
        lastSyncProduto.hora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        break;
      case 2:
        lastSyncCliente.data = dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
        lastSyncCliente.hora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        break;
      case 3:
        lastSyncTabela.data = dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
        lastSyncTabela.hora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        break;
      case 4:
        lastSyncPrazo.data = dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
        lastSyncPrazo.hora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        break;
      case 5:
        lastSyncTipo.data = dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
        lastSyncTipo.hora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        break;
    }
  });

  carregando.value = false;

}
</script>