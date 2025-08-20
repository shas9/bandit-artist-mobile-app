import { useState } from 'react';
import { 
  Play, 
  Pause, 
  Download,
  FileCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useApp } from './AppContext';
import { toast } from 'sonner';

// Import our extracted modules
// Import our extracted modules
import type { TestCategory, TestResult, OverallStats } from './qa/types';
import { createTestCategories } from './qa/testCategories';
import { executeTest } from './qa/testExecution';
// import { getCategoryStats, getStatusColor, getStatusIcon, generateTestReport } from './qa/testHelpers';

export function QATestingScreen() {
  const { setCurrentScreen, trackEvent } = useApp();
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('core-stability');
  const [testCategories, setTestCategories] = useState<TestCategory[]>(createTestCategories());

  const runAutomatedTests = async () => {
    setIsRunning(true);
    setProgress(0);
    trackEvent('qa_testing_started');

    const allTests = testCategories.flatMap(category => 
      category.tests.map(test => ({ ...test, categoryId: category.id }))
    );

    for (let i = 0; i < allTests.length; i++) {
      const test = allTests[i];
      setCurrentTest(test.name);
      
      // Simulate test execution with realistic results
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const testResult = await executeTest(test);
      
      setTestCategories(prev => prev.map(category => ({
        ...category,
        tests: category.tests.map(t => 
          t.id === test.id ? { ...t, ...testResult, timestamp: new Date() } : t
        )
      })));
      
      setProgress((i + 1) / allTests.length * 100);
    }

    setCurrentTest(null);
    setIsRunning(false);
    toast.success('QA Testing completed! Check results for any issues.');
    trackEvent('qa_testing_completed');
  };

  const handleGenerateReport = () => {
    // generateTestReport(testCategories);
    toast.success('Test report generated and logged to console');
    trackEvent('qa_report_generated', { 
      totalTests: overallStats.totalTests,
      passRate: (overallStats.totalPassed / overallStats.totalTests * 100).toFixed(1)
    });
  };

  const overallStats: OverallStats = {
    totalTests: testCategories.reduce((acc, cat) => acc + cat.tests.length, 0),
    totalPassed: testCategories.reduce((acc, cat) => 
      acc + cat.tests.filter(t => t.status === 'pass').length, 0
    ),
    totalFailed: testCategories.reduce((acc, cat) => 
      acc + cat.tests.filter(t => t.status === 'fail').length, 0
    ),
    totalWarnings: testCategories.reduce((acc, cat) => 
      acc + cat.tests.filter(t => t.status === 'warning').length, 0
    )
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-bandit text-white px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">QA Testing Suite</h1>
            <p className="text-white/80">Pre-Launch App Store Readiness</p>
          </div>
          <Button
            onClick={() => setCurrentScreen('home')}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            ✕
          </Button>
        </div>

        {/* Overall Progress */}
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Testing Progress</h3>
            <span className="text-sm text-white/80">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-3">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          {currentTest && (
            <p className="text-sm text-white/80">Currently testing: {currentTest}</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">{overallStats.totalTests}</div>
            <div className="text-xs text-white/80">Total Tests</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-100">{overallStats.totalPassed}</div>
            <div className="text-xs text-white/80">Passed</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-100">{overallStats.totalWarnings}</div>
            <div className="text-xs text-white/80">Warnings</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-red-100">{overallStats.totalFailed}</div>
            <div className="text-xs text-white/80">Failed</div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 pb-6">
        {/* Action Buttons */}
        <Card className="mb-6 border-bandit-teal/20">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Button
                onClick={runAutomatedTests}
                disabled={isRunning}
                className="flex-1 bg-bandit-teal hover:bg-bandit-teal/90"
              >
                {isRunning ? (
                  <>
                    <Pause size={16} className="mr-2" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-2" />
                    Run All Tests
                  </>
                )}
              </Button>
              <Button
                onClick={handleGenerateReport}
                variant="outline"
                className="border-bandit-teal text-bandit-teal"
                disabled={overallStats.totalPassed === 0}
              >
                <Download size={16} className="mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          {/* <TabsList className="w-full mb-6 grid grid-cols-2 gap-1 h-auto p-1">
            {testCategories.slice(0, 10).map((category) => {
              const stats = getCategoryStats(category);
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-bandit-teal data-[state=active]:text-white flex flex-col gap-1 h-auto py-2 text-xs"
                >
                  <category.icon size={16} />
                  <span className="truncate">{category.name.split(' ')[0]}</span>
                  <div className="flex gap-1">
                    {stats.passed > 0 && (
                      <Badge className="h-4 text-xs px-1 bg-green-100 text-green-700">
                        {stats.passed}
                      </Badge>
                    )}
                    {stats.failed > 0 && (
                      <Badge className="h-4 text-xs px-1 bg-red-100 text-red-700">
                        {stats.failed}
                      </Badge>
                    )}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList> */}

          {testCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <category.icon size={20} className="mr-2 text-bandit-teal" />
                    {category.name}
                    <Badge 
                      className={`ml-auto ${
                        category.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        category.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        category.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.priority} priority
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.tests.map((test) => (
                      <AccordionItem key={test.id} value={test.id}>
                        {/* <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3 flex-1">
                            {getStatusIcon(test.status)}
                            <span className="flex-1">{test.name}</span>
                            <Badge className={`text-xs ${getStatusColor(test.status)}`}>
                              {test.status}
                            </Badge>
                          </div>
                        </AccordionTrigger> */}
                        <AccordionContent>
                          <div className="pl-7 space-y-2">
                            <p className="text-sm text-gray-700">{test.message}</p>
                            {test.details && (
                              <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                                <strong>Details:</strong> {test.details}
                              </p>
                            )}
                            {test.timestamp && (
                              <p className="text-xs text-gray-400">
                                Tested: {test.timestamp.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Summary Report */}
        {overallStats.totalPassed > 0 && (
          <Card className="mt-6 border-bandit-teal/20">
            <CardHeader>
              <CardTitle className="text-bandit-teal flex items-center">
                <FileCheck size={20} className="mr-2" />
                Test Summary - Bandit v1.0.0
              </CardTitle>
              <p className="text-sm text-gray-600">
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Pass Rate:</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((overallStats.totalPassed / overallStats.totalTests) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Issues:</span>
                  <span className={`font-semibold ${overallStats.totalFailed > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {overallStats.totalFailed} {overallStats.totalFailed === 0 ? '✓' : '⚠️'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>App Store Ready:</span>
                  <span className={`font-semibold ${overallStats.totalFailed === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {overallStats.totalFailed === 0 ? 'YES ✅' : 'Needs Work 🔧'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}