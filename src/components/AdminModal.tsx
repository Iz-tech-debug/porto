import React, { useState, useEffect } from 'react';
import { Lock, X, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setSuccess(false);
    }
  }, [isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = ['admin', 'admin123', 'daffafaiz', 'daffa'];
    
    if (validPasswords.includes(password.trim().toLowerCase())) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 600);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm">
              Admin Access Verification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Masukkan kata sandi pengelola untuk mengaktifkan tombol tambah, ekspor JSON, dan pengelolaan slot proyek.
          </p>

          <div>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Masukkan kata sandi..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            {error && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-mono">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Kata sandi salah. Coba: <code>admin123</code></span>
              </div>
            )}

            {success && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Akses berhasil diverifikasi! Membuka...</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">
              Default: admin123
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-lg transition-colors"
              >
                Verifikasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
