// Mock AI responses for the chatbot

export const getChatResponse = (userMessage, userContext = null) => {
  const message = userMessage.toLowerCase();

  // Context-aware responses if user has assessment data
  if (userContext && userContext.riskScore) {
    if (message.includes('my score') || message.includes('my risk')) {
      if (userContext.riskScore >= 70) {
        return `Based on your assessment, your bone health score is ${userContext.riskScore}/100, which indicates LOW risk. Your bones are in good condition! Keep maintaining your healthy lifestyle with adequate calcium, vitamin D, and regular exercise.`;
      } else if (userContext.riskScore >= 40) {
        return `Your bone health score is ${userContext.riskScore}/100, indicating MODERATE risk (Osteopenia). This means your bone density is lower than optimal but not yet osteoporosis. Focus on increasing calcium-rich foods, vitamin D supplementation, and weight-bearing exercises. Consider scheduling a DEXA scan to monitor your bone density.`;
      } else {
        return `Your assessment shows a score of ${userContext.riskScore}/100, which indicates HIGH risk (Osteoporosis). I strongly recommend consulting with an orthopedic specialist or endocrinologist immediately. You should also schedule a DEXA scan and discuss medication options with your doctor.`;
      }
    }
  }

  // General knowledge base responses
  if (message.includes('osteoporosis') && message.includes('what')) {
    return "Osteoporosis is a medical condition where bones become weak and brittle, making them more prone to fractures. It occurs when the body loses too much bone mass or makes too little bone. The condition is often called a 'silent disease' because bone loss happens without symptoms until a fracture occurs. Common fracture sites include the hip, spine, and wrist.";
  }

  if (message.includes('calcium') && (message.includes('food') || message.includes('rich') || message.includes('source'))) {
    return "Great calcium-rich foods include:\n\n🥛 Dairy: Milk (300mg per cup), yogurt, cheese\n🥬 Greens: Kale, spinach, collard greens, bok choy\n🐟 Fish: Sardines, salmon (with bones)\n🌰 Nuts: Almonds (75mg per ounce)\n🥫 Fortified foods: Orange juice, cereals, soy milk\n🫘 Tofu and tempeh\n\nAim for 1000-1200mg of calcium daily. Spread intake throughout the day for better absorption!";
  }

  if (message.includes('improve') && message.includes('bone')) {
    return "Here are proven ways to improve bone density:\n\n1. **Exercise**: Weight-bearing activities (walking, jogging, dancing) and strength training\n2. **Nutrition**: Adequate calcium (1000-1200mg/day) and vitamin D (600-800 IU/day)\n3. **Lifestyle**: Quit smoking, limit alcohol, maintain healthy weight\n4. **Supplements**: Calcium citrate + Vitamin D3 if dietary intake is insufficient\n5. **Medical**: Consult doctor about bone-strengthening medications if needed\n6. **Monitor**: Regular bone density scans (DEXA) to track progress";
  }

  if (message.includes('dexa') || message.includes('scan')) {
    return "A DEXA scan (Dual-Energy X-ray Absorptiometry) is the gold standard for measuring bone density. You should consider getting one if:\n\n✓ You're 65+ years (women) or 70+ (men)\n✓ Post-menopausal with risk factors\n✓ History of fractures from minor trauma\n✓ Long-term steroid use\n✓ Family history of osteoporosis\n\nThe scan is quick (10-30 minutes), painless, and uses very low radiation. Results show your T-score, which indicates bone density compared to healthy young adults.";
  }

  if (message.includes('t-score') || message.includes('t score')) {
    return "T-score is a measure of your bone density:\n\n🟢 **Normal**: T-score above -1.0\nYour bones are healthy\n\n🟡 **Osteopenia**: T-score between -1.0 and -2.5\nLower bone density, but not osteoporosis yet\n\n🔴 **Osteoporosis**: T-score below -2.5\nSignificantly weakened bones, high fracture risk\n\nEach -1.0 decrease in T-score roughly doubles fracture risk. If your T-score is concerning, discuss treatment options with your doctor.";
  }

  if (message.includes('exercise') && message.includes('bone')) {
    return "Best exercises for bone strength:\n\n**Weight-Bearing (30+ min daily)**\n• Walking, jogging, dancing\n• Stair climbing, hiking\n• Tennis, basketball\n\n**Strength Training (2-3x weekly)**\n• Free weights or resistance bands\n• Push-ups, squats, lunges\n• Weight machines\n\n**Balance Exercises**\n• Yoga, tai chi\n• Single-leg stands\n• Heel-to-toe walking\n\nAvoid high-impact activities if you already have osteoporosis. Always consult your doctor before starting new exercise programs.";
  }

  if (message.includes('vitamin d')) {
    return "Vitamin D is crucial for calcium absorption and bone health:\n\n**Daily Requirements**: 600-800 IU (age dependent)\n\n**Sources**:\n☀️ Sunlight: 15-30 minutes daily (face, arms, legs)\n🐟 Fatty fish: Salmon, mackerel, sardines\n🥚 Egg yolks\n🥛 Fortified milk, orange juice, cereals\n💊 Supplements: Vitamin D3 is most effective\n\n**Signs of Deficiency**: Bone pain, muscle weakness, fatigue\n\nMany people with osteoporosis are vitamin D deficient. Ask your doctor about checking your levels!";
  }

  if (message.includes('doctor') || message.includes('specialist')) {
    return "For osteoporosis, consider seeing:\n\n**Orthopedic Surgeon**: Bone specialists, handles fractures and bone health\n**Rheumatologist**: Treats bone and joint conditions\n**Endocrinologist**: Hormone-related bone issues\n**Geriatric Specialist**: For elderly patients\n\nStart with your primary care physician who can refer you to the right specialist. You can also book appointments directly through our 'Find a Doctor' feature!";
  }

  if (message.includes('risk') || message.includes('dangerous')) {
    return "Osteoporosis risk factors include:\n\n**Non-Modifiable**:\n• Age (50+ for women, 70+ for men)\n• Gender (women 4x more likely)\n• Family history\n• Ethnicity (Asian, Caucasian higher risk)\n\n**Modifiable**:\n• Low calcium/vitamin D intake\n• Sedentary lifestyle\n• Smoking and excessive alcohol\n• Low body weight (BMI <18.5)\n• Certain medications (steroids)\n\nThe good news? You can significantly reduce risk by addressing modifiable factors through diet, exercise, and lifestyle changes!";
  }

  if (message.includes('medication') || message.includes('treatment')) {
    return "Common osteoporosis treatments include:\n\n**Medications**:\n• Bisphosphonates (Alendronate, Risedronate): Slow bone loss\n• Denosumab: Reduces bone breakdown\n• Teriparatide: Builds new bone\n• Hormone therapy: For post-menopausal women\n\n**Natural Approaches**:\n• Calcium + Vitamin D supplements\n• Weight-bearing exercise\n• Dietary modifications\n\n**Important**: Medication decisions should be made with your doctor based on your T-score, fracture risk, and overall health. Each has benefits and potential side effects.";
  }

  if (message.includes('prevent') || message.includes('prevention')) {
    return "Osteoporosis prevention strategies:\n\n**Start Early (Any Age)**:\n1. Build strong bones in youth with calcium-rich diet\n2. Regular exercise throughout life\n3. Maintain healthy weight\n4. Avoid smoking and excessive alcohol\n\n**After 50**:\n5. Increase calcium to 1200mg/day\n6. Ensure adequate vitamin D\n7. Get baseline DEXA scan\n8. Fall-proof your home\n9. Review medications with doctor\n10. Consider preventive medications if high risk\n\nPrevention is always easier than treatment!";
  }

  if (message.includes('fall') || message.includes('fracture')) {
    return "Preventing falls is crucial for osteoporosis patients:\n\n**Home Safety**:\n• Remove tripping hazards (rugs, cords)\n• Install grab bars in bathroom\n• Improve lighting\n• Use non-slip mats\n• Keep items within reach\n\n**Personal Safety**:\n• Wear proper footwear (non-slip, low heels)\n• Use assistive devices if needed\n• Review medications that cause dizziness\n• Do balance exercises regularly\n• Get vision checked annually\n\n**If You Fall**: Seek medical attention even if you feel fine. Fractures aren't always immediately painful.";
  }

  if (message.includes('diet') || message.includes('nutrition')) {
    return "Bone-healthy diet guidelines:\n\n**Include Daily**:\n✓ 3-4 servings calcium-rich foods\n✓ Protein at each meal (lean meat, fish, legumes)\n✓ Fruits and vegetables (vitamin K, magnesium)\n✓ Nuts and seeds\n✓ Fortified foods\n\n**Limit**:\n✗ Excessive caffeine (>3 cups coffee/day)\n✗ High sodium foods\n✗ Sugary drinks\n✗ Excessive alcohol\n\n**Timing**: Spread calcium intake throughout day. Don't take all supplements at once!";
  }

  if (message.includes('symptom')) {
    return "Osteoporosis is often symptomless until a fracture occurs, but watch for:\n\n**Early Warning Signs**:\n• Loss of height (>1.5 inches)\n• Stooped posture or curved spine\n• Back pain (may indicate vertebral fracture)\n• Bone fractures from minor falls\n\n**Advanced Symptoms**:\n• Frequent fractures\n• Chronic back pain\n• Limited mobility\n• Difficulty standing straight\n\nDon't wait for symptoms! If you have risk factors, get screened early.";
  }

  if (message.includes('age') && message.includes('screen')) {
    return "Recommended screening ages for bone density testing:\n\n**Women**:\n• All women 65 and older\n• Post-menopausal women under 65 with risk factors\n• Any age if fracture after age 50\n\n**Men**:\n• All men 70 and older\n• Men 50-69 with risk factors\n\n**Earlier Testing If**:\n• Long-term steroid use\n• Premature menopause\n• Eating disorders\n• Multiple fractures\n• Strong family history\n\nEarly detection saves bones!";
  }

  if (message.includes('cost') || message.includes('price') || message.includes('insurance')) {
    return "Healthcare costs and insurance for osteoporosis:\n\n**India Coverage**:\n• PMJAY (Ayushman Bharat): Covers DEXA scans and treatment\n• CGHS: For government employees\n• ESI: For employees earning <₹21,000/month\n• Private insurance: Most senior citizen plans cover bone health\n\n**Typical Costs** (out-of-pocket):\n• DEXA Scan: ₹1,500-₹3,000\n• Specialist Consultation: ₹1,000-₹2,500\n• Medications: Varies widely\n\nMany preventive services are covered. Check your policy or ask your insurer!";
  }

  if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
    return "Hello! 👋 I'm OsteoBot, your bone health assistant. I can help you understand osteoporosis, risk factors, prevention strategies, and answer questions about your bone health. What would you like to know?";
  }

  if (message.includes('thank')) {
    return "You're welcome! Feel free to ask me anything about bone health. I'm here to help! 💙";
  }

  // Default response
  return "I'm here to help with bone health questions! You can ask me about:\n\n• Osteoporosis basics and prevention\n• Calcium and vitamin D sources\n• Exercise recommendations\n• Understanding your risk score or T-score\n• When to see a doctor\n• Diet and lifestyle tips\n• Treatment options\n\nWhat would you like to know?";
};
