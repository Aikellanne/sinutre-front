import type { Icon } from '@phosphor-icons/react';

interface MealActionButtonProps {
  label: string;
  Icon: Icon;
  onClick?: () => void;
}

export function MealActionButton({
  label,
  Icon,
  onClick,
}: MealActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary btn-outline flex flex-col items-center justify-center gap-2 h-auto py-4"
    >
      <Icon size={24} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
