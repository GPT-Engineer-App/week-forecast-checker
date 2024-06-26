import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ReminderApp from "./pages/ReminderApp.jsx";
import DepartmentForm from "./pages/DepartmentForm.jsx";
import WorkerForm from "./pages/WorkerForm.jsx";
import ObjectForm from "./pages/ObjectForm.jsx";
import VehicleForm from "./pages/VehicleForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/reminders" element={<ReminderApp />} />
        <Route path="/departments" element={<DepartmentForm />} />
        <Route path="/workers" element={<WorkerForm />} />
        <Route path="/objects" element={<ObjectForm />} />
        <Route path="/vehicles" element={<VehicleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
