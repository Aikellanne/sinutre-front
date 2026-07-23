import { List } from '@phosphor-icons/react';

interface SimpleHeaderProps {
  title: string;
  subtitle?: string;
}

const DRAWER_ID = 'main-drawer';

export function SimpleHeader({ title, subtitle }: SimpleHeaderProps) {
  return (
    <header className="flex flex-col justify-items-start items-start gap-2">
      <div className="flex-none lg:hidden">
        <label
          htmlFor={DRAWER_ID}
          className="btn btn-square btn-ghost drawer-button"
          aria-label="Abrir menu"
        >
          <List size={24} />
        </label>
      </div>

      

      <h1 className="text-base lg:text-4xl font-bold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm lg:text-base text-base-content/70">
          {subtitle}
        </p>
      )}
    </header>
  );
}
