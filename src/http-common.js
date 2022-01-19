import axios from "axios";
import SERVER_URL from "../config.js"

export default axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
});