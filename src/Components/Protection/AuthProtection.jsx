import React, { useContext } from "react";
import { AuthCont } from "../Services/AuthContext";
import { Navigate } from "react-router-dom";

const AuthProtection = (props) => {
  const authC = useContext(AuthCont);
  //console.log(authC);
  if (!authC.isLoggedIn) return <Navigate to={"/Főoldal"} />;

  return <>{props.children}</>;
};

export default AuthProtection;
