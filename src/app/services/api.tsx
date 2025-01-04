import axios from "axios";

export const api = axios.create({
  baseURL: "https://deploy-back-nestjs.vercel.app/",
});

// url back deploy: https://deploy-back-nestjs.vercel.app/
// local: http://localhost:3000/