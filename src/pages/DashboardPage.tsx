import { useState, useEffect, useMemo } from 'react';
import { AddMealCard } from '@/components/cards/AddMealCard';
import { TotalMealsCard } from '@/components/cards/TotalMealsCard';
import { Header } from '@/components/layout/Header';
import { MacroStatsBar } from '@/components/macros/MacroStatsBar';
import { MealFab } from '@/components/meals/MealFab';
import { MealsList } from '@/components/meals/MealsList';
import { MealsTable } from '@/components/meals/MealsTable';
import { AddMealModal } from '@/components/modal/AddMealModal';
import { useAuth } from '@/context/AuthContext';
import { Meal } from '@/types/mealSummary';
import { api } from '@/lib/api';
import { useMealModal } from '@/hooks/useMealModal';

interface DashboardPageProps {
  drawerId: string;
}

interface ProfileResponse {
  targetDietDaily: number | null;
}

export function DashboardPage({ drawerId }: DashboardPageProps) {
  const { user } = useAuth();
  const modal = useMealModal();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadDashboardData() {
    try {
      const [mealsResponse, profileResponse] = await Promise.all([
        api.get<Meal[]>('/meals'),
        api.get<ProfileResponse>('/profile'),
      ]);

      setMeals(mealsResponse.data);

      setCaloriesGoal(
        Number(profileResponse.data.targetDietDaily) || 0,
      );
    } catch (error) {
      console.error('Erro ao carregar o dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMeals() {
    try {
      const response = await api.get<Meal[]>('/meals');
      setMeals(response.data);
    } catch (error) {
      console.error('Erro ao carregar as refeições:', error);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const mealsSummary = useMemo(() => {
    const today = new Date();

    const total = meals.length;

    const todayCount = meals.filter((meal) => {
      const date = new Date(meal.eatTime);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }).length;

    const monthCount = meals.filter((meal) => {
      const date = new Date(meal.eatTime);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }).length;

    return {
      total,
      thisMonth: monthCount,
      today: todayCount,
    };
  }, [meals]);

  const macroSummary = useMemo(() => {
    const today = new Date();

    const todayMeals = meals.filter((meal) => {
      const date = new Date(meal.eatTime);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });

    return todayMeals.reduce(
      (acc, meal) => {
        acc.carbs += meal.totals.carbs;
        acc.proteins += meal.totals.proteins;
        acc.fats += meal.totals.fats;
        acc.calories += meal.totals.calories;

        return acc;
      },
      {
        carbs: 0,
        proteins: 0,
        fats: 0,
        calories: 0,
        caloriesGoal,
      },
    );
  }, [meals, caloriesGoal]);

  const hasCaloriesGoal = macroSummary.caloriesGoal > 0;

  const caloriesDifference =
    macroSummary.calories - macroSummary.caloriesGoal;

  const caloriesExceeded =
    hasCaloriesGoal && caloriesDifference > 0.01;

  const caloriesGoalReached =
    hasCaloriesGoal && Math.abs(caloriesDifference) <= 0.01;

  const remainingCalories = Math.abs(caloriesDifference);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-gray-500">Carregando...</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto mb-8">
        <Header
          drawerId={drawerId}
          userName={user.name}
          avatarUrl={user.avatarUrl}
        />

        <MacroStatsBar summary={macroSummary} />

        {hasCaloriesGoal && (
          <div
            className={`rounded-xl border p-4 ${
              caloriesExceeded
                ? 'border-error/30 bg-error/10 text-error'
                : caloriesGoalReached
                  ? 'border-warning/30 bg-warning/10 text-warning'
                  : 'border-success/30 bg-success/10 text-success'
            }`}
          >
            <p className="font-semibold">
              {caloriesExceeded
                ? 'Meta calórica ultrapassada'
                : caloriesGoalReached
                  ? 'Meta calórica atingida'
                  : 'Meta calórica dentro do limite'}
            </p>

            <p className="mt-1 text-sm">
              {caloriesExceeded
                ? `Você ultrapassou sua meta diária em ${remainingCalories.toFixed(
                    0,
                  )} kcal.`
                : caloriesGoalReached
                  ? 'Você atingiu exatamente sua meta calórica diária.'
                  : `Você ainda pode consumir ${remainingCalories.toFixed(
                      0,
                    )} kcal hoje.`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-stretch">
          <TotalMealsCard summary={mealsSummary} />

          <AddMealCard onSelectCategory={modal.openWith} />
        </div>

        <MealsTable meals={meals} />

        <MealsList meals={meals} />
      </div>

      <MealFab onSelectCategory={modal.openWith} />

      <AddMealModal
        open={modal.open}
        typeMeal={modal.selectedCategory}
        onClose={modal.close}
        onMealCreated={loadMeals}
      />
    </>
  );
}