import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

function CarList(props) {
  const [cars, setCars] = useState(
    JSON.parse(localStorage.getItem("cars")) || []
  );
  const [searchText, setSearchText] = useState("");
  // Szűrjük a bérelhető autókat, vagyis azokat, amelyek kiBereltE értéke false
  const rentableCars = cars.filter((car) => !car.kiBereltE);
  const filteredCars = rentableCars.filter(
    (car) =>
      car.név.toLowerCase().includes(searchText.toLowerCase()) ||
      car.leírás.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      <div className="m-auto w-10/12">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Keresés..."
          className="px-4 py-2 mt-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Az autókhoz tartozó kártyák */}
        {filteredCars.map((car) => (
          <Link
            to={`/autoKolcsonzes/Auto/${car.id}`}
            key={car.id}
            className="border-solid border-2 border-sky-700 flex flex-col rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 p-4"
            style={{ margin: "8px" }}
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CarList;
