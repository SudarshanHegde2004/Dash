import React, { useState } from 'react';
import { generateText } from '../utils/openai';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

export default function VoiceCommand() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const result = await generateText(input);
    setResponse(result || '⚠️ Error getting response.');
  };

  const handleMicClick = () => {
    console.log('🎤 Mic clicked - Integrate speech-to-text here');
    // You can integrate Web Speech API or other STT library here
  };

  return (
    <section className="px-6 py-10 md:px-12 lg:px-20">
      <div className="bg-zinc-900 text-zinc-100 p-8 rounded-2xl shadow-xl border border-zinc-700/50 backdrop-blur-md w-full">
        <h3 className="text-2xl font-semibold mb-6 tracking-wide">🎙️ AI Voice Command</h3>
        
        <div className="flex items-center gap-3 mb-5">
          <input
            type="text"
            placeholder="Type your command..."
            className="flex-grow p-4 rounded-lg bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleMicClick}
            className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-all shadow-lg"
            title="Start Voice Input"
          >
            <MicrophoneIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors font-semibold shadow-lg"
        >
          Submit
        </button>

        {response && (
          <div className="mt-6 p-5 bg-zinc-800/80 rounded-lg border border-zinc-700 text-base text-zinc-300">
            <span className="text-indigo-400 font-semibold">Response:</span> {response}
          </div>
        )}
      </div>
    </section>
  );
}
