export type MealCategory = 'breakfast' | 'lunch' | 'snack' | 'dinner' ;


export interface MealItem {
  id: number;
  grams: number;

  foodId: number;

  food?: {
    id: number;
    name: string;
    caloriesPer100g: number;
    carbsPer100g: number;
    proteinPer100g: number;
    fatPer100g: number;
  };
}

export interface Meal {
  id: number;
  name: string;
  type: MealCategory;

  createdAt: string;
  eatTime: string;

  totals: {
    grams: number;
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
  };

  items: MealItem[];
}
