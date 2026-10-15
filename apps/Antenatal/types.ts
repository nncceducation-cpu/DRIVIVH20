export interface TableRow {
  [key: string]: string;
}

export interface ReferenceTableData {
  headers: string[];
  rows: TableRow[];
}

export interface CounsellingFactor {
  worsen: string[];
  improve: string[];
}

export interface CareComparisonRow {
  feature: string;
  intensive: string;
  palliative: string;
}

export interface ConsultCategory {
  id: string;
  title: string;
  icon: string;
  referenceData: ReferenceTableData;
  counsellingFactors?: CounsellingFactor;
  careComparison?: CareComparisonRow[];
  templateName: string;
  templateContent: string;
  color: string;
  externalUrl?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// Risk Calculator Types
export type StatType = 'survival' | 'morbidity' | 'neutral';

export interface RiskStat {
  label: string;
  value: number; // 0-100
  type: StatType;
  description?: string;
  color?: string; // Optional custom color override
}

export interface RiskProfile {
  id: string;
  name: string;
  stats: RiskStat[];
  managementPath: string[];
}

export interface RiskCategoryData {
  categoryId: string;
  isGestational: boolean;
  profiles: { [key: string]: RiskProfile }; // Key is GA number or Diagnosis ID
}