export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-o3zr.onrender.com/api"
  : "http://localhost:1337/api";
  
export const API_TOKEN = import.meta.env.PROD
  ? "c05d43af11a42d99f34888ed02d86606f5e55b7a3f0e9c06dca15f1de76d12dff5446bbdc0af48775fe65b3e46a30d04b28b6f5c32bde01ca32f9d6674b6f6ae3c0e83913de913ac33ae4d2a1bbba263a61af6806ab3f8f1dc4ccbf52f056be915fc6eb5d5d45305ecf174f965d267fa4460cd3c497fc71773f463c9e5091e4c"
  : "e2023879e378a9cf8338ed4173044a3e7c2b5c3a093cb7811533184344e630f6be8f29c63692480063e9675f62c959275e897f4b99d15b99dc097bbee557a7c9604294244130ffefa033558f65dae28bc42a9697013d608bc9b4b9b312bf7d9d5c99d7267c283ac614b5c4a7d003816006930f5857a33d2370f0c488e11eb0a4";

export const PAGE_SIZE_OPTIONS = [3, 5, 10, 25];