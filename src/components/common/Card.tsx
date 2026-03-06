import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={'bg-white border border-stone-200/80 rounded-2xl shadow-[0_1px_3px_rgba(28,25,23,0.04)] ' + (padding ? 'p-5 ' : '') + className}>
      {children}
    </div>
  );
}
