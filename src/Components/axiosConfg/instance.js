import axios from "axios";
import { changeLoader } from "../store/actions";
import store from '../store/store';

let api = "";
let axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: api,
  },
});

axiosInstance.interceptors.request.use(
  function (req) {
    // Do something before request is sent
    store.dispatch(changeLoader(true))
    return req;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (res) {
    // Do something before request is sent
    store.dispatch(changeLoader(false))
    return res;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default axiosInstance;
