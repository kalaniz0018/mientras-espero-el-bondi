import { useEffect, useState } from "react";
import { Weather } from "./components/Weather";
import { News } from "./components/News";
import { Efemerides } from "./components/Efemerides";
import { NextFeriado } from "./components/NextFeriado";
import { Dolar } from "./components/Dolar";
import { Horoscopo } from "./components/Horoscopo";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 px-4 flex justify-center text-black dark:text-white">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-2">
          <h1 className="text-3xl font-bold text-center sm:text-left">
            🚌 Mientras Espero el Bondi
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:ml-4">
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <News />
          <Weather />
          <NextFeriado />
          <Dolar />
          <Efemerides />
          <Horoscopo />
        </div>
      </div>
    </div>
  );
}

export default App;
