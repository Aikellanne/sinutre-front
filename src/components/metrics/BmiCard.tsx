import { useEffect, useState } from 'react';
import { getProfile } from '@/services/profileService';

interface BmiResult {
  value: number;
  classification: string;
  badgeClass: string;
  message: string;
}

function calculateBmi(
  weight: number,
  height: number,
): BmiResult {
  const value = weight / (height * height);

  if (value < 18.5) {
    return {
      value,
      classification: 'Abaixo do peso',
      badgeClass: 'badge-warning',
      message:
        'Seu IMC está abaixo da faixa considerada adequada.',
    };
  }

  if (value < 25) {
    return {
      value,
      classification: 'Peso normal',
      badgeClass: 'badge-success',
      message:
        'Seu IMC está dentro da faixa considerada adequada.',
    };
  }

  if (value < 30) {
    return {
      value,
      classification: 'Sobrepeso',
      badgeClass: 'badge-warning',
      message:
        'Seu IMC está na faixa de sobrepeso.',
    };
  }

  if (value < 35) {
    return {
      value,
      classification: 'Obesidade grau I',
      badgeClass: 'badge-error',
      message:
        'Seu IMC está na faixa de obesidade grau I.',
    };
  }

  if (value < 40) {
    return {
      value,
      classification: 'Obesidade grau II',
      badgeClass: 'badge-error',
      message:
        'Seu IMC está na faixa de obesidade grau II.',
    };
  }

  return {
    value,
    classification: 'Obesidade grau III',
    badgeClass: 'badge-error',
    message:
      'Seu IMC está na faixa de obesidade grau III.',
  };
}

export function BmiCard() {
  const [weight, setWeight] = useState<number | null>(
    null,
  );
  const [height, setHeight] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        setError('');

        const profile = await getProfile();

        setWeight(profile.weight);
        setHeight(profile.height);
      } catch (error) {
        console.error(
          'Erro ao carregar dados do IMC:',
          error,
        );

        setError(
          'Não foi possível carregar os dados do IMC.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <article className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center justify-center">
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
            Índice de Massa Corporal
          </h2>

          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      </article>
    );
  }

  if (
    weight === null ||
    height === null ||
    weight <= 0 ||
    height <= 0
  ) {
    return (
      <article className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">
            Índice de Massa Corporal
          </h2>

          <div className="alert alert-warning">
            <span>
              Cadastre seu peso e sua altura nas
              configurações para visualizar o IMC.
            </span>
          </div>
        </div>
      </article>
    );
  }

  const bmi = calculateBmi(weight, height);

  return (
  <article className="card border border-base-300 bg-base-100 shadow-sm">
    <div className="card-body">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="card-title">
              Índice de Massa Corporal
            </h2>

            <span
              className={`badge ${bmi.badgeClass} badge-lg whitespace-nowrap`}
            >
              {bmi.classification}
            </span>
          </div>

          <p className="mt-4 text-sm text-base-content/60">
            Seu IMC
          </p>

          <p className="text-5xl font-bold text-primary">
            {bmi.value.toFixed(1)}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-md">
          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              Peso atual
            </p>

            <p className="mt-1 text-xl font-semibold">
              {weight.toFixed(1)} kg
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              Altura
            </p>

            <p className="mt-1 text-xl font-semibold">
              {height.toFixed(2)} m
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-base-200/60 p-4">
        <p className="text-sm text-base-content/70">
          {bmi.message}
        </p>
      </div>
    </div>
  </article>
);
}