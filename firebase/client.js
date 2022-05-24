// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgcuGINO_JzseHLaJdH5oZsdl_d5kCy6s",
  authDomain: "devtter-e4f22.firebaseapp.com",
  projectId: "devtter-e4f22",
  storageBucket: "devtter-e4f22.appspot.com",
  messagingSenderId: "82527652774",
  appId: "1:82527652774:web:e30e02756f3b80dabddd67",
  measurementId: "G-9399X93K19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const loginWithGithub = () => {
	const auth = getAuth();
	const githubProvider = new GithubAuthProvider();
	return signInWithPopup(auth, githubProvider);
};