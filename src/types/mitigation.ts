export type MitigationStatus = 'implemented' | 'suggested' | 'in_progress' | 'declined';

export interface MitigationEvidence {
  type: 'pr' | 'config' | 'documentation' | 'test';
  url: string;
  description: string;
}

export interface MitigationChecklistItem {
  id: string;
  question: string;
  answer: boolean | null;
  notes: string;
}

export interface Mitigation {
  id: string;
  riskId: string;
  title: string;
  description: string;
  status: MitigationStatus;
  priority: 'required' | 'recommended' | 'optional';
  evidence: MitigationEvidence[];
  checklist: MitigationChecklistItem[];
  assignee: string | null;
  dueDate: string | null;
  completedAt: string | null;
}
