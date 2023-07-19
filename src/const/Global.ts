import { reactive } from "vue";

export const stateGlobal = reactive({
  token: "" as string,
});

export const metodos = {
  setToken(value: string): void {
    stateGlobal.token = value;
  },
};
