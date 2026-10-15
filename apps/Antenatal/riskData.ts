import { RiskCategoryData } from './types';

export const RISK_DATA: { [key: string]: RiskCategoryData } = {
  prematurity: {
    categoryId: 'prematurity',
    isGestational: true,
    profiles: {
      '22': {
        id: '22',
        name: '22 Weeks Gestation',
        stats: [
          { label: 'Survival (Active Care)', value: 25, type: 'survival', description: 'Range: 19-31%' },
          { label: 'Moderate-Severe NDD', value: 42, type: 'morbidity', description: 'International Data' }
        ],
        managementPath: ['Palliative Care Recommendation', 'Resuscitation NOT offered at Level 2', 'Imminent delivery protocol']
      },
      '23': {
        id: '23',
        name: '23 Weeks Gestation',
        stats: [
          { label: 'Survival (Active Care)', value: 45, type: 'survival', description: 'Range: 42-48%' },
          { label: 'Significant NDD', value: 40, type: 'morbidity' },
          { label: 'Milder NDD', value: 40, type: 'neutral' }
        ],
        managementPath: ['Shared decision making', 'Grey Zone discussions', 'NICU attendance']
      },
      '24': {
        id: '24',
        name: '24 Weeks Gestation',
        stats: [
          { label: 'Survival (Active Care)', value: 69, type: 'survival', description: 'Range: 67-71%' },
          { label: 'Significant NDD', value: 20, type: 'morbidity' },
          { label: 'Milder NDD', value: 30, type: 'neutral' }
        ],
        managementPath: ['Active management standard', 'Intubation/CPAP', 'Thermal care']
      },
      '25': {
        id: '25',
        name: '25 Weeks Gestation',
        stats: [
          { label: 'Survival (Active Care)', value: 80, type: 'survival', description: 'Range: 78-82%' },
          { label: 'Significant NDD', value: 20, type: 'morbidity' },
          { label: 'Milder NDD', value: 30, type: 'neutral' }
        ],
        managementPath: ['Active resus standard', 'Discussion on chronic complications']
      },
      '26': {
        id: '26',
        name: '26 Weeks Gestation',
        stats: [
          { label: 'Survival (Active Care)', value: 90, type: 'survival' },
          { label: 'Significant NDD', value: 20, type: 'morbidity' }
        ],
        managementPath: ['Full resuscitation is routine', 'Meet and greet']
      },
      '27': {
        id: '27',
        name: '27 Weeks Gestation',
        stats: [
          { label: 'Survival (Active Care)', value: 95, type: 'survival' },
          { label: 'Significant NDD', value: 10, type: 'morbidity' }
        ],
        managementPath: ['Routine NICU care', 'High survival chance']
      },
      '28': {
        id: '28',
        name: '28 Weeks Gestation',
        stats: [
          { label: 'Survival (Active Care)', value: 97, type: 'survival' },
          { label: 'Significant NDD', value: 10, type: 'morbidity' }
        ],
        managementPath: ['Excellent long term outlook']
      }
    }
  },
  neurology: {
    categoryId: 'neurology',
    isGestational: false,
    profiles: {
      'spina_bifida': {
        id: 'spina_bifida',
        name: 'Spina Bifida (Myelomeningocele)',
        stats: [
          { label: 'Survival', value: 99, type: 'survival' },
          { label: 'Hydrocephalus Risk', value: 90, type: 'morbidity' }
        ],
        managementPath: ['C-Section delivery', 'Cover defect immediately', 'Surgery <72hrs']
      }
    }
  },
  cardiology: {
    categoryId: 'cardiology',
    isGestational: false,
    profiles: {
      'tga': {
        id: 'tga',
        name: 'TGA (Transposition)',
        stats: [
          { label: 'Survival (Post-Switch)', value: 98, type: 'survival' }
        ],
        managementPath: ['PGE1 Infusion', 'Arterial Switch Op']
      }
    }
  },
  pulmonology: {
    categoryId: 'pulmonology',
    isGestational: false,
    profiles: {
      'cdh': {
        id: 'cdh',
        name: 'CDH (Congenital Diaphragmatic Hernia)',
        stats: [
          { label: 'Overall Survival', value: 65, type: 'survival' }
        ],
        managementPath: ['Immediate Intubation', 'Gentle Ventilation']
      }
    }
  },
  gastroenterology: {
    categoryId: 'gastroenterology',
    isGestational: false,
    profiles: {
      'gastroschisis': {
        id: 'gastroschisis',
        name: 'Gastroschisis',
        stats: [
          { label: 'Survival', value: 95, type: 'survival' }
        ],
        managementPath: ['Bowel bag/Silo', 'Fluid resuscitation']
      }
    }
  }
};