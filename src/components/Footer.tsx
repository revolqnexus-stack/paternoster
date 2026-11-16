'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper py-8 mt-12">
      <div className="page-container">
        <hr className="hairline mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[0.6875rem] font-mono text-muted uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Pater Noster</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-muted hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted hover:text-ink transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
