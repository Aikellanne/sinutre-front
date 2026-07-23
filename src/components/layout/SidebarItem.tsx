import { NavLink } from 'react-router-dom';
import type { Icon } from '@phosphor-icons/react';

interface SidebarItemProps {
  label: string;
  Icon: Icon;
  expanded: boolean;
  to:string;
}

export function SidebarItem({
  label,
  Icon,
  to,
  expanded
}: SidebarItemProps) {
  return (
    <li className="w-full px-3">
      <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }) =>
         `flex items-center gap-3 w-full rounded-xl px-3 py-3 transition-all duration-200
        ${
          isActive ? 'bg-primary text-primary-content font-semibold shadow-sm' : 'text-base-content hover:bg-primary/10 hover:text-primary'
          }`
        }
      >
        <Icon size={22} weight=  "regular" />
        {expanded && <span>{label}</span>}
      </NavLink>
    </li>
  );
}