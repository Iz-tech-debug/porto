import React, { useState } from 'react';
import { 
  FileText, 
  Linkedin, 
  ArrowDown, 
  ExternalLink, 
  Check, 
  Camera, 
  Code2, 
  SlidersHorizontal 
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileInfo } from '../types/portfolio';
import heroPortrait from '../assets/images/hero_creative_portrait_1793889311483.jpg';

interface HeroProps {
  profile: ProfileInfo;
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenCvModal }) => {
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);
  const [isReticleActive, setIsReticleActive] = useState(false);

  const handleCopyLinkedin = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.linkedinUrl);
    setCopiedLinkedin(true);
    setTimeout(() => setCopiedLinkedin(false), 2200);
  };

  return (
    <motion.section 
      id="overview" 
      className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-neutral-200 dark:border-neutral-800"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Narrative */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Kicker / Editorial Subtitle (Clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-4">
              <span>Teknik Informatika</span>
              <span aria-hidden="true">·</span>
              <span>Visual Photographer</span>
            </div>

            {/* Display Headline with balanced text wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08] text-balance">
              Where algorithmic logic meets deliberate visual framing.
            </h1>

            {/* Lead Narrative Body */}
            <p className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
              Mahasiswa Teknik Informatika di Universitas Komputer Indonesia (UNIKOM) yang mendalami rekayasa perangkat lunak, sistem komputasi, dan arsitektur web modern — seraya mengasah naluri bercerita melalui karya fotografi visual berkarakter kuat.
            </p>

            {/* Dual CTAs & Integrated LinkedIn */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary CTA: Download CV */}
              <button
                type="button"
                onClick={onOpenCvModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-200 rounded-xl transition-all shadow-sm hover:translate-y-[-1px]"
              >
                <FileText className="w-4 h-4" />
                <span>Unduh / Preview CV</span>
              </button>

              {/* Secondary CTA: Quick LinkedIn Access with Direct Link & Copy */}
              <div className="inline-flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60 p-1">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  <span>Akses LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLinkedin}
                  className="px-2.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-950 dark:hover:text-white border-l border-neutral-200 dark:border-neutral-800 transition-colors"
                  title="Salin tautan LinkedIn"
                >
                  {copiedLinkedin ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="font-mono">Salin</span>
                  )}
                </button>
              </div>

              {/* Jump to Projects / Gallery links */}
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white py-2 px-2 transition-colors ml-1"
              >
                <span>Lihat Karya</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Micro Dual-Discipline Philosophy */}
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row gap-6 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-start gap-2.5">
                <Code2 className="w-4 h-4 mt-0.5 text-neutral-800 dark:text-neutral-200 shrink-0" />
                <div>
                  <span className="font-semibold block text-neutral-900 dark:text-neutral-200">The Computational Mind</span>
                  <span>Menyusun kode efisien, struktur data rapi, dan sistem web yang scalable.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Camera className="w-4 h-4 mt-0.5 text-neutral-800 dark:text-neutral-200 shrink-0" />
                <div>
                  <span className="font-semibold block text-neutral-900 dark:text-neutral-200">The Visual Eye</span>
                  <span>Menangkap bayangan kontras, geometri arsitektur, dan momen manusiawi.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Container (Matching Height, Camera Viewfinder Motif) */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="relative w-full max-w-md lg:max-w-none group cursor-pointer"
              onMouseEnter={() => setIsReticleActive(true)}
              onMouseLeave={() => setIsReticleActive(false)}
            >
              {/* Media Container with Hairline Border */}
              <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-neutral-900 shadow-xl">
                <img
                  src={heroPortrait}
                  alt="Daffa Faiz holding a 35mm rangefinder camera in a studio environment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover contrast-105 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                {/* Subtle Measured Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Camera Viewfinder Crosshairs (Minimalist interactive aesthetic) */}
                <div className="absolute inset-6 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between text-neutral-400/80">
                    <span className="w-3.5 h-3.5 border-t-2 border-l-2 border-white/60" />
                    <span className="w-3.5 h-3.5 border-t-2 border-r-2 border-white/60" />
                  </div>

                  {/* Center Reticle */}
                  <div className="self-center flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full border border-white/40 flex items-center justify-center transition-all duration-300 ${isReticleActive ? 'scale-110 border-white/80 bg-white/10' : 'scale-90'}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    </div>
                  </div>

                  <div className="flex justify-between text-neutral-400/80">
                    <span className="w-3.5 h-3.5 border-b-2 border-l-2 border-white/60" />
                    <span className="w-3.5 h-3.5 border-b-2 border-r-2 border-white/60" />
                  </div>
                </div>

                {/* EXIF Data Strip Inside Media Bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-mono pointer-events-none">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-white/70" />
                    <span>35mm · f/1.4 · 1/250s · ISO 400</span>
                  </div>
                  <span className="text-white/60 text-[11px]">PHOTOGRAPHY</span>
                </div>
              </div>

              {/* Status Note Under Image */}
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1 font-mono">
                <span>Subject: Daffa Faiz Alghozi</span>
                <span>Bandung / Indonesia</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Full-width 4-Column Metric Strip (Placed below the hero split per guidelines) */}
        <motion.div 
          className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums tracking-tight">
              Semester 3
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Teknik Informatika · UNIKOM
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums tracking-tight">
              12+
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Software Repositories & Modules
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums tracking-tight">
              400+
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Koleksi & Arsip Foto
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums tracking-tight">
              Ready
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Open for Internships & Projects
            </span>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
