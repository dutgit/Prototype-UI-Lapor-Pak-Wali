import React, { useState, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';

const PROFILE_STORAGE_KEY = 'superbie_profile_v1';
const AVATAR_STORAGE_KEY = 'superbie_avatar_v1';

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

// Icons
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const CameraIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function ProfileTab({ onNavigateTab, profile: externalProfile, onProfileChange }) {
  // User profile state (persisted in localStorage)
  const [localProfile, setLocalProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  const profile = externalProfile || localProfile;

  const updateProfile = (updater) => {
    const next = typeof updater === 'function' ? updater(profile) : updater;
    setLocalProfile(next);
    if (onProfileChange) onProfileChange(next);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const [avatarUrl, setAvatarUrl] = useState(() => {
    try {
      return localStorage.getItem(AVATAR_STORAGE_KEY) || '/avatar-ahmad.png';
    } catch {
      return '/avatar-ahmad.png';
    }
  });

  const fileInputRef = useRef(null);

  // Edit Modal State
  const [editSection, setEditSection] = useState(null); // 'info' | 'address' | 'password' | null
  const [formData, setFormData] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);

  // Body scroll lock saat modal edit profil terbuka
  useEffect(() => {
    if (editSection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editSection]);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenEdit = (section) => {
    setEditSection(section);
    setFormData({
      ...profile,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : URL.createObjectURL(file);
        setAvatarUrl(result);
        try {
          localStorage.setItem(AVATAR_STORAGE_KEY, result);
        } catch {
          // Ignore if image exceeds localStorage quota
        }
        showToast('Foto profil berhasil diperbarui!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (editSection === 'password') {
      if (!formData.currentPassword) {
        alert('Mohon masukkan kata sandi saat ini.');
        return;
      }
      if (!formData.newPassword || formData.newPassword.length < 8) {
        alert('Kata sandi baru minimal harus 8 karakter.');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        alert('Konfirmasi kata sandi baru tidak cocok.');
        return;
      }
      showToast('Kata sandi akun Anda berhasil diperbarui!');
      setEditSection(null);
      return;
    }

    updateProfile(prev => ({
      ...prev,
      name: formData.name || prev.name,
      phone: formData.phone || prev.phone,
      address: formData.address || prev.address,
      lastUpdated: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }));
    showToast('Data profil berhasil disimpan!');
    setEditSection(null);
  };

  return (
    <div className="w-full text-[#1e293b] flex-1">
      {/* Toast Notifikasi Feedback (Fixed Floating) */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md bg-emerald-600 text-white text-xs font-bold py-3 px-4 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">✓</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white p-1 text-sm font-bold">✕</button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 p-4 md:p-8 max-w-4xl mx-auto w-full flex flex-col gap-5 pb-36 md:pb-28 animate-fade-in">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Hello, {profile.name.split(' ')[0]}!
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-normal mt-0.5">
              Profil Akun • Lapor Pak Wali — Kelola data diri dan keamanan akun Anda
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <div 
              onClick={() => onNavigateTab && onNavigateTab('notifikasi')}
              className="w-9 h-9 rounded-full bg-slate-200/70 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition-colors relative"
              title="Notifikasi"
            >
              <BellIcon />
            </div>
          </div>
        </div>

        {/* CARD 1: Profile Summary Card */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/70 flex items-center gap-5 relative">
          {/* Avatar with Camera badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-amber-500 p-0.5 shadow-sm">
              <img 
                src={avatarUrl} 
                alt="Ahmad Warga Avatar" 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleAvatarChange} 
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#f59e0b] hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center border-2 border-white shadow-sm transition-all cursor-pointer"
              title="Ganti Foto Profil"
            >
              <CameraIcon />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                {profile.name}
              </h2>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                {profile.status}
              </span>
            </div>

            <p className="text-xs md:text-sm font-medium text-slate-600 mt-1">
              {profile.role}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
              <span className="text-slate-400"><MapPinIcon /></span>
              <span>{profile.address}</span>
            </div>

            <p className="text-[11px] text-slate-400 font-normal mt-1">
              Bergabung sejak {profile.joinedDate}
            </p>
          </div>
        </section>

        {/* CARD 2: Informasi Pribadi */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/70 flex flex-col gap-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                Informasi Pribadi
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Data kontak yang dapat Anda perbarui sendiri.
              </p>
            </div>
            <button 
              onClick={() => handleOpenEdit('info')}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#f59e0b] hover:bg-amber-600 active:scale-95 py-1.5 px-4 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <EditIcon />
              <span>Edit</span>
            </button>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Nama Lengkap</p>
                <p className="text-sm font-bold text-slate-900">{profile.name}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">NIK</p>
                <p className="text-sm font-bold text-slate-900">{profile.nik}</p>
                <p className="text-[10px] text-slate-400 font-normal mt-1 leading-tight">
                  NIK ditampilkan penuh dan tidak dapat diubah setelah akun dibuat.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Alamat Email</p>
                <p className="text-sm font-bold text-slate-900">{profile.email}</p>
                <p className="text-[10px] text-slate-400 font-normal mt-1 leading-tight">
                  Email adalah kredensial login dan tidak dapat diubah di sini.
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Peran</p>
                <p className="text-sm font-bold text-slate-900">{profile.role}</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Nomor HP</p>
                <p className="text-sm font-bold text-slate-900">{profile.phone}</p>
                <p className="text-[10px] text-slate-400 font-normal mt-1 leading-tight">
                  Format lokal (08...) atau Internasional (+62...)
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Status Akun</p>
                <p className="text-sm font-bold italic text-slate-900">{profile.status}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CARD 3: Alamat */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/70 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                Alamat
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Alamat tempat tinggal Anda saat ini.
              </p>
            </div>
            <button 
              onClick={() => handleOpenEdit('address')}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#f59e0b] hover:bg-amber-600 active:scale-95 py-1.5 px-4 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <EditIcon />
              <span>Edit</span>
            </button>
          </div>

          <div className="pt-1">
            <p className="text-xs text-slate-400 font-medium mb-1">Alamat</p>
            <p className="text-sm font-bold text-slate-900">{profile.address}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Bergabung Sejak</p>
              <p className="text-sm font-bold text-slate-900">{profile.joinedDate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Terakhir Diperbarui</p>
              <p className="text-sm font-bold text-slate-900">{profile.lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* CARD 4: Keamanan & Kata Sandi */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/70 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                Keamanan & Kata Sandi
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kosongkan bila Anda tidak ingin mengubah kata sandi.
              </p>
            </div>
            <button 
              onClick={() => handleOpenEdit('password')}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#f59e0b] hover:bg-amber-600 active:scale-95 py-1.5 px-4 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <EditIcon />
              <span>Edit</span>
            </button>
          </div>

          <div className="pt-1">
            <p className="text-xs text-slate-400 font-medium mb-1">Kata Sandi Saat Ini</p>
            <p className="text-sm font-bold text-slate-900">—</p>
            <p className="text-[10px] text-slate-400 font-normal mt-1 leading-tight">
              Wajib diisi hanya jika Anda menetapkan kata sandi baru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Kata Sandi Baru</p>
              <p className="text-sm font-bold text-slate-900">—</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Konfirmasi Kata Sandi Baru</p>
              <p className="text-sm font-bold text-slate-900">—</p>
            </div>
          </div>
        </section>
      </main>

      {/* EDIT MODAL DIALOG (Menggunakan Portal z-[999] agar berada di atas Bottom Nav) */}
      {editSection && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setEditSection(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full max-h-[90dvh] overflow-y-auto overscroll-contain p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h4 className="text-base font-bold text-slate-900">
                {editSection === 'info' && 'Edit Informasi Pribadi'}
                {editSection === 'address' && 'Edit Alamat'}
                {editSection === 'password' && 'Ubah Kata Sandi'}
              </h4>
              <button 
                type="button"
                onClick={() => setEditSection(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer transition-colors"
                title="Tutup"
              >
                <XIcon />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-3.5">
              {editSection === 'info' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={formData.name || ''} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Nomor HP</label>
                    <input 
                      type="text" 
                      value={formData.phone || ''} 
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              {editSection === 'address' && (
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Alamat Lengkap</label>
                  <textarea 
                    rows="3"
                    value={formData.address || ''} 
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              )}

              {editSection === 'password' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Kata Sandi Saat Ini</label>
                    <input 
                      type="password" 
                      value={formData.currentPassword || ''}
                      onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                      placeholder="Masukkan kata sandi lama"
                      required
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Kata Sandi Baru</label>
                    <input 
                      type="password" 
                      value={formData.newPassword || ''}
                      onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                      placeholder="Minimal 8 karakter"
                      required
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Konfirmasi Kata Sandi Baru</label>
                    <input 
                      type="password" 
                      value={formData.confirmPassword || ''}
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Ulangi kata sandi baru"
                      required
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setEditSection(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#f59e0b] hover:bg-amber-600 active:scale-95 rounded-xl shadow-sm cursor-pointer transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default memo(ProfileTab);
