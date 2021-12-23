import React, { useEffect, useState, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setActiveUser } from "../redux/users/user.action";
import { useAppSelector } from "../redux/hooks";
import Loader from "../theme/loader/Loader";

// INITIALIZE 1: CREATE AUTH CONTEXT
const AuthContext = createContext();

// CONTEXT WRAPPER: PROVIDES AUTH
function AuthProvider({ children, activeUser }) {
  // INITIALIZE 2: DEFINE STATES

  const [active, setActive] = useState(null);
  const { user } = useAppSelector((state) => state?.user);

  const router = useRouter();

  // SETS USER WHEN ACTIVE USER IS DETECTED

  // EXTRACT PAGE
  const page = router.pathname;

  useEffect(() => {
    if (user) {
      setActive(true);
    } else {
      if (!user && process.browser && page !== "/login" && page !== "/signup")
        router.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (page === "/login" || page === "/signup") {
      setActive(true);
    }
  }, [page]);

  // IF NO USER REDIRECT TO LOGIN PAGE

  if (!active) return <Loader active={true} />;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

const mapStateToProps = (state) => ({
  activeUser: state.user.user,
});
export default connect(mapStateToProps, { setActiveUser })(AuthProvider);
