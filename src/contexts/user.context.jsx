import { createContext, useEffect, useState } from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(()=>{

    return onAuthStateChangedListener((user) => {
      const func = async  () =>  {
        if (user) {
          await createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      }
      func();
    });
  },[])
  const value = {currentUser, setCurrentUser}
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}