import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, X } from 'lucide-react';
import { calculateRiskScore } from '@/utils/aiScoring';

export const AIAssessment = ({ onComplete, showProcessing }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    age: '',
    gender: '',
    height: '',
    weight: '',
    menopausal: '',
    ethnicity: '',
    // Step 2
    activity: '',
    calcium: '',
    sunExposure: '',
    smokingAlcohol: '',
    symptoms: [],
    familyHistory: '',
    diet: '',
    supplements: '',
    // Step 3
    previousFractures: '',
    fractureLocation: '',
    steroidUse: '',
    conditions: [],
    dexaScore: '',
    medications: '',
    // Step 4
    files: [],
    // Step 5
    backPain: 5,
    symptomDuration: '',
    painType: '',
    heightLoss: '',
    heightLossAmount: '',
    qualityOfLife: 3,
    recentFalls: ''
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const lifestyleQuestions = [
    {
      id: 'activity',
      question: 'Daily physical activity level',
      options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']
    },
    {
      id: 'calcium',
      question: 'Calcium-rich food frequency',
      options: ['Rarely', '1-2x/week', '3-4x/week', 'Daily']
    },
    {
      id: 'sunExposure',
      question: 'Daily sun exposure',
      options: ['Almost none', '<15 min', '15-30 min', '>30 min']
    },
    {
      id: 'smokingAlcohol',
      question: 'Smoking/alcohol consumption',
      options: ['Both regularly', 'One regularly', 'Occasionally', 'Neither']
    },
    {
      id: 'symptoms',
      question: 'Current symptoms (select all that apply)',
      options: ['Back pain & height loss', 'Frequent fractures', 'Joint stiffness & fatigue', 'Muscle weakness', 'None'],
      multiSelect: true
    },
    {
      id: 'familyHistory',
      question: 'Family history of osteoporosis',
      options: ['Parents/siblings', 'Extended family', 'Not sure', 'No history']
    },
    {
      id: 'diet',
      question: 'Overall diet quality',
      options: ['Poor', 'Average', 'Good', 'Excellent']
    },
    {
      id: 'supplements',
      question: 'Supplements taken',
      options: ['None', 'Vitamin D only', 'Calcium only', 'Both']
    }
  ];

  const handleNext = () => {
    if (step === 2 && currentQuestion < lifestyleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (step < 5) {
      setStep(step + 1);
      if (step === 2) setCurrentQuestion(0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step === 2 && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (step > 1) {
      setStep(step - 1);
      if (step === 3) setCurrentQuestion(lifestyleQuestions.length - 1);
    }
  };

  const handleSubmit = () => {
    const messages = [
      'Analyzing lifestyle patterns...',
      'Processing bone density indicators...',
      'Running osteoporosis ML model...',
      'Calculating risk factors...',
      'Generating personalized report...'
    ];

    showProcessing(messages, () => {
      const analysis = calculateRiskScore(formData);
      onComplete(formData, analysis);
    });
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSymptom = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const toggleCondition = (condition) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files.map(f => ({ name: f.name, size: f.size }))]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const progress = (step / 5) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-mono text-slate-300">Step {step} of 5</span>
          <span className="text-sm font-mono text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {['Basic Info', 'Lifestyle', 'Medical', 'Documents', 'Symptoms'].map((label, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > idx + 1 ? 'bg-success text-black' : step === idx + 1 ? 'bg-primary text-black glow-cyan' : 'bg-white/10 text-slate-400'
              }`}
            >
              {step > idx + 1 ? '✓' : idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="glass-strong rounded-2xl p-8 mb-6">
        {step === 1 && (
          <div className="space-y-6 animate-fadeSlideUp">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                  placeholder="Enter age"
                  data-testid="assessment-age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData('gender', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                  data-testid="assessment-gender"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateFormData('height', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                  placeholder="Height"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                  placeholder="Weight"
                />
              </div>
            </div>
            {formData.gender === 'Female' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Menopausal Status</label>
                <div className="flex gap-3">
                  {['Yes', 'No'].map(option => (
                    <button
                      key={option}
                      onClick={() => updateFormData('menopausal', option)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        formData.menopausal === option ? 'bg-primary text-black' : 'bg-white/5 text-slate-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeSlideUp">
            <div className="mb-4">
              <span className="text-sm text-slate-400">Question {currentQuestion + 1} of {lifestyleQuestions.length}</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">{lifestyleQuestions[currentQuestion].question}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lifestyleQuestions[currentQuestion].options.map(option => {
                const questionId = lifestyleQuestions[currentQuestion].id;
                const isMultiSelect = lifestyleQuestions[currentQuestion].multiSelect;
                const isSelected = isMultiSelect
                  ? formData[questionId]?.includes(option)
                  : formData[questionId] === option;

                return (
                  <button
                    key={option}
                    onClick={() => {
                      if (isMultiSelect) {
                        if (questionId === 'symptoms') toggleSymptom(option);
                      } else {
                        updateFormData(questionId, option);
                      }
                    }}
                    className={`p-4 rounded-xl font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-primary text-black border-2 border-primary'
                        : 'bg-white/5 text-slate-300 border-2 border-transparent hover:border-primary/30'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isSelected && '✓'} {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeSlideUp">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">Medical History</h2>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Previous Fractures</label>
              <div className="flex gap-3">
                {['Yes', 'No'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateFormData('previousFractures', option)}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      formData.previousFractures === option ? 'bg-primary text-black' : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Existing Conditions</label>
              <div className="grid grid-cols-2 gap-3">
                {['Diabetes', 'Rheumatoid Arthritis', 'Thyroid', 'Kidney disease', 'None'].map(condition => (
                  <button
                    key={condition}
                    onClick={() => toggleCondition(condition)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      formData.conditions.includes(condition) ? 'bg-primary text-black' : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    {formData.conditions.includes(condition) && '✓ '}{condition}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fadeSlideUp">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">Upload Documents (Optional)</h2>
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/60 transition-all">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-white mb-2">Drop files here or click to upload</p>
              <p className="text-slate-400 text-sm mb-4">X-rays, DEXA reports, blood tests</p>
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="bg-primary text-black px-6 py-2 rounded-full font-bold cursor-pointer inline-block">
                Select Files
              </label>
            </div>
            {formData.files.length > 0 && (
              <div className="space-y-2">
                {formData.files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <span className="text-sm text-white">{file.name}</span>
                    <button onClick={() => removeFile(idx)} className="text-destructive hover:scale-110">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-fadeSlideUp">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">Symptom Details</h2>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Back Pain Severity (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.backPain}
                onChange={(e) => updateFormData('backPain', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>Mild</span>
                <span className="text-primary font-bold">{formData.backPain}</span>
                <span>Severe</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Quality of Life</label>
              <div className="flex gap-2 justify-center">
                {['😞', '😐', '🙂', '😊', '😄'].map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateFormData('qualityOfLife', idx)}
                    className={`text-4xl p-4 rounded-xl transition-all ${
                      formData.qualityOfLife === idx ? 'bg-primary scale-125' : 'bg-white/5 hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 1 && currentQuestion === 0}
          className="px-6 py-3 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-full bg-primary text-black font-bold hover:scale-105 transition-transform flex items-center gap-2 shimmer-button"
          data-testid="assessment-next"
        >
          {step === 5 ? 'Complete Assessment' : 'Next'} <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
