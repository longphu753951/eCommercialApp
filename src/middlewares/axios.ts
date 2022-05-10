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
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        ...params,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      checkAPIResultCode(response, resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
};
