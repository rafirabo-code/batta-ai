import type { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function PageContainer({ title, subtitle, children, action }: PageContainerProps) {
  return (
    <div className="p-8 max-w-[1440px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-stone-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
