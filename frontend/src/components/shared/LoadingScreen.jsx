import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete, message = 'Initializing OsteoAI...' }) => {
  const [loadingText, setLoadingText] = useState(message);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messages = [
      'Initializing OsteoAI...',
      'Loading bone health intelligence...',
      'Preparing your dashboard...',
      'Almost ready...'
    ];

    let messageIndex = 0;
    let progressValue = 0;

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingText(messages[messageIndex]);
    }, 750);

    const progressInterval = setInterval(() => {
      progressValue += 5;
      setProgress(progressValue);
      
      if (progressValue >= 100) {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 75);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 animate-pulse">
          <h1 className="text-6xl font-heading font-bold text-primary glow-text" data-testid="loading-logo">
            OsteoAI
          </h1>
        </div>

        {/* Scanning Beam Effect */}
        <div className="relative w-80 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          <div className="scanning-beam" />
        </div>

        {/* Loading Text */}
        <p className="text-slate-300 font-mono text-sm" data-testid="loading-message">
          {loadingText}
        </p>

        {/* Loading Dots */}
        <div className="loading-dots mt-4 flex justify-center">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export const ProcessingScreen = ({ messages, duration = 3500, onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const interval = duration / messages.length;
    let index = 0;

    const messageTimer = setInterval(() => {
      index++;
      if (index < messages.length) {
        setCurrentMessage(index);
      } else {
        clearInterval(messageTimer);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, interval);

    return () => clearInterval(messageTimer);
  }, [messages, duration, onComplete]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-md">
        {/* Neural Network Animation */}
        <div className="mb-8 relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
            {/* Nodes */}
            {[...Array(9)].map((_, i) => {
              const angle = (i / 9) * Math.PI * 2;
              const x = 100 + Math.cos(angle) * 60;
              const y = 100 + Math.sin(angle) * 60;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="8"
                  fill="#00e5ff"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              );
            })}
            {/* Center node */}
            <circle cx="100" cy="100" r="12" fill="#00e5ff" className="animate-pulse" />
          </svg>
          <div className="scanning-beam" />
        </div>

        {/* Processing Messages */}
        <div className="space-y-2">
          {messages && messages.map((msg, idx) => (
            <p
              key={idx}
              className={`text-sm font-mono transition-all duration-300 ${
                idx === currentMessage
                  ? 'text-primary font-semibold scale-105'
                  : idx < currentMessage
                  ? 'text-slate-500'
                  : 'text-slate-600'
              }`}
            >
              {idx <= currentMessage && '✓ '}{msg}
            </p>
          ))}
        </div>

        {/* Loading Dots */}
        <div className="loading-dots mt-6 flex justify-center">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};
