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

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BmiCard />
        <AverageCaloriesCard />
      </section>
    </div>
  );
}