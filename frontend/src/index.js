import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux"; // Provider disini akan membungkus app dengan store yang sudah dibuat di store.js
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}> 
  {/* store disini berasal dari store yang ada pada store.js yang sudah berisi setup redux  */}
    <App />
  </Provider>,
  document.getElementById("root")
);
