import _ from "lodash";
import axios from "axios";
import store from "store";
const postAxios = axios.post;
const getAxios = axios.get;

const checkAPIResultCode = (response: any, resolve: any, reject: any) => {
  const result = response.status;
  if (result !== 200) {
    return reject(response.data);
  }
  resolve(response.data);
};

axios.getWithoutAuth = (...params: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getAxios(...params);
      //console.log(response)
      checkAPIResultCode(response, resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
};

axios.postWithoutAuth = (...params: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postAxios(...params);
      checkAPIResultCode(response, resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
};

axios.getWithAuth = (...params: any) => {
  let token = store.getState().auth.token.access_token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(axios.defaults.headers)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "http://192.168.1.13:8000/users/current-user"
      );
      console.log(response);
    } catch (e) {
      reject(e);
    }
  });
};
