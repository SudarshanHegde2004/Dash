import React, { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events').then(res => res.json()).then(setEvents);
  }, []);

  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'meeting':
        return 'bg-blue-600';
      case 'deadline':
        return 'bg-red-600';
      case 'webinar':
        return 'bg-purple-600';
      case 'workshop':
        return 'bg-green-600';
      default:
        return 'bg-zinc-600';
    }
  };

  return (
    <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl shadow-xl border border-zinc-700/50 backdrop-blur-md w-full">
      <h3 className="text-xl font-semibold mb-6 tracking-wide">📅 Upcoming Events</h3>
      <ul className="space-y-5">
        {events.length > 0 ? (
          events.map((event) => (
            <li
              key={event.id}
              className="p-4 bg-zinc-800/80 rounded-xl shadow-md hover:shadow-lg hover:bg-zinc-700/80 transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-medium">{event.title}</div>
                  <div className="text-sm text-zinc-400">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${getBadgeColor(
                    event.type
                  )} text-white`}
                >
                  {event.type}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-zinc-400">No events found.</li>
        )}
      </ul>
    </div>
  );
}
