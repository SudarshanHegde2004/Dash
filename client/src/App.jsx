// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardCards from '../components/DashboardCards';
import Chart from '../components/Chart';
import ToDoList from '../components/ToDoList';
import Events from '../components/Events';
import VoiceCommand from '../components/VoiceCommand';
import Projects from "./pages/Projects"; 
import Calendar from "./pages/Calendar";

export default function App() {
  return (
    <div className="flex h-screen bg-base-100">
      <Sidebar />
      <div className="flex-grow p-6 overflow-auto">
        <Routes>
          <Route path="/" element={
            <div>
              <DashboardCards />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <Chart />
                <ToDoList />
                <Events />
              </div>
              <VoiceCommand />
            </div>
          } />
          <Route path="/projects" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/programs" element={<div className="text-xl">Programs Page (coming soon)</div>} />
          <Route path="/members" element={<div className="text-xl">Members Page (coming soon)</div>} />
          <Route path="/chat" element={<div className="text-xl">Chat Page (coming soon)</div>} />
          <Route path="/financial" element={<div className="text-xl">Financial Page (coming soon)</div>} />
          <Route path="/expenses" element={<div className="text-xl">Expenses Page (coming soon)</div>} />
          <Route path="/settings" element={<div className="text-xl">Settings Page (coming soon)</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
