import React, { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    client: '',
    location: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: '',
    description: '',
  });

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then(res => res.json())
      .then(setProjects)
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newProject = await res.json();
      setProjects(prev => [...prev, newProject]);
      setForm({
        name: '',
        client: '',
        location: '',
        startDate: '',
        endDate: '',
        budget: '',
        status: '',
        description: '',
      });
    } else {
      console.error('Failed to add project');
    }
  };

  return (
    <div className="p-8 w-full text-white bg-black min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight">🛠️ Project Manager</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl mb-10"
      >
        {[
          { name: 'name', label: 'Project Name' },
          { name: 'client', label: 'Client Name' },
          { name: 'location', label: 'Location' },
          { name: 'startDate', label: 'Start Date', type: 'date' },
          { name: 'endDate', label: 'End Date', type: 'date' },
          { name: 'budget', label: 'Budget (₹)' },
          { name: 'status', label: 'Status' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm text-zinc-400 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm text-zinc-400 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            ➕ Add Project
          </button>
        </div>
      </form>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-semibold mb-6 tracking-wide">📋 Existing Projects</h3>

        {projects.length === 0 ? (
          <p className="text-zinc-400">No projects added yet.</p>
        ) : (
          <ul className="space-y-6">
            {projects.map((project) => (
              <li key={project.id} className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl shadow-inner">
                <h4 className="text-xl font-bold mb-1">{project.name}</h4>
                <p className="text-zinc-300 mb-2">{project.description}</p>
                <div className="text-sm text-zinc-400 leading-6">
                  <div><strong>Client:</strong> {project.client}</div>
                  <div><strong>Location:</strong> {project.location}</div>
                  <div><strong>Status:</strong> {project.status}</div>
                  <div><strong>Budget:</strong> ₹{project.budget}</div>
                  <div><strong>Duration:</strong> {project.startDate} → {project.endDate}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
