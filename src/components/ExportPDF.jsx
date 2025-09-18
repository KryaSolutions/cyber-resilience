import React from 'react';
import { Download } from 'lucide-react';

const ExportPDF = ({ results, domainProgress }) => {
  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Cyber Resilience Assessment Report - Krya</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
            .logo { font-size: 28px; font-weight: bold; color: #3b82f6; margin-bottom: 10px; }
            .title { font-size: 24px; margin-bottom: 15px; color: #1f2937; }
            .score { font-size: 48px; font-weight: bold; color: #10b981; margin: 20px 0; }
            .date { color: #6b7280; font-size: 14px; }
            .section { margin: 30px 0; }
            .section-title { font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 10px; }
            .domain { margin: 15px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }
            .domain-header { font-weight: bold; color: #374151; margin-bottom: 8px; }
            .progress-bar { width: 100%; height: 20px; background: #e5e7eb; border-radius: 10px; overflow: hidden; margin: 10px 0; }
            .progress-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6); transition: width 0.3s; }
            .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
            .metric { text-align: center; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
            .metric-value { font-size: 24px; font-weight: bold; color: #3b82f6; }
            .metric-label { font-size: 12px; color: #6b7280; }
            .risk-level { padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; margin: 20px 0; }
            .low-risk { background: #dcfce7; color: #166534; }
            .medium-risk { background: #fef3c7; color: #92400e; }
            .high-risk { background: #fecaca; color: #991b1b; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">krya.</div>
            <h1 class="title">Cyber Resilience Assessment Report</h1>
            <div class="score">Overall Score: ${results.percentage}%</div>
            <p class="date">Assessment completed on ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="metrics">
            <div class="metric">
              <div class="metric-value">${results.answeredQuestions}/${results.totalQuestions}</div>
              <div class="metric-label">Questions Completed</div>
            </div>
            <div class="metric">
              <div class="metric-value">${results.totalScore}</div>
              <div class="metric-label">Total Points</div>
            </div>
            <div class="metric">
              <div class="metric-value">${results.percentage >= 90 ? 'A+' : results.percentage >= 80 ? 'A' : results.percentage >= 70 ? 'B' : results.percentage >= 60 ? 'C' : 'D'}</div>
              <div class="metric-label">Security Grade</div>
            </div>
          </div>

          <div class="risk-level ${results.percentage >= 80 ? 'low-risk' : results.percentage >= 60 ? 'medium-risk' : 'high-risk'}">
            Risk Level: ${results.percentage >= 80 ? 'LOW RISK' : results.percentage >= 60 ? 'MEDIUM RISK' : 'HIGH RISK'}
          </div>

          <div class="section">
            <h2 class="section-title">Domain-wise Assessment Results</h2>
            ${domainProgress.map(domain => `
              <div class="domain">
                <div class="domain-header">${domain.name} Domain</div>
                <p>Progress: ${domain.completed}/${domain.total} questions completed (${domain.percentage}%)</p>
                <p>Domain Score: ${domain.score}%</p>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${domain.score}%"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <h2 class="section-title">Risk Distribution</h2>
            <p><strong>Risk Addressed:</strong> ${results.riskAddressed}%</p>
            <p><strong>Risk Accepted:</strong> ${results.riskAccepted}%</p>
            <div class="progress-bar">
              <div style="width: ${results.riskAddressed}%; height: 100%; background: #1e40af; float: left;"></div>
              <div style="width: ${results.riskAccepted}%; height: 100%; background: #ea580c; float: left;"></div>
            </div>
          </div>

          <div class="section">
            <p style="text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 40px;">
              This report was generated by Krya Cyber Resilience Assessment Tool<br>
              Report generated on ${new Date().toLocaleString()}
            </p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button 
      onClick={exportToPDF}
      className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
    >
      <Download className="mr-3" size={22} />
      Export PDF Report
    </button>
  );
};

export default ExportPDF;