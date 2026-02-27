// Mock data for the application

export const samplePatients = [
  {
    id: 'pat001',
    name: 'Rajesh Kumar',
    age: 68,
    gender: 'Male',
    riskScore: 42,
    tScore: -2.1,
    classification: 'OSTEOPENIA',
    riskLevel: 'MODERATE',
    lastAssessment: '2026-01-10',
    status: 'Pending Review',
    email: 'rajesh.k@email.com'
  },
  {
    id: 'pat002',
    name: 'Meera Sharma',
    age: 72,
    gender: 'Female',
    riskScore: 28,
    tScore: -3.2,
    classification: 'OSTEOPOROSIS',
    riskLevel: 'HIGH',
    lastAssessment: '2026-01-12',
    status: 'Needs Follow-Up',
    email: 'meera.s@email.com'
  },
  {
    id: 'pat003',
    name: 'Anil Verma',
    age: 58,
    gender: 'Male',
    riskScore: 76,
    tScore: -0.4,
    classification: 'NORMAL',
    riskLevel: 'LOW',
    lastAssessment: '2026-01-08',
    status: 'Reviewed',
    email: 'anil.v@email.com'
  }
];

export const sampleDoctors = [
  {
    id: 'doc001',
    name: 'Dr. Priya Mehta',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Apollo Hospitals, Delhi',
    rating: 4.8,
    reviews: 324,
    experience: 15,
    availability: ['Mon', 'Wed', 'Fri'],
    fee: 1500,
    avatar: 'https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
    bio: 'Specializes in bone health and osteoporosis management with 15+ years experience.',
    qualifications: ['MBBS', 'MS Orthopedics', 'Fellowship in Bone Health'],
    successRate: 94
  },
  {
    id: 'doc002',
    name: 'Dr. Arjun Reddy',
    specialty: 'Rheumatologist',
    hospital: 'Fortis Healthcare, Mumbai',
    rating: 4.9,
    reviews: 456,
    experience: 18,
    availability: ['Tue', 'Thu', 'Sat'],
    fee: 1800,
    avatar: 'https://images.pexels.com/photos/31842729/pexels-photo-31842729.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Expert in treating bone and joint disorders with focus on preventive care.',
    qualifications: ['MBBS', 'MD Medicine', 'DM Rheumatology'],
    successRate: 96
  },
  {
    id: 'doc003',
    name: 'Dr. Sneha Iyer',
    specialty: 'Endocrinologist',
    hospital: 'Max Healthcare, Bangalore',
    rating: 4.7,
    reviews: 289,
    experience: 12,
    availability: ['Mon', 'Tue', 'Thu', 'Fri'],
    fee: 1400,
    avatar: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
    bio: 'Focuses on hormonal aspects of bone health and metabolic bone diseases.',
    qualifications: ['MBBS', 'MD Medicine', 'DM Endocrinology'],
    successRate: 92
  },
  {
    id: 'doc004',
    name: 'Dr. Vikram Singh',
    specialty: 'Geriatric Specialist',
    hospital: 'AIIMS, New Delhi',
    rating: 4.9,
    reviews: 512,
    experience: 20,
    availability: ['Wed', 'Fri', 'Sat'],
    fee: 2000,
    avatar: 'https://images.pexels.com/photos/31842729/pexels-photo-31842729.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Renowned geriatric specialist with expertise in elderly bone health management.',
    qualifications: ['MBBS', 'MD Geriatrics', 'PhD Bone Health'],
    successRate: 97
  }
];

export const sampleChatHistory = [
  {
    id: 'msg001',
    sender: 'user',
    text: 'What is osteoporosis?',
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 'msg002',
    sender: 'ai',
    text: 'Osteoporosis is a medical condition where bones become weak and brittle, making them more prone to fractures. It occurs when the body loses too much bone mass or makes too little bone. The condition is often called a "silent disease" because bone loss happens without symptoms until a fracture occurs.',
    timestamp: new Date(Date.now() - 3590000)
  },
  {
    id: 'msg003',
    sender: 'user',
    text: 'What foods are calcium-rich?',
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    id: 'msg004',
    sender: 'ai',
    text: 'Great calcium-rich foods include: dairy products (milk, yogurt, cheese), leafy green vegetables (kale, spinach, collard greens), fortified foods (cereals, orange juice, soy milk), fish with edible bones (sardines, salmon), almonds, and tofu. Aim for 1000-1200mg of calcium daily.',
    timestamp: new Date(Date.now() - 1790000)
  }
];

export const suggestedQuestions = [
  'What is osteoporosis?',
  'How can I improve bone density?',
  'What foods are calcium-rich?',
  'Should I get a DEXA scan?',
  'What does my T-score mean?',
  'What exercises help bone strength?',
  'Is my risk score dangerous?',
  'Which doctor should I see?'
];

export const insuranceSchemes = [
  {
    name: 'PMJAY (Ayushman Bharat)',
    description: 'Covers bone density tests and treatments for eligible families',
    eligibility: 'Income-based eligibility'
  },
  {
    name: 'CGHS',
    description: 'Central Government Health Scheme for government employees',
    eligibility: 'Central govt employees and pensioners'
  },
  {
    name: 'ESI',
    description: 'Employee State Insurance covers diagnostic tests',
    eligibility: 'Employees earning below ₹21,000/month'
  },
  {
    name: 'Star Health',
    description: 'Senior citizen plans with bone health coverage',
    eligibility: 'Age 60+ with active policy'
  },
  {
    name: 'HDFC ERGO',
    description: 'Comprehensive health insurance with diagnostic coverage',
    eligibility: 'Active policy holders'
  },
  {
    name: 'Niva Bupa',
    description: 'Health plans covering preventive bone health tests',
    eligibility: 'Policy holders of all ages'
  }
];

export const translations = {
  en: {
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    assessment: 'Assessment',
    doctors: 'Doctors',
    reports: 'My Reports',
    chat: 'AI Chat',
    logout: 'Logout',
    startAssessment: 'Start AI Assessment',
    bookDoctor: 'Book a Doctor',
    riskScore: 'Risk Score',
    boneHealth: 'Bone Health',
    askQuestion: 'Ask a question...',
    send: 'Send'
  },
  hi: {
    welcome: 'स्वागत है',
    dashboard: 'डैशबोर्ड',
    assessment: 'मूल्यांकन',
    doctors: 'डॉक्टर',
    reports: 'मेरी रिपोर्ट',
    chat: 'एआई चैट',
    logout: 'लॉग आउट',
    startAssessment: 'एआई मूल्यांकन शुरू करें',
    bookDoctor: 'डॉक्टर बुक करें',
    riskScore: 'जोखिम स्कोर',
    boneHealth: 'हड्डी स्वास्थ्य',
    askQuestion: 'एक सवाल पूछें...',
    send: 'भेजें'
  },
  te: {
    welcome: 'స్వాగతం',
    dashboard: 'డాష్‌బోర్డ్',
    assessment: 'అంచనా',
    doctors: 'వైద్యులు',
    reports: 'నా నివేదికలు',
    chat: 'AI చాట్',
    logout: 'లాగ్ అవుట్',
    startAssessment: 'AI అంచనా ప్రారంభించండి',
    bookDoctor: 'వైద్యుడిని బుక్ చేయండి',
    riskScore: 'రిస్క్ స్కోర్',
    boneHealth: 'ఎముక ఆరోగ్యం',
    askQuestion: 'ఒక ప్రశ్న అడగండి...',
    send: 'పంపండి'
  },
  pa: {
    welcome: 'ਸੁਆਗਤ ਹੈ',
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    assessment: 'ਮੁਲਾਂਕਣ',
    doctors: 'ਡਾਕਟਰ',
    reports: 'ਮੇਰੀਆਂ ਰਿਪੋਰਟਾਂ',
    chat: 'AI ਚੈਟ',
    logout: 'ਲੌਗ ਆਉਟ',
    startAssessment: 'AI ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ',
    bookDoctor: 'ਡਾਕਟਰ ਬੁੱਕ ਕਰੋ',
    riskScore: 'ਖਤਰਾ ਸਕੋਰ',
    boneHealth: 'ਹੱਡੀਆਂ ਦੀ ਸਿਹਤ',
    askQuestion: 'ਇੱਕ ਸਵਾਲ ਪੁੱਛੋ...',
    send: 'ਭੇਜੋ'
  },
  bn: {
    welcome: 'স্বাগতম',
    dashboard: 'ড্যাশবোর্ড',
    assessment: 'মূল্যায়ন',
    doctors: 'ডাক্তার',
    reports: 'আমার রিপোর্ট',
    chat: 'AI চ্যাট',
    logout: 'লগ আউট',
    startAssessment: 'AI মূল্যায়ন শুরু করুন',
    bookDoctor: 'ডাক্তার বুক করুন',
    riskScore: 'ঝুঁকি স্কোর',
    boneHealth: 'হাড়ের স্বাস্থ্য',
    askQuestion: 'একটি প্রশ্ন জিজ্ঞাসা করুন...',
    send: 'পাঠান'
  }
};
