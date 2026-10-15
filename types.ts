import React from 'react';

export interface RefImage {
  id: string;
  name: string;
  component: React.ComponentType;
  defaultImg: string;
  userImg: string | null;
}

export interface ClassificationStep {
  id: number;
  question: string;
  options: {
    label: string;
    next?: number;
    end?: boolean;
    result?: string;
    value: string;
  }[];
  info: string;
}

export interface DiagnosisResult {
  title: string;
  desc: string;
  type: 'success' | 'warning' | 'danger' | 'critical';
}

export interface WmiGrade {
  grade: string;
  desc: string;
  icon: React.ComponentType<any>;
}

export interface PHVDReportData {
  pma: number;
  date: string;
  measurements: {
    viLeft: number;
    viRight: number;
    ahwLeft: number;
    ahwRight: number;
    todLeft: number;
    todRight: number;
  };
  riskZone: string;
  clinicalSigns: string[];
}