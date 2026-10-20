import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './index.css';
import ProfileTab from './ProfileTab';
import ActivityTab from './ActivityTab';

const PROFILE_STORAGE_KEY = 'superbie_profile_v1';
const DEFAULT_PROFILE = {
  name: 'Ahmad Warga',
  role: 'Masyarakat',
  status: 'Aktif',
  address: 'Jl. Kampung Manggis',
  joinedDate: '01 Oktober 2026',
  lastUpdated: '08 Oktober 2026, 07:54',
  email: 'warga1@superbie.local',
  phone: '08931313133',
  nik: '7372010101900001',
};

// SVG Icons
const UserIcon = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const HomeIcon = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ActivityIcon = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const BellIcon = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;

const SiphpIcon = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const LaporIcon = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>;
const WeatherIcon = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M20 12h2"></path><path d="M19.07 4.93l-1.41 1.41"></path><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path><path d="M3 20a5 5 0 1 1 8.9-4H21a2 2 0 1 1 0 4Z"></path></svg>;
const JdihIcon = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;

const CameraIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const MapPinIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const ClockIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const InstagramIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const MoreGridIcon = () => (
  <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
    <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
    <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
  </svg>
);
const PhoneCallIcon = () => (
  <svg width="1.15em" height="1.15em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);
const IdCardIcon = () => (
  <svg width="1.15em" height="1.15em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);
const HospitalIcon = () => (
  <svg width="1.15em" height="1.15em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"></path>
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
    <path d="M9 10h6"></path>
    <path d="M12 7v6"></path>
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Dynamic Thermometer with color and mercury fluid indicator
const ThermometerIcon = ({ temp }) => {
  const minTemp = 24;
  const maxTemp = 36;
  const clamped = Math.min(Math.max(temp, minTemp), maxTemp);
  const percent = (clamped - minTemp) / (maxTemp - minTemp);

  let mercuryColor = '#0ea5e9'; // sejuk (<27°C)
  let glowColor = 'rgba(14, 165, 233, 0.4)';
  if (temp >= 31) {
    mercuryColor = '#ef4444'; // merah terik (>=31°C)
    glowColor = 'rgba(239, 68, 68, 0.45)';
  } else if (temp >= 29) {
    mercuryColor = '#f59e0b'; // amber hangat (29-30.9°C)
    glowColor = 'rgba(245, 158, 11, 0.4)';
  } else if (temp >= 27) {
    mercuryColor = '#10b981'; // emerald segar (27-28.9°C)
    glowColor = 'rgba(16, 185, 129, 0.4)';
  }

  // Tinggi kolom cairan merkuri di dalam tabung
  const stemHeight = 3 + percent * 8.5;
  const stemY = 14.5 - stemHeight;

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transition-all duration-500">
      {/* Outer Glass Tube */}
      <path
        d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"
        stroke="#475569"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Skala ukuran suhu */}
      <line x1="9" y1="5.5" x2="10.8" y2="5.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="9" y1="8.5" x2="10.8" y2="8.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="9" y1="11.5" x2="10.8" y2="11.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

      {/* Mercury Bulb (Bulatan cairan bawah dengan glow) */}
      <circle
        cx="11.5"
        cy="16.5"
        r="2.8"
        fill={mercuryColor}
        style={{ filter: `drop-shadow(0 0 3px ${glowColor})` }}
        className="transition-colors duration-500"
      />
      {/* Mercury Stem (Batang cairan naik-turun sesuai suhu) */}
      <rect
        x="10.5"
        y={stemY}
        width="2"
        height={stemHeight + 1.5}
        rx="1"
        fill={mercuryColor}
        className="transition-all duration-500"
      />
    </svg>
  );
};

// Weather Condition Icons
const WeatherSunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" fill="#fef3c7" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const WeatherCloudSunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2" stroke="#f59e0b" />
    <path d="M4.93 4.93l1.41 1.41" stroke="#f59e0b" />
    <path d="M20 12h2" stroke="#f59e0b" />
    <path d="M19.07 4.93l-1.41 1.41" stroke="#f59e0b" />
    <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" stroke="#f59e0b" fill="#fef3c7" />
    <path d="M3 20a5 5 0 1 1 8.9-4H21a2 2 0 1 1 0 4Z" fill="#e0f2fe" stroke="#0284c7" />
  </svg>
);

const WeatherRainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" fill="#e0f2fe" stroke="#0284c7" />
    <path d="M8 19v2" stroke="#0ea5e9" strokeWidth="2.5" />
    <path d="M12 18v3" stroke="#0ea5e9" strokeWidth="2.5" />
    <path d="M16 19v2" stroke="#0ea5e9" strokeWidth="2.5" />
  </svg>
);

const WeatherCloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#f1f5f9" stroke="#64748b" />
  </svg>
);

const renderWeatherConditionIcon = (iconType) => {
  switch (iconType) {
    case 'sun':
      return <WeatherSunIcon />;
    case 'cloud-sun':
      return <WeatherCloudSunIcon />;
    case 'rain':
      return <WeatherRainIcon />;
    case 'cloud':
    default:
      return <WeatherCloudIcon />;
  }
};

// Data prakiraan cuaca multi-wilayah di Parepare
const PAREPARE_WEATHER_LIST = [
  {
    id: 'soreang',
    region: 'Kec. Soreang',
    temp: 29.5,
    condition: 'Cerah Berawan',
    detail: 'Angin sepoi 14 km/j',
    statusTag: 'Hangat Normal',
    iconType: 'cloud-sun',
  },
  {
    id: 'ujung',
    region: 'Kec. Ujung',
    temp: 32.2,
    condition: 'Terik Siang',
    detail: 'Kelembapan 62% • UV Tinggi',
    statusTag: 'Panas Terik',
    iconType: 'sun',
  },
  {
    id: 'bacukiki',
    region: 'Kec. Bacukiki',
    temp: 26.8,
    condition: 'Hujan Ringan',
    detail: 'Gerimis sejuk perbukitan',
    statusTag: 'Hujan Sejuk',
    iconType: 'rain',
  },
  {
    id: 'bacukiki-barat',
    region: 'Bacukiki Barat',
    temp: 28.6,
    condition: 'Berawan Lembut',
    detail: 'Gelombang laut 0.8m (Tenang)',
    statusTag: 'Pesisir Nyaman',
    iconType: 'cloud',
  },
];

// Akun resmi media sosial & siaran Pemkot Parepare (Humas & Diskominfo)
const HUMAS_INSTAGRAM_HANDLE = '@humaskotaparepare';
const HUMAS_INSTAGRAM_URL = 'https://www.instagram.com/humaskotaparepare/';

// Postingan & Berita Resmi Terkini dari Humas Pemerintah Kota Parepare (Foto Asli Instagram)
const PAREPARE_HUMAS_POSTS = [
  {
    id: 1,
    image: '/hut_sulsel_wide.jpg',
    isWide: true,
    category: 'HUT Sulsel ke-357',
    title: 'Selamat Hari Jadi ke-357 Provinsi Sulawesi Selatan: Ekonomi Tumbuh, Swasembada Pangan, Jaya Infrastruktur',
    caption: 'Pemerintah Kota Parepare bersama Wali Kota Tasming Hamid dan Wakil Wali Kota Hermanto mengucapkan Selamat Hari Jadi ke-357 Sulsel.',
    timeAgo: '19 Okt • Baru saja',
    likes: '840',
    comments: 42,
    url: 'https://www.instagram.com/p/DemIJ8tTb3p/',
    position: 'center center', // Tampilan wide banner sempurna
  },
  {
    id: 2,
    image: '/humas_ith_wide.jpg',
    isWide: true,
    category: 'Dies Natalis ITH',
    title: 'Perayaan Dies Natalis Institut Teknologi B.J. Habibie Dihadiri Wali Kota Tasming Hamid & Taufan Pawe',
    caption: 'Kehadiran para tokoh daerah menjadi tonggak penting dalam penguatan kemajuan riset dan pendidikan teknologi di Kota Parepare.',
    timeAgo: '17 Okt • 10:00 WITA',
    likes: '115',
    comments: 12,
    url: 'https://www.instagram.com/humaskotaparepare/p/Den57N7E75c/',
    position: 'center center',
  },
  {
    id: 3,
    image: '/humas_kabut_asap_wide.jpg',
    isWide: true,
    category: 'Imbauan Pemkot',
    title: 'Imbauan Resmi Pemkot Parepare: Penyesuaian Pembelajaran Daring & Kewaspadaan Kualitas Udara',
    caption: 'Menyikapi kondisi kabut asap, Pemkot Parepare mengalihkan proses belajar siswa TK hingga SMP ke daring serta mewajibkan masker.',
    timeAgo: '14 Okt • 08:30 WITA',
    likes: '120',
    comments: 8,
    url: 'https://www.instagram.com/humaskotaparepare/p/Dee897Yk-n3/',
    position: 'center center', // Tampilan wide 16:9 utuh tanpa terpotong
  },
  {
    id: 4,
    image: '/humas_prabowo_wide.jpg',
    isWide: true,
    category: 'HUT Presiden RI',
    title: 'Selamat Ulang Tahun Bapak Prabowo Subianto Presiden Republik Indonesia',
    caption: 'Pemerintah Kota Parepare mengucapkan selamat ulang tahun kepada Bapak Prabowo Subianto, Presiden Republik Indonesia. Semoga senantiasa dianugerahi kesehatan dan kebijaksanaan dalam memimpin bangsa.',
    timeAgo: '17 Okt 2026',
    likes: '520',
    comments: 38,
    url: 'https://www.instagram.com/humaskotaparepare/',
    position: 'center center',
  },
  {
    id: 5,
    image: '/humas_rs_ainun_wide.jpg',
    isWide: true,
    category: 'Bakti Sosial RS Ainun',
    title: 'Bakti Sosial RS dr. Hasri Ainun Habibie dalam Rangka HUT Sulsel ke-357: Sunnatan Massal & Donor Darah',
    caption: 'RS dr. Hasri Ainun Habibie menggelar bakti sosial sunnatan massal untuk 30 orang dhuafa dan donor darah pada Selasa, 20 Oktober 2026.',
    timeAgo: '20 Okt 2026',
    likes: '240',
    comments: 21,
    url: 'https://www.instagram.com/rsdr.hasriainunhabibieparepare/',
    position: 'center center',
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
}

function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [greeting] = useState(getGreeting);
  const [weatherIndex, setWeatherIndex] = useState(0);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  // Body scroll lock saat modal Semua Layanan terbuka
  useEffect(() => {
    if (isServicesModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isServicesModalOpen]);

  // Reset scroll posisi ke atas saat berpindah tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Auto-scroll ticker cuaca setiap 4 detik (hanya saat berada di tab beranda)
  useEffect(() => {
    if (activeTab !== 'beranda') return;

    const weatherTimer = setInterval(() => {
      setWeatherIndex((prev) => (prev + 1) % PAREPARE_WEATHER_LIST.length);
    }, 4000);
    return () => clearInterval(weatherTimer);
  }, [activeTab]);

  const isCarouselInteractingRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  const pauseCarouselAutoSlide = () => {
    isCarouselInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  };

  const resumeCarouselAutoSlide = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      isCarouselInteractingRef.current = false;
    }, 2500);
  };

  const goToSlide = (targetIdx) => {
    const el = carouselRef.current;
    if (!el || !el.clientWidth) return;
    isProgrammaticScrollRef.current = true;
    setActiveSlide(targetIdx);
    el.scrollTo({
      left: targetIdx * el.clientWidth,
      behavior: 'smooth'
    });
    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 450);
  };

  useEffect(() => {
    if (activeTab !== 'beranda') return;

    const timer = setInterval(() => {
      if (isCarouselInteractingRef.current) return;
      const nextSlide = (activeSlide + 1) % PAREPARE_HUMAS_POSTS.length;
      goToSlide(nextSlide);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTab, activeSlide]);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el || !el.clientWidth) return;

    if (!isProgrammaticScrollRef.current) {
      pauseCarouselAutoSlide();
      const newSlide = Math.round(el.scrollLeft / el.clientWidth);
      setActiveSlide(prev => (prev !== newSlide ? newSlide : prev));
      resumeCarouselAutoSlide();
    }
  };

  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] w-full bg-bg relative">
      {/* Background Decor (Hardware Accelerated Fixed Layer) */}
      <div className="fixed rounded-full blur-[60px] z-0 pointer-events-none opacity-80 w-[250px] h-[250px] bg-blue-600/20 top-[15%] -left-[100px] transform-gpu"></div>
      <div className="fixed rounded-full blur-[60px] z-0 pointer-events-none opacity-80 w-[300px] h-[300px] bg-sky-500/20 top-[40%] -right-[100px] transform-gpu"></div>
      <div className="fixed rounded-full blur-[60px] z-0 pointer-events-none opacity-80 w-[200px] h-[200px] bg-sky-500/15 bottom-[20%] left-[20%] transform-gpu"></div>

      {/* Header (Beranda) */}
      {activeTab === 'beranda' && (
        <header className="pt-4 px-4 pb-[50px] md:pt-6 md:px-12 md:pb-[70px] text-white flex flex-col relative z-10 shadow-md rounded-b-[28px] md:rounded-b-[40px] overflow-hidden bg-[linear-gradient(135deg,rgba(11,37,69,0.85)_0%,rgba(6,23,42,0.95)_100%),url('/parepare_gate_vector.jpg')] bg-center bg-cover">

          {/* Header pseudo element equivalent */}
          <div className="absolute -top-[50px] -right-[50px] w-[250px] h-[250px] rounded-full pointer-events-none z-0 bg-gradient-radial from-white/20 to-70% to-transparent"></div>

          <div className="flex justify-between items-center w-full relative z-10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 md:gap-2.5 cursor-pointer" onClick={() => setActiveTab('beranda')}>
                <img src="/logo-parepare.png" alt="SuperBie" className="w-[34px] md:w-[36px] h-auto object-contain rounded-xl drop-shadow-sm" />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="flex items-center m-0 text-white font-bold text-xl md:text-2xl tracking-tight">
                    Super<span className="font-extrabold bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(56,189,248,0.45)]">Bie</span>
                  </h1>
                  <span className="text-[0.65rem] md:text-[0.75rem] opacity-85 font-medium leading-none mt-0.5 tracking-wide text-white">SuperApps Parepare</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-nowrap items-center gap-2 md:gap-3">
              <div 
                onClick={() => setActiveTab('notifikasi')}
                className="w-[34px] h-[34px] md:w-10 md:h-10 rounded-full bg-white/20 flex justify-center items-center text-white transition-all hover:bg-white/30 active:scale-90 relative cursor-pointer"
                title="Notifikasi"
              >
                <BellIcon size={18} className="md:w-5 md:h-5" />
                <span className="absolute top-2 right-2 w-[7px] h-[7px] md:w-2 md:h-2 bg-red-500 rounded-full border border-white/50"></span>
              </div>
            </div>
          </div>

          {/* Greeting added to header */}
          <div className="w-full mt-4 md:mt-8 relative z-10 flex items-baseline gap-1.5 animate-fade-up">
            <span className="font-montserrat text-[1.2rem] md:text-[1.4rem] font-light text-white/90">{greeting},</span>
            <span className="font-montserrat text-[1.2rem] md:text-[1.4rem] font-bold text-white tracking-tight">Baco'</span>
          </div>
        </header>
      )}

      {/* Main Content (Beranda) */}
      {activeTab === 'beranda' && (
        <main className="flex-1 p-4 pb-[160px] md:px-12 max-w-[1200px] mx-auto w-full relative">

          {/* Big Weather Widget (Overlapping with Dynamic Thermometer & Vertical Ticker) */}
          {(() => {
            const currentWeather = PAREPARE_WEATHER_LIST[weatherIndex];
            const currentTempColor = (() => {
              if (currentWeather.temp >= 31) return '#ef4444';
              if (currentWeather.temp >= 29) return '#f59e0b';
              if (currentWeather.temp >= 27) return '#10b981';
              return '#0ea5e9';
            })();

            return (
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="-mt-[50px] mb-8 md:mb-10 relative z-20 isolate animate-fade-up delay-100"
              >
                <div className="bg-white rounded-[22px] py-3.5 px-3.5 md:py-4 md:px-5 shadow-lg border border-slate-200/80 relative overflow-hidden transition-all duration-500">
                  
                  {/* Subtle ambient light gradient in top right corner matching temperature */}
                  <div
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none transition-colors duration-700"
                    style={{ backgroundColor: currentTempColor }}
                  />

                  <div className="flex justify-between items-center relative z-10">
                    {/* Kolom Kiri: Suhu & Termometer dengan Indikator Warna Dinamis */}
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 text-[0.55rem] md:text-[0.65rem] text-textSecondary font-bold uppercase tracking-wider">
                        <span
                          className="w-1.5 h-1.5 rounded-full transition-colors duration-500 animate-pulse"
                          style={{ backgroundColor: currentTempColor }}
                        />
                        <span className="truncate">Suhu • {currentWeather.region}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-1.5 rounded-xl bg-slate-100/80 border border-slate-200/70 shadow-2xs transition-colors duration-500 shrink-0">
                          <ThermometerIcon temp={currentWeather.temp} />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[1.2rem] md:text-[1.45rem] font-black text-textPrimary leading-none tracking-tight font-montserrat">
                              {currentWeather.temp}°C
                            </span>
                          </div>
                          <span
                            className="text-[0.62rem] md:text-[0.68rem] font-semibold mt-0.5 transition-colors duration-500 truncate"
                            style={{ color: currentTempColor }}
                          >
                            {currentWeather.statusTag}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pembatas Vertikal */}
                    <div className="w-[1px] bg-slate-200 self-stretch mx-2 md:mx-4 my-0.5"></div>

                    {/* Kolom Kanan: Vertical Ticker Cuaca (Scroll ke atas otomatis) */}
                    <div className="flex flex-col gap-1 flex-[1.4] min-w-0 pl-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.55rem] md:text-[0.65rem] text-textSecondary font-bold uppercase tracking-wider">
                          Cuaca Parepare
                        </span>
                      </div>

                      {/* Vertical Scroll Ticker Viewport */}
                      <div
                        className="h-[44px] overflow-hidden relative cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setWeatherIndex((prev) => (prev + 1) % PAREPARE_WEATHER_LIST.length);
                        }}
                        title="Klik untuk beralih wilayah"
                      >
                        <div
                          className="h-full flex flex-col transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateY(-${weatherIndex * 100}%)` }}
                        >
                          {PAREPARE_WEATHER_LIST.map((item) => (
                            <div key={item.id} className="h-full shrink-0 flex items-center gap-2.5">
                              <div className="shrink-0 p-1 rounded-lg bg-white/90 shadow-2xs border border-slate-200/60">
                                {renderWeatherConditionIcon(item.iconType)}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-[0.78rem] md:text-[0.84rem] font-bold text-textPrimary leading-tight truncate">
                                  {item.condition}
                                </span>
                                <span className="text-[0.65rem] md:text-[0.7rem] text-slate-500 font-medium leading-tight truncate">
                                  {item.detail}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            );
          })()}


          {/* Services Grid (Ala Gojek / SuperApp Style) */}
          <div className="flex justify-between items-center mb-3.5 relative z-10 animate-fade-up delay-200">
            <h3 className="text-[1.1rem] font-bold text-textPrimary">Layanan Utama</h3>
          </div>
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 md:gap-8 mb-8 relative z-10 animate-fade-up delay-200">

            {/* 1. Lapor Pak Wali */}
            <div className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.5rem] md:text-[1.8rem] text-white shadow-sm border border-white/50 backdrop-blur-sm transition-shadow group-hover:shadow-md bg-service-lapor">
                <LaporIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-semibold text-textPrimary leading-tight">Lapor Pak Wali</h4>
            </div>

            {/* 2. SIPHP Pasar */}
            <div className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.5rem] md:text-[1.8rem] text-white shadow-sm border border-white/50 backdrop-blur-sm transition-shadow group-hover:shadow-md bg-service-siphp">
                <SiphpIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-semibold text-textPrimary leading-tight">SIPHP Pasar</h4>
            </div>

            {/* 3. Info Cuaca */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setWeatherIndex((prev) => (prev + 1) % PAREPARE_WEATHER_LIST.length);
              }}
              className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.5rem] md:text-[1.8rem] text-white shadow-sm border border-white/50 backdrop-blur-sm transition-shadow group-hover:shadow-md bg-service-cuaca">
                <WeatherIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-semibold text-textPrimary leading-tight">Info Cuaca</h4>
            </div>

            {/* 4. JDIH */}
            <div className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.5rem] md:text-[1.8rem] text-white shadow-sm border border-white/50 backdrop-blur-sm transition-shadow group-hover:shadow-md bg-service-jdih">
                <JdihIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-semibold text-textPrimary leading-tight">JDIH Hukum</h4>
            </div>

            {/* 5. Call 112 */}
            <div className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.35rem] md:text-[1.6rem] text-white shadow-sm border border-white/50 backdrop-blur-sm transition-shadow group-hover:shadow-md bg-gradient-to-br from-rose-500 to-red-600">
                <PhoneCallIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-semibold text-textPrimary leading-tight">Call 112</h4>
            </div>

            {/* 6. Disdukcapil */}
            <div className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.35rem] md:text-[1.6rem] text-white shadow-sm border border-white/50 backdrop-blur-sm transition-shadow group-hover:shadow-md bg-gradient-to-br from-teal-500 to-emerald-600">
                <IdCardIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-semibold text-textPrimary leading-tight">Disdukcapil</h4>
            </div>

            {/* 7. RSUD Ainun */}
            <div className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.35rem] md:text-[1.6rem] text-white shadow-sm border border-white/50 backdrop-blur-sm transition-shadow group-hover:shadow-md bg-gradient-to-br from-indigo-500 to-blue-600">
                <HospitalIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-semibold text-textPrimary leading-tight">RSUD Ainun</h4>
            </div>

            {/* 8. Lainnya (Ala Gojek / SuperApp) */}
            <div 
              onClick={() => setIsServicesModalOpen(true)}
              className="flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex justify-center items-center mb-2 md:mb-3 text-[1.4rem] md:text-[1.6rem] text-slate-700 shadow-sm border border-slate-200/80 backdrop-blur-sm transition-colors group-hover:shadow-md bg-slate-100 group-hover:bg-blue-50 group-hover:text-secondary group-hover:border-blue-200">
                <MoreGridIcon />
              </div>
              <h4 className="text-[0.75rem] md:text-[0.8rem] font-bold text-textPrimary leading-tight group-hover:text-secondary">Lainnya</h4>
            </div>

          </div>

          {/* Hero Banner Carousel (Visual Showcase @humaskotaparepare) */}
          <div className="w-full relative flex flex-col items-center mb-6 mt-8 animate-fade-up delay-300">
            <div
              className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-2xl md:rounded-3xl shadow-sm border border-slate-200/80 bg-slate-900 touch-pan-x transform-gpu"
              ref={carouselRef}
              onScroll={handleScroll}
              onTouchStart={pauseCarouselAutoSlide}
              onTouchEnd={resumeCarouselAutoSlide}
              onTouchCancel={resumeCarouselAutoSlide}
              onMouseEnter={pauseCarouselAutoSlide}
              onMouseLeave={resumeCarouselAutoSlide}
            >
              {PAREPARE_HUMAS_POSTS.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                  className="flex-none w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8] snap-center snap-always relative cursor-pointer group overflow-hidden bg-slate-900 select-none transform-gpu"
                  title={`Buka Instagram ${HUMAS_INSTAGRAM_HANDLE}`}
                >
                  {post.isWide ? (
                    /* Poster Wide Penuh 16:9 */
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      draggable={false}
                      decoding="async"
                      style={{ objectPosition: post.position || 'center center' }}
                      className="w-full h-full object-cover pointer-events-none select-none" 
                    />
                  ) : (
                    /* Foto Instagram Asli dengan Ambient Blurred Backdrop & Foto Utuh di Tengah */
                    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                      {/* Ambient Matching Blurred Background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 opacity-75 brightness-[0.70] pointer-events-none transform-gpu"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />

                      {/* Foto Asli Utuh di Tengah dengan Soft Shadow & Rounded Corners */}
                      <div className="relative z-10 h-full w-full flex items-center justify-center p-2.5 sm:p-4">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          draggable={false}
                          decoding="async"
                          className="max-h-full max-w-full object-contain rounded-xl shadow-2xl pointer-events-none select-none" 
                        />
                      </div>
                    </div>
                  )}

                  {/* Badge Mengambang Minimalis di Sudut Kanan Atas */}
                  <div className="absolute top-3 right-3 z-20 bg-black/65 text-white text-[10px] font-semibold py-1 px-2.5 rounded-full shadow-sm flex items-center gap-1.5 border border-white/20 group-hover:bg-pink-600 transition-colors">
                    <InstagramIcon />
                    <span>{HUMAS_INSTAGRAM_HANDLE}</span>
                    <span className="text-[9px] opacity-75">↗</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Dots */}
            <div className="flex gap-1.5 mt-3.5">
              {PAREPARE_HUMAS_POSTS.map((post, idx) => (
                <span 
                  key={post.id}
                  className={`h-2 rounded-full transition-all duration-150 ease-out cursor-pointer ${activeSlide === idx ? 'w-6 bg-secondary' : 'w-2 bg-slate-300'}`} 
                  onClick={() => {
                    pauseCarouselAutoSlide();
                    goToSlide(idx);
                    resumeCarouselAutoSlide();
                  }}
                />
              ))}
            </div>
          </div>

          {/* Informasi & Pengumuman Section (Terkoneksi ke @humaskotaparepare) */}
          <div className="flex justify-between items-center mb-3 animate-fade-up delay-300 mt-10">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[1.1rem] font-bold text-textPrimary">Informasi & Pengumuman</h3>
              <a 
                href={HUMAS_INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[10px] font-bold text-pink-700 bg-pink-50 border border-pink-200/80 hover:bg-pink-100 hover:scale-105 active:scale-95 transition-all shadow-2xs"
                title={`Buka Instagram Resmi ${HUMAS_INSTAGRAM_HANDLE}`}
              >
                <InstagramIcon />
                <span>{HUMAS_INSTAGRAM_HANDLE}</span>
                <span className="text-[9px] opacity-70">↗</span>
              </a>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 md:px-12 pt-2 -mt-2 pb-6 -mx-4 md:-mx-12 scrollbar-none animate-fade-up delay-300">
            {PAREPARE_HUMAS_POSTS.map((post) => (
              <a 
                key={post.id}
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="min-w-[240px] max-w-[250px] bg-white/90 backdrop-blur-[12px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer"
              >
                <div className="relative h-[135px] w-full overflow-hidden bg-slate-900">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    style={{ objectPosition: post.position || 'center center' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-2 left-2 bg-slate-950/75 backdrop-blur-md text-white text-[9px] font-bold py-0.5 px-2 rounded-full flex items-center gap-1 border border-white/10">
                    <InstagramIcon /> Postingan IG
                  </span>
                  <span className="absolute bottom-2 left-2 bg-secondary/90 text-white text-[8.5px] font-bold py-0.5 px-1.5 rounded uppercase">
                    {post.category}
                  </span>
                </div>
                <div className="p-3 flex flex-col justify-between flex-1 gap-2.5">
                  <h4 className="text-[0.84rem] font-bold text-textPrimary leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-bold text-pink-600 group-hover:text-pink-700">
                    <span className="text-slate-400 font-medium">{post.timeAgo}</span>
                    <span className="flex items-center gap-0.5">Lihat di IG ↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Aktivitas Kota Section */}
          <div className="flex justify-between items-center mb-3 animate-fade-up delay-[400ms] mt-10">
            <h3 className="text-[1.1rem] font-bold text-textPrimary">Aktivitas Kota Hari Ini</h3>
          </div>

          <div className="flex gap-4 overflow-x-auto px-4 md:px-12 pt-2 -mt-2 pb-6 -mx-4 md:-mx-12 scrollbar-none animate-fade-up delay-[400ms]">
            <div className="min-w-[260px] bg-white/85 backdrop-blur-[12px] rounded-[20px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-white/50 flex flex-col gap-3">
              <div className="text-[0.7rem] font-bold py-1 px-2 rounded self-start bg-[#dcfce7] text-[#166534]">Selesai</div>
              <h4 className="text-[0.95rem] font-semibold text-textPrimary m-0 leading-snug">Penambalan Jalan Berlubang</h4>
              <div className="flex items-center gap-2 text-[0.8rem] text-textSecondary font-medium">
                <span className="text-secondary opacity-80"><MapPinIcon /></span> <span>Jl. Veteran, Ujung</span>
              </div>
              <div className="flex items-center gap-2 text-[0.8rem] text-textSecondary font-medium">
                <span className="text-secondary opacity-80"><ClockIcon /></span> <span>Diselesaikan 2 jam lalu</span>
              </div>
            </div>

            <div className="min-w-[260px] bg-white/85 backdrop-blur-[12px] rounded-[20px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-white/50 flex flex-col gap-3">
              <div className="text-[0.7rem] font-bold py-1 px-2 rounded self-start bg-[#fef08a] text-[#854d0e]">Diproses</div>
              <h4 className="text-[0.95rem] font-semibold text-textPrimary m-0 leading-snug">Lampu Jalan Padam</h4>
              <div className="flex items-center gap-2 text-[0.8rem] text-textSecondary font-medium">
                <span className="text-secondary opacity-80"><MapPinIcon /></span> <span>Jl. Jend. Sudirman</span>
              </div>
              <div className="flex items-center gap-2 text-[0.8rem] text-textSecondary font-medium">
                <span className="text-secondary opacity-80"><ClockIcon /></span> <span>Sedang ditangani tim teknis</span>
              </div>
            </div>

            <div className="min-w-[260px] bg-white/85 backdrop-blur-[12px] rounded-[20px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-white/50 flex flex-col gap-3">
              <div className="text-[0.7rem] font-bold py-1 px-2 rounded self-start bg-[#dcfce7] text-[#166534]">Selesai</div>
              <h4 className="text-[0.95rem] font-semibold text-textPrimary m-0 leading-snug">Pembersihan Drainase</h4>
              <div className="flex items-center gap-2 text-[0.8rem] text-textSecondary font-medium">
                <span className="text-secondary opacity-80"><MapPinIcon /></span> <span>Pasar Senggol</span>
              </div>
              <div className="flex items-center gap-2 text-[0.8rem] text-textSecondary font-medium">
                <span className="text-secondary opacity-80"><ClockIcon /></span> <span>Diselesaikan 5 jam lalu</span>
              </div>
            </div>
          </div>

        </main>
      )}

      {/* Tab: Aktivitas */}
      {activeTab === 'aktivitas' && (
        <ActivityTab currentUserName={userProfile.name} />
      )}

      {/* Tab: Notifikasi */}
      {activeTab === 'notifikasi' && (
        <main className="flex-1 p-4 pb-[160px] md:px-12 max-w-[1000px] mx-auto w-full animate-fade-up">
          <div className="pt-6 pb-4">
            <h2 className="text-2xl font-bold text-textPrimary">Pemberitahuan</h2>
            <p className="text-xs text-textSecondary mt-1">Info update laporan, peringatan cuaca, & siaran resmi Pemkot Parepare</p>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <BellIcon size={20} />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wide">Pembaruan Laporan #LPW-2026-0891</h4>
                  <span className="text-[10px] text-blue-600 font-semibold">1 jam lalu</span>
                </div>
                <p className="text-xs text-blue-900/90 mt-1">
                  Laporan Anda mengenai <b>Lampu Jalan Padam</b> telah diterima Dishub Parepare dan personil lapangan sedang melakukan perbaikan.
                </p>
              </div>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <WeatherIcon />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">Peringatan BMKG Maritim</h4>
                  <span className="text-[10px] text-amber-700 font-semibold">3 jam lalu</span>
                </div>
                <p className="text-xs text-amber-900/90 mt-1">
                  Waspada potensi angin kencang dan gelombang sedang di perairan Selat Makassar wilayah pesisir Kota Parepare hingga sore nanti.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <LaporIcon />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">Laporan Selesai #LPW-2026-0842</h4>
                  <span className="text-[10px] text-emerald-700 font-semibold">Kemarin</span>
                </div>
                <p className="text-xs text-emerald-900/90 mt-1">
                  Dinas PUPR Parepare telah menuntaskan <b>Penambalan Aspal Lubang Jalan Poros Penghubung</b>. Silakan cek bukti foto Sebelum & Sesudah serta berikan penilaian layanan di menu Aktivitas.
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Tab: Profil */}
      {activeTab === 'profil' && (
        <ProfileTab
          onNavigateTab={(tab) => setActiveTab(tab)}
          profile={userProfile}
          onProfileChange={setUserProfile}
        />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full md:bottom-4 md:max-w-md md:left-1/2 md:-translate-x-1/2 md:rounded-3xl bg-white/95 backdrop-blur-[12px] border-t md:border border-borderC shadow-bottom-nav flex justify-around py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-[100] transform-gpu">
        <div
          className={`flex flex-col items-center gap-1 text-[0.75rem] font-medium transition-all active:scale-90 cursor-pointer min-w-[60px] ${activeTab === 'beranda' ? 'text-secondary font-bold' : 'text-textSecondary'}`}
          onClick={() => setActiveTab('beranda')}
        >
          <div className={`text-[1.25rem] flex justify-center items-center w-14 h-8 rounded-2xl transition-all duration-300 ease-out ${activeTab === 'beranda' ? 'bg-secondary/25 text-secondary' : ''}`}><HomeIcon size={22} /></div>
          <span>Beranda</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 text-[0.75rem] font-medium transition-all active:scale-90 cursor-pointer min-w-[60px] ${activeTab === 'aktivitas' ? 'text-secondary font-bold' : 'text-textSecondary'}`}
          onClick={() => setActiveTab('aktivitas')}
        >
          <div className={`text-[1.25rem] flex justify-center items-center w-14 h-8 rounded-2xl transition-all duration-300 ease-out ${activeTab === 'aktivitas' ? 'bg-secondary/25 text-secondary' : ''}`}><ActivityIcon size={22} /></div>
          <span>Aktivitas</span>
        </div>

        {/* Center Floating Action Button (Camera/Lapor) */}
        <div
          className="flex flex-col items-center justify-end relative w-[70px] cursor-pointer -mt-9 z-[105] group"
          onClick={() => console.log('Buka Kamera Lapor')}
        >
          <div className="w-16 h-16 rounded-full bg-secondary text-white flex justify-center items-center shadow-fab text-[1.8rem] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:bg-blue-700 group-hover:shadow-fab-hover group-active:scale-90 mb-2 animate-pulse-fab group-hover:animate-none">
            <CameraIcon />
          </div>
          <span className="text-[0.75rem] font-bold text-secondary">Lapor</span>
        </div>

        <div
          className={`flex flex-col items-center gap-1 text-[0.75rem] font-medium transition-all active:scale-90 cursor-pointer min-w-[60px] ${activeTab === 'notifikasi' ? 'text-secondary font-bold' : 'text-textSecondary'}`}
          onClick={() => setActiveTab('notifikasi')}
        >
          <div className={`text-[1.25rem] flex justify-center items-center w-14 h-8 rounded-2xl transition-all duration-300 ease-out ${activeTab === 'notifikasi' ? 'bg-secondary/25 text-secondary' : ''}`}><BellIcon size={22} /></div>
          <span>Notifikasi</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 text-[0.75rem] font-medium transition-all active:scale-90 cursor-pointer min-w-[60px] ${activeTab === 'profil' ? 'text-secondary font-bold' : 'text-textSecondary'}`}
          onClick={() => setActiveTab('profil')}
        >
          <div className={`text-[1.25rem] flex justify-center items-center w-14 h-8 rounded-2xl transition-all duration-300 ease-out ${activeTab === 'profil' ? 'bg-secondary/25 text-secondary' : ''}`}><UserIcon size={22} /></div>
          <span>Profil</span>
        </div>
      </nav>
      {/* Modal Semua Layanan (Gojek / SuperApp Style Bottom Sheet) */}
      {isServicesModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsServicesModalOpen(false)}
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85dvh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden relative animate-fade-up overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Drag Handle for Mobile */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto sm:hidden mt-2.5 mb-1 shrink-0"></div>

            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-150 flex justify-between items-center shrink-0 bg-white">
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Semua Layanan SuperBie
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Portal Layanan Publik Terpadu Kota Parepare
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsServicesModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 shrink-0 transition-colors cursor-pointer"
                title="Tutup"
              >
                <XIcon />
              </button>
            </div>

            {/* Modal Body: Categorized Services */}
            <div className="p-5 overflow-y-auto overscroll-contain flex-1 flex flex-col gap-5">
              {/* Kategori 1: Pengaduan & Informasi Publik */}
              <div>
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Pengaduan & Aspirasi Warga
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  <div 
                    onClick={() => { setIsServicesModalOpen(false); setActiveTab('aktivitas'); }}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl flex justify-center items-center mb-1.5 text-white text-xl bg-service-lapor shadow-xs group-hover:scale-105 transition-all">
                      <LaporIcon />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 leading-tight">Lapor Pak Wali</span>
                  </div>
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl flex justify-center items-center mb-1.5 text-white text-xl bg-service-siphp shadow-xs group-hover:scale-105 transition-all">
                      <SiphpIcon />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 leading-tight">SIPHP Pasar</span>
                  </div>
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl flex justify-center items-center mb-1.5 text-white text-xl bg-service-cuaca shadow-xs group-hover:scale-105 transition-all">
                      <WeatherIcon />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 leading-tight">Info Cuaca</span>
                  </div>
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl flex justify-center items-center mb-1.5 text-white text-xl bg-service-jdih shadow-xs group-hover:scale-105 transition-all">
                      <JdihIcon />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 leading-tight">JDIH Hukum</span>
                  </div>
                </div>
              </div>

              {/* Kategori 2: Kedaruratan & Kesehatan */}
              <div>
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Kedaruratan & Kesehatan
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl flex justify-center items-center mb-1.5 text-white text-lg bg-gradient-to-br from-rose-500 to-red-600 shadow-xs group-hover:scale-105 transition-all">
                      <PhoneCallIcon />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 leading-tight">Call 112</span>
                  </div>
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl flex justify-center items-center mb-1.5 text-white text-lg bg-gradient-to-br from-indigo-500 to-blue-600 shadow-xs group-hover:scale-105 transition-all">
                      <HospitalIcon />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 leading-tight">RSUD Ainun</span>
                  </div>
                </div>
              </div>

              {/* Kategori 3: Kependudukan & Pajak */}
              <div>
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Administrasi Warga
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl flex justify-center items-center mb-1.5 text-white text-lg bg-gradient-to-br from-teal-500 to-emerald-600 shadow-xs group-hover:scale-105 transition-all">
                      <IdCardIcon />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 leading-tight">Disdukcapil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setIsServicesModalOpen(false)}
                className="py-2 px-5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

export default App;
