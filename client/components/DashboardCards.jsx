import React, { useState, useEffect } from 'react';

export default function DashboardCards() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('/api/tasks').then(res => res.json()).then(setTasks);
    fetch('/api/events').then(res => res.json()).then(setEvents);
    fetch('/api/members').then(res => res.json()).then(setMembers);
  }, []);

  // Compute metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
  const remainingTasks = totalTasks - completedTasks;

  const cards = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      desc: `${remainingTasks} remaining`,
      accent: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      desc: `${events.length} total`,
      accent: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'People',
      value: members.length,
      desc: 'All active',
      accent: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      desc: completedTasks === totalTasks ? 'All done' : '',
      accent: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl shadow-lg p-6 bg-zinc-900/70 backdrop-blur border border-zinc-700 text-white hover:scale-[1.02] transition-transform duration-200`}
        >
          <div className="text-sm text-zinc-400 mb-2">{card.title}</div>
          <div className={`text-3xl font-bold bg-gradient-to-r ${card.accent} text-transparent bg-clip-text`}>
            {card.value}
          </div>
          <div className="text-xs text-zinc-500 mt-1">{card.desc}</div>
        </div>
      ))}
    </div>
  );
}
