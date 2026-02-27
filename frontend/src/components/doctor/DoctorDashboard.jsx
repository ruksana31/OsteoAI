import React from 'react';
import { Users, Calendar, AlertTriangle, FileText, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DoctorDashboard = ({ user }) => {
  const stats = [
    { label: 'Total Patients', value: 48, icon: Users, color: '#00e5ff' },
    { label: 'Appointments Today', value: 6, icon: Calendar, color: '#06d6a0' },
    { label: 'High-Risk Patients', value: 12, icon: AlertTriangle, color: '#ff4d6d' },
    { label: 'Assessments This Week', value: 23, icon: FileText, color: '#ffd166' }
  ];

  const riskDistribution = [
    { name: 'Low', value: 20, color: '#06d6a0' },
    { name: 'Moderate', value: 16, color: '#ffd166' },
    { name: 'High', value: 12, color: '#ff4d6d' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, Dr. {user.name}</h2>
        <p className="text-slate-300">{user.specialty} • {user.hospital}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <p className="text-3xl font-mono font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-heading font-bold text-white mb-4">Patient Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {riskDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-heading font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-primary text-black py-3 px-4 rounded-xl font-bold hover:scale-105 transition-transform">
              View Today's Appointments
            </button>
            <button className="w-full bg-white/5 text-white py-3 px-4 rounded-xl font-bold hover:bg-white/10">
              Review Pending Assessments
            </button>
            <button className="w-full bg-white/5 text-white py-3 px-4 rounded-xl font-bold hover:bg-white/10">
              Manage Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
