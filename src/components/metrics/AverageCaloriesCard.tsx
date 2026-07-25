import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { getProfile } from '@/services/profileService';

interface MealResponse {
  id: number;
  eatTime: string;

  totals: {
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
  };
}

interface DailyCalories {
  date: Date;
  dateKey: string;
  dayLabel: string;
  dateLabel: string;
  calories: number;
}

function getDateKey(date: Date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0');

  const day = String(
    date.getDate(),
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function AverageCaloriesCard() {
  const [meals, setMeals] = useState<MealResponse[]>(
    [],
  );

  const [caloriesGoal, setCaloriesGoal] =
    useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setError('');

        const [mealsResponse, profile] =
          await Promise.all([
            api.get<MealResponse[]>('/meals'),
            getProfile(),
          ]);

        setMeals(mealsResponse.data);

        setCaloriesGoal(
          Number(profile.targetDietDaily) || 0,
        );
      } catch (error) {
        console.error(
          'Erro ao carregar os dados calóricos:',
          error,
        );

        setError(
          'Não foi possível carregar os dados calóricos.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const caloriesData = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const caloriesByDay = new Map<
      string,
      number
    >();

    for (const meal of meals) {
      const mealDate = new Date(meal.eatTime);

      if (Number.isNaN(mealDate.getTime())) {
        continue;
      }

      const dateKey = getDateKey(mealDate);

      const calories =
        Number(meal.totals?.calories) || 0;

      caloriesByDay.set(
        dateKey,
        (caloriesByDay.get(dateKey) ?? 0) +
          calories,
      );
    }

    const dailyCalories: DailyCalories[] =
      Array.from(
        { length: 7 },
        (_, index) => {
          const date = new Date(today);

          /*
           * O array começa há seis dias
           * e termina no dia atual.
           */
          date.setDate(
            today.getDate() - (6 - index),
          );

          const dateKey = getDateKey(date);

          return {
            date,
            dateKey,

            dayLabel: capitalize(
              new Intl.DateTimeFormat(
                'pt-BR',
                {
                  weekday: 'short',
                },
              )
                .format(date)
                .replace('.', ''),
            ),

            dateLabel:
              new Intl.DateTimeFormat(
                'pt-BR',
                {
                  day: '2-digit',
                  month: '2-digit',
                },
              ).format(date),

            calories:
              caloriesByDay.get(dateKey) ??
              0,
          };
        },
      );

    const totalCalories =
      dailyCalories.reduce(
        (total, day) =>
          total + day.calories,
        0,
      );

    const averageCalories =
      totalCalories / 7;

    const daysWithRecords =
      dailyCalories.filter(
        day => day.calories > 0,
      ).length;

    return {
      dailyCalories,
      totalCalories,
      averageCalories,
      daysWithRecords,
    };
  }, [meals]);

  const hasGoal = caloriesGoal > 0;

  const difference =
    caloriesData.averageCalories -
    caloriesGoal;

  const isAboveGoal =
    hasGoal && difference > 0.01;

  const reachedGoal =
    hasGoal &&
    Math.abs(difference) <= 0.01;

  const percentage = hasGoal
    ? (caloriesData.averageCalories /
        caloriesGoal) *
      100
    : 0;

  /*
   * Evita barras maiores que o gráfico.
   * Também permite exibir refeições que
   * ultrapassaram a meta.
   */
  const chartMaximum = Math.max(
    caloriesGoal,
    ...caloriesData.dailyCalories.map(
      day => day.calories,
    ),
    1,
  );

  if (loading) {
    return (
      <article className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body min-h-[360px] items-center justify-center">
          <span className="loading loading-spinner loading-md text-primary" />
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">
            Consumo calórico
          </h2>

          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="card-title">
              Consumo calórico
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              Calorias registradas em cada um
              dos últimos sete dias
            </p>
          </div>

          {hasGoal && (
            <span
              className={`badge badge-lg ${
                isAboveGoal
                  ? 'badge-error'
                  : reachedGoal
                    ? 'badge-warning'
                    : 'badge-success'
              }`}
            >
              {isAboveGoal
                ? 'Acima da meta'
                : reachedGoal
                  ? 'Meta atingida'
                  : 'Abaixo da meta'}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3">
          <div>
            <p className="text-sm text-base-content/60">
              Média diária
            </p>

            <p className="text-4xl font-bold text-primary">
              {caloriesData.averageCalories.toFixed(
                0,
              )}
            </p>

            <p className="text-sm text-base-content/60">
              kcal por dia
            </p>
          </div>

          <div>
            <p className="text-sm text-base-content/60">
              Meta diária
            </p>

            <p className="text-2xl font-semibold">
              {hasGoal
                ? `${caloriesGoal.toFixed(
                    0,
                  )} kcal`
                : 'Não definida'}
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-2xl bg-base-200/60 p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-semibold">
                Últimos 7 dias
              </p>

              <p className="text-xs text-base-content/60">
                Passe o mouse sobre uma barra
                para ver o valor do dia
              </p>
            </div>

            {hasGoal && (
              <div className="flex items-center gap-2 text-xs text-base-content/70">
                <span className="h-0.5 w-5 bg-error" />

                <span>
                  Meta de{' '}
                  {caloriesGoal.toFixed(0)} kcal
                </span>
              </div>
            )}
          </div>

          <div className="relative">
            {hasGoal && (
              <div
                className="pointer-events-none absolute left-0 right-0 z-10 border-t-2 border-dashed border-error/70"
                style={{
                  bottom: `${Math.min(
                    (caloriesGoal /
                      chartMaximum) *
                      100,
                    100,
                  )}%`,
                }}
              />
            )}

            <div className="grid h-52 grid-cols-7 items-end gap-2 border-b border-base-300">
              {caloriesData.dailyCalories.map(
                day => {
                  const heightPercentage =
                    day.calories > 0
                      ? Math.max(
                          (day.calories /
                            chartMaximum) *
                            100,
                          4,
                        )
                      : 0;

                  const exceeded =
                    hasGoal &&
                    day.calories >
                      caloriesGoal;

                  return (
                    <div
                      key={day.dateKey}
                      className="group relative flex h-full items-end justify-center"
                    >
                      <div className="pointer-events-none absolute bottom-full z-20 mb-2 hidden min-w-max rounded-lg bg-neutral px-3 py-2 text-xs text-neutral-content shadow-lg group-hover:block">
                        <p className="font-semibold">
                          {day.dayLabel},{' '}
                          {day.dateLabel}
                        </p>

                        <p>
                          {day.calories.toFixed(
                            0,
                          )}{' '}
                          kcal
                        </p>

                        {hasGoal &&
                          day.calories > 0 && (
                            <p className="mt-1 opacity-80">
                              {exceeded
                                ? `${(
                                    day.calories -
                                    caloriesGoal
                                  ).toFixed(
                                    0,
                                  )} kcal acima da meta`
                                : `${(
                                    caloriesGoal -
                                    day.calories
                                  ).toFixed(
                                    0,
                                  )} kcal abaixo da meta`}
                            </p>
                          )}
                      </div>

                      {day.calories > 0 ? (
                        <div
                          className={`w-full max-w-10 rounded-t-lg transition-all hover:opacity-80 ${
                            exceeded
                              ? 'bg-error'
                              : 'bg-primary'
                          }`}
                          style={{
                            height: `${heightPercentage}%`,
                          }}
                        />
                      ) : (
                        <div className="mb-2 flex h-8 w-full max-w-10 items-center justify-center rounded-lg border border-dashed border-base-300 text-xs text-base-content/40">
                          0
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {caloriesData.dailyCalories.map(
                day => (
                  <div
                    key={day.dateKey}
                    className="text-center"
                  >
                    <p className="text-xs font-medium">
                      {day.dayLabel}
                    </p>

                    <p className="text-[10px] text-base-content/50">
                      {day.dateLabel}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              Média diária
            </p>

            <p className="mt-1 text-xl font-semibold">
              {caloriesData.averageCalories.toFixed(
                0,
              )}{' '}
              kcal
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              Percentual da meta
            </p>

            <p className="mt-1 text-xl font-semibold">
              {hasGoal
                ? `${percentage.toFixed(0)}%`
                : '—'}
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              Dias com registros
            </p>

            <p className="mt-1 text-xl font-semibold">
              {
                caloriesData.daysWithRecords
              }{' '}
              de 7
            </p>
          </div>
        </div>

        {hasGoal ? (
          <div
            className={`mt-4 rounded-xl border p-4 ${
              isAboveGoal
                ? 'border-error/30 bg-error/10'
                : reachedGoal
                  ? 'border-warning/30 bg-warning/10'
                  : 'border-success/30 bg-success/10'
            }`}
          >
            <p className="font-semibold">
              Como interpretar
            </p>

            <p className="mt-1 text-sm text-base-content/75">
              Nos últimos sete dias, você
              registrou uma média de{' '}
              <strong>
                {caloriesData.averageCalories.toFixed(
                  0,
                )}{' '}
                kcal por dia
              </strong>
              . Sua meta é de{' '}
              <strong>
                {caloriesGoal.toFixed(0)} kcal
                por dia
              </strong>
              .
            </p>

            <p className="mt-2 text-sm font-medium">
              {isAboveGoal
                ? `Isso representa uma média de ${Math.abs(
                    difference,
                  ).toFixed(
                    0,
                  )} kcal acima da meta por dia.`
                : reachedGoal
                  ? 'Sua média ficou igual à meta diária estabelecida.'
                  : `Isso representa uma média de ${Math.abs(
                      difference,
                    ).toFixed(
                      0,
                    )} kcal abaixo da meta por dia.`}
            </p>

            {caloriesData.daysWithRecords <
              7 && (
              <p className="mt-2 text-xs text-base-content/60">
                Atenção: existem dias sem
                refeições registradas. Esses
                dias entram no cálculo com 0
                kcal e reduzem a média.
              </p>
            )}
          </div>
        ) : (
          <div className="alert alert-warning mt-4">
            <span>
              Defina sua meta diária nas
              configurações para visualizar a
              comparação.
            </span>
          </div>
        )}
      </div>
    </article>
  );
}