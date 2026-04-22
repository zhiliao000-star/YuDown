import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutGrid } from 'lucide-react';

export const WelcomePage: React.FC = () => {

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-white px-4">
      {/* Animated Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-200 blur-3xl filter"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -right-32 top-32 h-[500px] w-[500px] rounded-full bg-blue-100 blur-3xl filter"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e5322d] text-white shadow-xl">
            <LayoutGrid className="h-10 w-10" strokeWidth={2} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-5xl font-black tracking-tight text-gray-900 sm:text-7xl lg:text-[80px] leading-tight"
        >
          Your Files, Your Rules.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-8 text-xl font-medium text-gray-500 sm:text-2xl max-w-2xl mx-auto"
        >
          The ultimate web-based suite for all your document needs. Free, Fast, and Secure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/tools"
            className="group flex h-14 items-center justify-center gap-2 rounded-full bg-[#e5322d] px-8 text-lg font-bold text-white shadow-[0_8px_20px_rgba(229,50,45,0.4)] transition-all hover:bg-[#c82b27] hover:shadow-[0_12px_28px_rgba(229,50,45,0.5)] hover:-translate-y-1"
          >
            Get Started
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};