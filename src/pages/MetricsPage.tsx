import { AverageCaloriesCard } from '@/components/metrics/AverageCaloriesCard';
import { BmiCard } from '@/components/metrics/BmiCard';
import { SimpleHeader } from '@/components/layout/SimpleHeader';

export function MetricsPage() {
  return (
    <div className="space-y-6">
      <SimpleHeader
        title="Métricas"
        subtitle="Acompanhe seu IMC e seu consumo calórico."
      />

      <section className="mt-6 flex flex-col gap-6">
        <BmiCard />
        <AverageCaloriesCard />
      </section>
    </div>
  );
}