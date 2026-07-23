import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  className = '',
  children,
}: FormFieldProps) {
  return (
    <div className={`form-control ${className}`}>
      <label className="label" htmlFor={htmlFor}>
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );
}
