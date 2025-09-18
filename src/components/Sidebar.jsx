import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const Sidebar = ({ responses, assessmentData, results, cardClasses }) => {
  const pieData = [
    { name: 'Risk Addressed', value: results.riskAddressed, color: '#1e40af' },
    { name: 'Risk Accepted', value: results.riskAccepted, color: '#ea580c' }
  ];

  return (
    <div className="lg:col-span-1">
      <div className={`${cardClasses} rounded-2xl p-6 border sticky top-8`}>
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <TrendingUp className="mr-2 text-blue-500" size={24} />
          Live Progress
        </h3>
        
        {/* Mini Pie Chart */}
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={30}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{results.percentage}%</div>
            <div className="text-sm text-gray-500">Security Score</div>
          </div>
        </div>

        {/* Progress by Domain */}
        <div className="space-y-4">
          {Object.entries(assessmentData).map(([domain, data]) => {
            const answered = data.questions.filter((_, index) => responses[`${domain}-${index}`]).length;
            const total = data.questions.length;
            const percentage = Math.round((answered / total) * 100);
            
            return (
              <div key={domain} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold flex items-center">
                    <span className="text-lg mr-2">{data.icon}</span>
                    {domain}
                  </span>
                  <span className="text-xs text-gray-400">{answered}/{total}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`, 
                      backgroundColor: data.color,
                      boxShadow: `0 0 10px ${data.color}40`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-600">
          <div className="text-center">
            <div className="text-lg font-semibold">{results.answeredQuestions}/{results.totalQuestions}</div>
            <div className="text-xs text-gray-400">Total Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;