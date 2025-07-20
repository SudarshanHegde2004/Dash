import React, { useEffect, useState } from 'react';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks').then(res => res.json()).then(setTasks);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">To-Do List</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-3">
            <div className="font-medium">{task.title}</div>
            <div className="text-sm text-gray-600">
              Due: {new Date(task.due).toLocaleDateString()} – Status: {task.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
