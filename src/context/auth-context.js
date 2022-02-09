import React, { useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = React.createContext({
  user: null,
  isUserLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retrieveSessionedUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log('usrr: ', user);
    if (user) {
      console.log('inside');
      return user;
    }
    console.log('outside');
    return null;
  });
};

export const AuthContextProvider = (props) => {
  const userData = retrieveSessionedUser();
  console.log('userData: ', userData);
  let initialUser;
  if (userData) {
    initialUser = userData;
  }
  console.log('initial: ', initialUser);

  const [user, setUser] = useState('mith');

  const isUserLoggedIn = !!user;

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('signed out successfully!');
      })
      .catch((error) => {
        console.log('something went wrong when singed out!');
      });
  };

  const loginHandler = (user) => {
    setUser(user);
  };

  const contextValue = {
    user: user,
    isUserLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
