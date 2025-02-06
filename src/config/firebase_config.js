import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkSzJbt4nUQrEYJxe2E8dMkFE1wA-2fc4",
  authDomain: "recipe-image.firebaseapp.com",
  projectId: "recipe-image",
  storageBucket: "recipe-image.firebasestorage.app",
  messagingSenderId: "280034744807",
  appId: "1:280034744807:web:ae40ff44466035fa94c542"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);