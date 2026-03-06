import type { NodeProps } from '@xyflow/react';
import type { DiagramNodeData } from '@/types';

export function TrustBoundaryNode({ data }: NodeProps) {
  const d = data as DiagramNodeData;
  const isVisible = d.visible !== false;

  return (
    <div className="w-full h-full relative">
      {isVisible && (
        <>
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              border: '1.5px dashed #FED7AA',
              backgroundColor: 'rgba(251, 146, 60, 0.015)',
            }}
          />
          <div
            className="absolute -top-2.5 left-3 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider transition-opacity duration-300"
            style={{ backgroundColor: '#FFF7ED', color: '#C2410C', border: '1px solid #FED7AA' }}
          >
            {d.label}
          </div>
        </>
      )}
    </div>
  );
}
