import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Briefcase, Award, Building, Calendar } from 'lucide-react';

export const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    age: '',
    gender: '',
    role: 'Patient',
    // Doctor-specific fields
    licenseNumber: '',
    specialty: '',
    hospital: '',
    experience: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.age) {
        newErrors.age = 'Age is required';
      } else if (formData.age < 18 || formData.age > 100) {
        newErrors.age = 'Age must be between 18 and 100';
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Doctor-specific validation
      if (formData.role === 'Doctor') {
        if (!formData.licenseNumber) {
          newErrors.licenseNumber = 'Medical license number is required';
        }
        if (!formData.specialty) {
          newErrors.specialty = 'Specialty is required';
        }
        if (!formData.hospital) {
          newErrors.hospital = 'Hospital/Clinic name is required';
        }
        if (!formData.experience) {
          newErrors.experience = 'Years of experience is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation on error
      const form = e.target;
      form.classList.add('animate-shake');
      setTimeout(() => form.classList.remove('animate-shake'), 300);
      return;
    }

    // Simulate login/registration
    const userData = {
      name: formData.fullName || formData.email.split('@')[0],
      email: formData.email,
      role: formData.role,
      age: formData.age,
      gender: formData.gender,
      ...(formData.role === 'Doctor' && {
        specialty: formData.specialty,
        hospital: formData.hospital,
        experience: formData.experience,
        licenseNumber: formData.licenseNumber
      })
    };

    onLogin(userData);
  };

  const handleDemoLogin = (role) => {
    const demoData = role === 'Patient' ? {
      name: 'Rajesh Kumar',
      email: 'rajesh.demo@osteoai.com',
      role: 'Patient',
      age: 58,
      gender: 'Male'
    } : {
      name: 'Dr. Priya Mehta',
      email: 'priya.demo@osteoai.com',
      role: 'Doctor',
      specialty: 'Orthopedic Surgeon',
      hospital: 'Apollo Hospitals',
      experience: 15
    };

    onLogin(demoData);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['', '#ff4d6d', '#ffd166', '#06d6a0', '#00e5ff', '#00e5ff'];

    return { strength, label: labels[strength], color: colors[strength] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated 3D Bone Illustration Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="animate-float">
          <svg width="400" height="400" viewBox="0 0 200 200" className="text-primary">
            <path
              d="M70 30 Q60 20, 50 30 Q40 40, 50 50 L50 150 Q40 160, 50 170 Q60 180, 70 170 L130 170 Q140 180, 150 170 Q160 160, 150 150 L150 50 Q160 40, 150 30 Q140 20, 130 30 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Login/Register Card */}
      <div className="flip-container w-full max-w-md">
        <div className={`flip-card ${!isLogin ? 'flipped' : ''}`}>
          <div className="relative">
            <div className="glass-strong rounded-2xl p-8 shadow-2xl border border-primary/20 animate-fadeSlideUp">
              {/* Logo/Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-heading font-bold text-primary glow-text mb-2" data-testid="app-logo">
                  OsteoAI
                </h1>
                <p className="text-slate-300 text-sm">
                  {isLogin ? 'Welcome back to bone health intelligence' : 'Join the future of bone health'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">I am a</label>
                  <div className="flex gap-3" data-testid="role-selector">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'Patient' }))}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        formData.role === 'Patient'
                          ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                      data-testid="role-patient"
                    >
                      Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'Doctor' }))}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        formData.role === 'Doctor'
                          ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                      data-testid="role-doctor"
                    >
                      Doctor
                    </button>
                  </div>
                </div>

                {/* Register-only fields */}
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Enter your full name"
                          data-testid="input-fullname"
                        />
                      </div>
                      {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Age"
                          data-testid="input-age"
                        />
                        {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          data-testid="input-gender"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender}</p>}
                      </div>
                    </div>

                    {/* Doctor-specific fields */}
                    {formData.role === 'Doctor' && (
                      <div className="space-y-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm text-primary font-medium">Doctor Credentials</p>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Medical License Number</label>
                          <div className="relative">
                            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              name="licenseNumber"
                              value={formData.licenseNumber}
                              onChange={handleInputChange}
                              className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="License number"
                              data-testid="input-license"
                            />
                          </div>
                          {errors.licenseNumber && <p className="text-destructive text-xs mt-1">{errors.licenseNumber}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Specialty</label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                              name="specialty"
                              value={formData.specialty}
                              onChange={handleInputChange}
                              className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                              data-testid="input-specialty"
                            >
                              <option value="">Select specialty</option>
                              <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                              <option value="Rheumatologist">Rheumatologist</option>
                              <option value="Endocrinologist">Endocrinologist</option>
                              <option value="Geriatric Specialist">Geriatric Specialist</option>
                            </select>
                          </div>
                          {errors.specialty && <p className="text-destructive text-xs mt-1">{errors.specialty}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Hospital/Clinic Name</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              name="hospital"
                              value={formData.hospital}
                              onChange={handleInputChange}
                              className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Hospital/Clinic"
                              data-testid="input-hospital"
                            />
                          </div>
                          {errors.hospital && <p className="text-destructive text-xs mt-1">{errors.hospital}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Years of Experience</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="number"
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Years"
                              data-testid="input-experience"
                            />
                          </div>
                          {errors.experience && <p className="text-destructive text-xs mt-1">{errors.experience}</p>}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter your email"
                      data-testid="input-email"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter your password"
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                      data-testid="toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                  
                  {/* Password Strength Meter */}
                  {!isLogin && formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${(passwordStrength.strength / 5) * 100}%`,
                              backgroundColor: passwordStrength.color
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono" style={{ color: passwordStrength.color }}>
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password - Register only */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Confirm your password"
                        data-testid="input-confirm-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 px-4 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all hover:scale-105 active:scale-95 shimmer-button"
                  data-testid="submit-button"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>

                {/* Toggle Login/Register */}
                <p className="text-center text-sm text-slate-400">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline font-medium"
                    data-testid="toggle-auth-mode"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400 text-center mb-3">Quick Demo Access</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDemoLogin('Patient')}
                    className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all border border-white/10 hover:border-primary/30"
                    data-testid="demo-patient"
                  >
                    Patient Demo
                  </button>
                  <button
                    onClick={() => handleDemoLogin('Doctor')}
                    className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all border border-white/10 hover:border-primary/30"
                    data-testid="demo-doctor"
                  >
                    Doctor Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
