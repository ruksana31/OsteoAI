// AI/ML Scoring Algorithm for Osteoporosis Risk Assessment

export const calculateRiskScore = (assessmentData) => {
  let score = 100;
  const deductions = [];

  // Age deductions
  const age = parseInt(assessmentData.age);
  if (age >= 70) {
    score -= 30;
    deductions.push({ factor: 'Age (70+)', points: -30, severity: 'High' });
  } else if (age >= 60) {
    score -= 20;
    deductions.push({ factor: 'Age (60-70)', points: -20, severity: 'Medium' });
  } else if (age >= 50) {
    score -= 10;
    deductions.push({ factor: 'Age (50-60)', points: -10, severity: 'Low' });
  }

  // Gender deductions
  if (assessmentData.gender === 'Female') {
    score -= 8;
    deductions.push({ factor: 'Gender (Female)', points: -8, severity: 'Medium' });
  } else if (assessmentData.gender === 'Male') {
    score -= 4;
    deductions.push({ factor: 'Gender (Male)', points: -4, severity: 'Low' });
  }

  // BMI calculations
  const height = parseFloat(assessmentData.height) / 100; // convert cm to m
  const weight = parseFloat(assessmentData.weight);
  const bmi = weight / (height * height);
  
  if (bmi < 18.5) {
    score -= 15;
    deductions.push({ factor: 'Low BMI (<18.5)', points: -15, severity: 'High' });
  } else if (bmi > 30) {
    score -= 5;
    deductions.push({ factor: 'High BMI (>30)', points: -5, severity: 'Low' });
  }

  // Activity level
  const activityMap = {
    'Sedentary': -20,
    'Lightly Active': -10,
    'Moderately Active': 0,
    'Very Active': 5
  };
  const activityDeduction = activityMap[assessmentData.activity] || 0;
  if (activityDeduction !== 0) {
    score += activityDeduction;
    deductions.push({
      factor: `Activity Level (${assessmentData.activity})`,
      points: activityDeduction,
      severity: activityDeduction <= -15 ? 'High' : activityDeduction <= -5 ? 'Medium' : 'Low'
    });
  }

  // Calcium intake
  const calciumMap = {
    'Rarely': -18,
    '1-2x/week': -10,
    '3-4x/week': -4,
    'Daily': 0
  };
  const calciumDeduction = calciumMap[assessmentData.calcium] || 0;
  if (calciumDeduction !== 0) {
    score += calciumDeduction;
    deductions.push({
      factor: `Calcium Intake (${assessmentData.calcium})`,
      points: calciumDeduction,
      severity: calciumDeduction <= -15 ? 'High' : calciumDeduction <= -5 ? 'Medium' : 'Low'
    });
  }

  // Sun exposure
  const sunMap = {
    'Almost none': -12,
    '<15 min': -8,
    '15-30 min': -3,
    '>30 min': 0
  };
  const sunDeduction = sunMap[assessmentData.sunExposure] || 0;
  if (sunDeduction !== 0) {
    score += sunDeduction;
    deductions.push({
      factor: `Sun Exposure (${assessmentData.sunExposure})`,
      points: sunDeduction,
      severity: sunDeduction <= -10 ? 'High' : sunDeduction <= -5 ? 'Medium' : 'Low'
    });
  }

  // Smoking/Alcohol
  const substanceMap = {
    'Both regularly': -15,
    'One regularly': -8,
    'Occasionally': -3,
    'Neither': 0
  };
  const substanceDeduction = substanceMap[assessmentData.smokingAlcohol] || 0;
  if (substanceDeduction !== 0) {
    score += substanceDeduction;
    deductions.push({
      factor: `Smoking/Alcohol (${assessmentData.smokingAlcohol})`,
      points: substanceDeduction,
      severity: substanceDeduction <= -10 ? 'High' : substanceDeduction <= -5 ? 'Medium' : 'Low'
    });
  }

  // Symptoms
  if (assessmentData.symptoms && assessmentData.symptoms.length > 0) {
    assessmentData.symptoms.forEach(symptom => {
      if (symptom === 'Back pain & height loss') {
        score -= 10;
        deductions.push({ factor: 'Back Pain & Height Loss', points: -10, severity: 'High' });
      } else if (symptom === 'Frequent fractures') {
        score -= 20;
        deductions.push({ factor: 'Frequent Fractures', points: -20, severity: 'High' });
      } else if (symptom === 'Joint stiffness & fatigue') {
        score -= 8;
        deductions.push({ factor: 'Joint Stiffness & Fatigue', points: -8, severity: 'Medium' });
      } else if (symptom === 'Muscle weakness') {
        score -= 6;
        deductions.push({ factor: 'Muscle Weakness', points: -6, severity: 'Medium' });
      }
    });
  }

  // Family history
  const familyMap = {
    'Parents/siblings': -15,
    'Extended family': -8,
    'Not sure': 0,
    'No history': 0
  };
  const familyDeduction = familyMap[assessmentData.familyHistory] || 0;
  if (familyDeduction !== 0) {
    score += familyDeduction;
    deductions.push({
      factor: `Family History (${assessmentData.familyHistory})`,
      points: familyDeduction,
      severity: familyDeduction <= -10 ? 'High' : familyDeduction <= -5 ? 'Medium' : 'Low'
    });
  }

  // Supplements
  const supplementMap = {
    'None': 0,
    'Vitamin D only': 4,
    'Calcium only': 4,
    'Both': 8
  };
  const supplementBonus = supplementMap[assessmentData.supplements] || 0;
  if (supplementBonus > 0) {
    score += supplementBonus;
    deductions.push({
      factor: `Supplements (${assessmentData.supplements})`,
      points: supplementBonus,
      severity: 'Positive'
    });
  }

  // Menopausal status
  if (assessmentData.menopausal === 'Yes') {
    score -= 12;
    deductions.push({ factor: 'Post-Menopausal', points: -12, severity: 'High' });
  }

  // Medical conditions
  if (assessmentData.conditions && assessmentData.conditions.length > 0) {
    const conditionCount = assessmentData.conditions.filter(c => c !== 'None').length;
    if (conditionCount > 0) {
      const conditionDeduction = -8 * conditionCount;
      score += conditionDeduction;
      deductions.push({
        factor: `Medical Conditions (${conditionCount})`,
        points: conditionDeduction,
        severity: 'High'
      });
    }
  }

  // Steroid use
  if (assessmentData.steroidUse === 'Yes') {
    score -= 10;
    deductions.push({ factor: 'Steroid Medication Use', points: -10, severity: 'High' });
  }

  // Previous fractures
  if (assessmentData.previousFractures === 'Yes') {
    score -= 12;
    deductions.push({ factor: 'Previous Fractures', points: -12, severity: 'High' });
  }

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score));

  // Calculate T-score simulation
  let tScore;
  if (score > 70) {
    tScore = -0.5 + (score - 70) * 0.05; // Above -1.0
  } else if (score > 40) {
    tScore = -1.0 - (70 - score) * 0.05; // Between -1.0 and -2.5
  } else {
    tScore = -2.5 - (40 - score) * 0.05; // Below -2.5
  }
  tScore = Math.round(tScore * 10) / 10;

  // Classification
  let classification, riskLevel;
  if (score > 70) {
    classification = 'NORMAL';
    riskLevel = 'LOW';
  } else if (score > 40) {
    classification = 'OSTEOPENIA';
    riskLevel = 'MODERATE';
  } else {
    classification = 'OSTEOPOROSIS';
    riskLevel = 'HIGH';
  }

  // Bone age estimate
  const boneAge = Math.round(age + (100 - score) / 10);

  // Risk percentile
  const riskPercentile = 100 - score;

  // Sort deductions by severity and points to get top 3 contributors
  const sortedDeductions = deductions
    .filter(d => d.points < 0)
    .sort((a, b) => a.points - b.points)
    .slice(0, 3);

  return {
    score,
    tScore,
    classification,
    riskLevel,
    boneAge,
    riskPercentile,
    bmi: Math.round(bmi * 10) / 10,
    topRiskFactors: sortedDeductions,
    allDeductions: deductions
  };
};

export const generateRecommendations = (riskAnalysis, assessmentData) => {
  const recommendations = {
    diet: [],
    exercise: [],
    medical: []
  };

  // Diet recommendations based on deficiencies
  if (assessmentData.calcium !== 'Daily') {
    recommendations.diet.push('Increase calcium-rich foods: milk, yogurt, cheese, leafy greens');
    recommendations.diet.push('Aim for 1000-1200mg calcium daily');
  }
  if (assessmentData.sunExposure === 'Almost none' || assessmentData.sunExposure === '<15 min') {
    recommendations.diet.push('Add Vitamin D sources: fatty fish, egg yolks, fortified foods');
  }
  recommendations.diet.push('Include protein-rich foods for bone strength');
  recommendations.diet.push('Limit caffeine and sodium intake');

  // Exercise recommendations
  if (assessmentData.activity === 'Sedentary' || assessmentData.activity === 'Lightly Active') {
    recommendations.exercise.push('Start with 30 minutes weight-bearing exercise daily');
    recommendations.exercise.push('Try walking, jogging, or dancing');
  }
  recommendations.exercise.push('Add strength training 2-3 times per week');
  recommendations.exercise.push('Practice balance exercises to prevent falls');
  recommendations.exercise.push('Consider yoga or tai chi for flexibility');

  // Medical recommendations
  if (riskAnalysis.riskLevel === 'HIGH') {
    recommendations.medical.push('URGENT: Schedule DEXA scan immediately');
    recommendations.medical.push('Consult orthopedic specialist or endocrinologist');
  } else if (riskAnalysis.riskLevel === 'MODERATE') {
    recommendations.medical.push('Schedule DEXA scan within 3 months');
    recommendations.medical.push('Discuss bone health with your doctor');
  }
  
  if (assessmentData.supplements !== 'Both') {
    if (assessmentData.supplements === 'None') {
      recommendations.medical.push('Consider Vitamin D3 (1000-2000 IU) and Calcium supplements');
    } else if (assessmentData.supplements === 'Vitamin D only') {
      recommendations.medical.push('Add Calcium supplement (500-600mg twice daily)');
    } else if (assessmentData.supplements === 'Calcium only') {
      recommendations.medical.push('Add Vitamin D3 supplement (1000-2000 IU daily)');
    }
  }
  
  recommendations.medical.push('Get regular bone density monitoring');
  if (assessmentData.smokingAlcohol !== 'Neither') {
    recommendations.medical.push('Reduce or eliminate smoking and excessive alcohol');
  }

  return recommendations;
};

export const generate90DayPlan = (riskAnalysis, assessmentData) => {
  const plan = [];
  
  const topFactors = riskAnalysis.topRiskFactors.slice(0, 3);
  
  topFactors.forEach((factor, index) => {
    const weekStart = index * 4 + 1;
    const weekEnd = weekStart + 3;
    
    let goals = [];
    
    if (factor.factor.includes('Activity') || factor.factor.includes('Sedentary')) {
      goals = [
        'Walk 20 minutes daily',
        'Add 10-minute strength training',
        'Try balance exercises 3x/week',
        'Track daily steps (aim 7000+)'
      ];
    } else if (factor.factor.includes('Calcium')) {
      goals = [
        'Add dairy/calcium source to each meal',
        'Track calcium intake daily',
        'Try 3 new calcium-rich recipes',
        'Maintain 1200mg calcium daily'
      ];
    } else if (factor.factor.includes('Sun') || factor.factor.includes('Vitamin D')) {
      goals = [
        'Get 20 minutes sun exposure daily',
        'Start Vitamin D supplement',
        'Add fatty fish 2x/week',
        'Check Vitamin D levels'
      ];
    } else if (factor.factor.includes('Smoking') || factor.factor.includes('Alcohol')) {
      goals = [
        'Reduce smoking/alcohol by 50%',
        'Find healthy alternatives',
        'Join support group',
        'Track substance-free days'
      ];
    } else {
      goals = [
        'Monitor symptoms daily',
        'Follow medical advice',
        'Maintain healthy habits',
        'Schedule follow-up appointment'
      ];
    }
    
    plan.push({
      weeks: `Weeks ${weekStart}-${weekEnd}`,
      focus: factor.factor,
      goals: goals,
      completed: 0
    });
  });
  
  return plan;
};
