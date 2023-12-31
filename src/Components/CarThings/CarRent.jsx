import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCont } from "../Services/AuthContext";
import { NotificationCont } from "../Services/NotificationContext";

function CarRent(props) {
  const authC = useContext(AuthCont);
  const { notificationHandler } = useContext(NotificationCont);
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
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [wantToStopRent, setWantToStopRent] = useState(-1);
  const [payAmount, setPayAmount] = useState();
  const payAmountRef = useRef(0);

  const toZero = () => {
    if (onePayment.money < 0) {
      onePayment.money = 0;

      //miven a onepayment a filter által??? a payments re mutat ezért a payment értéke is válltozik... ?
      localStorage.setItem("payments", JSON.stringify(payments));
      navitage("/autoKolcsonzes/Bérlés");
      notificationHandler({
        type: "success",
        message: "Sikeres kiegyenlítés",
      });
    }
  };
  const addMoney = () => {
    //const inputAmount = prompt("Add meg a mennyiséget: ");

    if (payAmountRef.current !== null && !isNaN(payAmountRef.current)) {
      const amount = parseInt(payAmountRef.current);
      onePayment.money += amount;
      payments.map((payment) => {
        payment.username === authC.user
          ? { ...payment, money: payment.money + amount }
          : payment;
      });
      localStorage.setItem("payments", JSON.stringify(payments));
      navitage("/autoKolcsonzes/Bérlés");
      notificationHandler({
        type: "success",
        message: "Sikeres pénz hozzáadás",
      });
    }
  };
  //console.log(rents);
  //console.log(cars);
  //console.log("History");
  //console.log(history);
  //localStorage.removeItem("history");
  const stopRent = (id) => {
    const oneRent = rents.filter((rent) => rent.id === id)[0];
    const startDate = new Date(oneRent.date);
    const currentDate = new Date();
    const timeDifferenceMillis = currentDate.getTime() - startDate.getTime();
    const hoursPassed = Math.ceil(timeDifferenceMillis / (1000 * 60 * 60));
    const oneCar = cars.filter((car) => car.id === id)[0];
    onePayment.money -= hoursPassed * oneCar.ára;

    //csak hozzáadni a meglévő 1 autót a history ba
    const generateUniqueId = () => {
      const maxId = Math.max(...history.map((hist) => hist.id));

      if (isNaN(maxId) || maxId === -Infinity) {
        return 0;
      }
      return maxId + 1;
    };
    const kezdetiDátum = new Date(startDate);
    const formattedDate1 = kezdetiDátum.toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const végeDátum = new Date(currentDate);
    const formattedDate2 = kezdetiDátum.toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const updatedHistory = [
      ...history,
      {
        id: generateUniqueId(),
        felhasználóNév: oneRent.username,
        autóNév: oneCar.név,
        ára: oneCar.ára,
        leírás: oneCar.leírás,
        kép: oneCar.kép,
        kezdetiDátum: formattedDate1,
        végeDátum: formattedDate2,
      },
    ];
    localStorage.setItem("history", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
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
    notificationHandler({
      type: "success",
      message: "Sikeres bérlés megszűntetés",
    });
  };
  const amountChange = (e) => {
    payAmountRef.current = e.target.value;
  };
  const Modal = ({ onCancel, onConfirm }) => {
    const modalText =
      modalContent === "kiegyenlites"
        ? "Biztosan ki akarod egyenlíteni a számlát?"
        : modalContent === "feltoltes"
        ? "Add meg a mennyiséget:"
        : "Biztosan meg akarod szüntetni a bérlést?";

    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md text-black">
          <p>{modalText}</p>
          {modalContent === "kiegyenlites" || modalContent === "feltoltes" ? (
            modalContent === "feltoltes" ? (
              <div className="">
                <input
                  type="number"
                  name="pay"
                  id="moneyinput"
                  defaultValue={payAmountRef}
                  onChange={amountChange}
                  className=""
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-red-700"
                    onClick={onCancel}
                  >
                    Mégsem
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-700"
                    onClick={onConfirm}
                  >
                    {modalContent === "kiegyenlites" ? "Igen" : "Feltöltés"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-red-700"
                  onClick={onCancel}
                >
                  Mégsem
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-700"
                  onClick={onConfirm}
                >
                  {modalContent === "kiegyenlites" ? "Igen" : "Feltöltés"}
                </button>
              </div>
            )
          ) : (
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-red-700"
                onClick={onCancel}
              >
                Mégsem
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-700"
                onClick={onConfirm}
              >
                Igen
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="ml-2">{onePayment.money} pénzed van</h1>
      <button
        className=" mb-2 ml-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 text-white"
        onClick={() => {
          setModalContent("feltoltes");
          setShowModal(true);
        }}
      >
        Egyenleg feltöltés
      </button>
      <button
        className=" mb-2 ml-2 bg-blue-500  hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md p-2 text-white"
        onClick={() => {
          setModalContent("kiegyenlites");
          setShowModal(true);
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
                setModalContent("rent");
                setWantToStopRent(car.id);
                setShowModal(true);
              }}
            >
              Autó bérlés megszűntetése
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            if (modalContent === "kiegyenlites") {
              toZero();
            } else if (modalContent === "feltoltes") {
              addMoney();
            } else {
              stopRent(wantToStopRent);
            }
          }}
        />
      )}
    </div>
  );
}

export default CarRent;
