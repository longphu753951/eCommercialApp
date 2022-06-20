import _ from "lodash";
import axios from "axios";
import store from "store";
const postAxios = axios.post;
const getAxios = axios.get;
const deleteAxios = axios.delete

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

axios.putWithAuth = (...params: any) => {
  let token = store.getState().auth.token.access_token;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
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

axios.postWithAuth = (...params: any) => {
  let token = store.getState().auth.token.access_token;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
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

axios.deleteWithAuth = (...params: any) => {
  let token = store.getState().auth.token.access_token;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await deleteAxios(
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

axios.formPost = (url, data, fileField = 'userfile[]') => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      _.forEach(data, (val, field) => {
        if (field === fileField) {
          _.forEach(val, file => {
            formData.append(field, file);
          });
        } else {
          if (typeof val !== 'undefined') {
            formData.append(field, val);
          }
        }
      });
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const eventLoaded = progressEvent.loaded * 100;
          const percentCompleted = Math.round(
            eventLoaded / progressEvent.total
          );

          console.log(percentCompleted);
        }
      };

      const response = await axios.post(url, formData, config);
      

      checkAPIResultCode(response, resolve, reject);
    } catch (error) {
      console.log(error.headers)
      reject(error);
    }
  });
};