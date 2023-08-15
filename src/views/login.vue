<template>
  <div class="w-full h-full grid place-items-center bg-[#27248D]">

    <div class="border border-black rounded-md px-4 py-2 w-1/4 bg-white" v-if="temPadrao">
      <h1 class="py-2 place-items-center grid font-bold text-lg">Bem Vindo</h1>
      <div class="mb-4">
        <label class="block text-black text-sm font-bold mb-2"> URL </label>
        <input class="border rounded w-full py-2 px-3 text-black bg-gray-200" type="text" v-model="url" />
      </div>
      <div class="mb-4">
        <label class="block text-black text-sm font-bold mb-2"> Usuario </label>
        <input class="border rounded w-full py-2 px-3 text-black border bg-gray-200" type="text"
          v-model="login.usuario" />
      </div>
      <div class="mb-4">
        <label class="block text-black text-sm font-bold mb-2"> Senha </label>
        <input class="border rounded w-full py-2 px-3 text-black bg-gray-200" type="password" v-model="login.senha" />
      </div>
      <button class="border border-black rounded-md px-4 py-2 text-white bg-[#197FDF]" @click="entra">
        Login
      </button>
    </div>
    <div class="border border-black rounded-md px-4 py-2 w-1/4 bg-white" v-else>
      <h1 class="py-2 place-items-center grid font-bold text-lg">Cadastre a senha do usuario admin</h1>
      <div class="mb-4">
        <label class="block text-black text-sm font-bold mb-2"> URL </label>
        <input class="border rounded w-full py-2 px-3 text-black bg-gray-200" type="text" v-model="url" />
      </div>
      <div class="mb-4">
        <label class="block text-black text-sm font-bold mb-2"> Senha </label>
        <input class="border rounded w-full py-2 px-3 text-black border bg-gray-200" type="password"
          v-model="usuario.senha" />
      </div>
      <div class="mb-4">
        <label class="block text-black text-sm font-bold mb-2"> Confirme a senha </label>
        <input class="border rounded w-full py-2 px-3 text-black bg-gray-200" type="password" v-model="confSenha" />
      </div>
      <button class="border border-black rounded-md px-4 py-2 text-white bg-[#197FDF]" @click="cadastra">
        Cadastrar
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { usuarioRecords } from "../store/usuarios";
import { useRouter } from "vue-router"
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification();
let login = reactive({ senha: "", usuario: "" });
let url = ref("http://localhost:4321");
const router = useRouter()
let temPadrao = ref(false)
let confSenha = ref("");
let usuario = reactive({ senha: "", })

onMounted(() => {
  localStorage.setItem("token", "");
  if (localStorage.getItem("urlAPI") == null) {
    localStorage.setItem("urlAPI", url.value);
  }
  url.value = localStorage.getItem("urlAPI")!
  verificaPadrao();
})


const entra = async () => {
  localStorage.setItem("urlAPI", url.value);
  let response = await usuarioRecords.auth(login);
  if (response != null) {
    localStorage.setItem("token", response.token);
  
    router.push("/pedido");
  }
}

const cadastra = async () => {
  localStorage.setItem("urlAPI", url.value);
  if (
    usuario.senha.length > 0 &&
    confSenha.value == usuario.senha
  ) {
    let response = await usuarioRecords.cadastraPadrao(usuario);
    if (response.sucess) {
      temPadrao.value = true;
    } else {
      notification.notify({
        title: "Erro",
        text: "Falha ao criar usuario padrão",
        type: "error ",
      });
    }
  } else {
    notification.notify({
      title: "Aviso",
      text: "As senhas devem ser iguais e não podem ser vazias",
      type: "warn ",
    });
  }
}

const verificaPadrao = async () => {
  let response = await usuarioRecords.verificaPadrao();
  console.log("response padrao", response)
  temPadrao.value = response;
}

</script>