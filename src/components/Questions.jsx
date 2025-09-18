import React from 'react';
import { Settings, ChevronDown, ChevronUp, CheckCircle, BarChart3, Eye } from 'lucide-react';

const Questions = ({ 
  assessmentData, 
  options, 
  responses, 
  expandedSections, 
  handleResponse, 
  toggleSection, 
  results, 
  setShowResults, 
  darkMode, 
  cardClasses 
}) => {
  return (
    <div className="lg:col-span-3">
      <div className={`${cardClasses} rounded-2xl p-8 border`}>
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <Settings className="mr-3 text-purple-500" size={32} />
          Security Domains Assessment
        </h2>
        
        <div className="space-y-6">
          {Object.entries(assessmentData).map(([domain, data]) => (
            <div 
              key={domain} 
              className={`border rounded-xl transition-all duration-300 hover:shadow-lg ${
                darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {/* Domain Header */}
              <button
                onClick={() => toggleSection(domain)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-700/20 rounded-xl transition-all duration-200"
              >
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4 shadow-lg"
                    style={{ backgroundColor: `${data.color}20`, border: `2px solid ${data.color}` }}
                  >
                    {data.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: data.color }}>
                      {domain} Domain
                    </h3>
                    <p className="text-sm text-gray-500">
                      {data.questions.length} security controls
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-4 text-right">
                    <div className="text-sm text-gray-500">Progress</div>
                    <div className="font-semibold" style={{ color: data.color }}>
                      {data.questions.filter((_, index) => responses[`${domain}-${index}`]).length}/{data.questions.length}
                    </div>
                  </div>
                  {expandedSections[domain] ? 
                    <ChevronUp size={24} className="text-gray-400" /> : 
                    <ChevronDown size={24} className="text-gray-400" />
                  }
                </div>
              </button>

              {/* Questions Section */}
              {expandedSections[domain] && (
                <div className="px-6 pb-6 space-y-6">
                  {data.questions.map((question, questionIndex) => {
                    const questionId = `${domain}-${questionIndex}`;
                    const currentResponse = responses[questionId];
                    
                    return (
                      <div 
                        key={questionIndex} 
                        className={`p-6 rounded-xl border transition-all duration-200 ${
                          darkMode ? 'border-gray-600 bg-gray-700/20' : 'border-gray-200 bg-gray-50/50'
                        } hover:shadow-md`}
                      >
                        <h4 className="text-lg font-semibold mb-4 leading-relaxed flex items-start">
                          <span 
                            className="inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center mr-3 mt-1 flex-shrink-0"
                            style={{ backgroundColor: data.color }}
                          >
                            {questionIndex + 1}
                          </span>
                          {question}
                        </h4>
                        
                        <div className="ml-11 space-y-3">
                          {options.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleResponse(questionId, option.value)}
                              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-[1.02] ${
                                currentResponse === option.value
                                  ? 'border-blue-500 bg-blue-500/10 shadow-lg transform scale-[1.02]'
                                  : `border-gray-500 hover:border-gray-400 ${darkMode ? 'hover:bg-gray-600/20' : 'hover:bg-gray-100'}`
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div 
                                    className="w-4 h-4 rounded-full mr-4 shadow-sm"
                                    style={{ backgroundColor: option.color }}
                                  ></div>
                                  <div>
                                    <span className="font-semibold text-base">{option.label}</span>
                                    <div className="text-sm text-gray-500 mt-1">
                                      Implementation Level: {option.score === 0 ? 'None' : option.score === 50 ? 'Basic' : option.score === 100 ? 'Advanced' : 'Next-Gen'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        
                        {currentResponse && (
                          <div className="ml-11 mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <div className="flex items-center text-sm">
                              <CheckCircle size={16} className="text-green-500 mr-2" />
                              <span className="text-green-600 font-medium">
                                Response recorded: {options.find(opt => opt.value === currentResponse)?.label}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-12 pt-6 border-t border-gray-600 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <strong>{results.answeredQuestions}</strong> of <strong>{results.totalQuestions}</strong> questions completed
            </div>
            <div className="w-40 bg-gray-600 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(results.answeredQuestions / results.totalQuestions) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm font-semibold text-blue-400">
              {Math.round((results.answeredQuestions / results.totalQuestions) * 100)}%
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setShowResults(true)}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={results.answeredQuestions === 0}
            >
              <BarChart3 className="mr-2" size={20} />
              View Results Dashboard
            </button>
          </div>
        </div>

        {/* Floating Action Button */}
        {results.answeredQuestions > 0 && (
          <div className="fixed bottom-8 right-8">
            <button 
              onClick={() => setShowResults(true)}
              className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110"
            >
              <Eye size={28} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;