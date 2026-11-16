'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutClient() {
  return (
    <div className="page-wrap">
      <div className="page-container">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title mb-6"
        >
          About Pater Noster
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-serif-body text-lg leading-relaxed measure mb-6 text-ink"
        >
          Pater Noster is an independent journal of writing and ideas. We publish
          essays, reviews, and criticism — and the books and objects that
          accompany them.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-serif-body text-lg leading-relaxed measure mb-6 text-ink"
        >
          We believe in slow reading, in difficult books, in writing that takes
          its time. In the life of the mind.
        </motion.p>

        <hr className="section-divider my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="measure"
        >
          <h2 className="text-lg font-serif font-semibold mb-2 text-ink">
            Visit the Magazine
          </h2>
          <p className="font-serif-body text-sm text-muted mb-4">
            Discover the latest issue, subscribe, and explore the archive at{' '}
            <Link
              href="https://www.lrb.co.uk/"
              className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              lrb.co.uk
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
