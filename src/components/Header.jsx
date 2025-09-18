import React from 'react';
import { Sun, Moon, Save, Upload, BarChart3 } from 'lucide-react';

const Header = ({ 
  darkMode, 
  setDarkMode, 
  saveAssessment, 
  loadAssessment, 
  setShowResults, 
  saveStatus 
}) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className={`text-6xl font-bold mr-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          Krya Solutions
        </div>
        <div className="w-5 h-5 bg-orange-500 rounded-full animate-pulse"></div>
      </div>
      
      <h1 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
        Cyber Resilience Assessment
      </h1>
      
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full transition-all duration-200 ${
            darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} className="text-white" />}
        </button>
        
        <button 
          onClick={saveAssessment}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all duration-200 flex items-center"
        >
          <Save className="mr-2" size={18} />
          Save {saveStatus}
        </button>
        
        <button 
          onClick={loadAssessment}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-200 flex items-center"
        >
          <Upload className="mr-2" size={18} />
          Load
        </button>
        
        <button 
          onClick={() => setShowResults(true)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-200 flex items-center"
        >
          <BarChart3 className="mr-2" size={18} />
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default Header;