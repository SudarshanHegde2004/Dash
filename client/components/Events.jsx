import React, { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events').then(res => res.json()).then(setEvents);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
      <ul>
        {events.map(event => (
          <li key={event.id} className="mb-3">
            <div className="font-medium">{event.title}</div>
            <div className="text-sm text-gray-600">
              {event.type} – {new Date(event.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
