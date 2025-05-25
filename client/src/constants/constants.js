export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-o3zr.onrender.com/api"
  : "http://localhost:1337/api";
  
export const API_TOKEN = import.meta.env.PROD
  ? "c05d43af11a42d99f34888ed02d86606f5e55b7a3f0e9c06dca15f1de76d12dff5446bbdc0af48775fe65b3e46a30d04b28b6f5c32bde01ca32f9d6674b6f6ae3c0e83913de913ac33ae4d2a1bbba263a61af6806ab3f8f1dc4ccbf52f056be915fc6eb5d5d45305ecf174f965d267fa4460cd3c497fc71773f463c9e5091e4c"
  : "986e1c3e12001bd55fb45aecb7dab44209f05702e7082db3a4aa15a6a6831e0f08d2e9f79064a00e43498419b1b8e5a1f35787e812b4bd7d519a8f8e9de2670bd731a50324ad6106bb4faf0c7c0b84429a7ec2e56107f9374fb95e007b5a7e92b323573775efd0b5c19ff8b6614600de222e2f1533d02ce94729d2acf16bf2b3";

export const PAGE_SIZE_OPTIONS = [3, 5, 10, 25];