import { useEffect } from "react";
import { Weather } from "./components/Weather/Weather";
import { News } from "./components/News/News";
import { NextFeriado } from "./components/NextFeriado/NextFeriado";
import { Dolar } from "./components/Dolar/Dolar";
import { Descuentos } from "./components/Descuentos/Descuentos";
import { Efemerides } from "./components/Efemerides/Efemerides";
import { Horoscopo } from "./components/Horoscopo/Horoscopo";
import { Recordatorio } from "./components/Recordatorio/Recordatorio";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4 flex justify-center text-white">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h1 className="text-3xl font-bold text-center sm:text-left">
            Mientras Espero el bondi
          </h1>

          <p className="text-sm text-gray-300 text-center sm:text-left">
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
          <Dolar />
          <NextFeriado />
           <Horoscopo />
          <Weather />
          <News />
          <Descuentos />
         
          <Recordatorio/>
          <Efemerides className="sm:col-span-2" />
        </div>
      </div>
    </div>
  );
}

export default App;
