import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Sun, Moon, Eye, Save, CheckCircle, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { getDomainProgress } from '../utils/calculations';
import ExportPDF from './ExportPDF';

const Dashboard = ({ 
  results, 
  responses, 
  assessmentData, 
  options, 
  darkMode, 
  setDarkMode, 
  setShowResults, 
  saveAssessment, 
  themeClasses, 
  cardClasses 
}) => {
  const domainProgress = getDomainProgress(assessmentData, responses, options);
  
  const pieData = [
    { name: 'Risk Addressed', value: results.riskAddressed, color: '#1e40af' },
    { name: 'Risk Accepted', value: results.riskAccepted, color: '#ea580c' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={16}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className={`text-5xl font-bold mr-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              krya
            </div>
            <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-6">
            Assessment Results Dashboard
          </h1>
          <div className="text-2xl mb-4">
            Security Maturity Score: <span className="text-green-400 font-bold text-4xl">{results.percentage}%</span>
          </div>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full transition-all duration-200 ${darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} className="text-white" />}
            </button>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8 mb-8">
          {/* Interactive Pie Chart */}
          <div className={`xl:col-span-2 ${cardClasses} rounded-2xl p-8 border`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold flex items-center">
                <PieChart className="mr-3 text-blue-500" size={32} />
                Risk Assessment Overview
              </h3>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Questions</div>
                <div className="text-2xl font-bold">{results.answeredQuestions}/{results.totalQuestions}</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={140}
                    innerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={darkMode ? "#1f2937" : "#ffffff"}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff', 
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-6">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-transparent to-gray-100/20">
                    <div className="flex items-center">
                      <div 
                        className="w-6 h-6 rounded-full mr-4 shadow-lg"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-lg font-semibold">{item.name}</span>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: item.color }}>
                      {item.value}%
                    </span>
                  </div>
                ))}
                
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100/50'} border-l-4 border-blue-500`}>
                  <div className="text-sm text-gray-500 mb-1">Risk Level Assessment</div>
                  <div className={`text-xl font-bold ${
                    results.percentage >= 80 ? 'text-green-500' :
                    results.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {results.percentage >= 80 ? 'LOW RISK' :
                     results.percentage >= 60 ? 'MEDIUM RISK' : 'HIGH RISK'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-6">
            <div className={`${cardClasses} rounded-2xl p-6 border hover:scale-105 transition-transform duration-200`}>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/20 rounded-full mr-4">
                  <CheckCircle className="text-green-400" size={28} />
                </div>
                <h4 className="text-xl font-semibold">Completion Rate</h4>
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                {Math.round((results.answeredQuestions / results.totalQuestions) * 100)}%
              </div>
              <p className="text-gray-500">Questions Completed</p>
              <div className="w-full bg-gray-300 rounded-full h-3 mt-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(results.answeredQuestions / results.totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className={`${cardClasses} rounded-2xl p-6 border hover:scale-105 transition-transform duration-200`}>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                  <TrendingUp className="text-purple-400" size={28} />
                </div>
                <h4 className="text-xl font-semibold">Total Score</h4>
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {results.totalScore}
              </div>
              <p className="text-gray-500">Points Earned</p>
              <div className="text-sm text-gray-400 mt-2">
                Max Possible: {results.answeredQuestions * 120}
              </div>
            </div>

            <div className={`${cardClasses} rounded-2xl p-6 border hover:scale-105 transition-transform duration-200`}>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-500/20 rounded-full mr-4">
                  <Shield className="text-orange-400" size={28} />
                </div>
                <h4 className="text-xl font-semibold">Security Grade</h4>
              </div>
              <div className={`text-4xl font-bold mb-2 ${
                results.percentage >= 90 ? 'text-green-400' :
                results.percentage >= 80 ? 'text-blue-400' :
                results.percentage >= 70 ? 'text-yellow-400' :
                results.percentage >= 60 ? 'text-orange-400' : 'text-red-400'
              }`}>
                {results.percentage >= 90 ? 'A+' :
                 results.percentage >= 80 ? 'A' :
                 results.percentage >= 70 ? 'B' :
                 results.percentage >= 60 ? 'C' : 'D'}
              </div>
              <p className="text-gray-500">Overall Grade</p>
            </div>
          </div>
        </div>

        {/* Domain Progress Chart */}
        <div className={`${cardClasses} rounded-2xl p-8 border mb-8`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold flex items-center">
              <BarChart3 className="mr-3 text-green-500" size={32} />
              Domain-wise Security Maturity
            </h3>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={domainProgress} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 14 }}
              />
              <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => setShowResults(false)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
          >
            <Eye className="mr-3" size={22} />
            Return to Assessment
          </button>
          <ExportPDF results={results} domainProgress={domainProgress} />
          <button 
            onClick={saveAssessment}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
          >
            <Save className="mr-3" size={22} />
            Save Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;