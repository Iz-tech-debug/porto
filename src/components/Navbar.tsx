import React, { useState } from 'react';
import { Sun, Moon, FileText, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCvModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCvModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Projects', href: '#projects' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-10 h-18">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <a 
          href="#overview" 
          className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          dappaizi
        </a>

        {/* Zone 2: Navigation Links (Single Line, 4-5 items) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-neutral-900 dark:after:bg-white after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button: Download CV */}
          <button
            type="button"
            onClick={onOpenCvModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:text-neutral-950 dark:bg-neutral-100 dark:hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
            <a
              href="https://www.linkedin.com/in/daffa-faiz-alghozi-1bb92b312/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
