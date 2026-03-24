import React from 'react';
import { motion } from 'motion/react';
import { useCountUp } from '../utils/useCountUp';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  format?: boolean;
  prefix?: string;
}

const stats: StatItemProps[] = [
  { value: 34, suffix: '%', label: 'Avg conversion lift' },
  { value: 2300000, suffix: '', label: 'DMs automated', format: true },
  { value: 180, suffix: '+', label: 'Brands trust us' },
  { value: 48, suffix: 'hr', label: 'Time to value', prefix: '<' },
];

const StatItem: React.FC<StatItemProps> = ({ value, suffix, label, format, prefix }) => {
  const { ref, count } = useCountUp(value, 2000);
  const display = format ? (count >= 1000000 ? `${(count / 1000000).toFixed(1)}M` : count >= 1000 ? `${(count / 1000).toFixed(0)}K` : count.toString()) : count.toLocaleString();

  return (
    <div className="text-center px-4 py-3 md:py-0">
      <p className="text-2xl md:text-3xl font-display font-bold text-gray-950">
        <span ref={ref}>{prefix}{display}{suffix}</span>
      </p>
      <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 md:py-16 border-y border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-gray-200">
          {stats.map(({ value, suffix, label, format, prefix }, i) => (
            <StatItem key={i} value={value} suffix={suffix} label={label} format={format} prefix={prefix} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
