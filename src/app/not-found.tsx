'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p
          className="text-[10rem] font-black text-white/10 leading-none select-none"
          variants={fadeInUp}
        >
          404
        </motion.p>

        <motion.h1
          className="text-3xl font-black text-white mt-2 mb-3"
          variants={fadeInUp}
        >
          Page introuvable
        </motion.h1>

        <motion.p
          className="text-white/50 text-base mb-10 max-w-sm mx-auto"
          variants={fadeInUp}
        >
          Cette page n&apos;existe pas ou a été déplacée.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-3 justify-center" variants={fadeInUp}>
          <Link
            href="/"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/dashboard"
            className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/5 transition-colors"
          >
            Aller au dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
