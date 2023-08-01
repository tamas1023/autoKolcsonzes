import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthCont } from "../Services/AuthContext";
function SingleCar(props) {
  const param = useParams();
  const id = parseInt(param.autoId);
  const navitage = useNavigate();
  const authC = useContext(AuthCont);
  const [isPending, setPending] = useState(false);

  const getItemById = (id) => {
    const storedCars = JSON.parse(localStorage.getItem("cars"));
    const oneCar = storedCars.filter((storedCar) => storedCar.id === id)[0];

    return oneCar;
  };

  const deleteCarById = (id) => {
    if (!authC.isAdmin()) navitage("/Főoldal");
    const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
    const updatedCars = storedCars.filter((car) => car.id !== id);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    navitage("/autoKolcsonzes/Főoldal");
  };
  const rent = () => {
    const currentDate = new Date();
    oneCar.kiBereltE = true;
    const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
    storedCars[car.id] = oneCar;
    localStorage.setItem("cars", JSON.stringify(storedCars));

    const rent = [
      {
        id: oneCar.id,
        username: authC.user,
        date: currentDate,
      },
    ];

    const storedRents = JSON.parse(localStorage.getItem("rents"));
    const updateStoredRents = storedRents ? [...storedRents, ...rent] : rent;
    localStorage.setItem("rents", JSON.stringify(updateStoredRents));

    navitage("/autoKolcsonzes/Főoldal");
  };
  const oneCar = getItemById(id);
  const [car, SetCar] = useState({
    id: parseInt(oneCar.id),
    név: oneCar.név,
    ára: parseInt(oneCar.ára),
    leírás: oneCar.leírás,
    kép: oneCar.kép,
    kiBereltE: false,
  });

  const inputs = [
    {
      név: "Név",
      name: "név",
      placeholder: "Az autó neve",
      type: "text",
      defaultValue: oneCar.név,
    },
    {
      név: "Ára /óra(csak szám)",
      name: "ára",
      placeholder: "Az autó ára forintban értve",
      type: "number",
      defaultValue: oneCar.ára,
    },
    {
      név: "Leírás",
      name: "leírás",
      placeholder: "Az autó leírása",
      type: "text",
      defaultValue: oneCar.leírás,
    },
    {
      név: "Kép (URL)",
      name: "kép",
      placeholder: "Az autó képe",
      type: "text",
      defaultValue: oneCar.kép,
    },
  ];
  const handleChange = (e) => {
    SetCar((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const changeCar = () => {
    if (!authC.isAdmin()) navitage("/autoKolcsonzes/Főoldal");
    const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
    storedCars[car.id] = car;
    localStorage.setItem("cars", JSON.stringify(storedCars));
    navitage("/autoKolcsonzes/Főoldal");
  };

  return (
    <>
      <div key={oneCar.id} className="w-5/6 m-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
            {inputs.map((input) => (
              <div className="" key={input.name}>
                <label className="block text-sm font-medium leading-6 ">
                  {input.név}
                </label>
                {input.name === "leírás" ? (
                  <textarea
                    type={input.type}
                    name={input.name}
                    id="first-name"
                    className="block w-full disabled:opacity-100 disabled:text-white rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    defaultValue={input.defaultValue}
                    {...(authC.isAdmin() ? {} : { disabled: true })}
                  ></textarea>
                ) : (
                  <input
                    type={input.type}
                    name={input.name}
                    id="first-name"
                    className="block w-full disabled:opacity-100 disabled:text-white rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    defaultValue={input.defaultValue}
                    {...(authC.isAdmin() ? {} : { disabled: true })}
                  />
                )}
              </div>
            ))}
            <img src={oneCar.kép} alt={oneCar.név} className="w-96 m-auto" />

            <div>
              {authC.isLoggedIn ? (
                <button
                  className="block w-full mb-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 text-white"
                  onClick={() => {
                    if (window.confirm("Biztos ki akarod bérelni?")) {
                      setPending(true);
                      (async () => {
                        try {
                          rent();
                        } catch (err) {
                          console.log(err);
                        } finally {
                          setPending(false);
                        }
                      })();
                    }
                  }}
                >
                  Autó bérlése
                </button>
              ) : (
                ""
              )}

              {authC.isAdmin() ? (
                <div>
                  <button
                    className="block w-full mb-2 bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 rounded-md p-2 text-white"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Biztos végre akarod hajtani a módosításokat?"
                        )
                      ) {
                        setPending(true);
                        (async () => {
                          try {
                            changeCar();
                          } catch (err) {
                            console.log(err);
                          } finally {
                            setPending(false);
                          }
                        })();
                      }
                    }}
                  >
                    Autó módosítása
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Biztos ki akarod törölni?")) {
                        setPending(true);
                        (async () => {
                          try {
                            deleteCarById(id);
                          } catch (err) {
                            console.log(err);
                          } finally {
                            setPending(false);
                          }
                        })();
                      }
                    }}
                    className="block w-full bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 rounded-md p-2 text-white"
                  >
                    Autó törlése
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCar;
