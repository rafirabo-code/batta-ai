import { create } from 'zustand';
import type { ThreatModelStatus, ProductArea } from '@/types';

interface AppState {
  // Inventory filters
  statusFilter: ThreatModelStatus | 'all';
  areaFilter: ProductArea | 'all';
  searchQuery: string;
  setStatusFilter: (status: ThreatModelStatus | 'all') => void;
  setAreaFilter: (area: ProductArea | 'all') => void;
  setSearchQuery: (query: string) => void;

  // Diagram state
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;

  // Layout
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>((set) => ({
  statusFilter: 'all',
  areaFilter: 'all',
  searchQuery: '',
  setStatusFilter: (status) => set({ statusFilter: status }),
  setAreaFilter: (area) => set({ areaFilter: area }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  hoveredNodeId: null,
  setHoveredNodeId: (id) => set({ hoveredNodeId: id }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
