import { useContext, useState, useEffect, createContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useSnackbar } from "notistack";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState();
  const [currentUserEV, setCurrentUserEV] = useState(false);
  const [currentUserState, setCurrentUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password, handleCloseM) {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password).then(
            (obj) => {
              if (obj.user.emailVerified) {
                setCurrentUserEV(true);
                enqueueSnackbar("You Are Now Signed In", {
                  variant: "success",
                });
                handleCloseM();
              } else {
                send_verification();
                enqueueSnackbar("Please Verify Your Email", {
                  variant: "info",
                });
                setCurrentUserEV(false);
                signOut(auth);
              }
            }
          );
        } catch (error) {
          enqueueSnackbar("Login Failed", { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Login Failed", { variant: "error" });
      });
  }

  function logout() {
    enqueueSnackbar("Logged out", { variant: "success" });
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updatePassword(password) {
    return currentUser
      .updatePassword(auth, password)
      .then(() => {})
      .catch((error) => {});
  }

  function send_verification() {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // enqueueSnackbar("Please Verify Your Email", { variant: "info" });
        // console.log("* Please Verify Your Email *");
      })
      .catch((error) => {
        // console.log("Error: " + error.message);
      });
  }

  function checkIfVerified(user, handleCloseM) {
    try {
      if (user.emailVerified) {
        setCurrentUserEV(true);
        handleCloseM();
      } else {
        send_verification();
        setCurrentUserEV(false);
        signOut(auth);
      }
    } catch {}
  }

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUserEmail(currentUser.email);
        setCurrentUser(currentUser);
        checkIfVerified(currentUser);
        setCurrentUserState(true);
        setLoading(false);
      } else {
        setCurrentUser(null);
        checkIfVerified(currentUser);
        setCurrentUserState(false);
        setLoading(false);
      }
    });
  }, []);

  const value = {
    loading,
    currentUser,
    currentUserEV,
    currentUserEmail,
    currentUserState,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    send_verification,
    setCurrentUserEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
