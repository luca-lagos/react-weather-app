import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Icons from "./components";

const App = () => {
  const [search, setSearch] = useState<Boolean>(false);
  const [values, setValues] = useState<any>();
  const [icons, setIcons] = useState<Boolean>(false);

  const URL =
    "https://api.openweathermap.org/data/2.5/weather?q=roma&lang=es&units=metric&appid=3261192f6b205e886193290922a34966";

  const getData = async () => {
    await fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        /*console.log(data);*/
        if (data.cod >= 400) {
          setValues(false);
        } else {
          console.log(data);
          console.log(data.weather[0].main);
          setValues(data);
          setIcons(data.weather[0].main);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleSearch = (e: any) => {
    /*console.log(e.target.value);*/
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);
  return (
    <>
      <div className="App">
        <h2>React Weather App</h2>
        <div className="row">
          <input
            type="text"
            placeholder="Escribe una ciudad"
            onKeyDown={HandleSearch}
            autoFocus
          />
        </div>
      </div>
      <div className="card">
        {values ? (
          <div className="card-container">
            <h2 className="city-name">{values.name}</h2>
            <p className="temp">{values.main.temp.toFixed(0)}&deg;</p>
            <img className="icon" /*src={Icons(icons)}*/ alt="icon-weather" />
            <div className="card-footer">
              <p className="max-min-temp">
                {values.main.temp_min.toFixed(0)}&deg; |{" "}
                {values.main.temp_max.toFixed(0)}&deg;
              </p>
            </div>
          </div>
        ) : (
          <h2>{"City not found"}</h2>
        )}
      </div>
    </>
  );
};

export default App;
