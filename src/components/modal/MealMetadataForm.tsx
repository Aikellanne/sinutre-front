import { MEAL_CATEGORIES } from '@/constants/mealCategories';
import { FormField } from '../forms/FormField';

import { MealState } from '@/types/meal';

interface MealMetadataProp{
  meal: MealState;
  setMeal: React.Dispatch<React.SetStateAction<MealState>>;
}


export function MealMetadataForm( {meal, setMeal} : MealMetadataProp) {
  return (
    <section className="grid lg:grid-cols-3 gap-4 mb-8">
      <FormField label="Descrição" htmlFor="meal-description" className="lg:col-span-1">
        <input
          id="meal-description"
          type="text"
          placeholder="Ex: almoço pós treino"
          className="input input-bordered w-full"
          onChange={(e) =>
                setMeal({
                  ...meal,
                  description: e.target.value,
                })
              }
        />
      </FormField>

      <FormField label="Categoria" htmlFor="meal-category">
        <select
          id="meal-category"
          className="select select-bordered w-full"
          defaultValue={meal.type}
          disabled={true}
          onChange={(e) =>
                setMeal({
                  ...meal,
                  type: e.target.value,
                })
              }
        >
          <option disabled value="">
            Selecione categoria
          </option>
          {MEAL_CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Data e horário" htmlFor="meal-datetime">
        <input
          id="meal-datetime"
          type="datetime-local"
          className="input input-bordered w-full"
          onChange={(e) =>
                setMeal({
                  ...meal,
                  eatTime: e.target.value,
                })
              }
        />
      </FormField>
    </section>
  );
}
