import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const AuthCont = createContext();

const AuthContext = (props) => {
  /*{props.children;}*/
  //console.log(props.beloginoltProp);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  //const [beloginolt, setBeloginolt] = useState(false);
  //const [admin, setAdmin] = useState(false);

  const registration = () => {
    //itt nincs regisztráció de ha lenne ide jönne
  };
  const authCheck = () => {
    //itt nincs auth ellenőrzés de ha lenne ide jönne
  };
  const login = async (username) => {
    setIsLoggedIn(true);

    setUser(username);
    cookies.set("isLoggedIn", "true", { path: "/" });
    cookies.set("userName", username, { path: "/" });
  };
  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    cookies.remove("userName", { path: "/" });
    cookies.remove("isLoggedIn", { path: "/" });
  };
  const isAdmin = () => {
    if (user === "admin") {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const storedLoggedInStatus = cookies.get("isLoggedIn");
    const storeduserNameStatus = cookies.get("userName");
    //console.log(cookies.get("userName"));
    if (storedLoggedInStatus === "true" && storeduserNameStatus !== null) {
      setIsLoggedIn(true);
      setUser(storeduserNameStatus);
      //console.log(storedLoggedInStatus);
      //console.log(storeduserNameStatus);
    }
  }, []);
  return (
    <AuthCont.Provider
      value={{ isLoggedIn, login, logout, user, setUser, isAdmin }}
    >
      {props.children}
    </AuthCont.Provider>
  );
};

export default AuthContext;
