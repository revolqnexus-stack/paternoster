'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper py-16 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="page-container"
      >
        <hr className="hairline mb-12" />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 gap-8 mb-12"
        >
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Pater Noster
            </h3>
            <p className="font-serif-body text-sm text-muted leading-relaxed max-w-[45ch]">
              Independent journal of writing and ideas. Essays, reviews,
              criticism — and the books and objects that accompany them.
            </p>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/products"
                  className="text-muted hover:text-ink transition-colors text-sm font-serif-body"
                >
                  All Products
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/collections/books"
                  className="text-muted hover:text-ink transition-colors text-sm font-serif-body"
                >
                  Books
                </motion.a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Journal
            </h3>
            <ul className="space-y-2">
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/about"
                  className="text-muted hover:text-ink transition-colors text-sm font-serif-body"
                >
                  Essays
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/about"
                  className="text-muted hover:text-ink transition-colors text-sm font-serif-body"
                >
                  Reviews
                </motion.a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Visit
            </h3>
            <ul className="space-y-2">
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://www.lrb.co.uk/"
                  className="text-muted hover:text-ink transition-colors text-sm font-serif-body italic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The London Review of Books
                </motion.a>
              </li>
            </ul>
          </div>
        </motion.div>

        <hr className="hairline mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[0.6875rem] font-mono text-muted uppercase tracking-wider"
        >
          <p>© {new Date().getFullYear()} Pater Noster</p>
          <div className="flex gap-6">
            <motion.a
              whileHover={{ x: 5 }}
              href="/privacy"
              className="text-muted hover:text-ink transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href="/terms"
              className="text-muted hover:text-ink transition-colors"
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
