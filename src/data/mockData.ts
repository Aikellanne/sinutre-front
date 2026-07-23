import type { FoodItem, MacroSummary, Meal, MealsSummary } from '@/types/meal';

export const CURRENT_USER = {
  name: 'Pedro Lucas',
  avatarUrl:
    'https://i.pinimg.com/736x/f6/aa/24/f6aa2407d3ca6532e0304d6cd0e9291d.jpg',
};

export const MACRO_SUMMARY: MacroSummary = {
  carbs: 0,
  proteins: 0,
  fats: 0,
  calories: 0,
  caloriesGoal: 2100,
};

export const MEALS_SUMMARY: MealsSummary = {
  total: 125,
  thisMonth: 4,
  today: 0,
};

export const RECENT_MEALS: Meal[] = [
  { id: 1, date: '01/03/2026', category: 'breakfast', calories: 200 },
  { id: 2, date: '01/03/2026', category: 'lunch', calories: 650 },
  { id: 3, date: '01/03/2026', category: 'snack', calories: 180 },
  { id: 4, date: '01/03/2026', category: 'dinner', calories: 520 },
];

export const SAMPLE_MEAL_ITEMS: FoodItem[] = [
  { id: 1, foodId: 1, name: 'Arroz branco', grams: 100, calories: 130, carbs: 28, protein: 2.7, fat: 0.3 },
  { id: 2, foodId: 2, name: 'Peito de frango', grams: 120, calories: 198, carbs: 0, protein: 31, fat: 4 },
];
