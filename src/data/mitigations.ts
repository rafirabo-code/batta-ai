import type { Mitigation } from '@/types';

export const mitigations: Mitigation[] = [
  // === Feature 1: User Auth ===
  {
    id: 'mit-1', riskId: 'risk-1', title: 'Enforce MFA for all user accounts',
    description: 'Require multi-factor authentication using TOTP or WebAuthn for all user logins.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/142', description: 'Added MFA enforcement middleware' }],
    checklist: [
      { id: 'cl-1', question: 'Is MFA enforced at the authentication middleware level?', answer: true, notes: 'Enforced via auth middleware for all routes' },
      { id: 'cl-2', question: 'Are backup codes available for account recovery?', answer: true, notes: 'Users receive 10 backup codes at MFA setup' },
    ],
    assignee: 'Marcus Johnson', dueDate: null, completedAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 'mit-2', riskId: 'risk-1', title: 'Rate-limit login attempts per account and IP',
    description: 'Implement progressive rate limiting on failed login attempts to prevent automated credential stuffing.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/156', description: 'Added rate limiting to auth endpoints' }],
    checklist: [
      { id: 'cl-3', question: 'Are login attempts rate-limited per account?', answer: true, notes: '5 attempts per minute per account' },
      { id: 'cl-4', question: 'Are login attempts rate-limited per IP?', answer: true, notes: '20 attempts per minute per IP' },
    ],
    assignee: 'Marcus Johnson', dueDate: null, completedAt: '2025-12-15T10:00:00Z',
  },
  {
    id: 'mit-3', riskId: 'risk-2', title: 'Implement short-lived session tokens with rotation',
    description: 'Use JWT tokens with 15-minute expiry and automatic rotation via refresh tokens.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/168', description: 'Short-lived JWT with refresh rotation' }],
    checklist: [
      { id: 'cl-5', question: 'Are access tokens short-lived (< 30 minutes)?', answer: true, notes: '15-minute expiry' },
      { id: 'cl-6', question: 'Are refresh tokens rotated on each use?', answer: true, notes: 'Single-use refresh tokens with family tracking' },
    ],
    assignee: 'Sarah Chen', dueDate: null, completedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'mit-4', riskId: 'risk-2', title: 'Bind sessions to device fingerprint',
    description: 'Associate session tokens with a device fingerprint hash to detect token reuse from different devices.',
    status: 'implemented', priority: 'recommended',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/175', description: 'Device fingerprint binding for sessions' }],
    checklist: [
      { id: 'cl-7', question: 'Is device fingerprint validated on each request?', answer: true, notes: 'Checked via middleware on all authenticated routes' },
    ],
    assignee: 'Sarah Chen', dueDate: null, completedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'mit-5', riskId: 'risk-3', title: 'Comprehensive login audit logging',
    description: 'Log all login attempts with IP address, user agent, geolocation, timestamp, and outcome.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/180', description: 'Enhanced login audit logging' }],
    checklist: [
      { id: 'cl-8', question: 'Are failed login attempts logged?', answer: true, notes: 'All outcomes logged to audit service' },
      { id: 'cl-9', question: 'Is geolocation data captured?', answer: true, notes: 'IP-based geolocation via MaxMind GeoIP2' },
    ],
    assignee: 'Marcus Johnson', dueDate: null, completedAt: '2026-01-25T10:00:00Z',
  },

  // === Feature 2: File Upload ===
  {
    id: 'mit-6', riskId: 'risk-4', title: 'Multi-engine antivirus scanning pipeline',
    description: 'Scan all uploaded files through ClamAV and a commercial AV engine before availability.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/98', description: 'Multi-engine AV scanning pipeline' }],
    checklist: [
      { id: 'cl-10', question: 'Are all uploads scanned before availability?', answer: true, notes: 'Files quarantined until scan completes' },
      { id: 'cl-11', question: 'Are scan results logged?', answer: true, notes: 'Results stored in scan_results table' },
    ],
    assignee: 'David Kim', dueDate: null, completedAt: '2025-11-15T10:00:00Z',
  },
  {
    id: 'mit-7', riskId: 'risk-4', title: 'File integrity verification with SHA-256 checksums',
    description: 'Generate and verify SHA-256 checksums for all uploaded files to detect tampering.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/105', description: 'SHA-256 checksum verification' }],
    checklist: [
      { id: 'cl-12', question: 'Are checksums verified on download?', answer: true, notes: 'Verified at download time, 404 if mismatch' },
    ],
    assignee: 'David Kim', dueDate: null, completedAt: '2025-11-20T10:00:00Z',
  },
  {
    id: 'mit-8', riskId: 'risk-5', title: 'Strip internal metadata from API responses',
    description: 'Remove storage paths, bucket names, and internal IDs from all file-related API responses.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/112', description: 'API response metadata stripping' }],
    checklist: [
      { id: 'cl-13', question: 'Are internal storage paths excluded from responses?', answer: true, notes: 'Response serializer filters internal fields' },
    ],
    assignee: 'Lisa Park', dueDate: null, completedAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 'mit-9', riskId: 'risk-6', title: 'Per-tenant storage quotas and file size limits',
    description: 'Enforce configurable storage quotas per tenant and maximum file size limits per upload.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/120', description: 'Storage quotas and file size enforcement' }],
    checklist: [
      { id: 'cl-14', question: 'Are per-tenant quotas enforced?', answer: true, notes: '100GB default, configurable per plan' },
      { id: 'cl-15', question: 'Is max file size enforced?', answer: true, notes: '5GB max per file' },
    ],
    assignee: 'Marcus Johnson', dueDate: null, completedAt: '2025-12-10T10:00:00Z',
  },

  // === Feature 3: Sharing ===
  {
    id: 'mit-10', riskId: 'risk-7', title: 'Use cryptographically random share tokens',
    description: 'Generate share link tokens using crypto.randomBytes(32) to produce unpredictable URLs.',
    status: 'suggested', priority: 'required',
    evidence: [],
    checklist: [
      { id: 'cl-16', question: 'Are tokens generated with CSPRNG?', answer: null, notes: '' },
      { id: 'cl-17', question: 'Are tokens at least 256 bits?', answer: null, notes: '' },
      { id: 'cl-18', question: 'Do share links have configurable expiration?', answer: null, notes: '' },
    ],
    assignee: 'Lisa Park', dueDate: '2026-03-15T10:00:00Z', completedAt: null,
  },
  {
    id: 'mit-11', riskId: 'risk-8', title: 'Require email verification for sensitive shares',
    description: 'For confidential files, require the recipient to verify their email before accessing shared content.',
    status: 'suggested', priority: 'recommended',
    evidence: [],
    checklist: [
      { id: 'cl-19', question: 'Is email verification required for confidential shares?', answer: null, notes: '' },
      { id: 'cl-20', question: 'Is password protection available as an option?', answer: null, notes: '' },
    ],
    assignee: 'Lisa Park', dueDate: '2026-03-20T10:00:00Z', completedAt: null,
  },
  {
    id: 'mit-12', riskId: 'risk-9', title: 'Enforce least-privilege share permission defaults',
    description: 'Default all share links to view-only access. Require explicit confirmation for elevated permissions.',
    status: 'in_progress', priority: 'required',
    evidence: [],
    checklist: [
      { id: 'cl-21', question: 'Do share links default to view-only?', answer: true, notes: 'UI defaults to view-only' },
      { id: 'cl-22', question: 'Is elevated permission selection confirmed via dialog?', answer: null, notes: '' },
    ],
    assignee: 'Lisa Park', dueDate: '2026-03-10T10:00:00Z', completedAt: null,
  },

  // === Feature 5: Admin ===
  {
    id: 'mit-16', riskId: 'risk-13', title: 'RBAC enforcement at API gateway level',
    description: 'Implement role-based access control checks at the API gateway before requests reach backends.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/85', description: 'RBAC middleware at API gateway' }],
    checklist: [
      { id: 'cl-28', question: 'Are all admin endpoints protected by RBAC?', answer: true, notes: 'Enforced via gateway middleware' },
    ],
    assignee: 'Sarah Chen', dueDate: null, completedAt: '2025-10-20T10:00:00Z',
  },
  {
    id: 'mit-17', riskId: 'risk-13', title: 'Step-up MFA for destructive admin actions',
    description: 'Require re-authentication with MFA for destructive operations like user deletion and data exports.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/92', description: 'Step-up MFA for admin destructive actions' }],
    checklist: [
      { id: 'cl-29', question: 'Is step-up auth required for destructive actions?', answer: true, notes: 'MFA prompt before delete/modify operations' },
    ],
    assignee: 'Sarah Chen', dueDate: null, completedAt: '2025-11-01T10:00:00Z',
  },
  {
    id: 'mit-18', riskId: 'risk-14', title: 'Immutable role assignments with approval workflow',
    description: 'Role elevation requires approval from two existing admins and is logged as an immutable audit event.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'pr', url: 'https://github.com/cloudvault/platform/pull/130', description: 'Two-admin approval for role elevation' }],
    checklist: [
      { id: 'cl-30', question: 'Does role elevation require dual approval?', answer: true, notes: 'Two-admin approval flow implemented' },
    ],
    assignee: 'Sarah Chen', dueDate: null, completedAt: '2025-12-05T10:00:00Z',
  },
  {
    id: 'mit-19', riskId: 'risk-15', title: 'Write-once audit log storage (S3 Object Lock)',
    description: 'Store audit logs in S3 with Object Lock in compliance mode, preventing modification or deletion.',
    status: 'implemented', priority: 'required',
    evidence: [{ type: 'config', url: 'https://github.com/cloudvault/infra/pull/45', description: 'S3 Object Lock configuration for audit logs' }],
    checklist: [
      { id: 'cl-31', question: 'Are audit logs stored with write-once protection?', answer: true, notes: 'S3 Object Lock in Compliance mode, 7-year retention' },
    ],
    assignee: 'Marcus Johnson', dueDate: null, completedAt: '2025-12-20T10:00:00Z',
  },

  // === Feature 7: API Gateway ===
  {
    id: 'mit-23', riskId: 'risk-19', title: 'Automated API key rotation with 90-day expiry',
    description: 'Enforce automatic API key expiration after 90 days with rotation workflows and notification.',
    status: 'suggested', priority: 'required',
    evidence: [],
    checklist: [
      { id: 'cl-37', question: 'Are API keys set to expire after 90 days?', answer: null, notes: '' },
      { id: 'cl-38', question: 'Is a rotation notification sent before expiry?', answer: null, notes: '' },
    ],
    assignee: 'Marcus Johnson', dueDate: '2026-03-30T10:00:00Z', completedAt: null,
  },
  {
    id: 'mit-24', riskId: 'risk-20', title: 'Strict OAuth scope validation and consent screen',
    description: 'Validate requested OAuth scopes against an allowlist and show users exact permissions requested.',
    status: 'suggested', priority: 'required',
    evidence: [],
    checklist: [
      { id: 'cl-39', question: 'Are OAuth scopes validated against an allowlist?', answer: null, notes: '' },
      { id: 'cl-40', question: 'Does the consent screen show granular permissions?', answer: null, notes: '' },
    ],
    assignee: 'Marcus Johnson', dueDate: '2026-04-05T10:00:00Z', completedAt: null,
  },
  {
    id: 'mit-25', riskId: 'risk-21', title: 'Global rate limiting with WAF integration',
    description: 'Deploy WAF rules for global rate limiting and token bucket rate limiting per API key.',
    status: 'suggested', priority: 'required',
    evidence: [],
    checklist: [
      { id: 'cl-41', question: 'Is WAF deployed with rate limiting rules?', answer: null, notes: '' },
      { id: 'cl-42', question: 'Is per-key token bucket rate limiting active?', answer: null, notes: '' },
    ],
    assignee: 'Marcus Johnson', dueDate: '2026-04-10T10:00:00Z', completedAt: null,
  },
];
