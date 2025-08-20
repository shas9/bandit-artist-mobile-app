export interface TestResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  message: string;
  details?: string;
  screenshot?: string;
  timestamp?: Date;
}

import { LucideIcon } from 'lucide-react';

export interface TestCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  tests: TestResult[];
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface TestStats {
  total: number;
  passed: number;
  failed: number;
  warnings: number;
  pending: number;
}

export interface OverallStats {
  totalTests: number;
  totalPassed: number;
  totalFailed: number;
  totalWarnings: number;
}