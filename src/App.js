import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Questions from './components/Questions';
import Dashboard from './components/Dashboard';
import { assessmentData, options } from './data/assessmentData';
import { calculateResults } from './utils/calculations';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [responses, setResponses] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const results = calculateResults(responses, assessmentData, options);

  const saveAssessment = () => {
    const data = {
      responses,
      timestamp: new Date().toISOString(),
      results: results
    };
    localStorage.setItem('cyberAssessment', JSON.stringify(data));
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const loadAssessment = () => {
    const saved = localStorage.getItem('cyberAssessment');
    if (saved) {
      const data = JSON.parse(saved);
      setResponses(data.responses || {});
      setSaveStatus('Loaded!');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const themeClasses = darkMode 
    ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white'
    : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900';

  const cardClasses = darkMode
    ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700'
    : 'bg-white/70 backdrop-blur-sm border-gray-200';

  if (showResults) {
    return (
      <Dashboard 
        results={results}
        responses={responses}
        assessmentData={assessmentData}
        options={options}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowResults={setShowResults}
        saveAssessment={saveAssessment}
        themeClasses={themeClasses}
        cardClasses={cardClasses}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        saveAssessment={saveAssessment}
        loadAssessment={loadAssessment}
        setShowResults={setShowResults}
        saveStatus={saveStatus}
      />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <Sidebar 
            responses={responses}
            assessmentData={assessmentData}
            results={results}
            cardClasses={cardClasses}
          />
          
          <Questions 
            assessmentData={assessmentData}
            options={options}
            responses={responses}
            expandedSections={expandedSections}
            handleResponse={handleResponse}
            toggleSection={toggleSection}
            results={results}
            setShowResults={setShowResults}
            darkMode={darkMode}
            cardClasses={cardClasses}
          />
        </div>
      </div>
    </div>
  );
};

export default App;