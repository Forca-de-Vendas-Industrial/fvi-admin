
import { useNotification } from "@kyvg/vue3-notification";
const notification = useNotification();
import { stateGlobal } from "../const/Global";

export const tipoRecords = {
  buscaGestor: () => {
    const url = localStorage.getItem("urlAPI");
    return fetch(url + "/type/busca", {
      method: "POST",
      headers: {
        "auth-token": stateGlobal.token,
      },
    }).then(function (response) {
        if (response.status == 200) {
          return response.json();
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