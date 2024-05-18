import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import SignInPage from "./assets/pages/SignInPage";
import UserPage from "./assets/pages/UserPage";
import "./main.css";
import PrivateRoute from "./assets/components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
