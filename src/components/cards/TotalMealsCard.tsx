import type { MealsSummary } from '@/types/meal';

interface TotalMealsCardProps {
  summary: MealsSummary;
}

export function TotalMealsCard({ summary }: TotalMealsCardProps) {
  return (
    <article className="card bg-base-100 shadow-sm">
      <div className="card-body justify-center items-center text-center py-10">
        <h2 className="card-title text-base-content/70 text-sm mb-2">
          Total de Refeições
        </h2>
        <div className="text-4xl lg:text-6xl font-black">{summary.total}</div>
        <p className="text-sm font-medium text-base-content/50 mt-2">
          {summary.thisMonth} neste mês / {summary.today} hoje
        </p>
      </div>
    </article>
  );
}
