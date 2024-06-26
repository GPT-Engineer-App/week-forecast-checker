import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ReminderApp from "./pages/ReminderApp.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/reminders" element={<ReminderApp />} />
      </Routes>
    </Router>
  );
}

export default App;
