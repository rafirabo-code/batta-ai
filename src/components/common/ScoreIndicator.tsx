export function ScoreIndicator({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 60) return { text: '#DC2626', bg: '#FEF2F2' };
    if (s >= 30) return { text: '#D97706', bg: '#FFFBEB' };
    if (s > 0) return { text: '#65A30D', bg: '#F7FEE7' };
    return { text: '#16A34A', bg: '#F0FDF4' };
  };
  const color = getColor(score);
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 rounded-full bg-stone-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: Math.min(100, score) + '%', backgroundColor: color.text }}
        />
      </div>
      <span
        className="font-mono text-xs font-semibold tabular-nums min-w-[28px]"
        style={{ color: color.text }}
      >
        {score}
      </span>
    </div>
  );
}
