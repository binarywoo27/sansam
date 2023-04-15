import axios from "axios";

export default axios.create({
  baseURL: "https://j8d205.p.ssafy.io/api",
  // baseURL: "http://localhost:5000",
});

export const Login_URI = "https://j8d205.p.ssafy.io/api";
// export const Login_URI = "http://localhost:5000";
