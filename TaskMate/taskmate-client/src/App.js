import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Settings from "./pages/Settings";
import CalendarPage from "./pages/CalendarPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
