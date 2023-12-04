import React, { useContext, useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import NotProtected from './pages/notProtected';
import { UserContext } from './userContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

interface ProtectedProps {
  // Add your prop types here
  children: any;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const {setUser} = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    /* ---------------------------------------------------------------------------------------------- */
    /*                  Check if user is logged in and set the user state accordingly                 */
    /* ---------------------------------------------------------------------------------------------- */
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setIsLogged(true);
        // ...
      } else {
        // User is signed out
        setIsLogged(false);
      }
    });
  }, [])
  return (
    <>
      {isLogged ? children : <NotProtected />}
    </>
  )
}

export default Protected