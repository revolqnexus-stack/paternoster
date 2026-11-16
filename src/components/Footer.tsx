'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-paper border-hairline relative overflow-hidden">
      <div className="relative z-10">
        {/* Ghost wordmark — light */}
        <span className="ghost-text absolute top-[-1.5rem] left-1/2 -translate-x-1/2" aria-hidden="true">
          PATER NOSTER
        </span>

        <div className="page-container relative z-1">
          {/* 4-column grid */}
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-col">
              <span className="footer-brand">PATER NOSTER</span>
              <p className="footer-desc">
                Independent journal of writing and ideas. Essays, reviews,
                criticism — and the books and objects that accompany them.
              </p>
              <p className="footer-small">India · 2025</p>
            </div>

            {/* Navigate */}
            <div className="footer-col">
              <span className="footer-label">Navigate</span>
              <div className="flex flex-col gap-2">
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/"
                  className="footer-link"
                >
                  Home
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/products"
                  className="footer-link"
                >
                  Shop
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/about"
                  className="footer-link"
                >
                  About
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/contact"
                  className="footer-link"
                >
                  Contact
                </motion.a>
              </div>
            </div>

            {/* Services */}
            <div className="footer-col">
              <span className="footer-label">Services</span>
              <div className="flex flex-col gap-2">
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/products"
                  className="footer-link"
                >
                  Books
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/collections/books"
                  className="footer-link"
                >
                  Collections
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="/about"
                  className="footer-link"
                >
                  Journal
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://www.lrb.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link italic"
                >
                  The LRB
                </motion.a>
              </div>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <span className="footer-label">Contact</span>
              <div className="flex flex-col gap-2">
                <motion.a
                  whileHover={{ x: 5 }}
                  href="tel:+917306085895"
                  className="footer-link"
                >
                  +91 73060 85895
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="mailto:hello@paternoster.in"
                  className="footer-link"
                >
                  hello@paternoster.in
                </motion.a>
                <span className="footer-link">India</span>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://wa.me/917306085895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-whatsapp"
                >
                  WHATSAPP US →
                </motion.a>
              </div>
            </div>
          </div>

          <hr className="hairline mb-12" />

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="footer-bottom relative z-1"
          >
            <span>© {new Date().getFullYear()} PATER NOSTER</span>
            <span className="text-accent">paternoster.in</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
