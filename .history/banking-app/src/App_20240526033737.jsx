import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";
import EditUserPage from "./pages/EditUserPage";
import "./main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/edit-user" element={<EditUserPage />} />{" "}
        {/* Ajouter la route */}
      </Routes>
    </Router>
  );
}

export default App;
