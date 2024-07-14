"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home/page";
import LoginSignup from "./login/page";

export default function ClientComponent() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login-signup" element={<LoginSignup />} />
        </Routes>
      </Router>
    );
}
