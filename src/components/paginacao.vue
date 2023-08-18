<template>
  <div class="flex flex-row items-center justify-center">

    <button class="bg-[#27248D] text-white w-10 h-10 rounded-full" @click="toPrimeira">&lt&lt</button>
    <button class="bg-[#27248D] text-white w-10 h-10 rounded-full mx-2" @click="toAnterior">&lt</button>

    <div class="border rounded-md bg-[#27248D] py-2 mx-5 w-[8%]">
      <div class="grid grid-cols-2 w-full">
        <div class="text-white text-2xl flex px-2 items-center justify-center font-bold"
          style="border-right-width: 1px; border-color: rgb(156 163 175);">
          {{ actualPage }}
        </div>
        <div class="text-gray-400 text-base flex px-2 items-center justify-center"
          style="border-left-width: 1px;border-color: rgb(156 163 175);">
          {{ props.totalPages }}</div>
      </div>
    </div>

    <button class="bg-[#27248D] text-white w-10 h-10 rounded-full mx-2 " @click="toProxima">></button>
    <button class="bg-[#27248D] text-white w-10 h-10 rounded-full" @click="toUltima">>></button>
  </div>
</template>

<script  setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  totalPages: { type: Number, required: true, default: 10 },
  itensPages: { type: Number, required: false, default: 10 }
});
const emit = defineEmits(["update"]);

let actualPage = ref(1)

const toPrimeira = () => {
  if (actualPage.value != 1) {
    actualPage.value = 1
    atualiza()
  }
}

const toAnterior = () => {
  if (actualPage.value > 1) {
    actualPage.value -= 1
    atualiza()
  }
}

const toProxima = () => {
  if (actualPage.value < props.totalPages) {
    actualPage.value += 1
    atualiza()
  }
}

const toUltima = () => {
  if (actualPage.value != props.totalPages) {
    actualPage.value = props.totalPages
    atualiza()
  }
}

const atualiza = () => {
  const pag = "page=" + (actualPage.value - 1) + "&size=" + props.itensPages
  emit("update", pag)
}

const reinicia = () => {
  actualPage.value = 1
}

defineExpose({
  reinicia
});

</script>