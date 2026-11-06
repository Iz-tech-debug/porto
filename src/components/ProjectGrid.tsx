import React, { useState } from 'react';
import { 
  Code2, 
  Plus, 
  ExternalLink, 
  Github, 
  Check, 
  Edit3, 
  Sparkles, 
  X,
  Copy
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectItem } from '../types/portfolio';

interface ProjectGridProps {
  projects: ProjectItem[];
  onUpdateProjects: (updated: ProjectItem[]) => void;
  isAdmin?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onUpdateProjects, isAdmin = false }) => {
  const [filter, setFilter] = useState<'All' | 'Completed' | 'In Progress' | 'Template'>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);

  // Form states for modal
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTechStack, setFormTechStack] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formLiveDemoUrl, setFormLiveDemoUrl] = useState('');
  const [formStatus, setFormStatus] = useState<ProjectItem['status']>('In Progress');
  const [formYear, setFormYear] = useState('2026');

  // If not admin, hide template placeholder cards completely
  const visibleProjects = isAdmin 
    ? projects 
    : projects.filter((p) => p.status !== 'Template');

  const filteredProjects = visibleProjects.filter((p) => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  const handleOpenEdit = (project: ProjectItem) => {
    setActiveModalProject(project);
    setIsNewProject(false);
    setFormTitle(project.title.replace(/^\[.*?\]\s*/, ''));
    setFormCategory(project.category);
    setFormDescription(project.description);
    setFormTechStack(project.techStack.join(', '));
    setFormGithubUrl(project.githubUrl || '');
    setFormLiveDemoUrl(project.liveDemoUrl || '');
    setFormStatus(project.status === 'Template' ? 'In Progress' : project.status);
    setFormYear(project.year);
  };

  const handleOpenCreate = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      category: 'Software Engineering',
      description: '',
      keyFeatures: [],
      techStack: ['TypeScript', 'React'],
      githubUrl: 'https://github.com/daffafaiz',
      liveDemoUrl: '',
      status: 'In Progress',
      year: new Date().getFullYear().toString(),
    };
    setActiveModalProject(newProj);
    setIsNewProject(true);
    setFormTitle('');
    setFormCategory('Web Application / AI');
    setFormDescription('');
    setFormTechStack('TypeScript, React, Node.js');
    setFormGithubUrl('https://github.com/daffafaiz');
    setFormLiveDemoUrl('');
    setFormStatus('In Progress');
    setFormYear('2026');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalProject) return;

    const updatedItem: ProjectItem = {
      ...activeModalProject,
      title: formTitle || 'Proyek Baru',
      category: formCategory || 'Engineering Project',
      description: formDescription || 'Deskripsi proyek perangkat lunak.',
      techStack: formTechStack.split(',').map((s) => s.trim()).filter(Boolean),
      githubUrl: formGithubUrl,
      liveDemoUrl: formLiveDemoUrl,
      status: formStatus,
      year: formYear,
    };

    if (isNewProject) {
      onUpdateProjects([updatedItem, ...projects]);
    } else {
      onUpdateProjects(
        projects.map((p) => (p.id === activeModalProject.id ? updatedItem : p))
      );
    }

    setActiveModalProject(null);
  };

  const handleCopyCodeSnippet = () => {
    const codeString = `// Salin konfigurasi project ke src/data/portfolioData.ts\nexport const initialProjects: ProjectItem[] = ${JSON.stringify(projects, null, 2)};`;
    navigator.clipboard.writeText(codeString);
    setCopyCodeSuccess(true);
    setTimeout(() => setCopyCodeSuccess(false), 2500);
  };

  return (
    <motion.section 
      id="projects" 
      className="py-20 lg:py-28 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              <span>Software Engineering</span>
              <span aria-hidden="true">·</span>
              <span>Informatics Projects</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                Selected Projects & Systems
              </h2>
              {isAdmin && (
                <span className="text-xs font-mono px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800">
                  Admin Active
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {isAdmin 
                ? 'Mode Admin aktif: Anda dapat menambah, mengedit rincian, dan mengisi slot template proyek.' 
                : 'Kumpulan repositori dan sistem rekayasa perangkat lunak yang telah dibangun.'}
            </p>
          </div>

          {/* Action buttons on top (Hidden for normal visitors, shown in Admin Mode) */}
          {isAdmin && (
            <div className="flex flex-wrap items-center gap-2.5 animate-fadeIn">
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-200 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Proyek Baru</span>
              </button>

              <button
                onClick={handleCopyCodeSnippet}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                title="Salin JSON semua proyek untuk disematkan permanen"
              >
                {copyCodeSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copyCodeSuccess ? 'Disalin ke Clipboard' : 'Ekspor JSON Proyek'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 dark:bg-neutral-900 rounded-xl max-w-fit mb-8 border border-neutral-200 dark:border-neutral-800">
          {(isAdmin
            ? (['All', 'Completed', 'In Progress', 'Template'] as const)
            : (['All', 'Completed', 'In Progress'] as const)
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === tab
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              {tab === 'Template' ? 'Template Kosongan' : tab}
            </button>
          ))}
        </div>

        {/* Projects Grid (Responsive 3-Column Baseline) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isTemplate = project.status === 'Template';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } 
                }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col justify-between p-6 rounded-2xl border bg-white dark:bg-neutral-900/80 ${
                  isTemplate
                    ? 'border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:shadow-md'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-sm hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Category & Status Header */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-3">
                    <span className="truncate">{project.category}</span>
                    <span className="shrink-0 text-[11px] px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Features Bullet List (if exists) */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      {project.keyFeatures.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-neutral-400 dark:text-neutral-600 select-none">›</span>
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer Zone: Tech Stack & Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  {/* Tech Stack Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4">
                    {project.techStack.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < project.techStack.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Bottom Action Links */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 text-xs">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white font-medium transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      ) : null}

                      {project.liveDemoUrl ? (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white font-medium transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      ) : null}
                    </div>

                    {/* Edit button (Admin only) */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(project)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                        title={isTemplate ? 'Isi template ini dengan data proyek Anda' : 'Edit rincian proyek'}
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isTemplate ? 'Isi Slot' : 'Edit'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Edit / Fill Project Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-900 dark:text-neutral-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <h3 className="font-bold text-base">
                  {isNewProject ? 'Tambah Proyek Baru' : 'Isi / Edit Proyek'}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Judul Proyek / Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Algorithmic Image Filter Studio"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="Web App / Computer Vision"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Template">Template</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Jelaskan masalah yang diselesaikan dan solusi arsitektur perangkat lunak Anda..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Tech Stack (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formTechStack}
                  onChange={(e) => setFormTechStack(e.target.value)}
                  placeholder="TypeScript, React, Python, PostgreSQL"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    GitHub URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formGithubUrl}
                    onChange={(e) => setFormGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Live Demo URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formLiveDemoUrl}
                    onChange={(e) => setFormLiveDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-lg font-semibold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.section>
  );
};
