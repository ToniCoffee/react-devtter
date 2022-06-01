// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
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

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
	apiKey: 'AIzaSyBgcuGINO_JzseHLaJdH5oZsdl_d5kCy6s',
	authDomain: 'devtter-e4f22.firebaseapp.com',
	projectId: 'devtter-e4f22',
	storageBucket: 'devtter-e4f22.appspot.com',
	messagingSenderId: '82527652774',
	appId: '1:82527652774:web:e30e02756f3b80dabddd67',
	measurementId: 'G-9399X93K19'
}; */

console.log(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// console.log(app.name);

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

/* const options = {
	year: 'numeric', month: 'numeric', day: 'numeric',
	hour: 'numeric', minute: 'numeric', second: 'numeric',
	hour12: false,
	// timeZone: 'America/Los_Angeles'
}; */

/* export const fetchLatestDevits = () => {
	const devitsRef = collection(db, 'devits');
	const q = query(devitsRef, orderBy('createdAt', 'desc'));
	return getDocs(q)
		.then(snapshot => snapshot.docs.map(doc => {
			const data = doc.data();
			// const normalizedCreatedAt = new Date(data.createdAt.seconds * 1000);
			// const intl = new Intl.DateTimeFormat('default', options).format(normalizedCreatedAt);
			return {
				...data,
				id: doc.id,
				createdAt: +data.createdAt.toDate()
			};
		}));
}; */

const mapDevitFromFirebaseToDevitObject = doc => {
	const data = doc.data();
	// console.log('doc: ', doc);
	// const normalizedCreatedAt = new Date(data.createdAt.seconds * 1000);
	// const intl = new Intl.DateTimeFormat('default', options).format(normalizedCreatedAt);
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
	// .then(snapshot => snapshot.docs.map(mapDevitFromFirebaseToDevitObject));
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