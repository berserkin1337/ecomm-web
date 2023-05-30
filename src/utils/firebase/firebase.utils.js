import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrc5ZED0jvIgCCvxlrm2_mPJn_A079p0A",

    authDomain: "crwn-clothing-db-d4e8c.firebaseapp.com",

    projectId: "crwn-clothing-db-d4e8c",

    storageBucket: "crwn-clothing-db-d4e8c.appspot.com",

    messagingSenderId: "420919677836",

    appId: "1:420919677836:web:faf0e2b1faa4cdb16f3ca9",
};

// Initialize Firebase

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;
    const db = getFirestore();
    const userDocRef = await doc(db, "users", userAuth.uid);
    // console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        } catch (error) {
            console.log("Error creating the user ", error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    await signOut(auth);
}

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
            const newDocRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(newDocRef, object);
        }
    );
    await batch.commit();
    console.log("Collection added");
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    //
    // return categoryMap
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
}