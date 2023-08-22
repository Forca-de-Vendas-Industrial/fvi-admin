<template>
  <loading v-if="carregando"></loading>
  <div class="m-5 relative h-fit ">
    <input class="border rounded py-2 px-3 w-full text-black bg-white border-black" type="text"
      placeholder="URL API sistema" v-model="urlApi" />

    <input class="border rounded py-2 mt-5 px-3 w-full text-black bg-white border-black" type="text"
      placeholder="Key API sistema" v-model="keyApi" />

    <div class="grid grid-cols-3  mt-5 justify-center items-center">
      <input class="border rounded py-2 px-3 w-full text-black bg-white border-black col-span-2" type="text"
        placeholder="Licenca" v-model="licencaKey" />
      <div>
        <div class="ml-5 grid grid-cols-2 ">
          <p v-if="licencaStatus"> Status: Ativa</p>
          <p v-else> Status: Inativa</p>
          <p> Vendedores: {{ licencaVend }}</p>
        </div>
      </div>
    </div>

    <input class="border rounded py-2 mt-5 px-3 w-full text-black bg-white border-black" type="text" placeholder="Prefixo"
      v-model="prefixoPed" />
  </div>
  <div class="relative m-5 pt-8">
    <button class="bg-[#27248D] text-white px-5 py-2 rounded-lg w-[8%] absolute bottom-0 right-0"
      @click="salvaConf">SALVAR</button>
  </div>
</template>

<script setup lang="ts">
import loading from "../components/loading.vue";
import { ref, onMounted } from "vue";
import { configuracaoRecords } from "../store/configuracao";

let urlApi = ref("");
let keyApi = ref("");
let licencaKey = ref("");
let prefixoPed = ref("");
let licencaStatus = ref(false);
let licencaVend = ref(0);
let carregando = ref(false)

onMounted(() => {
  buscaConf();
})

let buscaConf = async () => {
  let response = await configuracaoRecords.busca();
  urlApi.value = response.body.urlApiSis;
  keyApi.value = response.body.keyApiSis;
  licencaKey.value = response.body.licenca;
  prefixoPed.value = response.body.prefixo;
  licencaStatus.value = response.body.lic_ativa;
  licencaVend.value = response.body.lic_vendedores;
}

let salvaConf = async () => {
  carregando.value = true;
  let body = {
    urlApiSis: urlApi.value,
    keyApiSis: keyApi.value,
    licenca: licencaKey.value,
    tipoTabela: 1,
    prefixo: prefixoPed.value,
    tipoPed: true
  }
  await configuracaoRecords.salva(body);
  carregando.value = false;
  buscaConf();

}


</script>