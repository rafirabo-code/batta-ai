import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Cpu, Database, User, Server } from 'lucide-react';
import { NODE_COLORS, STRIDE_COLORS } from '@/lib/constants';
import type { DiagramNodeData } from '@/types';

const ICONS: Record<string, typeof Cpu> = {
  process: Cpu,
  data_store: Database,
  external_entity: User,
  service: Server,
};

export function CompactNode({ data }: NodeProps) {
  const d = data as DiagramNodeData;
  const colors = NODE_COLORS[d.nodeType] ?? NODE_COLORS.process;
  const Icon = ICONS[d.nodeType] ?? Cpu;

  const uniqueCategories = d.showRiskOverlays
    ? [...new Set((d.risks ?? []).map((r) => r.category))]
    : [];

  return (
    <div className="flex flex-col items-center" style={{ width: 120 }}>
      {/* Icon circle */}
      <div
        className="relative w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-sm"
        style={{
          border: `2px solid ${colors.border}`,
          backgroundColor: colors.bg,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: colors.border }} />

        {/* Risk count badge */}
        {(d.riskCount ?? 0) > 0 && (
          <div className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
            {d.riskCount}
          </div>
        )}
      </div>

      {/* Label */}
      <div
        className="mt-1.5 text-[11px] font-medium text-center leading-tight max-w-[110px]"
        style={{ color: colors.text }}
      >
        {d.label}
      </div>

      {/* Technology */}
      {d.technology && (
        <div className="text-[9px] text-stone-400 text-center mt-0.5 font-mono">
          {d.technology}
        </div>
      )}

      {/* STRIDE overlay badges */}
      {uniqueCategories.length > 0 && (
        <div className="flex gap-0.5 mt-1.5">
          {uniqueCategories.map((cat) => {
            const stride = STRIDE_COLORS[cat];
            if (!stride) return null;
            return (
              <span
                key={cat}
                className="w-[18px] h-[18px] rounded-full text-[8px] font-bold text-white flex items-center justify-center shadow-sm"
                style={{ backgroundColor: stride.color }}
                title={stride.label}
              >
                {stride.letter}
              </span>
            );
          })}
        </div>
      )}

      {/* Invisible handles on all 4 sides */}
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-2 !h-2" />
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-2 !h-2" id="left-target" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-2 !h-2" id="right-source" />
    </div>
  );
}
