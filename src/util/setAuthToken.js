import { instance } from "../config/config";
const setAuthToken = token => {
 if (token) {
  //apply to every request
  instance.defaults.headers.common["Authorization"] = token;
 } else {
  //Delete auth header
  delete instance.defaults.headers.common["Authorization"];
 }
};

export default setAuthToken;
