import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Network,
  GitFork,
  PieChart,
  GanttChart,
  Star,
  MoreVertical,
  Trash2,
  Edit2,
  ArrowRight
} from 'lucide-react';

const PeoplePage = () => {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Frontend Developer',
      projects: ['Dashboard Redesign', 'Auth System'],
      skills: ['React', 'TypeScript', 'UI/UX'],
      performance: 85
    },
    {
      id: 2,
      name: 'Sam Wilson',
      role: 'Backend Engineer',
      projects: ['API Optimization', 'Database Migration'],
      skills: ['Node.js', 'Python', 'SQL'],
      performance: 92
    }
  ]);

  const [newPerson, setNewPerson] = useState({
    name: '',
    role: '',
    projects: [],
    skills: []
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const addPerson = () => {
    if (newPerson.name && newPerson.role) {
      setPeople([...people, {
        ...newPerson,
        id: Date.now(),
        performance: Math.floor(Math.random() * 30) + 70
      }]);
      setNewPerson({ name: '', role: '', projects: [], skills: [] });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-gray-900 text-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Users size={28} className="text-amber-400" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
              Team Members
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-amber-100 transition-all"
          >
            <UserPlus size={18} />
            Add Member
          </button>
        </div>

        {/* Add Person Form */}
        {showForm && (
          <div className="bg-emerald-800/50 backdrop-blur-sm p-6 rounded-xl mb-8 border border-emerald-700">
            <h2 className="text-xl font-semibold mb-4 text-amber-200">Add New Team Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newPerson.name}
                  onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
                  className="w-full bg-emerald-900/70 border border-emerald-700 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-amber-300 mb-1">Role</label>
                <input
                  type="text"
                  value={newPerson.role}
                  onChange={(e) => setNewPerson({...newPerson, role: e.target.value})}
                  className="w-full bg-emerald-900/70 border border-emerald-700 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addPerson}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white flex items-center gap-2 transition-colors"
              >
                <UserPlus size={16} />
                Add Member
              </button>
            </div>
          </div>
        )}

        {/* People Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => (
            <div 
              key={person.id} 
              className="bg-emerald-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-emerald-800 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-emerald-900/20"
            >
              {/* Person Header */}
              <div className="p-5 border-b border-emerald-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-amber-300">{person.name}</h3>
                    <p className="text-emerald-300">{person.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-amber-400 hover:text-amber-300">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Performance Graph */}
              <div className="p-5 border-b border-emerald-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-amber-200">Performance</span>
                  <span className="text-amber-400 font-bold">{person.performance}%</span>
                </div>
                <div className="w-full bg-emerald-950 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full" 
                    style={{ width: `${person.performance}%` }}
                  ></div>
                </div>
              </div>

              {/* Projects & Skills */}
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-amber-300 mb-2">
                    <GanttChart size={16} />
                    <span className="font-medium">Projects</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {person.projects.map((project, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-800/50 text-amber-100 rounded-md text-xs">
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-amber-300 mb-2">
                    <Star size={16} />
                    <span className="font-medium">Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {person.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-800/50 text-emerald-100 rounded-md text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-emerald-900/30 flex justify-between items-center">
                <button 
                  onClick={() => setSelectedPerson(person)}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm"
                >
                  <Network size={16} />
                  View Connections
                </button>
                <button className="text-amber-400 hover:text-amber-300">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Tree Modal */}
        {selectedPerson && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-emerald-900 to-gray-900 rounded-xl max-w-4xl w-full border border-emerald-700 max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-emerald-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-amber-300">
                  <Network size={20} className="inline mr-2" />
                  {selectedPerson.name}'s Connections
                </h3>
                <button 
                  onClick={() => setSelectedPerson(null)}
                  className="text-amber-400 hover:text-amber-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 overflow-auto">
                {/* Flowchart Placeholder - Would integrate with a library like ReactFlow in a real app */}
                <div className="bg-emerald-900/20 rounded-xl border-2 border-dashed border-emerald-700 h-96 flex items-center justify-center text-emerald-400">
                  <div className="text-center">
                    <GitFork size={48} className="mx-auto mb-4" />
                    <p>Connection flowchart would appear here</p>
                    <p className="text-sm mt-2 text-emerald-500">(Integrates with ReactFlow/Vis.js in production)</p>
                  </div>
                </div>

                {/* Project Relationships */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-amber-300 mb-4">Project Collaborations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPerson.projects.map((project, i) => (
                      <div key={i} className="bg-emerald-800/30 p-4 rounded-lg border border-emerald-700">
                        <div className="flex items-center gap-2 mb-2">
                          <GanttChart size={16} className="text-amber-400" />
                          <h5 className="font-medium text-amber-200">{project}</h5>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {people
                            .filter(p => p.projects.includes(project) && p.id !== selectedPerson.id)
                            .map((collab, j) => (
                              <span key={j} className="px-2 py-1 bg-emerald-700/50 text-emerald-100 rounded-md text-xs">
                                {collab.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-900/30 border-t border-emerald-800 flex justify-end">
                <button 
                  onClick={() => setSelectedPerson(null)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeoplePage;