import React, { useEffect, useState } from 'react';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks').then(res => res.json()).then(setTasks);
  }, []);

  return (
    <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl shadow-xl border border-zinc-700/50 backdrop-blur-md w-full">
      <h3 className="text-xl font-semibold mb-6 tracking-wide">📋 To-Do List</h3>
      <ul className="space-y-5">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id} className="p-4 bg-zinc-800/80 rounded-xl shadow-md hover:shadow-lg hover:bg-zinc-700/80 transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-medium">{task.title}</div>
                  <div className="text-sm text-zinc-400">
                    Due: {new Date(task.due).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold ${
                      task.status === 'Completed'
                        ? 'bg-green-600 text-white'
                        : task.status === 'In Progress'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-zinc-400">No tasks available.</li>
        )}
      </ul>
    </div>
  );
}
