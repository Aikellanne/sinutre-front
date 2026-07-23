import { useEffect, useState } from 'react';
import { Plus } from '@phosphor-icons/react';

import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { AddFoodModal } from '@/components/modal/AddFoodModal';

import { getFoods, deleteFood } from '@/services/foodService';
import type { Food } from '@/types/food';

const MODAL_ID = 'create-food-modal';

export function DietFoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  async function loadFoods() {
    try {
      const data = await getFoods();
      setFoods(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(food: Food) {
    const confirmed = window.confirm(
      `Deseja excluir "${food.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteFood(food.id);
      await loadFoods();
    } catch {
      alert('Erro ao excluir alimento.');
    }
  }

  function openEditModal(food: Food) {
    setSelectedFood(food);

    (
      document.getElementById(
        MODAL_ID,
      ) as HTMLDialogElement
    )?.showModal();
  }

  function openCreateModal() {
    setSelectedFood(null);

    (
      document.getElementById(
        MODAL_ID,
      ) as HTMLDialogElement
    )?.showModal();
  }

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <SimpleHeader
        title="Dieta"
        subtitle="Gerencie seus alimentos"
      />

      {loading ? (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : foods.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold">
            Nenhum alimento cadastrado
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Clique no botão de adicionar para cadastrar seu primeiro alimento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
          {foods.map(food => (
            <div
              key={food.id}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="card-body p-5">
                <h2 className="card-title text-lg capitalize">
                  {food.name}
                </h2>

                <div className="space-y-2 mt-3 text-sm text-base-content/80">
                  <p>
                    🔥 {food.caloriesPer100g} kcal
                  </p>

                  <p>
                    🍞 Carboidratos: {food.carbsPer100g} g
                  </p>

                  <p>
                    🍗 Proteínas: {food.proteinPer100g} g
                  </p>

                  <p>
                    🥑 Gorduras: {food.fatPer100g} g
                  </p>
                </div>

                <div className="card-actions justify-end mt-5 pt-4 border-t border-base-200 gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => openEditModal(food)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(food)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        aria-label="Adicionar alimento"
        className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 shadow-xl hover:shadow-2xl z-50"
        onClick={openCreateModal}
      >
        <Plus size={24} weight="bold" />
      </button>

      <AddFoodModal
        modalId={MODAL_ID}
        onCreated={loadFoods}
        food={selectedFood}
      />
    </div>
  );
}