import { ProfileInfo, ProjectItem, PhotoItem, SkillItem } from '../types/portfolio';

// Gambar lokal yang di-generate dengan fine art monochrome photography
import heroPortrait from '../assets/images/hero_creative_portrait_1793889311483.jpg';
import galleryArch from '../assets/images/gallery_arch_geometry_1793889311039.jpg';
import galleryPortrait from '../assets/images/gallery_moody_portrait_1793889312537.jpg';
import galleryStreet from '../assets/images/gallery_street_rain_1793889313762.jpg';
import galleryLandscape from '../assets/images/gallery_minimal_landscape_1793889313065.jpg';

export const initialProfile: ProfileInfo = {
  name: 'Daffa Faiz Alghozi',
  shortName: 'dappaizi',
  title: 'Mahasiswa Teknik Informatika & Fotografer',
  subtitle: 'Code & Shutter: Bridging Computational Systems and Visual Photography',
  major: 'Teknik Informatika (Informatics Engineering)',
  university: 'Universitas Komputer Indonesia (UNIKOM)',
  location: 'Bandung, Indonesia (WIB / GMT+7)',
  status: 'Mahasiswa Semester 3 · Terbuka untuk Magang & Proyek Fotografi',
  email: 'daffa.f.alghozi@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/daffa-faiz-alghozi-1bb92b312/',
  githubUrl: 'https://github.com/daffafaiz',
  instagramUrl: 'https://instagram.com/dappaizi',
  unsplashUrl: 'https://unsplash.com/@daffafaiz',
  bio: 'Mahasiswa Teknik Informatika di Universitas Komputer Indonesia (Semester 3) yang mendalami rekayasa perangkat lunak, arsitektur data, dan pengembangan web modern seraya mengasah kepekaan visual fotografi melalui komposisi, pencahayaan alami, dan dokumentasi momen autentik.',
};

/**
 * Grid Project Templates
 * Pengguna dapat langsung mengisi / mengedit daftar di bawah ini
 * atau menggunakan tombol "Quick Add / Edit Project" di interface.
 */
export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'VisionFlow — Darkroom EXIF & Computational Filter Engine',
    category: 'Computer Vision & Web App',
    description: 'Aplikasi berbasis web untuk ekstraksi metadata gambar, analisis histogram otomatis, dan penerapan filter film monokrom analog berbasis WebAssembly dan OpenCV.',
    keyFeatures: [
      'Ekstraksi EXIF metadata instan langsung di sisi client',
      'Algoritma adaptif black-and-white tonal mapping',
      'Export preset kamera format JSON dan LUT'
    ],
    techStack: ['TypeScript', 'React', 'OpenCV.js', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/daffafaiz/vision-flow',
    liveDemoUrl: 'https://vision-flow-demo.vercel.app',
    status: 'Completed',
    year: '2026',
  },
  {
    id: 'proj-2',
    title: 'ShutterLog — Mobile Exposure & Film Roll Management',
    category: 'Mobile Application',
    description: 'Sistem pencatatan eksposur manual bagi fotografer analog: aperture, shutter speed, lokasi GPS, dan kompensasi push/pull processing untuk setiap frame rol film.',
    keyFeatures: [
      'Penyimpanan offline-first dengan sinkronisasi cloud',
      'Geo-tagging otomatis lokasi pemotretan',
      'Kalkulator exposure reciprocity failure'
    ],
    techStack: ['Flutter', 'Dart', 'SQLite', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/daffafaiz/shutterlog-app',
    liveDemoUrl: 'https://shutterlog.dev',
    status: 'In Progress',
    year: '2026',
  },
  {
    id: 'proj-3',
    title: 'NexusCloud — Distributed File & Media Storage Service',
    category: 'Backend & Cloud Systems',
    description: 'Layanan backend terdistribusi untuk pengarsipan file RAW foto berukuran besar dengan deduplikasi hash otomatis dan kompresi tanpa kehilangan resolusi.',
    keyFeatures: [
      'Streaming upload multi-part dengan resumable chunking',
      'RESTful API terdokumentasi OpenAPI / Swagger',
      'Docker containerized deployment dengan load balancing'
    ],
    techStack: ['Go (Golang)', 'PostgreSQL', 'Docker', 'Redis', 'AWS S3 API'],
    githubUrl: 'https://github.com/daffafaiz/nexus-cloud-storage',
    liveDemoUrl: 'https://api.nexuscloud.dev',
    status: 'Completed',
    year: '2025',
  },
  {
    id: 'proj-4',
    title: '[Project Slot 4: Isi Judul Project Anda]',
    category: 'Software Engineering / AI',
    description: 'Slot kosong ini siap Anda isi dengan proyek skripsi, tugas besar kuliah, capstone project, atau kontribusi open-source Anda.',
    keyFeatures: [
      'Fitur utama 1 (masukkan ringkasan fitur)',
      'Fitur utama 2 (masukkan integrasi backend/frontend)',
      'Fitur utama 3 (masukkan metrik performa)'
    ],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js'],
    githubUrl: 'https://github.com/daffafaiz',
    liveDemoUrl: 'https://example.com',
    status: 'Template',
    year: '2026',
  },
  {
    id: 'proj-5',
    title: '[Project Slot 5: Isi Judul Project Anda]',
    category: 'Web / IoT / Machine Learning',
    description: 'Slot kosong kedua untuk mendokumentasikan riset komputasi atau aplikasi web inovatif yang telah Anda kembangkan selama kuliah.',
    keyFeatures: [
      'Arsitektur bersih dan responsif',
      'Database querying yang teroptimasi',
      'Integrasi autentikasi & keamanan'
    ],
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com/daffafaiz',
    liveDemoUrl: '',
    status: 'Template',
    year: '2026',
  },
  {
    id: 'proj-6',
    title: '[Project Slot 6: Isi Judul Project Anda]',
    category: 'UI/UX & Frontend System',
    description: 'Slot kosong ketiga untuk menampilkan design system, micro-frontend, atau eksplorasi algoritma grafika komputer.',
    keyFeatures: [
      'Desain responsif mobile hingga 4K',
      'Aksesibilitas WCAG AA',
      'Performa skor Lighthouse 95+'
    ],
    techStack: ['TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/daffafaiz',
    liveDemoUrl: '',
    status: 'Template',
    year: '2025',
  },
];

export const initialPhotos: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'NATURE MORTE',
    subtitle: 'Still Life & Contrast Exploration',
    description: 'Komposisi still-life sunyi yang mengeksplorasi cahaya, tekstur, bentuk, dan keseimbangan optik, mengubah objek sehari-hari menjadi narasi visual berkelas dengan perspektif kontemporer puitis.',
    category: 'Minimal',
    imageSrc: galleryLandscape,
    alt: 'Minimalist long exposure fine art monochrome landscape of a wooden pier over serene misty water',
    exif: {
      camera: 'Nikon Z6 II',
      lens: 'Nikkor Z 24-70mm f/4 S',
      shutter: '30s Long Exp',
      aperture: 'f/11',
      iso: '64',
      location: 'Lake Constance Horizon',
      year: '2025',
    },
    aspectRatio: '16:9',
  },
  {
    id: 'photo-2',
    title: 'BRUTALIST ANGLES',
    subtitle: 'Monolithic Daylight & Shadows',
    description: 'Geometri arsitektur brutalist dengan bayangan kontras tinggi dan garis-garis beton presisi. Menghubungkan ketegasan struktural bangunan dengan ritme matematis dalam bidang fotografi.',
    category: 'Architecture',
    imageSrc: galleryArch,
    alt: 'High-contrast black and white brutalist architectural geometry with deep cast shadows',
    exif: {
      camera: 'Leica M10 Monochrom',
      lens: 'Summicron-M 28mm f/2 ASPH',
      shutter: '1/500s',
      aperture: 'f/8.0',
      iso: '100',
      location: 'National Gallery Pavilion',
      year: '2026',
    },
    aspectRatio: '4:3',
  },
  {
    id: 'photo-3',
    title: 'WINDOW CONTOUR',
    subtitle: 'Natural Light & Shadow Patterns',
    description: 'Potret editorial ekspresif dengan pencahayaan jendela utara alami. Pola bayangan geometris membingkai ekspresi subjek secara tenang dan intim tanpa lampu kilat buatan.',
    category: 'Portraits',
    imageSrc: galleryPortrait,
    alt: 'Moody natural window light black and white portrait with delicate shadow grid',
    exif: {
      camera: 'Fujifilm X-Pro3',
      lens: 'Fujinon XF 35mm f/1.4 R',
      shutter: '1/160s',
      aperture: 'f/1.4',
      iso: '320',
      location: 'Studio North Light',
      year: '2026',
    },
    aspectRatio: '3:4',
  },
  {
    id: 'photo-4',
    title: 'NOCTURNE TRANSIT',
    subtitle: 'Street Reflections in the Rain',
    description: 'Suasana jalanan malam hari saat hujan basah memantulkan cahaya lampu merkuri kota tua. Siluet payung tunggal melangkah di atas batu cobblestone yang berkilau dalam gradasi monokrom Leica.',
    category: 'Street',
    imageSrc: galleryStreet,
    alt: 'Atmospheric rainy cobblestone street at night with glistening reflections and solitary umbrella figure',
    exif: {
      camera: 'Sony A7 IV',
      lens: 'FE 50mm f/1.8 Prime',
      shutter: '1/125s',
      aperture: 'f/2.0',
      iso: '1600',
      location: 'Old Town Quarter',
      year: '2025',
    },
    aspectRatio: '4:3',
  },
  {
    id: 'photo-5',
    title: 'RANGEFINDER CRAFT',
    subtitle: 'The Tactile Focus Ritual',
    description: 'Eksplorasi hubungan antara pembuat kode dan kamera rangefinder mekanikal. Ketelitian menyelaraskan titik fokus ganda di jendela bidik mencerminkan disiplin debugging kode yang teliti.',
    category: 'Portraits',
    imageSrc: heroPortrait,
    alt: 'Young creative photographer holding a rangefinder camera with deliberate focus in studio',
    exif: {
      camera: 'Leica M10 Monochrom',
      lens: 'Summicron-M 35mm f/2 ASPH',
      shutter: '1/250s',
      aperture: 'f/1.4',
      iso: '400',
      location: 'Creative Darkroom',
      year: '2026',
    },
    aspectRatio: '4:3',
  },
  {
    id: 'photo-6',
    title: 'CONCRETE SILENCE',
    subtitle: 'Abstract Brutalism & Scale',
    description: 'Skala proporsi ruang dan manusia dalam arsitektur modernis. Gradasi nada abu-abu tengah yang kaya memberikan kedalaman tekstur beton yang tak lekang oleh waktu.',
    category: 'Architecture',
    imageSrc: galleryArch,
    alt: 'Brutalist concrete architecture planes and shadows with lone human silhouette',
    exif: {
      camera: 'Leica M10 Monochrom',
      lens: 'Elmarit-M 28mm f/2.8',
      shutter: '1/750s',
      aperture: 'f/5.6',
      iso: '100',
      location: 'Metropolitan Arts Center',
      year: '2026',
    },
    aspectRatio: '4:3',
  },
  {
    id: 'photo-7',
    title: 'ETHEREAL WATERS',
    subtitle: 'Zen Long Exposure Studies',
    description: 'Meditasi visual tentang keheningan air dan kabut tebal. Menggunakan filter Neutral Density 10-stop untuk mereduksi dinamika gelombang menjadi bidang sutra putih tak berbatas.',
    category: 'Minimal',
    imageSrc: galleryLandscape,
    alt: 'Long exposure fine art lake and wooden pier fading into dense misty horizon',
    exif: {
      camera: 'Nikon Z6 II',
      lens: 'Nikkor Z 24-70mm f/4 S',
      shutter: '60s Long Exp',
      aperture: 'f/13',
      iso: '50',
      location: 'Alpine Lake Shore',
      year: '2025',
    },
    aspectRatio: '16:9',
  },
  {
    id: 'photo-8',
    title: 'STREET SOLITUDE',
    subtitle: 'Decisive Nocturne Moment',
    description: 'Momen puitis di tengah heningnya lorong kota saat gerimis reda. Refleksi lampu jalanan pada genangan aspal melukiskan ritme isolasi yang menenangkan.',
    category: 'Street',
    imageSrc: galleryStreet,
    alt: 'Moody street night rain with vintage street lamps and rain reflections',
    exif: {
      camera: 'Fujifilm X-Pro3',
      lens: 'Fujinon XF 23mm f/2 R WR',
      shutter: '1/90s',
      aperture: 'f/2.0',
      iso: '800',
      location: 'Historic Alleyway',
      year: '2025',
    },
    aspectRatio: '4:3',
  },
];

export const initialSkills: SkillItem[] = [
  // Informatics & Software Engineering
  { name: 'Data Structures & Algorithms', category: 'informatics', subCategory: 'Core Computer Science', level: 'Advanced', years: '3 yrs' },
  { name: 'TypeScript & JavaScript (ESNext)', category: 'informatics', subCategory: 'Frontend & Fullstack', level: 'Advanced', years: '3 yrs' },
  { name: 'React & Modern Frontend', category: 'informatics', subCategory: 'Web Development', level: 'Advanced', years: '3 yrs' },
  { name: 'Python & Computer Vision (OpenCV)', category: 'informatics', subCategory: 'Data & Vision Systems', level: 'Intermediate', years: '2 yrs' },
  { name: 'Go (Golang)', category: 'informatics', subCategory: 'Backend & Systems', level: 'Intermediate', years: '1 yr' },
  { name: 'PostgreSQL & Relational DBs', category: 'informatics', subCategory: 'Database Engineering', level: 'Advanced', years: '2 yrs' },
  { name: 'Tailwind CSS & Responsive UX', category: 'informatics', subCategory: 'Frontend & Design', level: 'Advanced', years: '3 yrs' },
  { name: 'Docker & Containerization', category: 'informatics', subCategory: 'DevOps & Tooling', level: 'Intermediate', years: '2 yrs' },
  { name: 'Git, GitHub & Version Control', category: 'informatics', subCategory: 'Workflow & CI/CD', level: 'Advanced', years: '3 yrs' },
  { name: 'Linux / Unix Shell Scripting', category: 'informatics', subCategory: 'Systems Administration', level: 'Intermediate', years: '2 yrs' },

  // Photography & Creative Direction
  { name: 'Manual Exposure Triangle', category: 'photography', subCategory: 'Technical Camera Operation', level: 'Advanced', years: '4 yrs' },
  { name: 'Composition & Architectural Leading Lines', category: 'photography', subCategory: 'Visual Direction', level: 'Advanced', years: '4 yrs' },
  { name: 'Adobe Lightroom Classic & RAW Processing', category: 'photography', subCategory: 'Post-Processing', level: 'Advanced', years: '4 yrs' },
  { name: 'Color Grading & Dynamic Range Control', category: 'photography', subCategory: 'Creative Mastery', level: 'Advanced', years: '3 yrs' },
  { name: 'Street & Documentary Decisive Moment', category: 'photography', subCategory: 'Field Methodology', level: 'Advanced', years: '3 yrs' },
  { name: 'Natural Light & Shadow Sculpting', category: 'photography', subCategory: 'Portraiture & Studio', level: 'Intermediate', years: '3 yrs' },
  { name: 'EXIF & Color Space Calibration', category: 'photography', subCategory: 'Hardware & Optics', level: 'Intermediate', years: '2 yrs' },
  { name: 'Archival Print & Fine Art Paper Prep', category: 'photography', subCategory: 'Physical Media', level: 'Intermediate', years: '2 yrs' },
];

export const photoGalleryCategories = [
  'All',
  'Architecture',
  'Portraits',
  'Street',
  'Minimal',
] as const;
