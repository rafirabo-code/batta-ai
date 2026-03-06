import { useMemo } from 'react';
import { useFeatures } from './use-features';
import { risks } from '@/data';
import type { StrideCategory } from '@/types';
import { STRIDE_LABELS } from '@/types';

export function useMetrics() {
  const { features } = useFeatures();

  return useMemo(() => {
    const totalFeatures = features.length;
    const modelsComplete = features.filter((f) => f.status === 'complete').length;
    const activeHighRisks = features.reduce((sum, f) => sum + f.activeHighRisks, 0);
    const coverage = totalFeatures > 0 ? Math.round((modelsComplete / totalFeatures) * 100) : 0;

    const strideCounts: Record<StrideCategory, number> = {
      spoofing: 0,
      tampering: 0,
      repudiation: 0,
      information_disclosure: 0,
      denial_of_service: 0,
      elevation_of_privilege: 0,
    };
    for (const r of risks) {
      strideCounts[r.category]++;
    }

    const strideBreakdown = (Object.keys(strideCounts) as StrideCategory[]).map((cat) => ({
      category: cat,
      label: STRIDE_LABELS[cat],
      count: strideCounts[cat],
    }));

    const statusCounts = {
      complete: features.filter((f) => f.status === 'complete').length,
      in_progress: features.filter((f) => f.status === 'in_progress').length,
      not_started: features.filter((f) => f.status === 'not_started').length,
      stale: features.filter((f) => f.status === 'stale').length,
    };

    return {
      totalFeatures,
      modelsComplete,
      activeHighRisks,
      coverage,
      strideBreakdown,
      statusCounts,
    };
  }, [features]);
}
