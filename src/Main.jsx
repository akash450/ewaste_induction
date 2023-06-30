import React, { useContext } from 'react'
import { AuthContext } from './Contexts/AuthContext';
import AppStack from './authstack/AppStack';
import AuthStack from './authstack/AuthStack';

const Main = () => {
    const {userToken} = useContext(AuthContext);

    return (
        userToken !== null ? <AppStack /> : <AuthStack/>
    );
}

export default Main