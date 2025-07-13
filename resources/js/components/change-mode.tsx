import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export function ChangeMode({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  const { appearance, updateAppearance } = useAppearance();

  const tabs: { value: Appearance; icon: LucideIcon;  }[] = [
    { value: 'light', icon: Sun},
    { value: 'dark', icon: Moon},
  ];

  return (
    <div className={cn('flex justify-end gap-1 rounded-lg p-1', className)} {...props}>
      {tabs.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => updateAppearance(value)}
          className={cn(
            'rounded-md px-3.5 py-1.5 transition-colors',
            appearance === value
              ? 'bg-white dark:bg-neutral-700 dark:text-neutral-100'
              : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
          )}
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}
