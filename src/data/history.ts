import type { HistoryEntry } from '@/types';

export const history: HistoryEntry[] = [
  { id: 'hist-1', featureId: 'feat-1', eventType: 'review_completed', description: 'Threat model review completed — all risks mitigated', actor: 'Sarah Chen', timestamp: '2026-02-15T10:00:00Z' },
  { id: 'hist-2', featureId: 'feat-1', eventType: 'mitigation_completed', description: 'MFA enforcement deployed to production', actor: 'Marcus Johnson', timestamp: '2025-12-01T10:00:00Z' },
  { id: 'hist-3', featureId: 'feat-1', eventType: 'mitigation_completed', description: 'Session token rotation implemented', actor: 'Sarah Chen', timestamp: '2026-01-10T10:00:00Z' },
  { id: 'hist-4', featureId: 'feat-1', eventType: 'status_change', description: 'Status changed from In Progress to Complete', actor: 'Sarah Chen', timestamp: '2026-02-15T10:30:00Z' },
  { id: 'hist-5', featureId: 'feat-2', eventType: 'review_completed', description: 'Annual threat model review completed', actor: 'Marcus Johnson', timestamp: '2026-02-10T14:00:00Z' },
  { id: 'hist-6', featureId: 'feat-2', eventType: 'mitigation_completed', description: 'Multi-engine AV scanning pipeline deployed', actor: 'David Kim', timestamp: '2025-11-15T10:00:00Z' },
  { id: 'hist-7', featureId: 'feat-2', eventType: 'mitigation_completed', description: 'Storage quotas and file size limits enforced', actor: 'Marcus Johnson', timestamp: '2025-12-10T10:00:00Z' },
  { id: 'hist-8', featureId: 'feat-3', eventType: 'risk_added', description: 'New risk identified: Predictable share link tokens', actor: 'Lisa Park', timestamp: '2025-10-05T10:00:00Z' },
  { id: 'hist-9', featureId: 'feat-3', eventType: 'risk_added', description: 'New risk identified: Share link grants broader access than intended', actor: 'Lisa Park', timestamp: '2025-10-15T10:00:00Z' },
  { id: 'hist-10', featureId: 'feat-3', eventType: 'diagram_updated', description: 'Updated data flow diagram with permission engine details', actor: 'Lisa Park', timestamp: '2026-01-20T09:00:00Z' },
  { id: 'hist-13', featureId: 'feat-5', eventType: 'review_completed', description: 'Quarterly security review — all controls verified', actor: 'Sarah Chen', timestamp: '2026-02-20T15:00:00Z' },
  { id: 'hist-14', featureId: 'feat-5', eventType: 'mitigation_completed', description: 'RBAC enforcement deployed at API gateway', actor: 'Sarah Chen', timestamp: '2025-10-20T10:00:00Z' },
  { id: 'hist-15', featureId: 'feat-5', eventType: 'mitigation_completed', description: 'Two-admin approval workflow for role elevation', actor: 'Sarah Chen', timestamp: '2025-12-05T10:00:00Z' },
  { id: 'hist-18', featureId: 'feat-7', eventType: 'status_change', description: 'Status changed to Needs Review — last review over 90 days ago', actor: 'System', timestamp: '2026-01-15T00:00:00Z' },
  { id: 'hist-19', featureId: 'feat-7', eventType: 'risk_added', description: 'New risk: Leaked API key used for unauthorized access', actor: 'Marcus Johnson', timestamp: '2025-07-10T10:00:00Z' },
];
