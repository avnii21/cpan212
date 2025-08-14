import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Settings from "./pages/Settings";
import CalendarPage from "./pages/CalendarPage";
import TicketmasterEvents from "./pages/TicketmasterEvents";
import TicketmasterEventPage from "./pages/TicketmasterEventPage";

import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
// Remove import of PaymentForm here because it will be used inside Notifications now

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
          <Route path="/ticketmaster" element={<TicketmasterEvents />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/ticketmaster-event/:id" element={<TicketmasterEventPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
