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

  return (
    <div className="stats shadow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="stat">
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value">{totalTasks}</div>
        <div className="stat-desc">{tasks.filter(t => t.status !== 'Completed').length} remaining</div>
      </div>
      <div className="stat">
        <div className="stat-title">Upcoming Events</div>
        <div className="stat-value">{upcomingEvents}</div>
        <div className="stat-desc">{events.length} total</div>
      </div>
      <div className="stat">
        <div className="stat-title">Members</div>
        <div className="stat-value">{members.length}</div>
        <div className="stat-desc">{/* Could show new members or similar */}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Completed Tasks</div>
        <div className="stat-value">{completedTasks}</div>
        <div className="stat-desc">{completedTasks === totalTasks ? 'All done' : ''}</div>
      </div>
    </div>
  );
}
