
import { useNotification } from "@kyvg/vue3-notification";
const notification = useNotification();
import { stateGlobal } from "../const/Global";

export const usuarioRecords = {
  auth: (dados: any) => {
      const url = localStorage.getItem("urlAPI");
      return fetch(url + "/users/auth", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      }).then(function (response) {
        if (response.status == 200) {
          return response.json();
        }else if (response.status == 401) {
          notification.notify({
            title: "Não autenticado",
            text: "Email senha/senha incorreto",
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
  cadastraPadrao: (dados: any) => {
    const url = localStorage.getItem("urlAPI");
    return fetch(url + "/users/default", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    }).then(function (response) {
        if (response.status == 200) {
          return response.json();
        }else if (response.status == 401) {
          notification.notify({
            title: "Não autenticado",
            text: "Email senha/senha incorreto",
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
  verificaPadrao: () => {
    const url = localStorage.getItem("urlAPI");
    return fetch(url + "/users/default", {
      method: "GET",
    }).then(function (response) {
        if (response.status == 200) {
          return response.json();
        }else if (response.status == 401) {
          notification.notify({
            title: "Não autenticado",
            text: "Email senha/senha incorreto",
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