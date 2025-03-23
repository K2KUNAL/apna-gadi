import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // Change port if your backend runs on a different one
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
