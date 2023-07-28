//ide jön az összes path elhelyezés
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Nope from "../404/Nope";
import Home from "../Home/Home";
import LoggedPageHolder from "../PageItems/LoggedPageHolder";
import CarAdd from "../CarThings/CarAdd";
import SingleCar from "../CarThings/SingeCar";
import CarRent from "../CarThings/CarRent";
import Login from "../Auth/Login";
import AuthProtection from "../Protection/AuthProtection";
import AuthContext from "../Services/AuthContext";
import OutProtection from "../Protection/OutProtection";
import AdminProtection from "../Protection/AdminProtection";

const MainContent = () => {
  const [beloginolt, setBeloginolt] = useState(false);
  const [admin, setAdmin] = useState(false);
  //console.log(admin);
  return (
    <AuthContext>
      <Routes>
        {/*Ezekre menne az out protection*/}

        <Route path="/auth/*" />

        {/*Ezekre menne a login protection*/}
        <Route
          path="/Főoldal/*"
          element={
            <>
              <LoggedPageHolder title={"Főoldal"}>
                <Home />
              </LoggedPageHolder>
            </>
          }
        />
        <Route
          path="/Bérlés/*"
          element={
            <AuthProtection>
              <LoggedPageHolder title={"Bérlés"}>
                <CarRent />
              </LoggedPageHolder>
            </AuthProtection>
          }
        />

        <Route
          path="/Auto/:autoId"
          element={
            <>
              <LoggedPageHolder title={"Egy Autó"}>
                <SingleCar />
              </LoggedPageHolder>
            </>
          }
        />
        <Route
          path="/Hozzáadás"
          element={
            <AdminProtection>
              <LoggedPageHolder title={"Autó Hozzáadás"}>
                <CarAdd />
              </LoggedPageHolder>
            </AdminProtection>
          }
        />
        <Route
          path="/Bejelentkezés"
          element={
            <OutProtection>
              <LoggedPageHolder title={"Bejelentkezés"}>
                <Login />
              </LoggedPageHolder>
            </OutProtection>
          }
        />
        <Route path="study/*" />
        {/*Erre menne az admin protection*/}
        <Route path="/admin/*" />

        <Route path="/*" element={<Nope />} />
      </Routes>
    </AuthContext>
  );
};

export default MainContent;
