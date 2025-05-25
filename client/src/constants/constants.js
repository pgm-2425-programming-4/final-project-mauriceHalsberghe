export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-o3zr.onrender.com/api"
  : "http://localhost:1337/api";
  
export const API_TOKEN = import.meta.env.PROD
  ? "0d320ad3acb6a72f96890c52b682901ae6ec973e7e4bc41c8f7f64266028a95565e7e8900de90f6f0e85623ba8f07684a43c665255dae05110ee494bb1fbae79f992551869f5fad1c92641e6e1c56400ff030515556a8dc7d7bde23bd05e945952590edbe06c0dc1fa54626dff30309c0f2b29d2ed0d1ab0d15f4bf826f77a91"
  : "cfd7489a0f6a3186804ef4e90aa53b9db1101b75cb8d7f592a48e22aa39d8108ef1e19ee6389b6db97bc9b493e9a37a0c5bdaf42a46c71ebc7655d17c4c8bd95dce4d414ce69c9d5c408e0854e8645f72524494ac5339749852cff601b514202f576ffef953921787ac66803cf135255b72b3763d390fcd6d74e93e7c32cb3a3";

export const PAGE_SIZE_OPTIONS = [3, 5, 10, 25];