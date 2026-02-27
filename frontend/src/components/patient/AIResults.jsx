import React from 'react';
import { Download, Share2, Calendar } from 'lucide-react';
import { generateRecommendations, generate90DayPlan } from '@/utils/aiScoring';

export const AIResults = ({ riskAnalysis, assessmentData, onViewChange }) => {
  if (!riskAnalysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-slate-300">No assessment data available. Please complete an assessment first.</p>
        <button
          onClick={() => onViewChange('assessment')}
          className="mt-4 bg-primary text-black px-6 py-3 rounded-full font-bold"
        >
          Start Assessment
        </button>
      </div>
    );
  }

  const recommendations = generateRecommendations(riskAnalysis, assessmentData);
  const plan = generate90DayPlan(riskAnalysis, assessmentData);

  const getRiskColor = () => {
    if (riskAnalysis.riskLevel === 'LOW') return '#06d6a0';
    if (riskAnalysis.riskLevel === 'MODERATE') return '#ffd166';
    return '#ff4d6d';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Risk Score Card */}
      <div className="glass-strong rounded-2xl p-8 text-center mb-8 animate-fadeSlideUp" data-testid="risk-score-card">
        <div className="relative inline-block mb-4">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="20"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={getRiskColor()}
              strokeWidth="20"
              strokeDasharray={`${(riskAnalysis.score / 100) * 502} 502`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono font-bold text-white animate-countUp">{riskAnalysis.score}</span>
            <span className="text-slate-400 text-sm font-mono">/100</span>
          </div>
        </div>
        <h2
          className="text-3xl font-heading font-bold mb-2"
          style={{ color: getRiskColor() }}
        >
          {riskAnalysis.classification}
        </h2>
        <p className="text-xl text-slate-300 mb-4">Risk Level: {riskAnalysis.riskLevel}</p>
        <div className="inline-block bg-white/5 px-6 py-3 rounded-full">
          <span className="text-slate-400">T-Score: </span>
          <span className="text-white font-mono font-bold">{riskAnalysis.tScore}</span>
        </div>
      </div>

      {/* Top Risk Factors */}
      <div className="glass rounded-2xl p-6 mb-8 animate-fadeSlideUp stagger-1">
        <h3 className="text-2xl font-heading font-bold text-primary mb-4">Top Risk Factors</h3>
        <div className="space-y-4">
          {riskAnalysis.topRiskFactors.map((factor, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-white font-medium">{factor.factor}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                  factor.severity === 'High' ? 'bg-destructive/20 text-destructive' :
                  factor.severity === 'Medium' ? 'bg-warning/20 text-warning' :
                  'bg-success/20 text-success'
                }`}>
                  {factor.severity}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${Math.abs((factor.points / 30) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-2xl p-6 animate-fadeSlideUp stagger-2">
          <h4 className="text-lg font-heading font-bold text-primary mb-3">🥦 Diet & Nutrition</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {recommendations.diet.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6 animate-fadeSlideUp stagger-3">
          <h4 className="text-lg font-heading font-bold text-primary mb-3">🏃 Exercise Plan</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {recommendations.exercise.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6 animate-fadeSlideUp stagger-4">
          <h4 className="text-lg font-heading font-bold text-primary mb-3">💊 Medical</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {recommendations.medical.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="bg-white/5 border border-primary/30 text-primary px-6 py-3 rounded-full font-bold hover:bg-white/10 flex items-center gap-2"
          data-testid="download-report"
        >
          <Download className="w-5 h-5" /> Download Report
        </button>
        <button
          onClick={() => onViewChange('doctors')}
          className="bg-primary text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
          data-testid="book-specialist"
        >
          <Calendar className="w-5 h-5" /> Book Specialist
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`My OsteoAI Bone Health Score: ${riskAnalysis.score}/100 - ${riskAnalysis.classification}`);
            alert('Summary copied to clipboard!');
          }}
          className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 flex items-center gap-2"
        >
          <Share2 className="w-5 h-5" /> Share
        </button>
      </div>
    </div>
  );
};
