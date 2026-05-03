import { ArrowUpRight, Menu, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = ['How it works', 'Proof', 'Pricing'];

export default function HeaderPrototype() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <header className="flex h-16 items-center justify-between rounded-md border border-gray-200 bg-white px-4">
        <motion.a
          href="#"
          className="group flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 360, damping: 18 }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-950 text-white transition-colors group-hover:bg-teal-700">
            <Zap className="h-4 w-4" />
          </span>
          <span className="text-base font-bold tracking-tight text-gray-950">GrowthSync</span>
        </motion.a>

        <nav className="hidden items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-full px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-white hover:text-gray-950 hover:shadow-sm"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href="#" className="rounded-full px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-950">
            Log in
          </a>
          <motion.a
            href="#"
            className="group flex h-9 items-center gap-1 rounded-full bg-gray-950 px-4 text-xs font-semibold text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get started
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-gray-950 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </motion.a>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-950 md:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
      </header>
    </div>
  );
}
