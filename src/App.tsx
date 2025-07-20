import { Clock } from "./components/Clock";
import { Weather } from "./components/Weather";
import { News } from "./components/News";
import { Efemerides } from "./components/Efemerides";
import { NextFeriado } from "./components/NextFeriado";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">🚌 Mientras Espero el Bondi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Weather className="lg:col-span-1" />
        <Clock className="col-span-1" />
        <Efemerides className="lg:col-span-2" />
        <NextFeriado className="lg:col-span-2" />
        <News className="md:col-span-2" />
      </div>
    </div>
  );
}

export default App;
