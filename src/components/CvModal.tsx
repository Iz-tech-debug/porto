import React, { useEffect, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Linkedin, 
  Mail, 
  Check, 
  ExternalLink,
  GraduationCap,
  Code2,
  Camera,
  Layers
} from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyLinkedin = () => {
    navigator.clipboard.writeText(profile.linkedinUrl);
    setCopiedLinkedin(true);
    setTimeout(() => setCopiedLinkedin(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# ${profile.name}
**${profile.title}**
Email: ${profile.email} | LinkedIn: ${profile.linkedinUrl} | GitHub: ${profile.githubUrl}
Location: ${profile.location} | Status: ${profile.status}

---

## Ringkasan Profesional / Professional Summary
${profile.bio}

---

## Pendidikan / Education
- **${profile.major}** — ${profile.university} (Expected 2026/2027)
  - Fokus: Arsitektur Perangkat Lunak, Algoritma & Struktur Data, Computer Vision, Sistem Terdistribusi.
  - Prestasi & Aktivitas: Asisten Praktikum / Komunitas Pengembang & Fotografi Kampus.

---

## Proyek Rekayasa Perangkat Lunak / Software Engineering Projects
1. **VisionFlow — Darkroom EXIF & Filter Engine**
   - Tech: TypeScript, React, OpenCV.js, Tailwind CSS
   - Web application client-side untuk ekstraksi EXIF, analisis kurva histogram, dan adaptive monochrome rendering.

2. **ShutterLog — Mobile Exposure & Film Roll Management**
   - Tech: Flutter, Dart, SQLite, Node.js
   - Aplikasi mobile untuk logging aperture, shutter speed, dan push/pull chemical timing frame analog.

3. **NexusCloud — Distributed File & Media Storage Service**
   - Tech: Go, PostgreSQL, Docker, Redis, S3 API
   - Layanan penyimpanan file RAW terdistribusi dengan deduplikasi hash dan chunk streaming.

---

## Pengalaman & Pencapaian Fotografi / Photography Experience
- **Fine Art Monochrome Photographer (2022 - Sekarang)**
  - Mengkhususkan diri pada fotografi arsitektur brutalist, street documentary, dan potret natural light.
  - Peralatan: Leica M10 Monochrom / Fujifilm X-Series, Lensa Prime 28mm & 35mm.
  - Kurasi pameran foto independen & publikasi zine visual monokrom.

---

## Keterampilan Teknis / Technical Skills
- **Bahasa Pemrograman:** Python, TypeScript, JavaScript, Go, SQL, C++
- **Framework & Libraries:** React, Vite, Tailwind CSS, Node.js, Express, OpenCV
- **Tools & Infrastruktur:** Git, Docker, Linux, PostgreSQL, Redis, Figma
- **Keahlian Fotografi:** Manual Exposure Triangle, Adobe Lightroom Classic, Fine Art B&W Tonal Grading, Composition & Lighting.
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Curriculum_Vitae.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden transition-all text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm tracking-tight uppercase text-neutral-700 dark:text-neutral-300">
              Curriculum Vitae Preview
            </span>
            <span className="hidden sm:inline-block text-xs text-neutral-500">
              · Ready for Print & PDF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
              title="Print directly or save as PDF via system dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Download CV as Markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span> .md
            </button>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span className="hidden sm:inline">LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:space-y-6">
          {/* Header Zone */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  {profile.name}
                </h1>
                <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {profile.title}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>{profile.location}</span>
                  <span aria-hidden="true">/</span>
                  <span>{profile.status}</span>
                </div>
              </div>

              {/* Quick Contact Badges */}
              <div className="no-print flex flex-col gap-2 shrink-0 sm:items-end text-xs">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.email}</span>
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : null}
                </button>
                <button
                  onClick={handleCopyLinkedin}
                  className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>{profile.linkedinUrl.replace('https://', '')}</span>
                  {copiedLinkedin ? <Check className="w-3 h-3 text-emerald-500" /> : null}
                </button>
              </div>
            </div>
          </div>

          {/* Professional Narrative */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              Profil & Ringkasan / Summary
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-3xl">
              {profile.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Pendidikan / Education
              </h2>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50/50 dark:bg-neutral-800/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  {profile.major}
                </span>
                <span className="text-xs font-mono text-neutral-500">2024 — Sekarang (Semester 3)</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                {profile.university}
              </p>
              <div className="mt-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-900 dark:text-neutral-200">Relevan Coursework:</span>{' '}
                Algoritma & Struktur Data, Arsitektur Sistem Komputer, Basis Data Terdistribusi, Pengolahan Citra Digital (Computer Vision), Pemrograman Web & Mobile, Rekayasa Perangkat Lunak.
              </div>
            </div>
          </div>

          {/* Engineering Projects */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Selected Software Projects
              </h2>
            </div>
            <div className="space-y-3">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50/50 dark:bg-neutral-800/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                    VisionFlow — Darkroom EXIF & Filter Engine
                  </span>
                  <span className="text-xs font-mono text-neutral-500">TypeScript · React · OpenCV · WebAssembly</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Aplikasi web client-side untuk ekstraksi metadata gambar, analisis kurva tonal histogram, dan rendering filter film analog tanpa proses kompresi server.
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50/50 dark:bg-neutral-800/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                    ShutterLog — Mobile Exposure & Film Roll Management
                  </span>
                  <span className="text-xs font-mono text-neutral-500">Flutter · Dart · SQLite · Node.js</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Aplikasi seluler pendukung fotografer manual untuk sinkronisasi nilai aperture, shutter speed, dan kompensasi push/pull kimiawi setiap frame analog.
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50/50 dark:bg-neutral-800/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                    NexusCloud — Distributed File & Media Storage Service
                  </span>
                  <span className="text-xs font-mono text-neutral-500">Go · PostgreSQL · Docker · Redis</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Layanan mikro backend untuk pengarsipan file RAW beresolusi tinggi dengan deduplikasi hash SHA-256 dan streaming upload resumable.
                </p>
              </div>
            </div>
          </div>

          {/* Photography Experience */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Fotografi & Pengalaman Kreatif
              </h2>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  Visual Photographer & Curatorial Archival
                </span>
                <span className="text-xs font-mono text-neutral-500">2022 — Sekarang</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Fokus eksplorasi visual pada arsitektur, street documentary, still-life, dan potret dengan pencahayaan alami. Menguasai alur kerja pasca-produksi digital dan kurasi visual karya fotografi.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                <span>Leica M10 / Fujifilm X-Series</span>
                <span aria-hidden="true">·</span>
                <span>Adobe Lightroom Classic</span>
                <span aria-hidden="true">·</span>
                <span>Capture One Pro</span>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Ringkasan Kemampuan / Technical Competencies
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 bg-neutral-50/50 dark:bg-neutral-800/30">
                <span className="font-semibold block text-neutral-900 dark:text-neutral-100 mb-1">
                  Informatics & Software
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  TypeScript, Python, Go, C++, React, Node.js, Express, PostgreSQL, Redis, Docker, Git, REST APIs, Linux CLI.
                </p>
              </div>
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 bg-neutral-50/50 dark:bg-neutral-800/30">
                <span className="font-semibold block text-neutral-900 dark:text-neutral-100 mb-1">
                  Photography & Visual
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Manual Exposure Triangle, Monochrome Tonal Curve, Adobe Lightroom, Architectural Geometry Framing, Street Timing, Studio Lighting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="no-print flex items-center justify-between px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-500 shrink-0">
          <span>Gunakan dialog cetak browser untuk opsi "Save as PDF"</span>
          <div className="flex items-center gap-3">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:underline flex items-center gap-1 font-medium"
            >
              <Linkedin className="w-3.5 h-3.5" />
              Buka LinkedIn
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
