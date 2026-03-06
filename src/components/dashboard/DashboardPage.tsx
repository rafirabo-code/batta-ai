import { useNavigate } from 'react-router';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/common/Card';
import { useMetrics } from '@/hooks/use-metrics';
import { useFeatures } from '@/hooks/use-features';
import { history } from '@/data';
import { formatRelativeTime } from '@/lib/utils';
import { STATUS_CONFIG } from '@/lib/constants';
import { Layers, ShieldCheck, AlertTriangle, Target, ArrowRight } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { totalFeatures, modelsComplete, activeHighRisks, coverage, strideBreakdown, statusCounts } = useMetrics();
  const { features } = useFeatures();

  const maxStride = Math.max(...strideBreakdown.map((s) => s.count), 1);

  const recentHistory = [...history]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);

  // Top at-risk features
  const topRisks = [...features]
    .filter((f) => f.activeHighRisks > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <PageContainer
      title="Security Dashboard"
      subtitle="CloudVault threat model coverage and risk overview"
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8 animate-in">
        <MetricCard icon={Layers} label="Total Features" value={totalFeatures} color="#3B82F6" />
        <MetricCard icon={ShieldCheck} label="Models Complete" value={modelsComplete} color="#16A34A" />
        <MetricCard icon={AlertTriangle} label="Active High Risks" value={activeHighRisks} color="#DC2626" />
        <MetricCard icon={Target} label="Coverage" value={`${coverage}%`} color="#F97316" />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6 animate-in stagger-1">
        {/* STRIDE Breakdown */}
        <Card className="col-span-1">
          <h3 className="text-sm font-semibold text-stone-700 tracking-tight mb-4">STRIDE Risk Breakdown</h3>
          <div className="space-y-3">
            {strideBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-stone-600">{item.label}</span>
                  <span className="font-semibold text-stone-700 tabular-nums">{item.count}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-batta-400 to-batta-500 transition-all"
                    style={{ width: `${(item.count / maxStride) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Coverage by Status */}
        <Card className="col-span-1">
          <h3 className="text-sm font-semibold text-stone-700 tracking-tight mb-4">Model Coverage</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  const entries = [
                    { count: statusCounts.complete, color: STATUS_CONFIG.complete.color },
                    { count: statusCounts.in_progress, color: STATUS_CONFIG.in_progress.color },
                    { count: statusCounts.stale, color: STATUS_CONFIG.stale.color },
                    { count: statusCounts.not_started, color: STATUS_CONFIG.not_started.color },
                  ];
                  let offset = 0;
                  return entries.map((entry, i) => {
                    const pct = (entry.count / totalFeatures) * 100;
                    const circumference = Math.PI * 70;
                    const dashLength = (pct / 100) * circumference;
                    const el = (
                      <circle
                        key={i}
                        cx="50" cy="50" r="35"
                        fill="none"
                        stroke={entry.color}
                        strokeWidth="10"
                        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                        strokeDashoffset={-offset}
                        strokeLinecap="round"
                      />
                    );
                    offset += dashLength;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-stone-900">{coverage}%</div>
                <div className="text-[10px] text-stone-400">covered</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(statusCounts).map(([key, count]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_CONFIG[key as keyof typeof STATUS_CONFIG].color }} />
                <span className="text-stone-600">{STATUS_CONFIG[key as keyof typeof STATUS_CONFIG].label}</span>
                <span className="ml-auto font-medium text-stone-700">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top At-Risk Features */}
        <Card className="col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-stone-700 tracking-tight">Top At-Risk Features</h3>
            <button onClick={() => navigate('/inventory')} className="text-xs text-batta-500 hover:text-batta-600 flex items-center gap-0.5">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          {topRisks.length > 0 ? (
            <div className="space-y-2.5">
              {topRisks.map((f) => (
                <button
                  key={f.id}
                  onClick={() => navigate(`/inventory/${f.id}`)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-800 truncate">{f.name}</span>
                    <span className="text-xs font-bold text-red-600 tabular-nums shrink-0 ml-2">{f.activeHighRisks}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{f.productArea}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-sm text-stone-400 text-center py-4">No active high risks!</div>
          )}
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="animate-in stagger-2">
        <h3 className="text-sm font-semibold text-stone-700 tracking-tight mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentHistory.map((entry) => {
            const feat = features.find((f) => f.id === entry.featureId);
            return (
              <div key={entry.id} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-batta-400 mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-stone-700">{entry.description}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    {feat?.name} · {entry.actor} · {formatRelativeTime(entry.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageContainer>
  );
}

function MetricCard({ icon: Icon, label, value, color }: { icon: typeof Layers; label: string; value: string | number; color: string }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '10' }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <div className="text-xs text-stone-400">{label}</div>
          <div className="font-mono text-xl font-bold text-stone-900 tabular-nums">{value}</div>
        </div>
      </div>
    </Card>
  );
}
