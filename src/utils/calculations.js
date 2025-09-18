export const calculateResults = (responses, assessmentData, options) => {
  const totalQuestions = Object.values(assessmentData).reduce((sum, domain) => sum + domain.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const totalScore = Object.values(responses).reduce((sum, response) => {
    const option = options.find(opt => opt.value === response);
    return sum + (option?.score || 0);
  }, 0);
  
  const maxScore = answeredQuestions * 100;
  const percentage = answeredQuestions > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  
  const riskAddressed = Math.min(percentage, 100);
  const riskAccepted = 100 - riskAddressed;
  
  return { totalQuestions, answeredQuestions, percentage, riskAddressed, riskAccepted, totalScore };
};

export const getDomainProgress = (assessmentData, responses, options) => {
  return Object.entries(assessmentData).map(([domain, data]) => {
    const domainQuestions = data.questions.length;
    const answered = data.questions.filter((_, index) => responses[`${domain}-${index}`]).length;
    const domainScore = data.questions.reduce((sum, _, index) => {
      const response = responses[`${domain}-${index}`];
      const option = options.find(opt => opt.value === response);
      return sum + (option?.score || 0);
    }, 0);
    
    return {
      name: domain,
      completed: answered,
      total: domainQuestions,
      percentage: Math.round((answered / domainQuestions) * 100),
      score: Math.round((domainScore / (domainQuestions * 100)) * 100) || 0,
      color: data.color
    };
  });
};