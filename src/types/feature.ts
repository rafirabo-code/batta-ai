export type ThreatModelStatus =
  | 'not_started'
  | 'in_progress'
  | 'complete'
  | 'stale';

export type ProductArea =
  | 'Core Platform'
  | 'User Management'
  | 'File Operations'
  | 'Sharing & Collaboration'
  | 'Admin & Compliance';

export interface Feature {
  id: string;
  name: string;
  description: string;
  productArea: ProductArea;
  status: ThreatModelStatus;
  owner: string;
  lastReviewedAt: string | null;
  createdAt: string;
  riskIds: string[];
  diagramId: string;
}
