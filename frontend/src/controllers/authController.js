import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    setPersistence, 
    browserSessionPersistence
} from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// ✅ Ensure Firebase Auth Session Persists
setPersistence(auth, browserSessionPersistence);

export const signUpUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// ✅ Google Sign-in
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { success: true, user: result.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// ✅ GitHub Sign-in
export const signInWithGitHub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        return { success: true, user: result.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
