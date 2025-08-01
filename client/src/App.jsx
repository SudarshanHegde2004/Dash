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
import Settings from "./pages/Settings";
import People from "./pages/People";

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/people" element={<People />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}