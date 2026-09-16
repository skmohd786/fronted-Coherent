export const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (location.hostname === "localhost"
    ? "http://localhost:7777"
    : "https://backend-coherent.onrender.com");

export const DEFAULT_PROFILE_IMAGE = "/Coherent-logo.png";