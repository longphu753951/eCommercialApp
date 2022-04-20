import _ from "lodash";
import axios from "axios";

const postAxios = axios.post;

const checkAPIResultCode = (response, resolve, reject) => {
  const { result } = response.data;

  if (response.code !== "200") {
    return reject(response);
  }

  resolve(response);
};

axios.post = (...params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postAxios(...params);

      checkAPIResultCode(response, resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
};
