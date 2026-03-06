import { useMemo } from 'react';
import { features, risks, mitigations } from '@/data';
import { useStore } from '@/store';
import { calculateScore, getActiveHighRisks } from '@/lib/utils';
import type { Feature, Risk, Mitigation } from '@/types';

export interface EnrichedFeature extends Feature {
  score: number;
  activeHighRisks: number;
  risks: Risk[];
  mitigations: Mitigation[];
}

export function useFeatures() {
  const { statusFilter, areaFilter, searchQuery } = useStore();

  const enrichedFeatures = useMemo((): EnrichedFeature[] => {
    return features.map((f) => {
      const featureRisks = risks.filter((r) => r.featureId === f.id);
      const featureMitigations = mitigations.filter((m) =>
        featureRisks.some((r) => r.mitigationIds.includes(m.id))
      );
      return {
        ...f,
        score: calculateScore(featureRisks),
        activeHighRisks: getActiveHighRisks(featureRisks),
        risks: featureRisks,
        mitigations: featureMitigations,
      };
    });
  }, []);

  const filteredFeatures = useMemo(() => {
    return enrichedFeatures.filter((f) => {
      if (statusFilter !== 'all' && f.status !== statusFilter) return false;
      if (areaFilter !== 'all' && f.productArea !== areaFilter) return false;
      if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [enrichedFeatures, statusFilter, areaFilter, searchQuery]);

  return { features: enrichedFeatures, filteredFeatures };
}

export function useFeature(featureId: string) {
  const { features: all } = useFeatures();
  return all.find((f) => f.id === featureId) ?? null;
}
