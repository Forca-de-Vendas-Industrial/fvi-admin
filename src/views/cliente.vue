<template>
  <div>
    <div class="m-5">
      <input class="border rounded py-2 px-3 w-full text-black bg-white border-black" type="text"
        placeholder="Pesquisar" v-model="pesquisa" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let pesquisa = ref("");
</script>
