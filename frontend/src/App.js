import React, { useState, useEffect } from 'react';
import './App.css';
import { LoginRegister } from './components/LoginRegister';
import { Navigation } from './components/shared/Navigation';
import { LoadingScreen, ProcessingScreen } from './components/shared/LoadingScreen';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { AIAssessment } from './components/patient/AIAssessment';
import { AIResults } from './components/patient/AIResults';
import { DoctorFinder } from './components/patient/DoctorFinder';
import { MyReports } from './components/patient/MyReports';
import { AIChat } from './components/patient/AIChat';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { MyPatients } from './components/doctor/MyPatients';
import { Schedule } from './components/doctor/Schedule';
import { Appointments } from './components/doctor/Appointments';
import { DoctorAnalytics } from './components/doctor/DoctorAnalytics';
import { Messages } from './components/doctor/Messages';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessages, setProcessingMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [assessmentData, setAssessmentData] = useState(null);
  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, isHovering: false });
  
  // Initialize data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('osteoai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedAssessment = localStorage.getItem('osteoai_assessment');
    if (savedAssessment) {
      setAssessmentData(JSON.parse(savedAssessment));
    }

    const savedAnalysis = localStorage.getItem('osteoai_analysis');
    if (savedAnalysis) {
      setRiskAnalysis(JSON.parse(savedAnalysis));
    }

    const savedTheme = localStorage.getItem('osteoai_theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('osteoai_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const onMouseMove = (event) => {
      setCursor(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
    };

    const onMouseOver = (event) => {
      const interactiveEl = event.target.closest('button, a, input, select, textarea, [role="button"]');
      setCursor(prev => ({ ...prev, isHovering: Boolean(interactiveEl) }));
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  const handleLogin = (userData) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(userData);
      localStorage.setItem('osteoai_user', JSON.stringify(userData));
      setIsLoading(false);
      setCurrentView(userData.role === 'Doctor' ? 'doctor-dashboard' : 'dashboard');
    }, 3000);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    localStorage.removeItem('osteoai_user');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleAssessmentComplete = (data, analysis) => {
    setAssessmentData(data);
    setRiskAnalysis(analysis);
    localStorage.setItem('osteoai_assessment', JSON.stringify(data));
    localStorage.setItem('osteoai_analysis', JSON.stringify(analysis));
    
    // Add to history
    const history = JSON.parse(localStorage.getItem('osteoai_history') || '[]');
    history.unshift({
      date: new Date().toISOString(),
      score: analysis.score,
      riskLevel: analysis.riskLevel,
      classification: analysis.classification
    });
    localStorage.setItem('osteoai_history', JSON.stringify(history.slice(0, 10)));
    
    setCurrentView('results');
  };

  const showProcessing = (messages, callback) => {
    setProcessingMessages(messages);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (callback) callback();
    }, 3500);
  };

  // Render current view
  const renderView = () => {
    if (!user) return null;

    const commonProps = {
      user,
      onViewChange: handleViewChange,
      showProcessing,
      language
    };

    // Patient views
    if (user.role === 'Patient') {
      switch (currentView) {
        case 'dashboard':
          return <PatientDashboard {...commonProps} riskAnalysis={riskAnalysis} />;
        case 'assessment':
          return <AIAssessment {...commonProps} onComplete={handleAssessmentComplete} />;
        case 'results':
          return <AIResults {...commonProps} riskAnalysis={riskAnalysis} assessmentData={assessmentData} />;
        case 'doctors':
          return <DoctorFinder {...commonProps} />;
        case 'reports':
          return <MyReports {...commonProps} />;
        case 'chat':
          return <AIChat {...commonProps} userContext={riskAnalysis} />;
        default:
          return <PatientDashboard {...commonProps} riskAnalysis={riskAnalysis} />;
      }
    }

    // Doctor views
    if (user.role === 'Doctor') {
      switch (currentView) {
        case 'doctor-dashboard':
          return <DoctorDashboard {...commonProps} />;
        case 'my-patients':
          return <MyPatients {...commonProps} />;
        case 'schedule':
          return <Schedule {...commonProps} />;
        case 'appointments':
          return <Appointments {...commonProps} />;
        case 'analytics':
          return <DoctorAnalytics {...commonProps} />;
        case 'messages':
          return <Messages {...commonProps} />;
        default:
          return <DoctorDashboard {...commonProps} />;
      }
    }
  };

  return (
    <div className="App min-h-screen">
      {/* Background Pattern */}
      <div className="background-pattern" />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Content */}
      <div className="content-wrapper">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        {isProcessing && (
          <ProcessingScreen
            messages={processingMessages}
            onComplete={() => setIsProcessing(false)}
          />
        )}

        {!user ? (
          <LoginRegister onLogin={handleLogin} />
        ) : (
          <>
            <Navigation
              user={user}
              currentView={currentView}
              onViewChange={handleViewChange}
              onLogout={handleLogout}
              language={language}
              onLanguageChange={setLanguage}
              darkMode={darkMode}
              onThemeToggle={() => setDarkMode(prev => !prev)}
            />
            <main className="min-h-[calc(100vh-4rem)] page-transition">
              {renderView()}
            </main>
          </>
        )}
      </div>

      <div
        className={`cursor-dot hidden md:block ${cursor.isHovering ? 'hover' : ''}`}
        style={{ transform: `translate(${cursor.x - 6}px, ${cursor.y - 6}px) scale(${cursor.isHovering ? 1.8 : 1})` }}
      />
    </div>
  );
}

export default App;
