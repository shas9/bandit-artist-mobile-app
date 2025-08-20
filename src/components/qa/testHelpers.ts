
// import type{ TestCategory, TestStats } from './types';

// export const getCategoryStats = (category: TestCategory): TestStats => {
//   const total = category.tests.length;
//   const passed = category.tests.filter(t => t.status === 'pass').length;
//   const failed = category.tests.filter(t => t.status === 'fail').length;
//   const warnings = category.tests.filter(t => t.status === 'warning').length;
//   const pending = category.tests.filter(t => t.status === 'pending').length;
  
//   return { total, passed, failed, warnings, pending };
// };

// export const getStatusColor = (status: string): string => {
//   switch (status) {
//     case 'pass': return 'text-green-600 bg-green-50';
//     case 'fail': return 'text-red-600 bg-red-50';
//     case 'warning': return 'text-yellow-600 bg-yellow-50';
//     case 'pending': return 'text-gray-600 bg-gray-50';
//     default: return 'text-gray-600 bg-gray-50';
//   }
// };

// export const getStatusIcon = (status: string) => {
//   switch (status) {
//     case 'pass': 
//       return <CheckCircle size={16} className="text-green-600" />;
//     case 'fail': 
//       return <XCircle size={16} className="text-red-600" />;
//     case 'warning': 
//       return <AlertTriangle size={16} className="text-yellow-600" />;
//     case 'pending': 
//       return <div className="w-4 h-4 rounded-full bg-gray-300" />;
//     default: 
//       return <div className="w-4 h-4 rounded-full bg-gray-300" />;
//   }
// };

// export const generateTestReport = (testCategories: TestCategory[]): void => {
//   const report = {
//     timestamp: new Date(),
//     totalTests: testCategories.reduce((acc, cat) => acc + cat.tests.length, 0),
//     passedTests: testCategories.reduce((acc, cat) => 
//       acc + cat.tests.filter(t => t.status === 'pass').length, 0
//     ),
//     failedTests: testCategories.reduce((acc, cat) => 
//       acc + cat.tests.filter(t => t.status === 'fail').length, 0
//     ),
//     warningTests: testCategories.reduce((acc, cat) => 
//       acc + cat.tests.filter(t => t.status === 'warning').length, 0
//     ),
//     categories: testCategories
//   };

//   // In a real app, this would download a PDF/HTML report
//   console.log('QA Test Report:', report);
//   return report;
// };