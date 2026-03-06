import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

export function DataFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
  style,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
    curvature: 0.25,
  });

  const edgeData = data as { protocol?: string; encrypted?: boolean } | undefined;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: '#D6D3D1',
          strokeWidth: 1,
          ...style,
        }}
        markerEnd="url(#arrowhead)"
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="group"
        >
          {/* Small dot — always visible */}
          <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mx-auto" />

          {/* Full label on hover */}
          {(label || edgeData?.protocol) && (
            <div className="hidden group-hover:flex items-center gap-1 absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap shadow-lg z-50">
              {label && <span>{label as string}</span>}
              {edgeData?.protocol && (
                <span className="opacity-60 font-mono">({edgeData.protocol})</span>
              )}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
