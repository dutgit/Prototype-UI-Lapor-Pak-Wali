// Ikon ilustrasi flat (duotone) untuk grid "Layanan Utama".
// Gaya: isi solid biru on-tone + aksen emas/hijau, simpel tapi tetap berdetail.

const B = '#2563eb';   // biru utama
const BD = '#1e3a8a';  // biru tua (navy)
const BL = '#93c5fd';  // biru muda
const BXL = '#dbeafe'; // biru sangat muda
const Y = '#f5b301';   // emas (senada "Bie")
const G = '#10b981';   // hijau aksen
const W = '#ffffff';

const Ground = () => <ellipse cx="24" cy="43.5" rx="15" ry="1.8" fill={BL} opacity="0.45" />;

const Svg = ({ className, children }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {children}
  </svg>
);

export const LaporIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <Ground />
    {/* gagang */}
    <path d="M14.5 28.5 18.2 38.6a1.9 1.9 0 0 0 3.6-1.3L19.4 29.6Z" fill={G} />
    {/* badan corong */}
    <path d="M12 19.5 30 11v25l-18-7.5Z" fill={B} />
    <path d="M15 21.6 27 16" stroke={W} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
    {/* tutup belakang */}
    <rect x="6.5" y="18.5" width="7.5" height="11" rx="2.4" fill={BD} />
    {/* mulut corong */}
    <ellipse cx="31" cy="23.5" rx="3.8" ry="13" fill={BD} />
    <ellipse cx="31.3" cy="23.5" rx="2" ry="10.2" fill={BL} />
    {/* gelombang suara */}
    <path d="M38.5 15.5 41.5 12.5M39.5 23.5h4M38.5 31.5l3 3" stroke={Y} strokeWidth="2.4" strokeLinecap="round" />
  </Svg>
);

export const PasarIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <Ground />
    {/* isi belanjaan */}
    <circle cx="15" cy="17" r="5.5" fill={G} />
    <path d="M15 12.5v-3.5M15 11.5c1.6-2 3.6-2.4 5-2" stroke={BD} strokeWidth="1.6" strokeLinecap="round" />
    <rect x="21" y="8" width="8" height="13" rx="2" fill={BL} />
    <rect x="21" y="11" width="8" height="3" fill={W} opacity="0.7" />
    {/* keranjang */}
    <path d="M8.5 23h27l-2.8 14.3a3 3 0 0 1-2.9 2.4H14.2a3 3 0 0 1-2.9-2.4Z" fill={B} />
    <rect x="6" y="19.5" width="32" height="5" rx="2.5" fill={BD} />
    <path d="M16 28v7M22 28v7M28 28v7" stroke={W} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    {/* koin Rp */}
    <circle cx="37" cy="34" r="7.5" fill={Y} />
    <circle cx="37" cy="34" r="5.6" stroke={W} strokeWidth="1" opacity="0.6" />
    <text x="37" y="36.4" textAnchor="middle" fontSize="6.4" fontWeight="800" fill={W} fontFamily="inherit">Rp</text>
  </Svg>
);

export const CuacaIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <Ground />
    {/* matahari */}
    <path d="M31 3.5V6.5M40.5 7l-2 2M44.5 16h-3" stroke={Y} strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="31" cy="16" r="8" fill={Y} />
    {/* awan belakang */}
    <path d="M30 31a6 6 0 0 1 6-6 6 6 0 0 1 5.6 8.2A4 4 0 0 1 40 41H30Z" fill={BL} />
    {/* awan utama */}
    <path d="M14 39a8 8 0 0 1-.8-15.96A10 10 0 0 1 32.5 25a7 7 0 0 1 .5 14Z" fill={B} />
    <path d="M14.5 28.5a5 5 0 0 1 5-4.2" stroke={W} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
  </Svg>
);

export const JdihIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <Ground />
    {/* halaman belakang */}
    <rect x="14" y="8" width="24" height="32" rx="3" fill={BL} />
    {/* halaman depan */}
    <rect x="9" y="5" width="24" height="33" rx="3" fill={W} stroke={B} strokeWidth="2" />
    <rect x="13" y="10" width="12" height="4.5" rx="1.5" fill={B} />
    <rect x="13" y="18.5" width="16" height="2.2" rx="1.1" fill={BL} />
    <rect x="13" y="23.5" width="16" height="2.2" rx="1.1" fill={BL} />
    <rect x="13" y="28.5" width="9" height="2.2" rx="1.1" fill={BL} />
    {/* lencana timbangan hukum */}
    <circle cx="35" cy="34" r="8.5" fill={Y} />
    <path d="M35 29v9.5M30.5 31h9M32.2 38.5h5.6" stroke={W} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M30.5 31l-2 3.8h4ZM39.5 31l-2 3.8h4Z" fill={W} stroke={W} strokeWidth="0.8" strokeLinejoin="round" />
  </Svg>
);

export const DaruratIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <Ground />
    {/* gagang telepon */}
    <g transform="translate(3 13) scale(1.25)">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        fill={B}
        stroke={B}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path d="M4.6 4.2h2" stroke={W} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </g>
    {/* gelembung 112 */}
    <path d="M27.5 5h11a6.5 6.5 0 0 1 0 13H32l-3.5 3.2V17.6A6.5 6.5 0 0 1 27.5 5Z" fill={Y} />
    <text x="33" y="14.4" textAnchor="middle" fontSize="7.2" fontWeight="800" fill={W} fontFamily="inherit">112</text>
  </Svg>
);

export const KtpIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <Ground />
    {/* kartu */}
    <rect x="5" y="10" width="38" height="27" rx="4" fill={B} />
    <path d="M5 14a4 4 0 0 1 4-4h30a4 4 0 0 1 4 4v2.5H5Z" fill={BD} />
    <circle cx="10" cy="13.3" r="1.5" fill={Y} />
    <rect x="14" y="12.4" width="12" height="1.8" rx="0.9" fill={BL} opacity="0.8" />
    {/* foto */}
    <rect x="9" y="19.5" width="11" height="13.5" rx="2" fill={BXL} />
    <circle cx="14.5" cy="24.6" r="2.7" fill={B} />
    <path d="M10.3 33a4.2 4.2 0 0 1 8.4 0Z" fill={B} />
    {/* data */}
    <rect x="23" y="21" width="15" height="2.4" rx="1.2" fill={W} />
    <rect x="23" y="26" width="11" height="2.2" rx="1.1" fill={BL} />
    <rect x="23" y="30.5" width="8" height="2.2" rx="1.1" fill={BL} />
    {/* segel terverifikasi */}
    <circle cx="38.5" cy="35.5" r="6" fill={Y} />
    <path d="m35.8 35.6 1.9 1.9 3.6-3.8" stroke={W} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const RsudIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <Ground />
    {/* gedung */}
    <rect x="9" y="15" width="30" height="25" rx="2.5" fill={B} />
    {/* menara dengan palang */}
    <rect x="16" y="5" width="16" height="14" rx="3" fill={BD} />
    <circle cx="24" cy="12" r="4.8" fill={W} />
    <rect x="22.9" y="9" width="2.2" height="6" rx="0.8" fill={G} />
    <rect x="21" y="10.9" width="6" height="2.2" rx="0.8" fill={G} />
    {/* jendela */}
    <rect x="12.5" y="22" width="5" height="4" rx="1" fill={BL} />
    <rect x="30.5" y="22" width="5" height="4" rx="1" fill={BL} />
    <rect x="12.5" y="29.5" width="5" height="4" rx="1" fill={BL} />
    <rect x="30.5" y="29.5" width="5" height="4" rx="1" fill={BL} />
    {/* pintu */}
    <path d="M20 40v-7.5a4 4 0 0 1 8 0V40Z" fill={BXL} />
    <rect x="6" y="38.8" width="36" height="2.6" rx="1.3" fill={BD} />
  </Svg>
);

export const LainnyaIllustration = ({ className = 'w-full h-full' }) => (
  <Svg className={className}>
    <rect x="11" y="11" width="11" height="11" rx="3.8" fill={B} />
    <rect x="26" y="11" width="11" height="11" rx="3.8" fill={BL} />
    <rect x="11" y="26" width="11" height="11" rx="3.8" fill={BL} />
    <rect x="26" y="26" width="11" height="11" rx="3.8" fill={B} />
  </Svg>
);
