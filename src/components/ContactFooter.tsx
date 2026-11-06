import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Instagram, 
  Send, 
  Check, 
  ArrowUp, 
  FileText, 
  ExternalLink,
  Copy,
  Clock,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileInfo } from '../types/portfolio';

interface ContactFooterProps {
  profile: ProfileInfo;
  onOpenCvModal: () => void;
  isAdmin?: boolean;
  onOpenAdminModal?: () => void;
  onLogoutAdmin?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ 
  profile, 
  onOpenCvModal,
  isAdmin = false,
  onOpenAdminModal,
  onLogoutAdmin
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form states
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Software Engineering Internship');
  const [message, setMessage] = useState('');

  // Live Local Time in WIB (Indonesia Western Time)
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Jakarta/WIB
      const timeString = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setLocalTime(`${timeString} WIB (UTC+7)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open email client with pre-filled content
    const subject = encodeURIComponent(`[Portfolio Inquiry - ${inquiryType}] From ${senderName}`);
    const body = encodeURIComponent(`Nama: ${senderName}\nEmail: ${senderEmail}\nKategori: ${inquiryType}\n\nPesan:\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      id="contact" 
      className="pt-20 pb-12 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Contact Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Left Column: Direct Inquiries & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-3">
                <span>Inquiries & Collaboration</span>
                <span aria-hidden="true">·</span>
                <span>Get in Touch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                Let's build something deliberate.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Tertarik mendiskusikan peluang magang software engineering, pengembangan sistem web performa tinggi, atau proyek fotografi? Silakan hubungi saya melalui form atau saluran langsung di bawah ini.
              </p>

              {/* Direct Channels */}
              <div className="mt-8 space-y-3 text-xs sm:text-sm font-mono">
                {/* Email Channel */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0" />
                    <span className="text-neutral-800 dark:text-neutral-200 truncate">{profile.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shrink-0"
                    title="Salin email"
                  >
                    {copiedEmail ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <Check className="w-3 h-3" /> Disalin
                      </span>
                    ) : (
                      <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Salin
                      </span>
                    )}
                  </button>
                </div>

                {/* LinkedIn Quick Access */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2.5 overflow-hidden mr-2">
                    <Linkedin className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0" />
                    <span className="text-neutral-800 dark:text-neutral-200 truncate">
                      {profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopyLinkedin}
                      className="px-2 py-1 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
                      title="Salin link LinkedIn"
                    >
                      {copiedLinkedin ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-sans font-medium rounded transition-colors"
                    >
                      <span>Buka</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Timezone & Availability Strip */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Waktu Lokal: {localTime || 'Memuat...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                <span>Status: Terbuka untuk magang & proyek kolaborasi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 bg-neutral-50/40 dark:bg-neutral-900/40">
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-1">
                Kirim Pesan Langsung
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 font-mono">
                Formulir ini akan menghubungkan Anda langsung melalui email klien.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex Pratama"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Kategori Keperluan / Project Scope
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  >
                    <option value="Software Engineering Internship">Peluang Magang Software Engineering</option>
                    <option value="Web / Fullstack Development Project">Proyek Pengembangan Web / Aplikasi</option>
                    <option value="Photography Commission / Session">Sesi Fotografi / Kolaborasi Visual</option>
                    <option value="Academic / Research Discussion">Diskusi Riset / Komputasi / Skripsi</option>
                    <option value="General Greetings">Sapaan & Koneksi Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Pesan / Ringkasan Kebutuhan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan ide, scope proyek, atau detail pertanyaan Anda..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-neutral-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-semibold rounded-xl transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan</span>
                  </button>

                  {formSubmitted && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Email client terbuka!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <div>
            <span>© {new Date().getFullYear()} Daffa Faiz. Built with React & Tailwind CSS.</span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              Instagram
            </a>

            <button
              onClick={onOpenCvModal}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              <span>CV</span>
            </button>

            {/* Admin Access Toggle Button */}
            {isAdmin ? (
              <button
                onClick={onLogoutAdmin}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-80 transition-opacity"
                title="Klik untuk keluar dari Mode Admin"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admin Aktif (Keluar)</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                title="Masuk ke mode admin untuk mengelola proyek"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Access</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1 pl-2 border-l border-neutral-300 dark:border-neutral-700"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Ke Atas</span>
            </button>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};
