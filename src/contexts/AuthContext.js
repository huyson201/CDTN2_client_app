import React, {useContext, createContext, useState, useEffect} from 'react';
import {auth} from '../../cf_firebase/ConfigFireBase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState();
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  useEffect(() => {
    const unsubcriber = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubcriber;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
