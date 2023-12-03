import React, { useContext } from 'react'
// import { Navigate } from 'react-router-dom';
import NotProtected from './pages/notProtected';
import { UserContext } from './userContext';

interface ProtectedProps {
  // Add your prop types here
  children: any;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
    const {user , setUser} = useContext(UserContext);
    if (!user || user === null) {
        return <NotProtected />;
      }
    else return children;
}

export default Protected