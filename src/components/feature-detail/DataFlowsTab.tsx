import { Lock, Unlock, ArrowRight } from 'lucide-react';
import type { DiagramDefinition, DiagramNodeData } from '@/types';

interface DataFlowsTabProps {
  diagram: DiagramDefinition;
}

export function DataFlowsTab({ diagram }: DataFlowsTabProps) {
  const nodeMap = new Map(diagram.nodes.map((n) => [n.id, n.data as DiagramNodeData]));

  const flows = diagram.edges.map((edge) => {
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    const d = edge.data as { protocol?: string; dataTypes?: string[]; encrypted?: boolean } | undefined;
    return {
      id: edge.id,
      label: edge.label ?? '',
      sourceName: source?.label ?? edge.source,
      targetName: target?.label ?? edge.target,
      protocol: d?.protocol ?? 'Unknown',
      dataTypes: d?.dataTypes ?? [],
      encrypted: d?.encrypted ?? false,
    };
  });

  if (flows.length === 0) {
    return <div className="text-sm text-stone-400 text-center py-8">No data flows defined.</div>;
  }

  return (
    <div className="space-y-2">
      {flows.map((flow) => (
        <div key={flow.id} className="p-3 rounded-lg border border-stone-100">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-stone-700">{flow.sourceName}</span>
            <ArrowRight className="w-3.5 h-3.5 text-batta-400" />
            <span className="font-medium text-stone-700">{flow.targetName}</span>
          </div>
          {flow.label && <div className="text-xs text-stone-500 mt-1">{flow.label}</div>}
          <div className="flex items-center gap-3 mt-2 text-[10px]">
            <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">{flow.protocol}</span>
            {flow.encrypted ? (
              <span className="flex items-center gap-0.5 text-green-600"><Lock className="w-3 h-3" /> Encrypted</span>
            ) : (
              <span className="flex items-center gap-0.5 text-amber-500"><Unlock className="w-3 h-3" /> Unencrypted</span>
            )}
            {flow.dataTypes.length > 0 && (
              <span className="text-stone-400">{flow.dataTypes.join(', ')}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
