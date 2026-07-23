import { Plus, X } from '@phosphor-icons/react';
import { MEAL_CATEGORIES } from '@/constants/mealCategories';
import type { MealCategory } from '@/types/meal';

interface MealFabProps {
  onSelectCategory: (category: MealCategory) => void;
}

export function MealFab({ onSelectCategory }: MealFabProps) {
  return (
    <div className="fab fab-flower lg:hidden">
      <div
        tabIndex={0}
        role="button"
        aria-label="Adicionar refeição"
        className="btn btn-circle btn-lg btn-primary"
      >
        <Plus size={24} weight="bold" />
      </div>

      <div className="fab-close">
        <span className="btn btn-circle btn-lg btn-error" aria-hidden>
          <X size={20} weight="bold" />
        </span>
      </div>

      {MEAL_CATEGORIES.map(category => {
        const Icon = category.Icon;
        return (
          <button
            key={category.id}
            type="button"
            className="btn btn-circle btn-lg"
            title={category.label}
            aria-label={category.label}
            onClick={() => onSelectCategory(category.id)}
          >
            <Icon size={20} />
          </button>
        );
      })}
    </div>
  );
}
