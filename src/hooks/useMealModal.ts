import { useCallback, useState } from 'react';
import type { MealCategory } from '@/types/meal';

export function useMealModal() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<MealCategory | null>(null);

  const openWith = useCallback((category: MealCategory) => {
    setSelectedCategory(category);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setSelectedCategory(null);
  }, []);

  return { open, selectedCategory, openWith, close };
}
