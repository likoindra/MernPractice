// import axios from "axios";

// const instance = axios.create({
//     baseURL: ,
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'},
//   });

//   export default instance

import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:4000",
});
