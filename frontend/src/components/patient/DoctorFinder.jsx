import React, { useState } from 'react';
import { Search, Star, MapPin, Clock } from 'lucide-react';
import { sampleDoctors } from '@/utils/mockData';

export const DoctorFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');

  const filtered = sampleDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSpecialty === 'All' || doc.specialty === filterSpecialty;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-heading font-bold text-white mb-6">Find a Specialist</h2>

      <div className="glass rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors..."
            className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white"
            data-testid="doctor-search"
          />
        </div>
        <select
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
          className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
        >
          <option value="All">All Specialties</option>
          <option value="Orthopedic Surgeon">Orthopedic</option>
          <option value="Rheumatologist">Rheumatologist</option>
          <option value="Endocrinologist">Endocrinologist</option>
          <option value="Geriatric Specialist">Geriatric</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((doctor, idx) => (
          <div
            key={doctor.id}
            className="glass rounded-2xl p-6 hover:border-primary/30 transition-all animate-fadeSlideUp"
            style={{ animationDelay: `${idx * 0.1}s` }}
            data-testid={`doctor-card-${idx}`}
          >
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                <p className="text-primary text-sm">{doctor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-white font-semibold">{doctor.rating}</span>
                  <span className="text-slate-400 text-sm">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4" />
                <span>{doctor.experience} years experience</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {doctor.availability.map(day => (
                  <span key={day} className="px-2 py-1 bg-success/20 text-success rounded text-xs">
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white font-mono font-bold">₹{doctor.fee}</span>
              <button className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform" data-testid={`book-${doctor.id}`}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
