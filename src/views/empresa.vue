<template>
  <loading v-if="carregando"></loading>
  <div class="m-5 relative  bg-green-500">
    <div class="grid grid-cols-3 ">
      <input class="border rounded py-2 px-3 w-full text-black bg-white border-black col-span-2" type="text"
        placeholder="CNPJ" v-model="cnpj" />

      <input class="border rounded py-2 ml-5 px-3 w-full text-black bg-white border-black" type="text"
        placeholder="Codigo" v-model="codigo" />
    </div>

    <input class="border rounded py-2 px-3 w-full mt-5 text-black bg-white border-black" type="text"
      placeholder="Razão Social" v-model="razao" />

    <input class="border rounded py-2 mt-5 px-3 w-full text-black bg-white border-black" type="text"
      placeholder="Nome Fantasia" v-model="fantasia" />

  </div>
  <div class="relative m-5 pt-8">
    <button class="bg-[#27248D] text-white px-5 py-2 rounded-lg w-[8%] absolute bottom-0 right-0">SALVAR</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loading from "../components/loading.vue";

let carregando = ref(false);
let razao = ref("");
let fantasia = ref("");
let codigo = ref("");
let cnpj = ref("");

</script>