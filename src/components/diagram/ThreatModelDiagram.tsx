import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  type NodeMouseHandler,
  useOnViewportChange,
  type Viewport,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CompactNode } from './nodes/CompactNode';
import { TrustBoundaryNode } from './nodes/TrustBoundaryNode';
import { DataFlowEdge } from './edges/DataFlowEdge';
import { DiagramToolbar } from './DiagramToolbar';
import type { DiagramDefinition, DiagramNodeData } from '@/types';
import type { Risk } from '@/types';

const nodeTypes = {
  compactNode: CompactNode,
  trustBoundary: TrustBoundaryNode,
};

const edgeTypes = {
  dataFlow: DataFlowEdge,
};

interface ThreatModelDiagramProps {
  diagram: DiagramDefinition;
  risks?: Risk[];
}

function ZoomIndicator() {
  const [zoom, setZoom] = useState(1);
  useOnViewportChange({
    onChange: useCallback((viewport: Viewport) => setZoom(viewport.zoom), []),
  });
  return (
    <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-lg px-2.5 py-1.5 shadow-sm pointer-events-none">
      <span className="font-mono text-[11px] font-medium text-stone-500 tabular-nums">
        {Math.round(zoom * 100)}%
      </span>
    </div>
  );
}

export function ThreatModelDiagram({ diagram, risks = [] }: ThreatModelDiagramProps) {
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showRisks, setShowRisks] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: DiagramNodeData } | null>(null);

  // Process nodes: enrich with risk data and layer visibility flags
  const processedNodes = useMemo(() => {
    return diagram.nodes.map((node) => {
      if (node.type === 'trustBoundary') {
        return {
          ...node,
          data: { ...node.data, visible: showBoundaries },
        };
      }
      // Resolve risks for this node
      const nodeRisks = risks
        .filter((r) => r.affectedComponent === node.id)
        .map((r) => ({ category: r.category, severity: r.severity, status: r.status }));
      return {
        ...node,
        type: 'compactNode',
        data: {
          ...node.data,
          risks: nodeRisks,
          riskCount: nodeRisks.length || node.data.riskCount || 0,
          showRiskOverlays: showRisks,
        },
      };
    }) as Node[];
  }, [diagram.nodes, risks, showBoundaries, showRisks]);

  const [nodes, setNodes] = useState<Node[]>(processedNodes);
  const [edges, setEdges] = useState<Edge[]>(diagram.edges as Edge[]);

  // Sync when processedNodes changes (toggle state changes)
  useMemo(() => {
    setNodes(processedNodes);
  }, [processedNodes]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeMouseEnter: NodeMouseHandler = useCallback((_event, node) => {
    if (node.type === 'trustBoundary') return;
    const d = node.data as DiagramNodeData;
    setTooltip({ x: node.position.x, y: node.position.y, data: d });
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={0.5} color="#E7E5E4" />
        <Controls showInteractive={false} />
        <ZoomIndicator />
        <Panel position="top-left">
          <DiagramToolbar
            showBoundaries={showBoundaries}
            showRisks={showRisks}
            onToggleBoundaries={() => setShowBoundaries((v) => !v)}
            onToggleRisks={() => setShowRisks((v) => !v)}
          />
        </Panel>
        <svg>
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D6D3D1" />
            </marker>
          </defs>
        </svg>
      </ReactFlow>

      {/* Hover tooltip */}
      {tooltip && (
        <div className="absolute top-4 right-4 bg-white border border-stone-200 rounded-xl shadow-lg p-3 max-w-[220px] z-50 pointer-events-none mt-8">
          <div className="text-xs font-semibold text-stone-900">{tooltip.data.label}</div>
          <div className="text-[10px] text-stone-500 mt-1">{tooltip.data.description}</div>
          {tooltip.data.technology && (
            <div className="text-[10px] text-stone-400 mt-1 font-mono">
              {tooltip.data.technology}
            </div>
          )}
          {tooltip.data.dataClassification && (
            <div className="text-[10px] text-stone-400 mt-0.5">
              <span className="font-medium">Classification:</span> {tooltip.data.dataClassification}
            </div>
          )}
          {(tooltip.data.riskCount ?? 0) > 0 && (
            <div className="text-[10px] text-red-600 font-medium mt-1">
              {tooltip.data.riskCount} active risk{tooltip.data.riskCount === 1 ? '' : 's'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
