import React from "react";
import { useState } from "react";

const CarHistory = () => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  console.log(history);
  //const updatedHistory = [...history, { ...hist, id: generateUniqueId() }];
  //localStorage.setItem("history", JSON.stringify(updatedHistory));
  /*
    Autó név,
    Autó kép,
    Autó ára,
    Esetleg leírás??,
    kezdeti dátum,
    végző dátum,
    id   a törléshez,

  
  */
  return (
    <div
      className="grid "
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      {history.map((car) => (
        <div
          key={car.id}
          className={`border-solid border-2 border-sky-700 flex flex-col rounded-lg overflow-hidden shadow-md ${
            history.length === 1 ? "p-4 w-80 m-auto" : "p-4 m-5"
          }`}
        >
          <p className="text-xl font-semibold mb-2 text-center">
            {car.felhasználóNév}
          </p>
          <div className="flex-shrink-0">
            <img
              src={car.kép}
              alt={car.autóNév}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">{car.autóNév}</h2>
            <p className="text-slate-200">{car.leírás}</p>
            <p className="text-slate-300 mt-2">Ár: {car.ára}/óra</p>
            <p className="text-slate-200">Kezdeti dátum: {car.kezdetiDátum}</p>
            <p className="text-slate-300 mt-2">
              Vége dátum: {car.végeDátum}/óra
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarHistory;
