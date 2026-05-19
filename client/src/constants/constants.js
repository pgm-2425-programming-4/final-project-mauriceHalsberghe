export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-s1mr.onrender.com/api"
  : "http://localhost:1337/api";
  
export const API_TOKEN = import.meta.env.PROD
  ? import.meta.env.API_KEY
  : "cfd7489a0f6a3186804ef4e90aa53b9db1101b75cb8d7f592a48e22aa39d8108ef1e19ee6389b6db97bc9b493e9a37a0c5bdaf42a46c71ebc7655d17c4c8bd95dce4d414ce69c9d5c408e0854e8645f72524494ac5339749852cff601b514202f576ffef953921787ac66803cf135255b72b3763d390fcd6d74e93e7c32cb3a3";

export const PAGE_SIZE_OPTIONS = [3, 5, 10, 25];