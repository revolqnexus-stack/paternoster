'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Aurora from '@/components/Aurora';

export default function Footer() {
  return (
    <footer className="bg-ink-black border-line">
      {/* Aurora champagne glow behind footer */}
      <div className="absolute inset-0 z-0 -z-10 pointer-events-none">
        <Aurora colorSticks={['#c9a266', '#efece3', '#c9a266']} amplitude={0.3} blend={0.2} />
      </div>

      <div className="footer-bg">
        <div className="footer-inner relative z-1">
          {/* Ghost wordmark — light on black */}
          <span className="footer-ghost absolute top-[-2rem] left-1/2 -translate-x-1/2" aria-hidden="true">
            PATER NOSTER
          </span>
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
                  href="/journal"
                  className="footer-link"
                >
                  Journal
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
              <span className="footer-label">Explore</span>
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

          <hr className="footer-divider" />

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="footer-bottom relative z-1"
          >
            <div className="footer-bottom-left">
              <span>© {new Date().getFullYear()} PATER NOSTER</span>
              <span className="text-dim">paternoster.in</span>
            </div>
            <div className="flex gap-4">
              <motion.a whileHover={{ x: 5 }} href="/privacy" className="footer-link text-[0.65rem]">Privacy Policy</motion.a>
              <motion.a whileHover={{ x: 5 }} href="/terms" className="footer-link text-[0.65rem]">Terms of Service</motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
