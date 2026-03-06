import { history } from '@/data';
import { formatRelativeTime } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, RefreshCw, FileEdit, Eye, GitBranch } from 'lucide-react';
import type { HistoryEventType } from '@/types';

const EVENT_ICONS: Record<HistoryEventType, typeof AlertTriangle> = {
  risk_added: AlertTriangle,
  risk_updated: RefreshCw,
  mitigation_completed: CheckCircle2,
  status_change: FileEdit,
  review_completed: Eye,
  diagram_updated: GitBranch,
};

const EVENT_COLORS: Record<HistoryEventType, string> = {
  risk_added: 'text-red-500 bg-red-50',
  risk_updated: 'text-amber-500 bg-amber-50',
  mitigation_completed: 'text-green-500 bg-green-50',
  status_change: 'text-blue-500 bg-blue-50',
  review_completed: 'text-batta-500 bg-batta-50',
  diagram_updated: 'text-purple-500 bg-purple-50',
};

interface HistoryTabProps {
  featureId: string;
}

export function HistoryTab({ featureId }: HistoryTabProps) {
  const entries = history
    .filter((h) => h.featureId === featureId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (entries.length === 0) {
    return <div className="text-sm text-stone-400 text-center py-8">No history yet.</div>;
  }

  return (
    <div className="relative">
      <div className="absolute left-[15px] top-0 bottom-0 w-px bg-stone-100" />
      <div className="space-y-4">
        {entries.map((entry) => {
          const Icon = EVENT_ICONS[entry.eventType];
          const colorClass = EVENT_COLORS[entry.eventType];
          return (
            <div key={entry.id} className="flex gap-3 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="pt-1">
                <div className="text-sm text-stone-700">{entry.description}</div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-400">
                  <span>{entry.actor}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(entry.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
