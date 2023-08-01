import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCont } from "../Services/AuthContext";
function CarRent(props) {
  const authC = useContext(AuthCont);
  const navitage = useNavigate();
  const cars = JSON.parse(localStorage.getItem("cars"));
  //localStorage.removeItem("rents");
  const rents = JSON.parse(localStorage.getItem("rents"));
  const payments = JSON.parse(localStorage.getItem("payments"));
  const onePayment = payments.filter(
    (payment) => payment.username === authC.user
  )[0];

  const [rentedCars, setRentedCars] = useState(
    rents === null
      ? []
      : cars.filter((car) =>
          rents.some(
            (rent) => rent.id === car.id && authC.user === rent.username
          )
        )
  );

  const toZero = () => {
    if (onePayment.money < 0) {
      onePayment.money = 0;

      //miven a onepayment a filter által??? a payments re mutat ezért a payment értéke is válltozik... ?
      localStorage.setItem("payments", JSON.stringify(payments));
      navitage("/autoKolcsonzes/Bérlés");
    }
  };
  const addMoney = () => {
    const inputAmount = prompt("Add meg a mennyiséget: ");
    if (inputAmount !== null && !isNaN(inputAmount)) {
      const amount = parseInt(inputAmount);
      onePayment.money += amount;
      payments.map((payment) => {
        payment.username === authC.user
          ? { ...payment, money: payment.money + amount }
          : payment;
      });
      localStorage.setItem("payments", JSON.stringify(payments));
      navitage("/autoKolcsonzes/Bérlés");
    }
  };
  const stopRent = (id) => {
    const oneRent = rents.filter((rent) => rent.id === id)[0];
    const startDate = new Date(oneRent.date);
    const currentDate = new Date();
    const timeDifferenceMillis = currentDate.getTime() - startDate.getTime();
    const hoursPassed = Math.ceil(timeDifferenceMillis / (1000 * 60 * 60));
    const oneCar = cars.filter((car) => car.id === id)[0];
    onePayment.money -= hoursPassed * oneCar.ára;

    const updatedRents = rents.filter((rent) => rent.id !== id);
    cars[id].kiBereltE = false;
    const updateRentCars = cars.filter((car) =>
      updatedRents.some(
        (rent) => rent.id === car.id && authC.user === rent.username
      )
    );
    setRentedCars(updateRentCars);
    localStorage.setItem("cars", JSON.stringify(cars));
    localStorage.setItem("rents", JSON.stringify(updatedRents));
    //miven a onepayment a filter által??? a payments re mutat ezért a payment értéke is válltozik... ?
    localStorage.setItem("payments", JSON.stringify(payments));
    navitage("/autoKolcsonzes/Bérlés");
  };
  return (
    <div>
      <h1 className="ml-2">{onePayment.money} pénzed van</h1>
      <button
        className=" mb-2 ml-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 "
        onClick={addMoney}
      >
        Egyenleg feltöltés
      </button>
      <button
        className=" mb-2 ml-2 bg-blue-500  hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 "
        onClick={() => {
          if (window.confirm("Biztos ki akarod egyenlíteni a számlát?")) {
            (async () => {
              try {
                toZero();
              } catch (err) {
                console.log(err);
              } finally {
              }
            })();
          }
        }}
      >
        Egyenleg kiegyenlítése
      </button>
      <div
        className="grid "
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {rentedCars.map((car) => (
          <div
            key={car.id}
            className={`border-solid border-2 border-sky-700 flex flex-col rounded-lg overflow-hidden shadow-md ${
              rentedCars.length === 1 ? "p-4 w-80 m-auto" : "p-4 m-10"
            }`}
          >
            <div className="flex-shrink-0">
              <img
                src={car.kép}
                alt={car.név}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">{car.név}</h2>
              <p className="text-slate-200">{car.leírás}</p>
              <p className="text-slate-300 mt-2">Ár: {car.ára}/óra</p>
            </div>
            <button
              className="block w-full mb-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 "
              onClick={() => {
                if (window.confirm("Biztos meg akarod szűntetni a bérlést?")) {
                  (async () => {
                    try {
                      stopRent(car.id);
                    } catch (err) {
                      console.log(err);
                    } finally {
                    }
                  })();
                }
              }}
            >
              Autó bérlés megszűntetése
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarRent;
