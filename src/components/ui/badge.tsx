import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gray-950 text-white',
        secondary: 'border-transparent bg-gray-100 text-gray-900',
        outline: 'border-gray-200 text-gray-700',
        teal: 'border-teal-200 bg-teal-50 text-teal-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeProps = React.ComponentProps<'div'> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
