import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCont } from "../Services/AuthContext";
function CarRent(props) {
  const authC = useContext(AuthCont);
  const cars = JSON.parse(localStorage.getItem("cars"));
  const rents = JSON.parse(localStorage.getItem("rents") || []);
  //console.log(rents);
  const payments = JSON.parse(localStorage.getItem("payments"));
  //console.log(payments);
  const onePayment = payments.filter(
    (payment) => payment.username === authC.user
  )[0];

  const navitage = useNavigate();

  const updatedCars = cars.filter((car) =>
    rents.some((rent) => rent.id === car.id && authC.user === rent.username)
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
      //console.log(amount);
      onePayment.money += amount;
      payments.map((payment) => {
        payment.username === authC.user
          ? { ...payment, money: payment.money + amount }
          : payment;
      });
      //console.log(payments);
      localStorage.setItem("payments", JSON.stringify(payments));
      navitage("/autoKolcsonzes/Bérlés");
    }
  };
  const stopRent = (id) => {
    //console.log(id);
    //console.log(rents);
    const oneRent = rents.filter((rent) => rent.id === id)[0];
    const startDate = new Date(oneRent.date);
    //console.log(startDate);
    const currentDate = new Date();
    //console.log(currentDate);
    const timeDifferenceMillis = currentDate.getTime() - startDate.getTime();
    //console.log(timeDifferenceMillis);
    const hoursPassed = Math.ceil(timeDifferenceMillis / (1000 * 60 * 60));
    /*
    const minutesPassed = Math.ceil(timeDifferenceMillis / (1000 * 60));
    const secondsPassed = Math.ceil(timeDifferenceMillis / 1000);
    console.log(secondsPassed);
    console.log(minutesPassed);
    */
    //console.log(hoursPassed);
    const oneCar = cars.filter((car) => car.id === id)[0];
    //console.log(onePayment.money);
    //console.log(oneCar.ára);
    onePayment.money -= hoursPassed * oneCar.ára;
    //console.log(onePayment.money);

    const updatedRents = rents.filter((rent) => rent.id !== id);
    cars[id].kiBereltE = false;
    //console.log(cars[id]);
    //console.log(cars);
    localStorage.setItem("cars", JSON.stringify(cars));
    localStorage.setItem("rents", JSON.stringify(updatedRents));
    //miven a onepayment a filter által??? a payments re mutat ezért a payment értéke is válltozik... ?
    localStorage.setItem("payments", JSON.stringify(payments));
    navitage("/autoKolcsonzes/Bérlés");
  };
  //console.log(updatedCars);
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
        {updatedCars.map((car) => (
          <div
            key={car.id}
            className="border-solid border-2 border-sky-700 m-1 flex flex-col"
          >
            <div className="flex-grow">
              <div className="text-sm font-medium leading-6 text-center p-1">
                {car.név}
              </div>
              <div className="text-center p-1">{car.ára}/óra</div>
              <div className="text-center p-1">{car.leírás}</div>
            </div>
            <div className="flex-shrink-0">
              <img src={car.kép} alt={car.név} className="w-72 m-auto p-1" />
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
