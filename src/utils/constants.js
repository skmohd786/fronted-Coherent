export const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (["localhost", "127.0.0.1"].includes(location.hostname)
    ? `http://${location.hostname}:7777`
    : "https://backend-cohorent.onrender.com");

export const DEFAULT_PROFILE_IMAGE = "/Cohorent-logo.png";

const PROFESSIONAL_PROFILE_IMAGES = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
];

export const getDefaultProfileImage = (seed = "coherent-user") => {
  const seedValue = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0);
  return PROFESSIONAL_PROFILE_IMAGES[seedValue % PROFESSIONAL_PROFILE_IMAGES.length];
};