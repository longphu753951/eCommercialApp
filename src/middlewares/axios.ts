import _ from "lodash";
import axios from "axios";

const postAxios = axios.post;
const getAxios = axios.get;

const checkAPIResultCode = (response:any, resolve: any, reject: any) => {
  const result =  response.status;
  if (result !== 200) {
    return reject(response.data);
  }
  resolve(response.data);
};

axios.postWithoutAuth = (...params: any) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      //console.log(...params)
      const response = await getAxios(...params);
      //console.log(response)
      checkAPIResultCode(response, resolve, reject);
    
    } catch (e) {
      reject(e);
    }
  });
};
