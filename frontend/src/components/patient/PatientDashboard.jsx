import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Calendar, Heart, ArrowRight, Bone } from 'lucide-react';
import { LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const PatientDashboard = ({ user, onViewChange, riskAnalysis }) => {
  const [counts, setCounts] = useState({ score: 0, percentile: 0, tScore: 0, days: 0 });

  // Count-up animation
  useEffect(() => {
    if (!riskAnalysis) return;

    const duration = 1000;
    const steps = 30;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        score: Math.floor(riskAnalysis.score * progress),
        percentile: Math.floor(riskAnalysis.riskPercentile * progress),
        tScore: (riskAnalysis.tScore * progress).toFixed(1),
        days: Math.floor(12 * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          score: riskAnalysis.score,
          percentile: riskAnalysis.riskPercentile,
          tScore: riskAnalysis.tScore,
          days: 12
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [riskAnalysis]);

  // Mock data for charts
  const trendData = [
    { month: 'Jul', score: 58 },
    { month: 'Aug', score: 62 },
    { month: 'Sep', score: 65 },
    { month: 'Oct', score: 68 },
    { month: 'Nov', score: 70 },
    { month: 'Dec', score: riskAnalysis?.score || 72 }
  ];

  const riskFactorData = riskAnalysis ? [
    { factor: 'Calcium', value: 70 },
    { factor: 'Vitamin D', value: 65 },
    { factor: 'Exercise', value: 60 },
    { factor: 'Age', value: 50 },
    { factor: 'Genetics', value: 80 },
    { factor: 'Hormones', value: 75 }
  ] : [];

  const comparisonData = riskAnalysis ? [
    { category: 'Your Score', value: riskAnalysis.score },
    { category: 'Age Average', value: 65 },
    { category: 'Healthy', value: 85 }
  ] : [];

  const getRiskColor = () => {
    if (!riskAnalysis) return '#00e5ff';
    if (riskAnalysis.riskLevel === 'LOW') return '#06d6a0';
    if (riskAnalysis.riskLevel === 'MODERATE') return '#ffd166';
    return '#ff4d6d';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-8 animate-fadeSlideUp">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2" data-testid="dashboard-greeting">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user.name} 👋
        </h2>
        {riskAnalysis && (
          <div className="flex items-center gap-3 flex-wrap">
            <div
              className="px-4 py-2 rounded-full font-mono text-sm font-semibold animate-pulse"
              style={{
                backgroundColor: `${getRiskColor()}20`,
                border: `2px solid ${getRiskColor()}`,
                color: getRiskColor()
              }}
              data-testid="risk-status-pill"
            >
              {riskAnalysis.riskLevel === 'LOW' && '🟢 LOW RISK'}
              {riskAnalysis.riskLevel === 'MODERATE' && '🟡 MODERATE RISK'}
              {riskAnalysis.riskLevel === 'HIGH' && '🔴 HIGH RISK'}
            </div>
            <p className="text-slate-400 text-sm">
              Last assessment: {new Date().toLocaleDateString()} • Next recommended: {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {riskAnalysis ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Bone Density Score', value: `${counts.score}/100`, icon: Activity, color: '#00e5ff', testId: 'stat-score' },
            { label: 'Risk Percentile', value: `Top ${counts.percentile}%`, icon: TrendingUp, color: '#ffd166', testId: 'stat-percentile' },
            { label: 'T-Score Simulation', value: counts.tScore, icon: Heart, color: '#ff4d6d', testId: 'stat-tscore' },
            { label: 'Days Since Last Scan', value: counts.days, icon: Calendar, color: '#06d6a0', testId: 'stat-days' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`glass rounded-2xl p-6 hover:border-primary/30 transition-all animate-fadeSlideUp stagger-${idx + 1}`}
              data-testid={stat.testId}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-3xl font-mono font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 text-center mb-8 animate-fadeSlideUp">
          <Bone className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-heading font-bold text-white mb-2">Start Your Bone Health Journey</h3>
          <p className="text-slate-300 mb-6">Take our AI-powered assessment to understand your osteoporosis risk</p>
          <button
            onClick={() => onViewChange('assessment')}
            className="bg-primary text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform shimmer-button"
            data-testid="start-assessment-cta"
          >
            Start AI Assessment
          </button>
        </div>
      )}

      {/* Charts Section */}
      {riskAnalysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bone Density Trend */}
          <div className="glass rounded-2xl p-6 animate-fadeSlideUp stagger-5">
            <h3 className="text-xl font-heading font-bold text-white mb-4">Bone Density Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1B2436', border: '1px solid #00e5ff' }}
                  labelStyle={{ color: '#f0ece3' }}
                />
                <Line type="monotone" dataKey="score" stroke="#00e5ff" strokeWidth={3} dot={{ fill: '#00e5ff', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Factor Profile */}
          <div className="glass rounded-2xl p-6 animate-fadeSlideUp stagger-6">
            <h3 className="text-xl font-heading font-bold text-white mb-4">Risk Factor Profile</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={riskFactorData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="factor" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar dataKey="value" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Comparison Bar Chart */}
      {riskAnalysis && (
        <div className="glass rounded-2xl p-6 mb-8 animate-fadeSlideUp stagger-7">
          <h3 className="text-xl font-heading font-bold text-white mb-4">Bone Density Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2436', border: '1px solid #00e5ff' }}
                labelStyle={{ color: '#f0ece3' }}
              />
              <Bar dataKey="value" fill="#00e5ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Start AI Assessment', view: 'assessment', color: 'primary', testId: 'action-assessment' },
          { label: 'Book a Doctor', view: 'doctors', color: 'success', testId: 'action-book-doctor' },
          { label: 'View Reports', view: 'reports', color: 'warning', testId: 'action-reports' },
          { label: 'AI Chat', view: 'chat', color: 'info', testId: 'action-chat' }
        ].map((action, idx) => (
          <button
            key={idx}
            onClick={() => onViewChange(action.view)}
            className="glass rounded-xl p-6 hover:scale-105 hover:border-primary/30 transition-all group text-left animate-fadeSlideUp"
            style={{ animationDelay: `${(idx + 8) * 0.1}s` }}
            data-testid={action.testId}
          >
            <p className="text-white font-semibold mb-2">{action.label}</p>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};
