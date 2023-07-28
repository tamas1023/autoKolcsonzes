import React, { useContext } from "react";
import { AuthCont } from "../Services/AuthContext";
import { Navigate } from "react-router-dom";

const OutProtection = (props) => {
  const authC = useContext(AuthCont);
  //console.log(authC);
  //if (!authC.isLoggedIn) return <Navigate to={"/"} />;

  return <>{props.children}</>;
};

export default OutProtection;
