import axios from "axios";
import store from "../store";

export default () => {
  return axios.create({
    baseURL: `http://192.168.206.160:8084`,
    headers: {
      Authorization: `Bearer ${store.state.CurrentUser.token}`,
    },
  });
};
