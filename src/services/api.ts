import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL

console.log(baseURL)
export const api = axios.create({
  baseURL,
  timeout: 5000,
})