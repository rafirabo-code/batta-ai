import { STATUS_CONFIG } from '@/lib/constants';
import type { ThreatModelStatus } from '@/types';

export function StatusPill({ status }: { status: ThreatModelStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
