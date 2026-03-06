import type { Risk } from '@/types';

export const risks: Risk[] = [
  // === Feature 1: User Authentication & SSO ===
  {
    id: 'risk-1', featureId: 'feat-1', category: 'spoofing',
    title: 'Credential stuffing via leaked password databases',
    description: 'Attackers use credentials from breached databases to gain unauthorized access to user accounts. High-volume automated login attempts can compromise accounts with reused passwords.',
    severity: 'high', exploitability: 'proven', status: 'mitigated',
    affectedComponent: 'auth-service', mitigationIds: ['mit-1', 'mit-2'],
    createdAt: '2025-09-05T10:00:00Z', updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: 'risk-2', featureId: 'feat-1', category: 'spoofing',
    title: 'Session hijacking through token theft',
    description: 'An attacker intercepts or steals session tokens via XSS, network sniffing, or malicious browser extensions to impersonate authenticated users.',
    severity: 'critical', exploitability: 'likely', status: 'mitigated',
    affectedComponent: 'session-manager', mitigationIds: ['mit-3', 'mit-4'],
    createdAt: '2025-09-05T10:00:00Z', updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: 'risk-3', featureId: 'feat-1', category: 'repudiation',
    title: 'Login attempts not logged with sufficient detail',
    description: 'Without comprehensive login audit logs including IP, device, and geolocation, malicious access cannot be traced or denied.',
    severity: 'medium', exploitability: 'possible', status: 'mitigated',
    affectedComponent: 'auth-service', mitigationIds: ['mit-5'],
    createdAt: '2025-09-10T10:00:00Z', updatedAt: '2026-01-20T10:00:00Z',
  },

  // === Feature 2: File Upload & Storage ===
  {
    id: 'risk-4', featureId: 'feat-2', category: 'tampering',
    title: 'Malware upload bypassing antivirus scanning',
    description: 'Specially crafted files may evade antivirus detection, allowing malware to be stored and subsequently downloaded by other users.',
    severity: 'critical', exploitability: 'likely', status: 'mitigated',
    affectedComponent: 'upload-service', mitigationIds: ['mit-6', 'mit-7'],
    createdAt: '2025-08-20T10:00:00Z', updatedAt: '2026-02-10T14:00:00Z',
  },
  {
    id: 'risk-5', featureId: 'feat-2', category: 'information_disclosure',
    title: 'File metadata leakage in API responses',
    description: 'API responses may expose internal file paths, storage bucket names, or other metadata that could reveal infrastructure details to attackers.',
    severity: 'medium', exploitability: 'possible', status: 'mitigated',
    affectedComponent: 'file-api', mitigationIds: ['mit-8'],
    createdAt: '2025-08-25T10:00:00Z', updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'risk-6', featureId: 'feat-2', category: 'denial_of_service',
    title: 'Storage exhaustion via unlimited large file uploads',
    description: 'Without proper quotas and file size limits, an attacker can exhaust storage capacity, causing service degradation for all tenants.',
    severity: 'high', exploitability: 'proven', status: 'mitigated',
    affectedComponent: 'upload-service', mitigationIds: ['mit-9'],
    createdAt: '2025-09-01T10:00:00Z', updatedAt: '2026-02-10T14:00:00Z',
  },

  // === Feature 3: File Sharing & Link Generation ===
  {
    id: 'risk-7', featureId: 'feat-3', category: 'information_disclosure',
    title: 'Predictable share link tokens allow enumeration',
    description: 'If share link tokens are sequential or based on predictable patterns, attackers can enumerate valid links and access shared files without authorization.',
    severity: 'critical', exploitability: 'likely', status: 'open',
    affectedComponent: 'share-service', mitigationIds: ['mit-10'],
    createdAt: '2025-10-05T10:00:00Z', updatedAt: '2026-01-20T09:00:00Z',
  },
  {
    id: 'risk-8', featureId: 'feat-3', category: 'spoofing',
    title: 'Link recipient impersonation on password-free shares',
    description: 'Without recipient verification, anyone with the share link URL can access shared files, enabling unauthorized access if the link is leaked.',
    severity: 'high', exploitability: 'likely', status: 'open',
    affectedComponent: 'share-service', mitigationIds: ['mit-11'],
    createdAt: '2025-10-10T10:00:00Z', updatedAt: '2026-01-20T09:00:00Z',
  },
  {
    id: 'risk-9', featureId: 'feat-3', category: 'elevation_of_privilege',
    title: 'Share link grants broader access than intended',
    description: 'Misconfigured share permissions may grant edit or admin access when only view access was intended, allowing recipients to modify or delete shared files.',
    severity: 'high', exploitability: 'possible', status: 'open',
    affectedComponent: 'permission-engine', mitigationIds: ['mit-12'],
    createdAt: '2025-10-15T10:00:00Z', updatedAt: '2026-01-20T09:00:00Z',
  },

  // === Feature 5: Admin Dashboard ===
  {
    id: 'risk-13', featureId: 'feat-5', category: 'elevation_of_privilege',
    title: 'Regular user accessing admin API endpoints',
    description: 'Insufficient authorization checks on admin endpoints allow non-admin users to perform administrative actions by directly calling the API.',
    severity: 'critical', exploitability: 'likely', status: 'mitigated',
    affectedComponent: 'admin-api', mitigationIds: ['mit-16', 'mit-17'],
    createdAt: '2025-08-10T10:00:00Z', updatedAt: '2026-02-20T15:00:00Z',
  },
  {
    id: 'risk-14', featureId: 'feat-5', category: 'spoofing',
    title: 'Admin account impersonation via privilege escalation',
    description: 'An attacker exploits role assignment flaws to elevate a regular account to admin status, gaining full administrative control.',
    severity: 'critical', exploitability: 'possible', status: 'mitigated',
    affectedComponent: 'admin-api', mitigationIds: ['mit-18'],
    createdAt: '2025-08-15T10:00:00Z', updatedAt: '2026-02-20T15:00:00Z',
  },
  {
    id: 'risk-15', featureId: 'feat-5', category: 'tampering',
    title: 'Modification of audit logs by admin users',
    description: 'Admin users could modify or delete audit logs to cover unauthorized actions, undermining the integrity of the audit trail.',
    severity: 'high', exploitability: 'possible', status: 'mitigated',
    affectedComponent: 'audit-log-store', mitigationIds: ['mit-19'],
    createdAt: '2025-08-20T10:00:00Z', updatedAt: '2026-02-20T15:00:00Z',
  },

  // === Feature 7: API Gateway ===
  {
    id: 'risk-19', featureId: 'feat-7', category: 'spoofing',
    title: 'Leaked API key used for unauthorized access',
    description: 'API keys committed to source code or exposed in client-side code allow attackers to authenticate as legitimate integrations.',
    severity: 'critical', exploitability: 'proven', status: 'open',
    affectedComponent: 'api-gateway', mitigationIds: ['mit-23'],
    createdAt: '2025-07-10T10:00:00Z', updatedAt: '2025-10-15T09:00:00Z',
  },
  {
    id: 'risk-20', featureId: 'feat-7', category: 'elevation_of_privilege',
    title: 'OAuth scope escalation in third-party integrations',
    description: 'Third-party apps request broader OAuth scopes than necessary, and insufficient scope validation allows them to access resources beyond their authorized scope.',
    severity: 'high', exploitability: 'likely', status: 'open',
    affectedComponent: 'oauth-server', mitigationIds: ['mit-24'],
    createdAt: '2025-07-15T10:00:00Z', updatedAt: '2025-10-15T09:00:00Z',
  },
  {
    id: 'risk-21', featureId: 'feat-7', category: 'denial_of_service',
    title: 'API rate limit bypass through distributed requests',
    description: 'Attackers use distributed IP addresses or multiple API keys to bypass per-client rate limits, overwhelming the API with excessive requests.',
    severity: 'high', exploitability: 'likely', status: 'open',
    affectedComponent: 'api-gateway', mitigationIds: ['mit-25'],
    createdAt: '2025-07-20T10:00:00Z', updatedAt: '2025-10-15T09:00:00Z',
  },
];
