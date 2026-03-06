export type DiagramNodeType =
  | 'process'
  | 'data_store'
  | 'external_entity'
  | 'service'
  | 'trust_boundary';

export type DataClassification =
  | 'public'
  | 'internal'
  | 'confidential'
  | 'restricted';

export interface DiagramNodeRisk {
  category: string;
  severity: string;
  status: string;
}

export interface DiagramNodeData {
  label: string;
  nodeType: DiagramNodeType;
  description: string;
  technology?: string;
  riskCount?: number;
  dataClassification?: DataClassification;
  // Layer toggle fields (injected at runtime)
  risks?: DiagramNodeRisk[];
  showRiskOverlays?: boolean;
  visible?: boolean;
}

export interface ThreatModelNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: DiagramNodeData;
  parentId?: string;
  extent?: 'parent';
  style?: Record<string, string | number>;
}

export interface ThreatModelEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  type?: string;
  data?: {
    protocol?: string;
    dataTypes?: string[];
    encrypted?: boolean;
  };
}

export interface DiagramDefinition {
  id: string;
  featureId: string;
  nodes: ThreatModelNode[];
  edges: ThreatModelEdge[];
}
