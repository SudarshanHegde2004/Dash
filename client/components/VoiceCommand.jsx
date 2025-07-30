import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';

export default function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [typedCommand, setTypedCommand] = useState('');
  const [lastCommand, setLastCommand] = useState(null);
  const [commandResult, setCommandResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);

  // Speech recognition setup (same as before)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript.trim());
    };

    recognition.onend = () => isListening && recognition.start();
    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [isListening]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const command = typedCommand.trim() || transcript.trim();
    if (!command) return;

    setLastCommand(command);
    setTypedCommand('');
    setTranscript('');
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:3001/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { result } = await response.json();
      setCommandResult(result);
    } catch (error) {
      setCommandResult(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 space-y-4">
        {/* Mic Button & Transcript */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all
              ${isListening 
                ? 'bg-green-600 animate-pulse ring-2 ring-green-400' 
                : 'bg-red-600'}`}
          >
            {isListening ? <Mic size={24} /> : <MicOff size={24} />}
          </button>

          <div className="flex-1 min-h-12 p-3 bg-white/5 rounded-lg border border-white/10">
            {transcript || <span className="text-gray-400">Speak or type a command...</span>}
          </div>
        </div>

        {/* Command & Result Display */}
        {lastCommand && (
          <div className="p-3 bg-blue-900/20 rounded-lg text-sm">
            <span className="text-blue-400">You:</span> {lastCommand}
          </div>
        )}

        {commandResult && (
          <div className="p-3 bg-green-900/20 rounded-lg text-sm">
            <span className="text-green-400">Assistant:</span> {commandResult}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={typedCommand}
            onChange={(e) => setTypedCommand(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-1 disabled:bg-gray-600"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <Send size={18} />}
            Send
          </button>
        </form>
      </div>
    </div>
  );
}