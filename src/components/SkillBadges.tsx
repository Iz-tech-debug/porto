import React, { useState } from 'react';
import { 
  Code2, 
  Camera, 
  Search, 
  Layers, 
  Terminal, 
  Sliders, 
  Cpu, 
  Eye 
} from 'lucide-react';
import { motion } from 'motion/react';
import { SkillItem } from '../types/portfolio';

interface SkillBadgesProps {
  skills: SkillItem[];
}

export const SkillBadges: React.FC<SkillBadgesProps> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'informatics' | 'photography'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills.filter((skill) => {
    const matchesTab = activeTab === 'All' || skill.category === activeTab;
    const matchesQuery = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const informaticsSkills = filteredSkills.filter((s) => s.category === 'informatics');
  const photographySkills = filteredSkills.filter((s) => s.category === 'photography');

  return (
    <motion.section 
      id="skills" 
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
              <span>Technical & Creative</span>
              <span aria-hidden="true">·</span>
              <span>Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Skill Matrix & Toolset
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Integrasi antara keahlian sains komputasi (software engineering, algoritma, basis data) dengan keterampilan fotografi (optik manual, kamar gelap digital, komposisi visual dan pencahayaan).
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kemampuan..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Tab Controls (Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 dark:bg-neutral-900 rounded-xl max-w-fit mb-10 border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'All'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Semua Skill ({filteredSkills.length})
          </button>
          <button
            onClick={() => setActiveTab('informatics')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'informatics'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Informatics & Software
          </button>
          <button
            onClick={() => setActiveTab('photography')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'photography'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Photography & Fine Art
          </button>
        </div>

        {/* Dual Matrix Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column 1: Informatics & Engineering */}
          {(activeTab === 'All' || activeTab === 'informatics') && (
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-neutral-900/60 shadow-sm"
            >
              <div className="flex items-center justify-between pb-5 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-neutral-950 dark:text-white">
                      Informatics & Engineering
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono">
                      Logic, Code, Architecture & DevOps
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {informaticsSkills.length} skills
                </span>
              </div>

              {/* Skills List */}
              <div className="mt-6 space-y-3">
                {informaticsSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 block">
                        {skill.name}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        {skill.subCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                      <span className="text-neutral-500">{skill.years}</span>
                      <span className="px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-700 dark:text-neutral-300">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Column 2: Photography & Visual Craft */}
          {(activeTab === 'All' || activeTab === 'photography') && (
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-neutral-900/60 shadow-sm"
            >
              <div className="flex items-center justify-between pb-5 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-neutral-950 dark:text-white">
                      Photography & Visual Direction
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono">
                      Optics, Light, Monochrome Grading
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {photographySkills.length} skills
                </span>
              </div>

              {/* Skills List */}
              <div className="mt-6 space-y-3">
                {photographySkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 block">
                        {skill.name}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        {skill.subCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                      <span className="text-neutral-500">{skill.years}</span>
                      <span className="px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-700 dark:text-neutral-300">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </motion.section>
  );
};
