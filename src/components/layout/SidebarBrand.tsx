import { Plant } from '@phosphor-icons/react';

interface SidebarBrandProps {
  expanded: boolean;
}

export function SidebarBrand({ expanded }: SidebarBrandProps) {
  return (
    <div
      className={`flex items-center w-full h-20 border-b border-base-200 ${
        expanded ? 'justify-start px-6' : 'justify-center'
      }`}
    >
      <Plant size={28} weight="fill" className="text-primary" />
      {expanded && <span className="ml-3 font-bold text-lg">SiNutre</span>}
    </div>
  );
}
