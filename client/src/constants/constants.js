export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-o3zr.onrender.com/api"
  : "http://localhost:1337/api";
  
export const API_TOKEN = import.meta.env.PROD
  ? "c05d43af11a42d99f34888ed02d86606f5e55b7a3f0e9c06dca15f1de76d12dff5446bbdc0af48775fe65b3e46a30d04b28b6f5c32bde01ca32f9d6674b6f6ae3c0e83913de913ac33ae4d2a1bbba263a61af6806ab3f8f1dc4ccbf52f056be915fc6eb5d5d45305ecf174f965d267fa4460cd3c497fc71773f463c9e5091e4c"
  : "cfd7489a0f6a3186804ef4e90aa53b9db1101b75cb8d7f592a48e22aa39d8108ef1e19ee6389b6db97bc9b493e9a37a0c5bdaf42a46c71ebc7655d17c4c8bd95dce4d414ce69c9d5c408e0854e8645f72524494ac5339749852cff601b514202f576ffef953921787ac66803cf135255b72b3763d390fcd6d74e93e7c32cb3a3";

export const PAGE_SIZE_OPTIONS = [3, 5, 10, 25];