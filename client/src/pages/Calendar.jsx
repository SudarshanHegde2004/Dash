import React, { useState, useEffect } from 'react';

export default function Calendar() {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [newEvent, setNewEvent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/calendar') // ✅ Full URL
      .then(res => res.json())
      .then(data => {
        setEvents(data || {});
      })
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!selectedDate || !newEvent) return;

    try {
      const res = await fetch('http://localhost:5000/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, event: newEvent }),
      });

      if (res.ok) {
        const updated = await res.json();
        setEvents(updated);
        setNewEvent('');
      } else {
        console.error('Failed to add event');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const renderDays = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      return (
        <div
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`p-4 bg-zinc-900 border border-zinc-700 rounded-xl cursor-pointer hover:ring-2 hover:ring-indigo-500 ${
            selectedDate === dateStr ? 'ring-2 ring-indigo-400' : ''
          }`}
        >
          <div className="font-bold text-lg">{day}</div>
          {events[dateStr]?.map((e, idx) => (
            <div key={idx} className="text-xs text-indigo-300 mt-1">• {e}</div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="p-8 w-full text-white bg-black min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight">📅 Calendar</h2>

      <form
        onSubmit={handleAddEvent}
        className="mb-8 bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl flex gap-4 flex-wrap items-end"
      >
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            required
            className="bg-zinc-900 text-white border border-zinc-700 p-2 rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-zinc-400 mb-1">Event</label>
          <input
            type="text"
            value={newEvent}
            onChange={e => setNewEvent(e.target.value)}
            placeholder="Enter event"
            required
            className="w-full bg-zinc-900 text-white border border-zinc-700 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          ➕ Add
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {renderDays()}
      </div>
    </div>
  );
}
