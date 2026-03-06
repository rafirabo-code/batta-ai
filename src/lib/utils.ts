import type { Risk, Severity } from '@/types';

export function calculateScore(risks: Risk[]): number {
  const weights: Record<Severity, number> = {
    critical: 25,
    high: 15,
    medium: 8,
    low: 3,
  };

  const totalRiskScore = risks.reduce((sum, r) => sum + weights[r.severity], 0);
  const mitigatedCount = risks.filter(r => r.status === 'mitigated').length;
  const totalCount = risks.length;

  if (totalCount === 0) return 0;

  const mitigationCoverage = mitigatedCount / totalCount;
  const rawScore = totalRiskScore * (1 - mitigationCoverage);

  return Math.min(100, Math.round(rawScore));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return diffDays + ' days ago';
  if (diffDays < 30) return Math.floor(diffDays / 7) + ' weeks ago';
  if (diffDays < 365) return Math.floor(diffDays / 30) + ' months ago';
  return Math.floor(diffDays / 365) + ' years ago';
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getActiveHighRisks(risks: Risk[]): number {
  return risks.filter(
    r => (r.severity === 'critical' || r.severity === 'high') && r.status === 'open'
  ).length;
}
