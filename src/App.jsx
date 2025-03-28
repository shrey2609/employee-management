import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import LoginPage from "./Pages/LoginPage";
import UsersPage from "./Pages/UsersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
