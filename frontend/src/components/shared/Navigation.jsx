import React, { useState } from 'react';
import { Bell, User, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { translations } from '@/utils/mockData';

export const Navigation = ({ user, currentView, onViewChange, onLogout, language, onLanguageChange, darkMode, onThemeToggle }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [notifications] = useState(3);

  const t = translations[language] || translations.en;

  const patientNavItems = [
    { id: 'dashboard', label: t.dashboard },
    { id: 'assessment', label: t.assessment },
    { id: 'doctors', label: t.doctors },
    { id: 'reports', label: t.reports },
    { id: 'chat', label: t.chat }
  ];

  const doctorNavItems = [
    { id: 'doctor-dashboard', label: t.dashboard },
    { id: 'my-patients', label: 'My Patients' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'messages', label: 'Messages' }
  ];

  const navItems = user?.role === 'Doctor' ? doctorNavItems : patientNavItems;

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', flag: 'తె' },
    { code: 'pa', label: 'Punjabi', flag: 'ਪੰ' },
    { code: 'bn', label: 'Bengali', flag: 'বং' }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-primary glow-text" data-testid="nav-logo">
              OsteoAI
            </h1>
            {user?.role === 'Doctor' && (
              <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-mono">
                Doctor Portal
              </span>
            )}
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-primary text-black'
                    : 'text-slate-300 hover:text-primary hover:bg-white/5'
                }`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                data-testid="language-toggle"
              >
                <Globe className="w-5 h-5 text-slate-300" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl shadow-2xl border border-primary/20 py-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-2 ${
                        language === lang.code ? 'text-primary' : 'text-slate-300'
                      }`}
                      data-testid={`lang-${lang.code}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              data-testid="theme-toggle"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-slate-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-300" />
              )}
            </button>

            {/* Notifications */}
            <button
              className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
              data-testid="notifications-bell"
            >
              <Bell className="w-5 h-5 text-slate-300" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                data-testid="user-menu-button"
              >
                <div className="w-8 h-8 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-strong rounded-xl shadow-2xl border border-primary/20 py-2">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="font-semibold text-white" data-testid="user-name">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                    <p className="text-xs text-primary mt-1">{user?.role}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-2 text-slate-300"
                    data-testid="logout-button"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.logout}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/10 px-2 py-2 flex gap-1 overflow-x-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`px-3 py-1.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              currentView === item.id
                ? 'bg-primary text-black'
                : 'text-slate-300 hover:text-primary hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
