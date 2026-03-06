export type StrideCategory =
  | 'spoofing'
  | 'tampering'
  | 'repudiation'
  | 'information_disclosure'
  | 'denial_of_service'
  | 'elevation_of_privilege';

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type Exploitability = 'proven' | 'likely' | 'possible' | 'unlikely';

export type RiskStatus = 'open' | 'mitigated' | 'accepted' | 'transferred';

export interface Risk {
  id: string;
  featureId: string;
  category: StrideCategory;
  title: string;
  description: string;
  severity: Severity;
  exploitability: Exploitability;
  status: RiskStatus;
  affectedComponent: string;
  mitigationIds: string[];
  createdAt: string;
  updatedAt: string;
}

export const STRIDE_LABELS: Record<StrideCategory, string> = {
  spoofing: 'Spoofing',
  tampering: 'Tampering',
  repudiation: 'Repudiation',
  information_disclosure: 'Information Disclosure',
  denial_of_service: 'Denial of Service',
  elevation_of_privilege: 'Elevation of Privilege',
};

export const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};
