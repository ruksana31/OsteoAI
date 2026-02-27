import React from 'react';
import { FileText, Download } from 'lucide-react';

export const MyReports = () => {
  const history = JSON.parse(localStorage.getItem('osteoai_history') || '[]');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-heading font-bold text-white mb-6">My Reports & History</h2>
      
      {history.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
          <p className="text-slate-300">No assessment history yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="glass rounded-xl p-6 flex items-center justify-between hover:border-primary/30 transition-all">
              <div>
                <p className="text-white font-semibold">Assessment - {new Date(item.date).toLocaleDateString()}</p>
                <p className="text-slate-400 text-sm">Score: {item.score}/100 • {item.classification}</p>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Download className="w-5 h-5 text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
