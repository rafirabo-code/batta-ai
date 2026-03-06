import { SEVERITY_CONFIG } from '@/lib/constants';
import type { Severity } from '@/types';

export function SeverityBadge({ severity }: { severity: Severity }) {
  const config = SEVERITY_CONFIG[severity];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {config.label}
    </span>
  );
}

export function StrideBadge({ category }: { category: string }) {
  const labels: Record<string, string> = {
    spoofing: 'S',
    tampering: 'T',
    repudiation: 'R',
    information_disclosure: 'I',
    denial_of_service: 'D',
    elevation_of_privilege: 'E',
  };
  const colors: Record<string, string> = {
    spoofing: '#DC2626',
    tampering: '#EA580C',
    repudiation: '#D97706',
    information_disclosure: '#2563EB',
    denial_of_service: '#7C3AED',
    elevation_of_privilege: '#DB2777',
  };
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: colors[category] || '#6B7280' }}
      title={category.replace(/_/g, ' ')}
    >
      {labels[category] || '?'}
    </span>
  );
}
