import React, { useState } from 'react';
import { generateText } from '../utils/openai';

export default function VoiceCommand() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const result = await generateText(input);
    setResponse(result || 'Error getting response.');
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">AI Voice Command</h3>
      <input
        type="text"
        placeholder="Enter a command..."
        className="w-full p-2 border rounded mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="btn btn-primary"
      >
        Submit
      </button>
      {response && (
        <p className="mt-4 italic text-gray-700">Response: {response}</p>
      )}
    </div>
  );
}
