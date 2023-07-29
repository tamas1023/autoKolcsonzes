import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
function CarList(props) {
  const [cars, setCars] = useState(
    JSON.parse(localStorage.getItem("cars")) || []
  );
  const [rentableCars, SetRentableCars] = useState(
    cars.filter((cars) => cars.kiBereltE === false)
  );
  //console.log(rentableCars);
  //grid-template-columns: repeat(auto-fit,minmax(300px, 1fr) );
  return (
    <div
      className="grid "
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      {rentableCars.map((car) => (
        <div
          key={car.id}
          className="border-solid border-2 border-sky-700 m-1 flex flex-col"
        >
          <Link
            to={`/autoKolcsonzes/Auto/${car.id}`}
            key={car.id}
            className="contents"
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
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CarList;
