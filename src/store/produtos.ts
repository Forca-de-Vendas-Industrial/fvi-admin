
import { useNotification } from "@kyvg/vue3-notification";
const notification = useNotification();
import { stateGlobal } from "../const/Global";

export const produtoRecords = {
  buscaGestor: () => {
    const url = localStorage.getItem("urlAPI");
    return fetch(url + "/products/busca", {
      method: "POST",
      headers: {
        "auth-token": stateGlobal.token,
      },
    }).then(function (response) {
        if (response.status == 200) {
          return response.json();
        }else if (response.status == 401) {
          notification.notify({
            title: "Não autenticado",
            text: "Faça o login novamente",
            type: "error",
          });
          window.location.href = window.location.href.split("#")[0] + "#/login";
        }
      }).catch(function (error) {
        console.log("response error ", error)
        notification.notify({
            title: "ERRO",
            text: error,
            type: "error",
          });
      });
  },
  listaProdutos: (pagination: string, dados: any) => {
    const url = localStorage.getItem("urlAPI");
    return fetch(url + "/products/list?"+pagination, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": stateGlobal.token,
      },
      body: JSON.stringify(dados),
    }).then(function (response) {
        if (response.status == 200) {
          return response.json();
        }else if (response.status == 401) {
          notification.notify({
            title: "Não autenticado",
            text: "Faça o login novamente",
            type: "error",
          });
          window.location.href = window.location.href.split("#")[0] + "#/login";
        }
      }).catch(function (error) {
        console.log("response error ", error)
        notification.notify({
            title: "ERRO",
            text: error,
            type: "error",
          });
      });
  },
}