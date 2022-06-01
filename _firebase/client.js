import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  limit ,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

const mapUserFromFirebaseAuthToUser = (user) => {
  if(user) {
    const result = user?.reloadUserInfo ? user.reloadUserInfo : user?.user.reloadUserInfo;
    const { email, photoUrl, screenName, localId } = result;
    return {
      uid: localId,
      avatar: photoUrl,
      email,
      username: screenName
    };
  } else return null;
};

export const onAuthStateChanged = (onChange) => {
  const auth = getAuth();
  auth.onAuthStateChanged(user => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGithub = () => {
  const auth = getAuth();
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(auth, githubProvider)
  // .then(mapUserFromFirebaseAuthToUser)
    .catch(console.log);
};

export const addDevit = ({ uid, avatar, message, email, username, img }) => {
  return addDoc(collection(db, 'devits'), {
    uid, 
    avatar, 
    message, 
    email, 
    username,
    img,
    createdAt: serverTimestamp(),
    modifiedAt: null,
    likesCount: 0,
    sharedCount: 0
  });
};

const mapDevitFromFirebaseToDevitObject = doc => {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    createdAt: +data.createdAt?.toDate()
  };
};

export const listenLatestDevits = (callback) => {
  const devitsRef = collection(db, 'devits');
  const q = query(devitsRef, orderBy('createdAt', 'desc'), limit(20));
  return onSnapshot(q, snapshot => {
    const newDevits = snapshot.docs.map(mapDevitFromFirebaseToDevitObject);
    callback(newDevits);
  });
};

export const fetchLatestDevits = () => {
  const devitsRef = collection(db, 'devits');
  const q = query(devitsRef, orderBy('createdAt', 'desc'), limit(20));
  return getDocs(q)
    .then(snapshot => snapshot.docs.map(mapDevitFromFirebaseToDevitObject));
};

export const uploadImage = (file) => {
  const imagesRef = ref(storage, `images/${file.name}`);
  return uploadBytesResumable(imagesRef, file);
};

export const getImgURL = (task) => {
  return getDownloadURL(task.snapshot.ref);
};