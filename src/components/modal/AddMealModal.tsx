import { useEffect, useMemo, useState } from 'react';
import type { FoodItem, MealState, MealCategory } from '@/types/meal';
import { MealItemForm } from './MealItemForm';
import { MealItemsTable } from './MealItemsTable';
import { MealMacrosSummary } from './MealMacrosSummary';
import { MealMetadataForm } from './MealMetadataForm';
import { MEAL_CATEGORY_BY_ID } from '@/constants/mealCategories';
import { createMeal } from '@/services/mealService';

interface AddMealModalProps {
  open: boolean;
  onClose: () => void;
  typeMeal: MealCategory | null;
  onMealCreated: () => Promise<void>;
}

export function AddMealModal({
  open,
  typeMeal,
  onClose,
  onMealCreated,
}: AddMealModalProps) {
  const [meal, setMeal] = useState<MealState>({
    description: '',
    type: typeMeal ?? '',
    eatTime: '',
  });

  const [items, setItems] = useState<FoodItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const category = typeMeal
    ? MEAL_CATEGORY_BY_ID[typeMeal]
    : null;

  useEffect(() => {
    if (!category || !open) {
      return;
    }

    setMeal({
      description: '',
      type: category.id,
      eatTime: '',
    });

    setItems([]);
    setError('');
  }, [category, open]);

  function handleAddItem(item: FoodItem) {
    setItems((current) => [...current, item]);
  }

  function handleRemoveItem(item: FoodItem) {
    setItems((current) =>
      current.filter((currentItem) => currentItem.id !== item.id),
    );
  }

  async function handleSaveMeal() {
    if (!meal.description.trim()) {
      setError('Informe uma descrição para a refeição.');
      return;
    }

    if (!meal.eatTime) {
      setError('Informe a data e o horário da refeição.');
      return;
    }

    if (items.length === 0) {
      setError('Adicione pelo menos um alimento à refeição.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      await createMeal({
        ...meal,
        description: meal.description.trim(),
        items: items.map((item) => ({
          foodId: item.foodId,
          grams: item.grams,
        })),
      });

      await onMealCreated();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar refeição:', error);

      setError(
        'Não foi possível salvar a refeição. Verifique os dados e tente novamente.',
      );
    } finally {
      setSaving(false);
    }
  }

  const macros = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc.carbs += item.carbs;
          acc.proteins += item.protein;
          acc.fats += item.fat;
          acc.calories += item.calories;

          return acc;
        },
        {
          carbs: 0,
          proteins: 0,
          fats: 0,
          calories: 0,
          caloriesGoal: 0,
        },
      ),
    [items],
  );

  if (!typeMeal || !category) {
    return null;
  }

  return (
    <div className={`modal ${open ? 'modal-open' : ''}`} role="dialog">
      <div className="modal-box max-w-6xl">
        <h2 className="mb-6 text-3xl font-semibold">
          Adicionar Refeição
        </h2>

        <MealMacrosSummary macros={macros} />

        <MealMetadataForm
          meal={meal}
          setMeal={setMeal}
        />

        <div className="mb-4">
          <h3 className="mb-4 text-lg font-semibold">
            Itens da Refeição
          </h3>

          <MealItemForm onAdd={handleAddItem} />
        </div>

        <MealItemsTable
          items={items}
          onRemove={handleRemoveItem}
        />

        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}

        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={saving}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveMeal}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar refeição'}
          </button>
        </div>
      </div>
    </div>
  );
}