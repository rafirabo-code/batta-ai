import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { StatusPill } from '@/components/common/StatusPill';
import { ScoreIndicator } from '@/components/common/ScoreIndicator';
import { useFeatures, type EnrichedFeature } from '@/hooks/use-features';
import { useStore } from '@/store';
import type { ThreatModelStatus, ProductArea } from '@/types';

const STATUS_OPTIONS: { value: ThreatModelStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'complete', label: 'Complete' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'not_started', label: 'Not Started' },
  { value: 'stale', label: 'Needs Review' },
];

const AREA_OPTIONS: { value: ProductArea | 'all'; label: string }[] = [
  { value: 'all', label: 'All Areas' },
  { value: 'Core Platform', label: 'Core Platform' },
  { value: 'User Management', label: 'User Management' },
  { value: 'File Operations', label: 'File Operations' },
  { value: 'Sharing & Collaboration', label: 'Sharing & Collaboration' },
  { value: 'Admin & Compliance', label: 'Admin & Compliance' },
];

export function InventoryPage() {
  const navigate = useNavigate();
  const { filteredFeatures } = useFeatures();
  const { statusFilter, areaFilter, searchQuery, setStatusFilter, setAreaFilter, setSearchQuery } = useStore();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<EnrichedFeature>[]>(
    () => [
      {
        accessorKey: 'productArea',
        header: 'Product Area',
        cell: (info) => (
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            {info.getValue<string>()}
          </span>
        ),
        size: 160,
      },
      {
        accessorKey: 'name',
        header: 'Feature',
        cell: (info) => (
          <div>
            <div className="text-sm font-medium text-stone-900">{info.getValue<string>()}</div>
            <div className="text-xs text-stone-400 mt-0.5 line-clamp-1">{info.row.original.description}</div>
          </div>
        ),
        size: 300,
      },
      {
        accessorKey: 'status',
        header: 'Threat Model Status',
        cell: (info) => <StatusPill status={info.getValue<ThreatModelStatus>()} />,
        size: 160,
      },
      {
        accessorKey: 'activeHighRisks',
        header: 'Active High Risks',
        cell: (info) => {
          const val = info.getValue<number>();
          return (
            <span className={`text-sm font-semibold tabular-nums ${val > 0 ? 'text-red-600' : 'text-stone-400'}`}>
              {val}
            </span>
          );
        },
        size: 130,
      },
      {
        accessorKey: 'score',
        header: 'Risk Score',
        cell: (info) => <ScoreIndicator score={info.getValue<number>()} />,
        size: 140,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredFeatures,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <PageContainer
      title="Feature Inventory"
      subtitle="Threat model status and risk overview across all product features"
    >
      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-batta-400/30 focus:border-batta-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ThreatModelStatus | 'all')}
          className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-batta-400/30 focus:border-batta-400"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value as ProductArea | 'all')}
          className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-batta-400/30 focus:border-batta-400"
        >
          {AREA_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200/80 rounded-2xl shadow-[0_1px_3px_rgba(28,25,23,0.04)] overflow-hidden animate-in">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-stone-100">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider cursor-pointer hover:text-stone-700 select-none"
                    style={{ width: header.getSize() }}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronsUpDown className="w-3.5 h-3.5 text-stone-300" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-stone-50">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => navigate(`/inventory/${row.original.id}`)}
                className="hover:bg-stone-50/80 cursor-pointer transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFeatures.length === 0 && (
          <div className="py-12 text-center text-sm text-stone-400">
            No features match your filters.
          </div>
        )}
      </div>
    </PageContainer>
  );
}
