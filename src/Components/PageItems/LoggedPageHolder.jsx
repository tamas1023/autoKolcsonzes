import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "./Header";
import Footer from "./Footer";

const LoggedPageHolder = (props) => {
  const nav = useRef();
  //console.log(props.beloginoltProp);
  return (
    <div className="h-screen flex flex-col">
      <Navbar nav={nav} />
      <main>
        <Header title={props.title} nav={nav} />

        {props.children}
        <Footer />
      </main>
    </div>
  );
};

export default LoggedPageHolder;
