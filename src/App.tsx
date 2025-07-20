import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardLayout } from "./layout/DashboardLayout";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">🚌 Mientras Espero el Bondi</h1>
      <DashboardLayout />
    </div>
  );
}

export default App;
