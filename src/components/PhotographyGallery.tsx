import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  ArrowRight, 
  Maximize2, 
  SlidersHorizontal, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Camera,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PhotoItem } from '../types/portfolio';

interface PhotographyGalleryProps {
  photos: PhotoItem[];
}

export const PhotographyGallery: React.FC<PhotographyGalleryProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const currentPhoto = photos[currentIndex] || photos[0];

  // Auto-play interval and progress bar animation
  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % photos.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, photos.length]);

  // Reset progress when slide changes manually
  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        return;
      }

      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, photos.length]);

  // Scroll active thumbnail into view smoothly
  useEffect(() => {
    if (filmstripRef.current) {
      const activeEl = filmstripRef.current.children[currentIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <motion.section 
      id="gallery" 
      className="py-20 lg:py-28 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-950 transition-colors"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              <span>Editorial Showcase</span>
              <span aria-hidden="true">·</span>
              <span>Visual Photography</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              The Shutter Archive
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Showcase carousel fotografi interaktif dengan kurasi still-life, potret humanis, dan eksplorasi pencahayaan alami.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span className="hidden sm:inline">Navigasi: [←] [→] atau [Spasi] untuk jeda</span>
            <span className="px-2.5 py-1 rounded-md border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold">
              0{currentIndex + 1} / 0{photos.length}
            </span>
          </div>
        </div>

        {/* Outer Showcase Canvas / Frame (Modeled after Dribbble photography showcase) */}
        <div className="relative rounded-3xl bg-neutral-900 dark:bg-[#0e0e0e] border border-neutral-300/80 dark:border-neutral-800/90 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-12 text-white">
          
          {/* Main Stage: Central Featured Image + Side Information Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center min-h-[420px] lg:min-h-[480px]">
            
            {/* Left/Center Featured Photograph Viewport */}
            <div className="lg:col-span-7 flex justify-center">
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative group w-full max-w-md lg:max-w-lg aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 cursor-pointer shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhoto.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={currentPhoto.imageSrc}
                      alt={currentPhoto.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover contrast-105 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />

                    {/* Gradient scrim for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Camera Viewfinder Crosshairs on Hover */}
                    <div className="absolute inset-5 pointer-events-none flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-between text-white/80">
                        <span className="w-3.5 h-3.5 border-t-2 border-l-2 border-white" />
                        <span className="w-3.5 h-3.5 border-t-2 border-r-2 border-white" />
                      </div>
                      <div className="self-center w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span className="w-3.5 h-3.5 border-b-2 border-l-2 border-white" />
                        <span className="w-3.5 h-3.5 border-b-2 border-r-2 border-white" />
                      </div>
                    </div>

                    {/* Viewfinder Micro Metadata Overlay */}
                    <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                      <span className="flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3 h-3 text-neutral-300" />
                        {currentPhoto.exif.lens}
                      </span>
                      <span className="text-white/60">CLICK TO EXPAND</span>
                    </div>

                    {/* Expand icon pill on top right */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Information Panel (Matching Dribbble layout) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhoto.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* Category Kicker */}
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
                    <span>Series 0{currentIndex + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentPhoto.category}</span>
                  </div>

                  {/* Big Bold Headline in Condensed / High-Impact Display */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.05]">
                    {currentPhoto.title}
                  </h3>

                  {/* Poetic Editorial Description */}
                  <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-400 leading-relaxed max-w-lg">
                    {currentPhoto.description || 'Komposisi monokrom sunyi yang mengeksplorasi kontras cahaya, ritme bentuk, dan keseimbangan optis.'}
                  </p>

                  {/* View Details Action Link */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      className="group inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
                    >
                      <span className="border-b border-white group-hover:border-neutral-300 pb-0.5">
                        View Details
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Quick EXIF & Location Strip */}
                  <div className="pt-5 border-t border-neutral-800 text-xs font-mono text-neutral-400 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{currentPhoto.exif.camera}</span>
                      <span aria-hidden="true">·</span>
                      <span>{currentPhoto.exif.aperture} · {currentPhoto.exif.shutter} · ISO {currentPhoto.exif.iso}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{currentPhoto.exif.location} ({currentPhoto.exif.year})</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Next & Previous Step Buttons */}
              <div className="mt-8 pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors border border-neutral-700/50"
                  aria-label="Previous photo"
                  title="Foto sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors border border-neutral-700/50"
                  aria-label="Next photo"
                  title="Foto berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Horizontal Filmstrip / Thumbnail Reel (Matching Dribbble layout) */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div 
              ref={filmstripRef}
              className="flex items-end gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
            >
              {photos.map((photo, index) => {
                const isActive = index === currentIndex;
                const indexFormatted = index < 9 ? `0${index + 1}` : `${index + 1}`;

                return (
                  <div
                    key={photo.id}
                    onClick={() => handleSelectSlide(index)}
                    className="flex flex-col items-start shrink-0 cursor-pointer group"
                  >
                    {/* Thumbnail Card Frame */}
                    <div 
                      className={`relative w-16 h-22 sm:w-20 sm:h-28 rounded-lg overflow-hidden bg-neutral-950 transition-all duration-300 ${
                        isActive
                          ? 'ring-2 ring-white scale-105 shadow-lg'
                          : 'opacity-50 group-hover:opacity-90 border border-neutral-800'
                      }`}
                    >
                      <img
                        src={photo.imageSrc}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isActive ? 'scale-105 contrast-110' : 'group-hover:scale-105 contrast-100'
                        }`}
                      />
                    </div>

                    {/* Index Indicator below thumbnail (Matching "— 02" indicator) */}
                    <div className="mt-2 text-[11px] font-mono tracking-wider transition-colors">
                      {isActive ? (
                        <div className="flex items-center gap-1 font-bold text-white">
                          <span className="w-2.5 h-[1.5px] bg-white inline-block" />
                          <span>{indexFormatted}</span>
                        </div>
                      ) : (
                        <span className="text-neutral-500 group-hover:text-neutral-300 pl-0.5">
                          {indexFormatted}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Autoplay & Progress Scrubber Bar */}
          <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-4">
            {/* Round Play/Pause Toggle Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 flex items-center justify-center transition-all shadow-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
              title={isPlaying ? 'Jeda otomatis' : 'Mulai putar otomatis'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Progress Bar Track */}
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                const targetIndex = Math.floor(ratio * photos.length);
                handleSelectSlide(targetIndex);
              }}
              className="relative flex-1 h-1.5 bg-neutral-800 hover:bg-neutral-700/80 rounded-full cursor-pointer overflow-hidden transition-colors"
              title="Klik untuk melompat slide"
            >
              <div 
                className="absolute top-0 bottom-0 left-0 bg-white transition-all duration-75 rounded-full"
                style={{ 
                  width: `${((currentIndex + progress / 100) / photos.length) * 100}%` 
                }}
              />
            </div>

            {/* Time / State Indicator */}
            <span className="text-xs font-mono text-neutral-400 shrink-0">
              {isPlaying ? 'AUTOPLAY' : 'PAUSED'}
            </span>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
            aria-label="Tutup lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Main Container */}
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Main High-Res Image */}
            <div className="relative max-h-[72vh] flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={currentPhoto.imageSrc}
                alt={currentPhoto.alt}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto max-w-full object-contain contrast-105 shadow-2xl"
              />
            </div>

            {/* Bottom Detailed EXIF Drawer */}
            <div className="mt-4 w-full bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 text-white text-xs sm:text-sm font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-0.5">
                  <span>{currentPhoto.category}</span>
                  <span aria-hidden="true">/</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {currentPhoto.exif.location}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span>{currentPhoto.exif.year}</span>
                </div>
                <h4 className="font-bold text-white text-base font-sans uppercase">
                  {currentPhoto.title}
                </h4>
                {currentPhoto.subtitle && (
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">{currentPhoto.subtitle}</p>
                )}
              </div>

              {/* Full Camera EXIF Specs */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-300 border-t sm:border-t-0 sm:border-l border-neutral-800 pt-2 sm:pt-0 sm:pl-4">
                <div>
                  <span className="text-neutral-500 block text-[10px]">BODY</span>
                  <span>{currentPhoto.exif.camera}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">OPTICS</span>
                  <span>{currentPhoto.exif.lens}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">EXPOSURE</span>
                  <span>{currentPhoto.exif.shutter} · {currentPhoto.exif.aperture} · ISO {currentPhoto.exif.iso}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
