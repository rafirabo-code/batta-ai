import { Eye, EyeOff, ShieldAlert } from 'lucide-react';

interface DiagramToolbarProps {
  showBoundaries: boolean;
  showRisks: boolean;
  onToggleBoundaries: () => void;
  onToggleRisks: () => void;
}

export function DiagramToolbar({
  showBoundaries,
  showRisks,
  onToggleBoundaries,
  onToggleRisks,
}: DiagramToolbarProps) {
  return (
    <div className="flex items-center gap-1.5">
      <TogglePill
        active={showBoundaries}
        onClick={onToggleBoundaries}
        icon={showBoundaries ? Eye : EyeOff}
        label="Boundaries"
      />
      <TogglePill
        active={showRisks}
        onClick={onToggleRisks}
        icon={ShieldAlert}
        label="Risks"
      />
    </div>
  );
}

function TogglePill({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all duration-200 ${
        active
          ? 'bg-batta-50 text-batta-600 border-batta-200 shadow-sm'
          : 'bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-500'
      }`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}
