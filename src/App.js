import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/details/:city" element={<Details />} />
    </Routes>
  );
}

export default App;