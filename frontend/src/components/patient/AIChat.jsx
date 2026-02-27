import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { getChatResponse } from '@/utils/chatResponses';
import { suggestedQuestions } from '@/utils/mockData';

export const AIChat = ({ userContext, language }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! 👋 I'm OsteoBot, your bone health assistant. How can I help you today?", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check voice API support
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setVoiceSupported(false);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getChatResponse(inputText, userContext);
      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Speak response if enabled
      if (isSpeaking && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        window.speechSynthesis.speak(utterance);
      }
    }, 500);
  };

  const handleVoiceInput = () => {
    if (!voiceSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.start();
  };

  const handleSuggestedQuestion = (question) => {
    setInputText(question);
    handleSend();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-strong rounded-2xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 12rem)' }}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary">OsteoBot</h2>
            <p className="text-slate-400 text-sm">AI Bone Health Assistant</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`p-3 rounded-lg transition-colors ${isSpeaking ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}
              title="Text-to-speech"
            >
              {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeSlideUp`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-primary text-black ml-auto'
                    : 'glass border border-primary/20'
                }`}
              >
                <p className={`text-sm ${message.sender === 'user' ? 'text-black' : 'text-white'} whitespace-pre-line`}>
                  {message.text}
                </p>
                <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-black/60' : 'text-slate-400'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isListening && (
            <div className="flex justify-center">
              <div className="flex gap-1 items-center bg-primary/20 px-4 py-2 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="wave-bar" />
                ))}
                <span className="text-primary text-sm ml-2">Listening...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-slate-400 text-sm mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 4).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(q)}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about bone health..."
              className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
              data-testid="chat-input"
            />
            {voiceSupported && (
              <button
                onClick={handleVoiceInput}
                className={`p-3 rounded-xl transition-colors ${
                  isListening ? 'bg-destructive text-white animate-pulse' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
                data-testid="voice-button"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={handleSend}
              className="bg-primary text-black p-3 rounded-xl hover:scale-105 transition-transform"
              data-testid="send-button"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {!voiceSupported && (
            <p className="text-xs text-slate-500 mt-2">Voice input not supported in this browser</p>
          )}
        </div>
      </div>
    </div>
  );
};
