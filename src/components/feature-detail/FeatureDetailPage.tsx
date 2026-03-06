import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, Shield, ArrowRightLeft, Clock, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { StatusPill } from '@/components/common/StatusPill';
import { ScoreIndicator } from '@/components/common/ScoreIndicator';
import { ThreatModelDiagram } from '@/components/diagram/ThreatModelDiagram';
import { RisksTab } from './RisksTab';
import { MitigationsTab } from './MitigationsTab';
import { DataFlowsTab } from './DataFlowsTab';
import { HistoryTab } from './HistoryTab';
import { useFeature } from '@/hooks/use-features';
import { diagrams } from '@/data';

const TABS = [
  { id: 'risks', label: 'Risks', icon: AlertTriangle },
  { id: 'mitigations', label: 'Mitigations', icon: Shield },
  { id: 'dataflows', label: 'Data Flows', icon: ArrowRightLeft },
  { id: 'history', label: 'History', icon: Clock },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function FeatureDetailPage() {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const feature = useFeature(featureId ?? '');
  const [activeTab, setActiveTab] = useState<TabId>('risks');
  const [panelOpen, setPanelOpen] = useState(true);

  if (!feature) {
    return (
      <div className="p-6">
        <button onClick={() => navigate('/inventory')} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </button>
        <div className="text-center py-20 text-stone-400">Feature not found.</div>
      </div>
    );
  }

  const diagram = diagrams.find((d) => d.featureId === feature.id);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Compact header */}
      <div className="px-6 py-3 border-b border-stone-100 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => navigate('/inventory')}
              className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold text-stone-900 tracking-tight truncate">{feature.name}</h1>
                <StatusPill status={feature.status} />
              </div>
              <p className="text-xs text-stone-400 mt-0.5 truncate">{feature.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 ml-4">
            <div className="text-right">
              <div className="text-[10px] text-stone-400">Risk Score</div>
              <ScoreIndicator score={feature.score} />
            </div>
            <button
              onClick={() => setPanelOpen((v) => !v)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              title={panelOpen ? 'Hide insights' : 'Show insights'}
            >
              {panelOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <PanelRightOpen className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content — diagram + collapsible right panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Diagram canvas — fills all available space */}
        <div className="flex-1 relative min-w-0">
          {diagram ? (
            <ThreatModelDiagram diagram={diagram} risks={feature.risks} />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-stone-400">
              No diagram available
            </div>
          )}
        </div>

        {/* Right panel — collapsible */}
        <div
          className={`border-l border-stone-200 bg-white flex flex-col shrink-0 transition-all duration-300 overflow-hidden ${
            panelOpen ? 'w-[380px]' : 'w-0 border-l-0'
          }`}
        >
          {panelOpen && (
            <>
              {/* Tab Navigation */}
              <div className="flex border-b border-stone-100 shrink-0">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-batta-400 text-batta-600'
                        : 'border-transparent text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                    {tab.id === 'risks' && feature.risks.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-stone-100 text-stone-500">
                        {feature.risks.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'risks' && <RisksTab risks={feature.risks} />}
                {activeTab === 'mitigations' && <MitigationsTab mitigations={feature.mitigations} />}
                {activeTab === 'dataflows' && diagram && <DataFlowsTab diagram={diagram} />}
                {activeTab === 'history' && <HistoryTab featureId={feature.id} />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
