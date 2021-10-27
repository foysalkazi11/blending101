import React, {useEffect, useState, useContext, createContext} from 'react';
import { useRouter } from 'next/router';
import {connect} from 'react-redux';
import { setActiveUser } from '../redux/users/user.action';

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext();

// CONTEXT WRAPPER: PROVIDES AUTH
function AuthProvider({children, activeUser}) {

    // INITIALIZE 2: DEFINE STATES
    const [user, setUser] = useState(null);
    const [fetching, setFetching] = useState(false)
    const router = useRouter();

    // SETS USER WHEN ACTIVE USER IS DETECTED
    useEffect(() => {
        setUser(activeUser)
    }, [activeUser])

    // EXTRACT PAGE
    const page = router.pathname;

    // IF NO USER REDIRECT TO LOGIN PAGE
    //if(!user && process.browser && page !== '/login') router.push('/login')

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </ AuthContext.Provider >
    )
}
export const useAuth = () => useContext(AuthContext);

const mapStateToProps = state => ({
    activeUser : state.user.user
})
export default connect(mapStateToProps, {setActiveUser})(AuthProvider);