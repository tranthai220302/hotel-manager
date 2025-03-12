import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://harumibook.onrender.com/api",
  withCredentials: true,
});

export default newRequest;
