import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCont } from "../Services/AuthContext";

function CarAdd(props) {
  const navitage = useNavigate();
  const authC = useContext(AuthCont);

  const [cars, setCars] = useState(
    JSON.parse(localStorage.getItem("cars")) || []
  );
  const [car, SetCar] = useState({
    id: -1,
    név: "",
    ára: -1,
    leírás: "",
    kép: "",
    kiBereltE: false,
  });
  const generateUniqueId = () => {
    //jelenlegi id-k legnagyobb értékét adjuk vissza
    const maxId = Math.max(...cars.map((car) => car.id));
    return maxId + 1;
  };
  const inputs = [
    { név: "Név", name: "név", placeholder: "Az autó neve", type: "text" },
    {
      név: "Ára /óra(csak szám)",
      name: "ára",
      placeholder: "Az autó ára forintban értve",
      type: "number",
    },
    {
      név: "Leírás",
      name: "leírás",
      placeholder: "Az autó leírása",
      type: "text",
    },
    {
      név: "Kép (URL)",
      name: "kép",
      placeholder: "Az autó képe",
      type: "text",
    },
  ];

  const addNewCar = () => {
    //console.log(cars.length);
    if (!authC.isAdmin()) return "";
    const updatedCars = [...cars, { ...car, id: generateUniqueId() }];
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    /*
    setCars(updatedCars);
    console.log(cars);
    console.log("----------------------------------------");
    console.log(JSON.parse(localStorage.getItem("cars")));
    */
    navitage("/autoKolcsonzes/Főoldal");
  };
  const handleChange = (e) => {
    SetCar((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      {/*Autó hozzáadás*/}
      {/*for cilkussal megoldható*/}
      <form className="w-5/6 m-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
            {inputs.map((input) => (
              <div className="" key={input.name}>
                <label className="block text-sm font-medium leading-6 ">
                  {input.név}
                </label>
                <div className="mt-2">
                  <input
                    type={input.type}
                    name={input.name}
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
            {authC.isAdmin() ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 "
                onClick={() => {
                  addNewCar();
                }}
              >
                Új autó hozzáadása
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CarAdd;
