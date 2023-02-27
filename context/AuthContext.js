import { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  // ? sign in with google function
  const signIn = async () => {
    const provider = new GoogleAuthProvider(); // * initializing the provider
    await signInWithRedirect(auth, provider);
  };
  // ? function to log the user out
  const logOut = async () => {
    await signOut(auth);
  };
  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ? custom hook to use the auth context globally
export const useAuth = () => {
  return useContext(AuthContext);
};
