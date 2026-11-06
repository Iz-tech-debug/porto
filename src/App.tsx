/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { PhotographyGallery } from './components/PhotographyGallery';
import { SkillBadges } from './components/SkillBadges';
import { ContactFooter } from './components/ContactFooter';
import { CvModal } from './components/CvModal';
import { AdminModal } from './components/AdminModal';
import { 
  initialProfile, 
  initialProjects, 
  initialPhotos, 
  initialSkills 
} from './data/portfolioData';
import { ProjectItem } from './types/portfolio';
import { HelpCircle, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  // Theme state: dark mode default with localStorage persistence
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    return true; // Default to dark monochrome
  });

  // Admin Mode state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('portfolio_is_admin') === 'true';
    }
    return false;
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [showHelper, setShowHelper] = useState(true);

  // Track page scroll progress with spring easing
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Sync theme class on <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.remove('bg-white', 'text-neutral-900');
      document.body.classList.add('bg-neutral-950', 'text-neutral-100');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('bg-neutral-950', 'text-neutral-100');
      document.body.classList.add('bg-white', 'text-neutral-900');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200 flex flex-col font-sans relative">
      {/* Thin fixed scroll progress bar at the very top of the screen */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-neutral-950 dark:bg-white z-50 origin-left pointer-events-none shadow-[0_1px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_1px_3px_rgba(255,255,255,0.2)]"
        style={{ scaleX }}
      />
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section: Dual Identity & Fast Actions */}
        <Hero
          profile={initialProfile}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* Project Grid: Pre-structured slots ready to fill */}
        <ProjectGrid
          projects={projects}
          onUpdateProjects={setProjects}
          isAdmin={isAdmin}
        />

        {/* Photography Gallery: High-contrast monochrome gallery with Lightbox & EXIF */}
        <PhotographyGallery
          photos={initialPhotos}
        />

        {/* Skill Badges: Informatics & Software vs Photography */}
        <SkillBadges
          skills={initialSkills}
        />
      </main>

      {/* Footer & Direct Contact Section with Admin Access Trigger */}
      <ContactFooter
        profile={initialProfile}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onLogoutAdmin={() => {
          setIsAdmin(false);
          sessionStorage.removeItem('portfolio_is_admin');
        }}
      />

      {/* CV Modal with PDF Print, Markdown Export & LinkedIn Integration */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        profile={initialProfile}
      />

      {/* Admin Mode Verification Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdmin(true);
          sessionStorage.setItem('portfolio_is_admin', 'true');
        }}
      />

      {/* Quick Setup Guide Drawer for the User (Only visible in Admin Mode, Dismissable) */}
      {isAdmin && showHelper && (
        <aside 
          aria-label="Petunjuk Pengisian Portofolio"
          className="fixed bottom-4 left-4 z-30 max-w-sm p-4 bg-white/95 dark:bg-neutral-900/95 border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl text-xs backdrop-blur-md transition-all animate-fadeIn"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
              <HelpCircle className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span>Admin Mode Aktif</span>
            </div>
            <button
              onClick={() => setShowHelper(false)}
              className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
              aria-label="Tutup petunjuk"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Anda sedang dalam <strong>Mode Admin</strong>. Anda dapat menambah proyek baru, mengedit proyek atau slot kosongan, dan mengekspor JSON data proyek.
          </p>
          <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>Admin status: Aktif</span>
            <button
              onClick={() => {
                setIsAdmin(false);
                sessionStorage.removeItem('portfolio_is_admin');
              }}
              className="text-red-500 hover:underline"
            >
              Keluar Admin
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
