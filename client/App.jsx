import Sidebar from './components/Sidebar';
import DashboardCards from './components/DashboardCards';
import ToDoList from './components/ToDoList';
import Events from './components/Events';
import Chart from './components/Chart';
import VoiceCommand from './components/VoiceCommand';
import { callOpenAICommand } from './utils/openai';
import { useState } from 'react';

export default function App() {
  const [aiResult, setAiResult] = useState(null);

  const handleVoiceCommand = async (text) => {
    try {
      const res = await callOpenAICommand(text);
      setAiResult(res.ai);
      // TODO: parse intent and act (add task, show events, etc.)
    } catch (e) {
      setAiResult('AI error: ' + e.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1e1e2f]">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col gap-8 bg-[#1e1e2f]">
        <DashboardCards />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ToDoList />
          <Events />
          <Chart />
        </div>
        <div className="flex items-center gap-6 mt-8">
          <VoiceCommand onCommand={handleVoiceCommand} />
          {aiResult && (
            <div className="bg-gray-900 text-gray-100 rounded p-4 shadow max-w-xl">
              <div className="font-bold mb-1">AI Response:</div>
              <pre className="whitespace-pre-wrap text-sm">{aiResult}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
