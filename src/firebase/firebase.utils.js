import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDjlzbIsUXQ1P_LoRGu8jwonFOUy0fa1gA',
  authDomain: 'crwn-clothing-2d259.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-2d259.firebaseio.com',
  projectId: 'crwn-clothing-2d259',
  storageBucket: 'crwn-clothing-2d259.appspot.com',
  messagingSenderId: '927888578134',
  appId: '1:927888578134:web:d48d4d0aa98049abc7cdf7',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error while creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
