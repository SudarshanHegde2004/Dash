import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  MicrophoneIcon
} from '@heroicons/react/24/solid'; // Mic icon from solid

const navItems = [
  { path: '/', label: 'Home', icon: <HomeIcon className="h-6 w-6 mr-3" /> },
  { path: '/projects', label: 'Projects', icon: <DocumentTextIcon className="h-6 w-6 mr-3" /> },
  { path: '/calendar', label: 'Calendar', icon: <CalendarIcon className="h-6 w-6 mr-3" /> },
  { path: '/members', label: 'Members', icon: <UsersIcon className="h-6 w-6 mr-3" /> },
  { path: '/settings', label: 'Settings', icon: <Cog6ToothIcon className="h-6 w-6 mr-3" /> },
];

export default function Sidebar() {
  const location = useLocation();

  const handleMicClick = () => {
    console.log("Voice input activated (connect to OpenAI API here)");
    // TODO: integrate with OpenAI voice API or Web Speech API
  };

  return (
    <div className="w-64 h-screen bg-zinc-900 text-zinc-100 shadow-xl flex flex-col justify-between p-4 border-r border-zinc-800">
      <div>
        <div className="text-2xl font-semibold tracking-wide mb-6 px-2">
          Dash
        </div>
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out
                    ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg text-white'
                        : 'hover:bg-zinc-800/70 hover:backdrop-blur-sm hover:shadow-md'
                    }
                  `}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Voice Assistant Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleMicClick}
          className="bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
          title="Activate Voice Assistant"
        >
          <MicrophoneIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
