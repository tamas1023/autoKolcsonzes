import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCont } from "../Services/AuthContext";

const Login = (props) => {
  const navitage = useNavigate();
  const username = useRef();
  const pass = useRef();
  const authC = useContext(AuthCont);
  //console.log(props.beloginoltProp);
  //console.log(props.setBeloginoltProp);
  //console.log("Valami");
  const CheckUser = () => {
    //console.log(username.current.value);
    authC.login(username.current.value);
    //localStorage.removeItem("payments");

    const payments = JSON.parse(localStorage.getItem("payments"));
    const payment = [
      {
        username: username.current.value,
        money: 0,
      },
    ];
    if (!payments) {
      //console.log("ide belép");
      localStorage.setItem("payments", JSON.stringify(payment));
    } else {
      const existingPayment = payments.find(
        (payment) => payment.username === username.current.value
      );

      if (!existingPayment) {
        const updatedPayments = [...payments, ...payment];
        //console.log(updatedPayments);
        localStorage.setItem("payments", JSON.stringify(updatedPayments));
      }
    }

    navitage("/autoKolcsonzes/Főoldal");
    //username.current.value;
    /*
    if (username.current.value === "admin") {
      props.setBeloginoltProp(true);
      props.setAdminProp(true);
      navitage("/Főoldal");
    } else {
      props.setBeloginoltProp(true);
      navitage("/Főoldal");
    }*/
    //const updatedCars = [...cars, { ...car, id: generateUniqueId() }];
    //localStorage.setItem("cars", JSON.stringify(updatedCars));
    //navitage("/Főoldal");
  };
  return (
    <div>
      {/*Autó hozzáadás*/}
      {/*for cilkussal megoldható
      form className="w-5/6 m-auto"*/}
      <form className="w-5/6 m-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="">
              <label className="block text-sm font-medium leading-6 ">
                Felhasználónév
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  ref={username}
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Felhasználónév"
                />
              </div>
              <label className="block text-sm font-medium leading-6 ">
                Jelszó
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  ref={pass}
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Jelszó"
                />
              </div>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 "
              onClick={() => {
                CheckUser();
              }}
            >
              Bejelentkezés
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
