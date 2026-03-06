export type HistoryEventType =
  | 'status_change'
  | 'risk_added'
  | 'risk_updated'
  | 'mitigation_completed'
  | 'review_completed'
  | 'diagram_updated';

export interface HistoryEntry {
  id: string;
  featureId: string;
  eventType: HistoryEventType;
  description: string;
  actor: string;
  timestamp: string;
  metadata?: Record<string, string>;
}
