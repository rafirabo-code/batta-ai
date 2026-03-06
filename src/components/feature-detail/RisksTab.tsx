import type { Risk, StrideCategory } from '@/types';
import { STRIDE_LABELS } from '@/types';
import { SeverityBadge, StrideBadge } from '@/components/common/Badge';

interface RisksTabProps {
  risks: Risk[];
}

const STRIDE_ORDER: StrideCategory[] = [
  'spoofing', 'tampering', 'repudiation',
  'information_disclosure', 'denial_of_service', 'elevation_of_privilege',
];

export function RisksTab({ risks }: RisksTabProps) {
  const grouped = STRIDE_ORDER
    .map((cat) => ({
      category: cat,
      label: STRIDE_LABELS[cat],
      risks: risks.filter((r) => r.category === cat),
    }))
    .filter((g) => g.risks.length > 0);

  if (risks.length === 0) {
    return <div className="text-sm text-stone-400 text-center py-8">No risks identified yet.</div>;
  }

  return (
    <div className="space-y-5">
      {grouped.map((group) => (
        <div key={group.category}>
          <div className="flex items-center gap-2 mb-2">
            <StrideBadge category={group.category} />
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              {group.label}
            </span>
          </div>
          <div className="space-y-2">
            {group.risks.map((risk) => (
              <div
                key={risk.id}
                className="p-3 rounded-lg border border-stone-100 hover:border-stone-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium text-stone-800 leading-snug">{risk.title}</div>
                  <SeverityBadge severity={risk.severity} />
                </div>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">{risk.description}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className={`font-medium ${risk.status === 'open' ? 'text-red-500' : risk.status === 'mitigated' ? 'text-green-600' : 'text-stone-400'}`}>
                    {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
                  </span>
                  <span className="text-stone-300">|</span>
                  <span className="text-stone-400">Exploitability: {risk.exploitability}</span>
                  <span className="text-stone-300">|</span>
                  <span className="text-stone-400">{risk.affectedComponent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
