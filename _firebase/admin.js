const admin = require('firebase-admin');
const serviceAccount = require('./firebase-keys.json');

console.log(process.env.FIREBASE_DATABASE_URL);

try {
	admin.initializeApp({ 
		credential: admin.credential.cert(serviceAccount),
		databaseURL: process.env.FIREBASE_DATABASE_URL
	});
} catch (error) {
	
}

export const firestore = admin.firestore();

/*// const admin = require('firebase-admin');
import { initializeApp, cert } from 'firebase-admin/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
// import serviceAccount from './firebase-keys.json' assert {type: 'json'};
import serviceAccount from './firebase-keys.json';

const app = initializeApp({ 
	credential: cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = getFirestore(app);

export const getDocById = id => {
	// const docRef = doc(db, "cities", "SF");
	// const docSnap = await getDoc(docRef);

	const docRef = doc(collection(db, 'devits'), id);
	return getDoc(docRef);
};*/