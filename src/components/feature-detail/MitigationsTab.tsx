import { CheckCircle2, Circle, Clock, XCircle, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Mitigation } from '@/types';

interface MitigationsTabProps {
  mitigations: Mitigation[];
}

const STATUS_ICON = {
  implemented: CheckCircle2,
  in_progress: Clock,
  suggested: Circle,
  declined: XCircle,
};

const STATUS_STYLES = {
  implemented: { border: 'border-l-green-500', bg: 'bg-green-50/50', icon: 'text-green-500' },
  in_progress: { border: 'border-l-blue-500', bg: 'bg-blue-50/50', icon: 'text-blue-500' },
  suggested: { border: 'border-l-amber-400', bg: 'bg-amber-50/40', icon: 'text-amber-500' },
  declined: { border: 'border-l-slate-300', bg: 'bg-stone-50/50', icon: 'text-stone-400' },
};

export function MitigationsTab({ mitigations }: MitigationsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (mitigations.length === 0) {
    return <div className="text-sm text-stone-400 text-center py-8">No mitigations defined yet.</div>;
  }

  const implemented = mitigations.filter((m) => m.status === 'implemented');
  const pending = mitigations.filter((m) => m.status !== 'implemented');

  return (
    <div className="space-y-4">
      {pending.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Action Required ({pending.length})
          </div>
          <div className="space-y-2">
            {pending.map((mit) => (
              <MitigationCard key={mit.id} mitigation={mit} expanded={expandedId === mit.id} onToggle={() => setExpandedId(expandedId === mit.id ? null : mit.id)} />
            ))}
          </div>
        </div>
      )}
      {implemented.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Implemented ({implemented.length})
          </div>
          <div className="space-y-2">
            {implemented.map((mit) => (
              <MitigationCard key={mit.id} mitigation={mit} expanded={expandedId === mit.id} onToggle={() => setExpandedId(expandedId === mit.id ? null : mit.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MitigationCard({ mitigation, expanded, onToggle }: { mitigation: Mitigation; expanded: boolean; onToggle: () => void }) {
  const styles = STATUS_STYLES[mitigation.status];
  const Icon = STATUS_ICON[mitigation.status];
  const Chevron = expanded ? ChevronDown : ChevronRight;

  return (
    <div className={`border-l-4 ${styles.border} ${styles.bg} rounded-r-lg p-3`}>
      <button onClick={onToggle} className="w-full text-left flex items-start gap-2">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${styles.icon}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-stone-800">{mitigation.title}</span>
            {mitigation.priority === 'required' && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-medium">Required</span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-0.5">{mitigation.description}</p>
        </div>
        <Chevron className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
      </button>

      {expanded && (
        <div className="mt-3 ml-6 space-y-3">
          {/* Checklist */}
          {mitigation.checklist.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Security Checklist</div>
              <div className="space-y-1.5">
                {mitigation.checklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-2">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      item.answer === true ? 'bg-green-500 border-green-500' :
                      item.answer === false ? 'bg-red-500 border-red-500' :
                      'border-stone-300 bg-white'
                    }`}>
                      {item.answer === true && <CheckCircle2 className="w-3 h-3 text-white" />}
                      {item.answer === false && <XCircle className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <div className="text-xs text-stone-700">{item.question}</div>
                      {item.notes && <div className="text-[10px] text-stone-400 mt-0.5">{item.notes}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence */}
          {mitigation.evidence.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Evidence</div>
              <div className="space-y-1">
                {mitigation.evidence.map((ev, i) => (
                  <a
                    key={i}
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {ev.description}
                    <span className="text-[10px] text-stone-400 uppercase">({ev.type})</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-[10px] text-stone-400">
            {mitigation.assignee && <span>Assignee: {mitigation.assignee}</span>}
            {mitigation.dueDate && <span>Due: {new Date(mitigation.dueDate).toLocaleDateString()}</span>}
            {mitigation.completedAt && <span>Completed: {new Date(mitigation.completedAt).toLocaleDateString()}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
