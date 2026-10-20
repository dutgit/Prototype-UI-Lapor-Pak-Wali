import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

const REPORTS_STORAGE_KEY = 'superbie_reports_v2';

// Compact SVG Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MapPinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// Reports Dataset
const INITIAL_REPORTS = [
  {
    id: 'LPW-2026-0891',
    title: 'Lampu Penerangan Jalan Umum (PJU) Padam di Simpang Empat',
    category: 'Penerangan Jalan',
    location: 'Jl. Jenderal Sudirman (Dekat Lap. Andi Makkasau)',
    kecamatan: 'Kec. Ujung',
    date: 'Hari ini, 08:15',
    status: 'diproses',
    statusText: 'Sedang Ditindak',
    opdName: 'Dinas Perhubungan',
    opdBadge: 'Dishub Parepare',
    progress: 65,
    isMine: true,
    author: 'Ahmad Warga (Saya)',
    likes: 18,
    isLiked: false,
    image: '/report-street-light.png',
    beforeImage: '/report-street-light.png',
    beforeTime: '12 Okt, 08:15 WITA',
    beforeCaption: 'Kondisi awal: Lampu PJU di tiang simpang empat padam total sejak 2 malam lalu.',
    beforeFilter: 'brightness(0.65) contrast(1.15) saturate(0.75)',
    beforeCrop: 'center 25%',
    afterImage: '/report-street-light.png',
    afterTime: '12 Okt, 11:20 WITA',
    afterCaption: 'Progres lapangan: Teknisi PJU Dishub sedang mengganti komponen trafo & lampu LED 120W.',
    description: 'Lampu PJU pada tiang simpang empat utama padam sudah 2 malam. Simpang jalan gelap saat malam hari dan rawan bagi pemotor.',
    followUp: 'Regu teknis PJU Dinas Perhubungan dikerahkan ke lokasi dengan crane hidrolik untuk penggantian trafo dan bohlam LED 120W.',
    timeline: [
      { step: 'Laporan Diterima', time: '12 Okt, 08:15 WITA', desc: 'Laporan warga masuk sistem SuperBie', done: true },
      { step: 'Diverifikasi Kominfo', time: '12 Okt, 08:35 WITA', desc: 'Validasi data pengaduan selesai', done: true },
      { step: 'Disposisi ke Dishub', time: '12 Okt, 09:10 WITA', desc: 'Surat tugas diterbitkan untuk Regu PJU', done: true },
      { step: 'Pengerjaan Lapangan', time: '12 Okt, 11:20 WITA', desc: 'Teknisi mengganti trafo & sambungan arus', done: true, active: true },
      { step: 'Pekerjaan Selesai', time: 'Estimasi 15:30 WITA', desc: 'Pengujian lampu & penutupan tiket', done: false }
    ],
    rating: null,
    comments: [
      {
        id: 'c-101',
        author: 'Rizal Pratama',
        role: 'Warga Kec. Ujung',
        time: '2 jam lalu',
        text: 'Betul sekali pak, tadi malam lewat sini gelap sekali padahal jalur ramai. Semoga cepat menyala kembali.',
        isOpd: false
      },
      {
        id: 'c-102',
        author: 'Admin Dishub Parepare',
        role: 'Dinas Perhubungan',
        time: '45 menit lalu',
        text: 'Terima kasih laporannya. Tim PJU sudah berada di titik lokasi menggunakan mobil crane untuk penggantian modul LED.',
        isOpd: true
      }
    ]
  },
  {
    id: 'LPW-2026-0842',
    title: 'Penambalan Aspal Lubang Jalan Poros Penghubung',
    category: 'Jalan & Jembatan',
    location: 'Jl. Veteran, Kel. Ujung Sabbang',
    kecamatan: 'Kec. Ujung',
    date: 'Kemarin, 14:30',
    status: 'selesai',
    statusText: 'Tuntas Terselesaikan',
    opdName: 'Dinas PUPR',
    opdBadge: 'PUPR Parepare',
    progress: 100,
    isMine: true,
    author: 'Ahmad Warga (Saya)',
    likes: 42,
    isLiked: true,
    image: '/report-road-patch.png',
    beforeImage: '/report-road-patch.png',
    beforeTime: '11 Okt, 09:12 WITA',
    beforeCaption: 'Kondisi sebelum: Permukaan aspal mengelupas dan berlubang sedalam ±10 cm di lajur kiri.',
    beforeFilter: 'contrast(1.15) sepia(0.18) brightness(0.88)',
    beforeCrop: 'center 85%',
    afterImage: '/report-road-patch.png',
    afterTime: '11 Okt, 14:30 WITA',
    afterCaption: 'Kondisi sesudah: Tim Bina Marga PUPR telah melakukan patching hotmix dan pemadatan compactor.',
    description: 'Lubang jalan berdiameter 80 cm membahayakan pengendara roda dua terutama saat hujan tergenang.',
    followUp: 'PUPR Bidang Bina Marga melakukan patching aspal hotmix dan pemadatan compactor. Jalan sudah rata dan mulus.',
    timeline: [
      { step: 'Laporan Masuk', time: '11 Okt, 09:12 WITA', desc: 'Laporan diverifikasi operator', done: true },
      { step: 'Survei Lapangan', time: '11 Okt, 10:30 WITA', desc: 'Tim menyiapkan armada & aspal hotmix', done: true },
      { step: 'Eksekusi Pengaspalan', time: '11 Okt, 13:15 WITA', desc: 'Penghamparan aspal dan pemadatan', done: true },
      { step: 'Tuntas & Aman', time: '11 Okt, 14:30 WITA', desc: 'Jalan dibuka kembali untuk lalu lintas', done: true }
    ],
    rating: 5,
    comments: [
      {
        id: 'c-201',
        author: 'Dinas PUPR Parepare',
        role: 'Bidang Bina Marga',
        time: 'Kemarin, 14:35',
        text: 'Penambalan dengan aspal hotmix sudah selesai dilaksanakan. Terima kasih atas kepedulian warga menjaga infrastruktur kota.',
        isOpd: true
      },
      {
        id: 'c-202',
        author: 'Hendra Saputra',
        role: 'Warga Ujung Sabbang',
        time: 'Kemarin, 16:10',
        text: 'Mantap respon cepat PUPR! Tadi sore lewat sudah mulus tidak perlu menghindar lubang lagi.',
        isOpd: false
      }
    ]
  },
  {
    id: 'LPW-2026-0835',
    title: 'Pembersihan Sedimen Saluran Drainase Pasar Senggol',
    category: 'Kebersihan & DLH',
    location: 'Kawasan Niaga Pasar Senggol',
    kecamatan: 'Kec. Ujung',
    date: '2 hari lalu',
    status: 'selesai',
    statusText: 'Tuntas Terselesaikan',
    opdName: 'Dinas Lingkungan Hidup',
    opdBadge: 'DLH Parepare',
    progress: 100,
    isMine: false,
    author: 'H. Ruslan',
    likes: 67,
    isLiked: false,
    image: '/parepare_mosque_vector.jpg',
    beforeImage: '/parepare_mosque_vector.jpg',
    beforeTime: '10 Okt, 07:30 WITA',
    beforeCaption: 'Kondisi sebelum: Saluran drainase padat sedimen lumpur sehingga air menggenang saat pasang.',
    beforeFilter: 'grayscale(0.45) brightness(0.82)',
    beforeCrop: 'left bottom',
    afterImage: '/parepare_mosque_vector.jpg',
    afterTime: '10 Okt, 12:45 WITA',
    afterCaption: 'Kondisi sesudah: 4 armada truk DLH telah mengeruk sedimen, aliran drainase kembali normal.',
    description: 'Saluran air tertutup sedimen endapan lumpur dan sampah sehingga meluap ke lorong kios saat hujan.',
    followUp: 'Pasukan Kuning DLH mengangkat 4 dump truck sedimen. Aliran drainase sepanjang 180 meter kini lancar kembali.',
    timeline: [
      { step: 'Laporan Masuk', time: '10 Okt, 07:30 WITA', desc: 'Aduan warga diterima', done: true },
      { step: 'Pengerahan Tim DLH', time: '10 Okt, 08:20 WITA', desc: 'Pasukan pembersih terjun ke lokasi', done: true },
      { step: 'Pengerukan Saluran', time: '10 Okt, 09:45 WITA', desc: 'Pengangkutan sedimen ke TPA', done: true },
      { step: 'Selesai & Lancar', time: '10 Okt, 12:45 WITA', desc: 'Drainase berfungsi optimal', done: true }
    ],
    rating: 5,
    comments: [
      {
        id: 'c-301',
        author: 'Hj. Marwah',
        role: 'Pedagang Pasar Senggol',
        time: '2 hari lalu',
        text: 'Alhamdulillah sekarang tidak bau dan tidak meluap lagi kalau hujan deras. Terima kasih tim DLH.',
        isOpd: false
      }
    ]
  },
  {
    id: 'LPW-2026-0888',
    title: 'Penertiban Parkir Liar di Bahu Jalan Pantai Mattirotasi',
    category: 'Ketertiban Umum',
    location: 'Kawasan Wisata Bahari Mattirotasi',
    kecamatan: 'Kec. Bacukiki Barat',
    date: 'Hari ini, 10:20',
    status: 'diproses',
    statusText: 'Sedang Ditindak',
    opdName: 'Satpol PP & Dishub',
    opdBadge: 'Satpol PP',
    progress: 50,
    isMine: false,
    author: 'Siti Nurhaliza',
    likes: 31,
    isLiked: false,
    image: '/parepare_1_vector.jpg',
    beforeImage: '/parepare_1_vector.jpg',
    beforeTime: '12 Okt, 10:20 WITA',
    beforeCaption: 'Kondisi awal: Kendaraan parkir berlapis memakan bahu jalan & jalur pejalan kaki.',
    beforeFilter: 'brightness(0.8) saturate(0.75)',
    beforeCrop: 'right bottom',
    afterImage: '/parepare_1_vector.jpg',
    afterTime: '12 Okt, 11:30 WITA',
    afterCaption: 'Penanganan lapangan: Petugas gabungan Satpol PP & Dishub mengarahkan kendaraan ke kantong parkir.',
    description: 'Kendaraan mobil kerap parkir berlapis di pinggir tanggul hingga memakan jalur pedestrian pejalan kaki.',
    followUp: 'Regu patroli Satpol PP bersama Dishub telah turun merelokasi kendaraan ke kantong parkir resmi.',
    timeline: [
      { step: 'Laporan Diterima', time: '12 Okt, 10:20 WITA', desc: 'Laporan masuk sistem', done: true },
      { step: 'Instruksi Patroli', time: '12 Okt, 10:40 WITA', desc: 'Unit reaksi cepat meluncur', done: true },
      { step: 'Penertiban Langsung', time: '12 Okt, 11:30 WITA', desc: 'Sosialisasi dan penataan parkir', done: true, active: true },
      { step: 'Pengawasan Berkala', time: 'Berjalan', desc: 'Penjagaan pos pantai', done: false }
    ],
    rating: null,
    comments: [
      {
        id: 'c-401',
        author: 'Satpol PP Parepare',
        role: 'Tim Reaksi Cepat',
        time: '1 jam lalu',
        text: 'Personil sudah berada di sepanjang jalur Mattirotasi untuk penataan parkir dan imbauan humanis kepada pemilik kendaraan.',
        isOpd: true
      }
    ]
  },
  {
    id: 'LPW-2026-0810',
    title: 'Pemangkasan Pohon Rawan Tumbang Dekat Kabel PLN',
    category: 'Lingkungan Hidup',
    location: 'Jl. Bau Massepe, Kel. Labukkang',
    kecamatan: 'Kec. Soreang',
    date: '3 hari lalu',
    status: 'selesai',
    statusText: 'Tuntas Terselesaikan',
    opdName: 'DLH & BPBD',
    opdBadge: 'DLH / BPBD',
    progress: 100,
    isMine: false,
    author: 'Fauzan Akbar',
    likes: 54,
    isLiked: true,
    image: '/parepare_4_vector.jpg',
    beforeImage: '/parepare_4_vector.jpg',
    beforeTime: '09 Okt, 13:00 WITA',
    beforeCaption: 'Kondisi sebelum: Cabang pohon rimbun menjuntai dekat jaringan kabel tegangan menengah.',
    beforeFilter: 'brightness(0.82) contrast(1.1)',
    beforeCrop: 'left top',
    afterImage: '/parepare_4_vector.jpg',
    afterTime: '09 Okt, 17:00 WITA',
    afterCaption: 'Kondisi sesudah: Dahan rawan patah telah dipangkas rapi bersama tim teknis PLN.',
    description: 'Dahan pohon trembesi tua menjulur rendah mengenai bentangan kabel jaringan PLN saat berangin kencang.',
    followUp: 'Tim pemangkas pohon DLH didampingi teknisi PLN telah memotong dahan rapuh dan membersihkan serpihan kayu.',
    timeline: [
      { step: 'Laporan Masuk', time: '09 Okt, 13:00 WITA', desc: 'Laporan diprioritaskan', done: true },
      { step: 'Koordinasi PLN', time: '09 Okt, 14:15 WITA', desc: 'Pengamanan jaringan listrik', done: true },
      { step: 'Pemangkasan Dahan', time: '09 Okt, 15:30 WITA', desc: 'Eksekusi pemotongan cabang pohon', done: true },
      { step: 'Selesai & Bersih', time: '09 Okt, 17:00 WITA', desc: 'Ruas jalan dan kabel aman', done: true }
    ],
    rating: 5,
    comments: [
      {
        id: 'c-501',
        author: 'Fauzan Akbar',
        role: 'Pelapor',
        time: '3 hari lalu',
        text: 'Terima kasih banyak tim DLH, BPBD, dan PLN. Sekarang warga sekitar tidak was-was lagi saat angin kencang.',
        isOpd: false
      }
    ]
  }
];

export default function ActivityTab({ currentUserName = 'Ahmad Warga' }) {
  // Navigation Mode: 'laporan-saya' | 'semua-kota'
  const [viewMode, setViewMode] = useState('laporan-saya');
  
  // Status filter: 'semua' | 'diproses' | 'selesai'
  const [statusFilter, setStatusFilter] = useState('semua');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reports State (Initialized from localStorage for persistence)
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to INITIAL_REPORTS
    }
    return INITIAL_REPORTS;
  });

  // Save reports changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
    } catch {
      // Ignore storage quota errors
    }
  }, [reports]);
  
  // Selected report ID for tracking detail modal (derived from reports so it stays live)
  const [selectedReportId, setSelectedReportId] = useState(null);
  const selectedReport = useMemo(
    () => reports.find(r => r.id === selectedReportId) || null,
    [reports, selectedReportId]
  );

  // Photo comparison mode in detail modal: 'split' | 'before' | 'after'
  const [photoCompareMode, setPhotoCompareMode] = useState('split');

  // New comment input state
  const [newCommentText, setNewCommentText] = useState('');
  
  // Rating feedback state inside modal
  const [modalRating, setModalRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isModalScrolled, setIsModalScrolled] = useState(false);
  const [canScrollModal, setCanScrollModal] = useState(false);
  const modalBodyRef = useRef(null);

  // Body scroll lock saat modal detail laporan terbuka
  useEffect(() => {
    if (selectedReport) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedReport]);

  // Toggle Like / Upvote
  const handleToggleLike = (reportId, e) => {
    e.stopPropagation();
    setReports(prev => prev.map(item => {
      if (item.id === reportId) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    }));
  };

  // Open Modal
  const handleOpenDetail = (report) => {
    setSelectedReportId(report.id);
    setModalRating(report.rating || 0);
    setPhotoCompareMode('split');
    setNewCommentText('');
    setFeedbackSent(false);
    setIsModalScrolled(false);
    setTimeout(() => {
      if (modalBodyRef.current) {
        const el = modalBodyRef.current;
        setCanScrollModal(el.scrollHeight > el.clientHeight + 20);
      }
    }, 60);
  };

  // Submit Rating
  const handleRateReport = (score) => {
    if (!selectedReport) return;
    setModalRating(score);
    setFeedbackSent(true);
    setReports(prev => prev.map(item => {
      if (item.id === selectedReport.id) {
        return { ...item, rating: score };
      }
      return item;
    }));
  };

  // Submit New Comment
  const handleAddComment = (e) => {
    e.preventDefault();
    const trimmed = newCommentText.trim();
    if (!trimmed || !selectedReport) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: `${currentUserName} (Saya)`,
      role: selectedReport.isMine ? 'Pelapor' : 'Warga Parepare',
      time: 'Baru saja',
      text: trimmed,
      isOpd: false,
      isMe: true
    };

    setReports(prev => prev.map(item => {
      if (item.id === selectedReport.id) {
        return {
          ...item,
          comments: [...(item.comments || []), newComment]
        };
      }
      return item;
    }));
    setNewCommentText('');
  };

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter(item => {
      if (viewMode === 'laporan-saya' && !item.isMine) return false;
      if (statusFilter !== 'semua' && item.status !== statusFilter) return false;
      
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        const matchOpd = item.opdName.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchId && !matchOpd) return false;
      }
      return true;
    });
  }, [reports, viewMode, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = reports.length;
    const diproses = reports.filter(r => r.status === 'diproses').length;
    const selesai = reports.filter(r => r.status === 'selesai').length;
    const myTotal = reports.filter(r => r.isMine).length;
    return { total, diproses, selesai, myTotal };
  }, [reports]);

  return (
    <main className="relative z-10 w-full max-w-lg mx-auto px-3.5 pt-3 pb-44 min-w-0">
      
      {/* HEADER SECTION: Clean & Mobile-First */}
      <div className="mb-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Aktivitas Laporan
          </h2>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            Parepare Live
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Pantau penanganan pengaduan masyarakat secara transparan
        </p>
      </div>

      {/* SEGMENTED TAB SWITCHER (iOS / Clean Pill Style) */}
      <div className="bg-slate-200/70 p-1 rounded-2xl flex gap-1 mb-3">
        <button
          onClick={() => setViewMode('laporan-saya')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            viewMode === 'laporan-saya'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Laporan Saya</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            viewMode === 'laporan-saya' ? 'bg-blue-100 text-blue-700' : 'bg-slate-300 text-slate-700'
          }`}>
            {stats.myTotal}
          </span>
        </button>

        <button
          onClick={() => setViewMode('semua-kota')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            viewMode === 'semua-kota'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Laporan Kota</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            viewMode === 'semua-kota' ? 'bg-blue-100 text-blue-700' : 'bg-slate-300 text-slate-700'
          }`}>
            {stats.total}
          </span>
        </button>
      </div>

      {/* SEARCH BAR (Simple & Compact) */}
      <div className="relative w-full mb-2.5">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari lokasi, topik, atau nomor tiket..."
          className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
          >
            <XIcon />
          </button>
        )}
      </div>

      {/* STATUS FILTER PILLS (Single Row Horizontal) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3.5 scrollbar-none text-[11px]">
        <button
          onClick={() => setStatusFilter('semua')}
          className={`py-1 px-3 rounded-full font-bold shrink-0 transition-all ${
            statusFilter === 'semua'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setStatusFilter('diproses')}
          className={`py-1 px-3 rounded-full font-bold shrink-0 transition-all flex items-center gap-1.5 ${
            statusFilter === 'diproses'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-amber-50/70 text-amber-800 border border-amber-200/70 hover:bg-amber-100/60'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          Diproses ({reports.filter(r => (viewMode === 'laporan-saya' ? r.isMine : true) && r.status === 'diproses').length})
        </button>
        <button
          onClick={() => setStatusFilter('selesai')}
          className={`py-1 px-3 rounded-full font-bold shrink-0 transition-all flex items-center gap-1.5 ${
            statusFilter === 'selesai'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50/70 text-emerald-800 border border-emerald-200/70 hover:bg-emerald-100/60'
          }`}
        >
          <CheckCircleIcon />
          Selesai ({reports.filter(r => (viewMode === 'laporan-saya' ? r.isMine : true) && r.status === 'selesai').length})
        </button>
      </div>

      {/* FEED CARDS LIST (Clean, High UX, Zero Overflow) */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center gap-2 shadow-xs">
          <span className="text-3xl">🔍</span>
          <h4 className="text-sm font-bold text-slate-800">Tidak Ada Laporan Ditemukan</h4>
          <p className="text-xs text-slate-500 max-w-xs">
            Coba ubah kata kunci pencarian atau ganti filter status.
          </p>
          <button
            onClick={() => { setStatusFilter('semua'); setSearchQuery(''); }}
            className="mt-1 py-1.5 px-3.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredReports.map(report => (
            <div
              key={report.id}
              onClick={() => handleOpenDetail(report)}
              className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.99] cursor-pointer flex flex-col gap-2.5 overflow-hidden w-full max-w-full"
            >
              {/* ROW 1: Header (Status Pill + Date + Ticket ID) */}
              <div className="flex items-center justify-between gap-1.5 w-full min-w-0">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 uppercase tracking-wide flex items-center gap-1 ${
                    report.status === 'diproses'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {report.status === 'diproses' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    )}
                    {report.statusText}
                  </span>

                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded truncate min-w-0 max-w-[130px] sm:max-w-none">
                    {report.opdBadge}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0 font-medium">
                  <ClockIcon />
                  <span>{report.date}</span>
                </div>
              </div>

              {/* ROW 2: Main Body (Left: Title + Location, Right: Compact Thumbnail) */}
              <div className="flex items-start gap-3 w-full min-w-0">
                {/* Text Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 break-words">
                    {report.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate font-medium">
                    <span className="text-blue-500 shrink-0"><MapPinIcon /></span>
                    <span className="truncate">{report.location}</span>
                  </p>
                </div>

                {/* Compact Thumbnail (Clean 72x72 square) */}
                {report.image && (
                  <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100 relative shadow-2xs">
                    <img
                      src={report.image}
                      alt="Bukti Laporan"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className={`absolute bottom-0 inset-x-0 text-white text-[8px] text-center py-0.5 font-semibold ${
                      report.status === 'selesai' ? 'bg-emerald-700/85' : 'bg-black/65'
                    }`}>
                      {report.status === 'selesai' ? 'Sebelum/Sesudah' : 'Bukti Foto'}
                    </span>
                  </div>
                )}
              </div>

              {/* ROW 3: Slim OPD Progress Bar (Very Clean) */}
              <div className="bg-slate-50/90 rounded-xl p-2.5 border border-slate-100 flex flex-col gap-1.5 w-full min-w-0">
                <div className="flex justify-between items-center text-[10px] w-full min-w-0">
                  <span className="text-slate-600 font-semibold truncate flex-1 min-w-0 pr-2">
                    <b className="text-slate-800">Aksi OPD:</b> {report.followUp}
                  </span>
                  <span className={`font-black shrink-0 ${report.progress === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {report.progress}%
                  </span>
                </div>

                {/* Micro Progress Bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      report.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'
                    }`}
                    style={{ width: `${report.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* ROW 4: Card Footer (Author, Upvote, Comment Count & Clean Action Button) */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100/90 text-xs w-full min-w-0">
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="text-[10px] text-slate-400 truncate">
                    Pelapor: <b className="text-slate-700">{report.isMine ? `${currentUserName} (Saya)` : report.author}</b>
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">
                    #{report.id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Upvote Button */}
                  <button
                    onClick={(e) => handleToggleLike(report.id, e)}
                    className={`flex items-center gap-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-all border ${
                      report.isLiked
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Dukung Laporan Ini"
                  >
                    <HeartIcon filled={report.isLiked} />
                    <span>{report.likes}</span>
                  </button>

                  {/* Comments Count Pill */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(report);
                    }}
                    className="flex items-center gap-1 py-1 px-2 rounded-lg text-[11px] font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                    title="Lihat Diskusi & Komentar"
                  >
                    <MessageCircleIcon />
                    <span>{report.comments?.length || 0}</span>
                  </button>

                  {/* Clean Detail Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(report);
                    }}
                    className="flex items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-2xs"
                  >
                    <span>Lacak</span>
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL / BOTTOM SHEET (Rich Tracking, Before/After Comparison, Timeline & Comments) */}
      {selectedReport && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedReportId(null)}
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[88dvh] sm:max-h-[90dvh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden relative animate-fade-up overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Drag Handle for Mobile */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto sm:hidden mt-2.5 mb-1 shrink-0"></div>

            {/* Modal Header (Fixed / Shrink-0) */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 flex justify-between items-start shrink-0 bg-white">
              <div className="min-w-0 flex-1 pr-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-mono text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    #{selectedReport.id}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${
                    selectedReport.status === 'diproses'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {selectedReport.statusText}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug break-words">
                  {selectedReport.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedReportId(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 shrink-0 transition-colors"
                title="Tutup"
              >
                <XIcon />
              </button>
            </div>

            {/* Floating Indicator: Panah Ke Bawah + Tulisan Gulir */}
            {canScrollModal && (
              <div 
                className={`absolute left-1/2 -translate-x-1/2 bottom-20 sm:bottom-20 z-40 transition-all duration-300 ease-out flex flex-col items-center pointer-events-none ${
                  isModalScrolled ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    modalBodyRef.current?.scrollBy({ top: 180, behavior: 'smooth' });
                    setIsModalScrolled(true);
                  }}
                  className="bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-white py-2 px-4 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center justify-center gap-0.5 pointer-events-auto cursor-pointer active:scale-95 transition-all group"
                  title="Gulir untuk melihat tahapan & komentar"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-bounce">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  <span className="text-[10px] font-black tracking-widest uppercase">GULIR</span>
                </button>
              </div>
            )}

            {/* Modal Scrollable Body */}
            <div 
              ref={modalBodyRef}
              onScroll={(e) => {
                if (e.target.scrollTop > 15) {
                  setIsModalScrolled(true);
                } else {
                  setIsModalScrolled(false);
                }
              }}
              className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1 flex flex-col gap-4"
            >
              {/* PHOTO DOCUMENTATION: Hanya tampilkan perbandingan Sebelum vs Sesudah jika sudah Selesai; jika masih Diproses hanya tampilkan foto Sebelum */}
              {selectedReport.image && (
                selectedReport.status === 'selesai' ? (
                  <div className="flex flex-col gap-2 shrink-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                        <span>📸</span>
                        <span>Bukti Visual (Sebelum & Selesai)</span>
                      </span>

                      {/* Switcher Pills: Bandingkan / Sebelum / Sesudah */}
                      <div className="bg-slate-100 p-0.5 rounded-xl flex items-center gap-0.5 border border-slate-200/80">
                        <button
                          type="button"
                          onClick={() => setPhotoCompareMode('split')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            photoCompareMode === 'split'
                              ? 'bg-white text-blue-600 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Bandingkan
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoCompareMode('before')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            photoCompareMode === 'before'
                              ? 'bg-white text-rose-600 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Sebelum
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoCompareMode('after')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            photoCompareMode === 'after'
                              ? 'bg-white text-emerald-600 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Selesai
                        </button>
                      </div>
                    </div>

                    {/* View Mode: Side-by-Side Split */}
                    {photoCompareMode === 'split' && (
                      <div className="grid grid-cols-2 gap-2">
                        {/* Left: Sebelum (Laporan Warga) */}
                        <div
                          onClick={() => setPhotoCompareMode('before')}
                          className="rounded-2xl overflow-hidden border border-rose-200/80 bg-slate-900 flex flex-col cursor-pointer group"
                          title="Klik untuk memperbesar foto Sebelum"
                        >
                          <div className="relative h-32 sm:h-36 w-full overflow-hidden">
                            <img
                              src={selectedReport.beforeImage || selectedReport.image}
                              alt="Kondisi Sebelum"
                              style={{
                                filter: selectedReport.beforeFilter || 'brightness(0.8) contrast(1.1)',
                                objectPosition: selectedReport.beforeCrop || 'center center'
                              }}
                              className="w-full h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
                            <span className="absolute top-2 left-2 bg-rose-600/95 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide shadow-xs">
                              Sebelum
                            </span>
                            <span className="absolute bottom-1.5 left-2 right-2 text-[9px] text-white/90 font-medium truncate">
                              {selectedReport.beforeTime || 'Saat dilaporkan'}
                            </span>
                          </div>
                          <div className="p-2 bg-rose-50/70 text-[10px] text-rose-950 leading-snug flex-1">
                            <b className="font-bold block text-rose-700 mb-0.5">Laporan Warga:</b>
                            <span className="line-clamp-2">{selectedReport.beforeCaption || selectedReport.description}</span>
                          </div>
                        </div>

                        {/* Right: Sesudah / Selesai OPD */}
                        <div
                          onClick={() => setPhotoCompareMode('after')}
                          className="rounded-2xl overflow-hidden border border-emerald-200/90 bg-slate-900 flex flex-col cursor-pointer group"
                          title="Klik untuk memperbesar foto Selesai"
                        >
                          <div className="relative h-32 sm:h-36 w-full overflow-hidden">
                            <img
                              src={selectedReport.afterImage || selectedReport.image}
                              alt="Kondisi Selesai"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
                            <span className="absolute top-2 left-2 bg-emerald-600/95 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide shadow-xs">
                              Selesai ✓
                            </span>
                            <span className="absolute bottom-1.5 left-2 right-2 text-[9px] text-white/90 font-medium truncate">
                              {selectedReport.afterTime || selectedReport.date}
                            </span>
                          </div>
                          <div className="p-2 bg-emerald-50/70 text-emerald-950 text-[10px] leading-snug flex-1">
                            <b className="font-bold block text-emerald-700 mb-0.5">
                              Bukti {selectedReport.opdBadge}:
                            </b>
                            <span className="line-clamp-2">{selectedReport.afterCaption || selectedReport.followUp}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View Mode: Single Full Photo (Before or After) */}
                    {photoCompareMode !== 'split' && (
                      <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 relative">
                        <div className="h-44 sm:h-52 w-full relative overflow-hidden">
                          <img
                            src={photoCompareMode === 'before' ? (selectedReport.beforeImage || selectedReport.image) : (selectedReport.afterImage || selectedReport.image)}
                            alt={selectedReport.title}
                            style={
                              photoCompareMode === 'before'
                                ? {
                                    filter: selectedReport.beforeFilter || 'brightness(0.8) contrast(1.1)',
                                    objectPosition: selectedReport.beforeCrop || 'center center'
                                  }
                                : undefined
                            }
                            className={`w-full h-full object-cover transition-all duration-300 ${
                              photoCompareMode === 'before' ? 'scale-110' : ''
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
                          <span className={`absolute top-2.5 left-2.5 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide shadow-sm ${
                            photoCompareMode === 'before' ? 'bg-rose-600' : 'bg-emerald-600'
                          }`}>
                            {photoCompareMode === 'before'
                              ? 'Kondisi Sebelum (Laporan Warga)'
                              : `Selesai Ditindaklanjuti (${selectedReport.opdBadge})`}
                          </span>
                          <span className="absolute bottom-2 left-2.5 text-[10px] text-white/90 font-semibold">
                            🕒 {photoCompareMode === 'before' ? selectedReport.beforeTime : selectedReport.afterTime}
                          </span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border-t border-slate-200/80 text-[11px] text-slate-700 leading-relaxed">
                          {photoCompareMode === 'before'
                            ? (selectedReport.beforeCaption || selectedReport.description)
                            : (selectedReport.afterCaption || selectedReport.followUp)}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Jika masih Diproses: Hanya tampilkan 1 Foto Laporan Awal (Sebelum) */
                  <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative shrink-0">
                    <img
                      src={selectedReport.beforeImage || selectedReport.image}
                      alt={selectedReport.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
                      <span>📸</span>
                      <span>Foto Laporan Awal Warga (Sebelum)</span>
                    </div>
                  </div>
                )
              )}

              {/* Info Summary Box */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1">
                <p className="text-slate-600 flex items-start gap-1">
                  <span className="text-blue-600 shrink-0 mt-0.5"><MapPinIcon /></span>
                  <span><b>Lokasi:</b> {selectedReport.location}</span>
                </p>
                <p className="text-slate-600 flex items-center gap-1">
                  <span className="text-slate-400 shrink-0"><ClockIcon /></span>
                  <span><b>Waktu Lapor:</b> {selectedReport.date} • <b>OPD:</b> {selectedReport.opdName}</span>
                </p>
                <p className="text-slate-700 pt-1 border-t border-slate-150 leading-relaxed">
                  <b>Deskripsi Warga:</b> {selectedReport.description}
                </p>
              </div>

              {/* STEPPER TIMELINE */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                  <span>⏱️</span>
                  <span>Tahapan Penanganan OPD</span>
                </h4>

                <div className="space-y-2.5 relative before:absolute before:top-2 before:bottom-2 before:left-[10px] before:w-0.5 before:bg-slate-200">
                  {selectedReport.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 relative">
                      <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 z-10 text-[10px] font-bold ${
                        step.active
                          ? 'bg-amber-500 text-white ring-2 ring-amber-200 ring-offset-1 animate-pulse'
                          : step.done
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1 bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-900">{step.step}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{step.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RATING KEPUASAN (Jika Status Selesai) */}
              {selectedReport.status === 'selesai' && (
                <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3 flex flex-col items-center text-center gap-1.5">
                  <span className="text-xs font-bold text-amber-900">
                    {feedbackSent ? '🎉 Terima kasih atas penilaian Anda!' : 'Nilai Kualitas Penanganan Pelayanan'}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRateReport(star)}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <StarIcon filled={star <= modalRating} />
                      </button>
                    ))}
                  </div>
                  {modalRating > 0 && (
                    <span className="text-[11px] font-bold text-amber-900">
                      Nilai: {modalRating} dari 5 Bintang
                    </span>
                  )}
                </div>
              )}

              {/* DISKUSI & KOMENTAR WARGA SECTION */}
              <div className="pt-2 border-t border-slate-150 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>💬</span>
                    <span>Komentar & Tanggapan ({selectedReport.comments?.length || 0})</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Diskusi Publik Transparan
                  </span>
                </div>

                {/* Comment List */}
                <div className="space-y-2.5">
                  {(!selectedReport.comments || selectedReport.comments.length === 0) ? (
                    <p className="text-xs text-slate-400 italic text-center py-3 bg-slate-50 rounded-xl border border-slate-100">
                      Belum ada tanggapan. Jadilah yang pertama berkomentar!
                    </p>
                  ) : (
                    selectedReport.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`rounded-xl p-3 border text-xs flex flex-col gap-1 ${
                          comment.isOpd
                            ? 'bg-blue-50/70 border-blue-200/80'
                            : comment.isMe
                            ? 'bg-emerald-50/50 border-emerald-200/70'
                            : 'bg-slate-50/90 border-slate-150'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                            <span className="font-bold text-slate-900 truncate">
                              {comment.author}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                              comment.isOpd
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200/80 text-slate-600'
                            }`}>
                              {comment.isOpd ? `✓ ${comment.role}` : comment.role}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed mt-0.5 break-words">
                          {comment.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Tulis tanggapan atau info tambahan..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="py-2 px-3.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
                  >
                    <SendIcon />
                    <span>Kirim</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Bottom Action Footer (Pinned / Shrink-0 with Safe Area) */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-slate-150 bg-white/95 backdrop-blur-md shrink-0 flex items-center justify-between gap-3 pb-8 sm:pb-3.5">
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Lapor Pak Wali Parepare
              </span>
              <button
                onClick={() => setSelectedReportId(null)}
                className="w-full sm:w-auto sm:min-w-[140px] py-2.5 px-5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 active:scale-95 text-white transition-all shadow-sm cursor-pointer"
              >
                Tutup Pelacakan
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </main>
  );
}
