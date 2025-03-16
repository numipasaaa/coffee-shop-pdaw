import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import LoginPage from "./LoginPage.jsx";
import MainPage from "./HomePage.jsx";

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </Router>
  );
}