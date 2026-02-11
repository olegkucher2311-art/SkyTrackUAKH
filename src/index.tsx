
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- TRANSLATIONS ---
const translations = {
  uk: {
    title: "SkyTrackUa",
    kyivTime: "Час (Київ)",
    airfields: "Аеродроми пусків",
    airfieldDesc: "Військовий аеродром РФ, що використовується для запусків БПЛА Shahed.",
    statsTitle: "Статистика пусків (останні 7 днів)",
    alertMap: "Мапа повітряних тривог",
    openOriginalMap: "🔗 Відкрити оригінал",
    adminLogin: "Адмін-панель",
    enterPin: "Введіть код доступу:",
    login: "Увійти",
    logout: "Вийти",
    cancel: "Скасувати",
    wrongPin: "Невірний код",
    noThreat: "Загроза відсутня",
    noThreatDesc: "Активність пускових установок не зафіксована.",
    threatDetected: "ВІДМІЧЕНО ПУСКИ ШАХЕДІВ",
    threatDetectedDesc: "Увага! Зафіксовано виліт ударних БПЛА. Прямуйте в укриття.",
    announceLaunch: "🔴 Оголосити пуск",
    cancelLaunch: "🟢 Відмінити пуск",
    launches: "пусків",
    language: "Мова",
    theme: "Тема",
    emptyStats: "Немає зафіксованих пусків",
    missileSection: "Загроза ракетного обстрілу",
    missileWarning: "УВАГА! Цієї ночі можливий ракетний удар.",
    missileQuiet: "Тихо. Ракетний удар не планується.",
    missileDescWarn: "Зафіксовано активність стратегічної авіації або флоту РФ.",
    missileDescQuiet: "Активність носіїв крилатих ракет не зафіксована.",
    adminAction: "Дія адміністратора:",
    setThreat: "Встановити ЗАГРОЗУ",
    setQuiet: "Встановити ТИХО",
    monitorChannel: "monitorofukraine",
    subscribers: "підписників",
    openTelegram: "Відкрити в Telegram",
    close: "Закрити",
    latestNews: "Останні повідомлення"
  },
  en: {
    title: "SkyTrackUa",
    kyivTime: "Kyiv Time",
    airfields: "Launch Airfields",
    airfieldDesc: "Russian military airfield used for Shahed UAV launches.",
    statsTitle: "Launch Statistics (Last 7 Days)",
    alertMap: "Air Raid Alert Map",
    openOriginalMap: "🔗 Open Original Link",
    adminLogin: "Admin Panel",
    enterPin: "Enter access code:",
    login: "Login",
    logout: "Logout",
    cancel: "Cancel",
    wrongPin: "Invalid code",
    noThreat: "No threat",
    noThreatDesc: "No launcher activity detected.",
    threatDetected: "SHAHED LAUNCHES DETECTED",
    threatDetectedDesc: "Attention! UAV launch detected. Take shelter.",
    announceLaunch: "🔴 Announce Launch",
    cancelLaunch: "🟢 Cancel Launch",
    launches: "launches",
    language: "Language",
    theme: "Theme",
    emptyStats: "No launches recorded",
    missileSection: "Missile Strike Threat",
    missileWarning: "WARNING! Missile strike possible tonight.",
    missileQuiet: "Quiet. No missile strike expected.",
    missileDescWarn: "Strategic aviation or fleet activity detected.",
    missileDescQuiet: "No cruise missile carrier activity detected.",
    adminAction: "Admin Action:",
    setThreat: "Set THREAT",
    setQuiet: "Set QUIET",
    monitorChannel: "monitorofukraine",
    subscribers: "subscribers",
    openTelegram: "Open in Telegram",
    close: "Close",
    latestNews: "Latest Messages"
  },
  pl: {
    title: "SkyTrackUa",
    kyivTime: "Czas w Kijowie",
    airfields: "Lotniska Startowe",
    airfieldDesc: "Rosyjskie lotnisko wojskowe używane do startów dronów Shahed.",
    statsTitle: "Statystyki Startów (Ostatnie 7 dni)",
    alertMap: "Mapa Alarmów Lotniczych",
    openOriginalMap: "🔗 Otwórz oryginał",
    adminLogin: "Panel Administratora",
    enterPin: "Wprowadź kod dostępu:",
    login: "Zaloguj",
    logout: "Wyloguj",
    cancel: "Anuluj",
    wrongPin: "Nieprawidłowy kod",
    noThreat: "Brak zagrożenia",
    noThreatDesc: "Nie wykryto aktywności wyrzutni.",
    threatDetected: "WYKRYTO STARTY SZAHEDÓW",
    threatDetectedDesc: "Uwaga! Wykryto start dronów. Udaj się do schronu.",
    announceLaunch: "🔴 Ogłoś start",
    cancelLaunch: "🟢 Odwołaj start",
    launches: "startów",
    language: "Język",
    theme: "Motyw",
    emptyStats: "Brak zarejestrowanych startów",
    missileSection: "Zagrożenie Rakietowe",
    missileWarning: "UWAGA! Możliwy atak rakietowy tej nocy.",
    missileQuiet: "Cicho. Atak rakietowy nie jest planowany.",
    missileDescWarn: "Wykryto aktywność lotnictwa strategicznego lub floty.",
    missileDescQuiet: "Brak aktywności nosicieli rakiet.",
    adminAction: "Akcja Admina:",
    setThreat: "Ustaw ZAGROŻENIE",
    setQuiet: "Ustaw CICHO",
    monitorChannel: "monitorofukraine",
    subscribers: "subskrybentów",
    openTelegram: "Otwórz w Telegramie",
    close: "Zamknij",
    latestNews: "Ostatnie wiadomości"
  },
  de: {
    title: "SkyTrackUa",
    kyivTime: "Kiewer Zeit",
    airfields: "Startflugplätze",
    airfieldDesc: "Russischer Militärflugplatz für Shahed-Drohnenstarts.",
    statsTitle: "Startstatistiken (Letzte 7 Tage)",
    alertMap: "Luftalarmkarte",
    openOriginalMap: "🔗 Original öffnen",
    adminLogin: "Admin-Panel",
    enterPin: "Zugangscode eingeben:",
    login: "Anmelden",
    logout: "Abmelden",
    cancel: "Abbrechen",
    wrongPin: "Falscher Code",
    noThreat: "Keine Bedrohung",
    noThreatDesc: "Keine Aktivität der Startrampen erkannt.",
    threatDetected: "SCHAHED-STARTS ERKANNT",
    threatDetectedDesc: "Achtung! Drohnenstart erkannt. Schutz suchen.",
    announceLaunch: "🔴 Start ankündigen",
    cancelLaunch: "🟢 Start abbrechen",
    launches: "Starts",
    language: "Sprache",
    theme: "Thema",
    emptyStats: "Keine Starts aufgezeichnet",
    missileSection: "Raketenbedrohung",
    missileWarning: "ACHTUNG! Raketenangriff heute Nacht möglich.",
    missileQuiet: "Ruhig. Kein Raketenangriff erwartet.",
    missileDescWarn: "Aktivität der strategischen Luftfahrt oder Flotte erkannt.",
    missileDescQuiet: "Keine Aktivität von Raketenträgern erkannt.",
    adminAction: "Admin-Aktion:",
    setThreat: "Bedrohung SETZEN",
    setQuiet: "Ruhig SETZEN",
    monitorChannel: "monitorofukraine",
    subscribers: "abonnenten",
    openTelegram: "In Telegram öffnen",
    close: "Schließen",
    latestNews: "Neueste Nachrichten"
  }
};

type LangKey = keyof typeof translations;

const airfieldsData = [
  { id: 'chauda', name: { uk: 'Мис Чауда (Крим)', en: 'Cape Chauda (Crimea)', pl: 'Przylądek Czauda', de: 'Kap Tschauda' } },
  { id: 'primorsko', name: { uk: 'Приморсько-Ахтарськ', en: 'Primorsko-Akhtarsk', pl: 'Primorsko-Achtarsk', de: 'Primorsko-Achtarsk' } },
  { id: 'yeysk', name: { uk: 'Єйськ', en: 'Yeysk', pl: 'Jejsk', de: 'Jejsk' } },
  { id: 'kursk', name: { uk: 'Курськ', en: 'Kursk', pl: 'Kursk', de: 'Kursk' } },
  { id: 'seshcha', name: { uk: 'Сеща', en: 'Seshcha', pl: 'Seszcza', de: 'Seschtscha' } }
];

const getInitialStats = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' }),
      count: 0
    });
  }
  return days;
};

// --- ICONS ---
const Icons = {
  Moon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
  Sun: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Unlock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
  Alert: () => <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Check: () => <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Map: () => <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  Rocket: () => <svg className="w-8 h-8 md:w-10 md:h-10 inline-block mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Shield: () => <svg className="w-8 h-8 md:w-10 md:h-10 inline-block mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Pin: () => <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Info: () => <svg className="w-4 h-4 ml-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Phone: () => <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.61 15.35C17.47 15.63 17.06 16.03 16.59 16.32C16.12 16.61 15.54 16.8 14.88 16.9C13.86 17.06 12.63 16.81 10.87 16.04C9.11 15.27 7.74 14.22 7.74 14.22C7.74 14.22 6.27 12.44 5.56 10.5C4.85 8.56 5.22 7.7 5.22 7.7C5.22 7.7 5.5 6.94 5.92 6.55C6.18 6.3 6.56 6.13 6.9 6.13C7.14 6.13 7.37 6.22 7.55 6.64C7.55 6.64 8.16 8.13 8.24 8.35C8.32 8.57 8.36 8.81 8.24 9.04C8.12 9.27 7.94 9.4 7.74 9.61C7.54 9.82 7.34 9.98 7.56 10.37C7.78 10.76 8.53 11.98 9.64 12.97C11.1 14.27 12.28 14.68 12.72 14.68C13.16 14.68 13.4 14.47 13.62 14.22C13.84 13.97 14.4 13.25 14.68 12.97C14.96 12.69 15.36 12.69 15.68 12.83C16 12.97 17.88 13.9 17.88 13.9C17.88 13.9 18.22 14.07 18.28 14.25C18.34 14.43 18.34 14.85 17.61 15.35Z"/></svg>,
  Telegram: () => <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.82 14.39 15.48 16.21C15.34 16.98 15.06 17.24 14.79 17.26C14.19 17.32 13.73 16.86 13.15 16.48C12.24 15.88 11.73 15.51 10.84 14.93C9.82 14.25 10.48 13.88 11.06 13.28C11.21 13.12 13.83 10.74 13.88 10.53C13.89 10.5 13.89 10.41 13.84 10.36C13.78 10.31 13.7 10.33 13.63 10.34C13.54 10.36 12.06 11.34 9.19 13.28C8.77 13.57 8.39 13.71 7.95 13.7C7.47 13.69 6.54 13.43 5.85 13.2C5.01 12.93 4.67 12.82 4.73 12.35C4.76 12.11 5.09 11.86 5.73 11.61C9.72 9.77 12.39 8.67 13.73 8.11C16.92 6.79 17.58 6.55 18 6.55C18.09 6.55 18.29 6.57 18.39 6.66C18.49 6.75 18.52 6.87 18.52 7C18.53 7.07 18.52 7.24 18.5 7.4L16.64 8.8Z"/></svg>,
  Battery: () => <svg className="w-6 h-3" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor"/><path d="M23 4V8" stroke="currentColor" strokeLinecap="round"/><rect x="2.5" y="2.5" width="17" height="7" rx="0.5" fill="currentColor"/></svg>,
  Wifi: () => <svg className="w-5 h-4" viewBox="0 0 20 15" fill="none"><path d="M10 12.5C10.8284 12.5 11.5 11.8284 11.5 11C11.5 10.1716 10.8284 9.5 10 9.5C9.17157 9.5 8.5 10.1716 8.5 11C8.5 11.8284 9.17157 12.5 10 12.5Z" fill="currentColor"/><path d="M15.657 8.343C14.156 6.842 12.156 6 10 6C7.844 6 5.844 6.842 4.343 8.343L5.757 9.757C6.89 8.624 8.39 8 10 8C11.61 8 13.11 8.624 14.243 9.757L15.657 8.343Z" fill="currentColor"/><path d="M18.485 5.515C16.22 3.25 13.22 2 10 2C6.78 2 3.78 3.25 1.515 5.515L2.929 6.929C4.81 5.048 7.31 4 10 4C12.69 4 15.19 5.048 17.071 6.929L18.485 5.515Z" fill="currentColor"/></svg>,
  Cell: () => <svg className="w-5 h-3" viewBox="0 0 18 10" fill="none"><path d="M2 7.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6.5 5.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M15.5 1.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
};

// --- TELEGRAM PHONE COMPONENT ---
const TelegramPhone = ({ isOpen, onClose, t }: { isOpen: boolean; onClose: () => void; t: any }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-8 pointer-events-none">
      <div className={`pointer-events-auto relative w-[340px] h-[700px] bg-black rounded-[60px] border-[10px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-75 opacity-0'}`}>
        
        {/* Screen */}
        <div className="w-full h-full bg-[#0e1621] rounded-[48px] overflow-hidden relative flex flex-col">
          
          {/* Status Bar */}
          <div className="h-12 px-6 flex justify-between items-center text-white text-xs font-semibold select-none z-30 pt-2">
            <span>{currentTime}</span>
            <div className="flex space-x-2 items-center">
              <Icons.Cell />
              <Icons.Wifi />
              <Icons.Battery />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-40 transition-all duration-300 hover:w-[180px] hover:h-[45px] flex items-center justify-center shadow-lg cursor-pointer group">
             <div className="w-2 h-2 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity mr-2"></div>
             <span className="text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">Telegram • Live</span>
          </div>

          {/* Header */}
          <div className="h-14 bg-[#17212b] flex items-center px-4 shadow-sm z-20 shrink-0 border-b border-[#00000020]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-sm">
              M
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm leading-tight truncate">monitor</h4>
              <p className="text-[#7c8b9d] text-xs">845 231 {t.subscribers}</p>
            </div>
          </div>

          {/* Chat Area (Simulated Feed) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#0e1621] scrollbar-thin">
            {/* Date Separator */}
            <div className="flex justify-center my-2">
               <span className="bg-[#00000040] text-white/60 text-[10px] font-bold px-3 py-1 rounded-full">Today</span>
            </div>

            {/* Simulated Message 1 */}
            <div className="bg-[#182533] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none p-3 max-w-[90%] text-white text-sm shadow-sm relative group">
              <p className="font-bold text-[#64b5ef] text-xs mb-1">monitor</p>
              <p>⚠️ Увага! Зафіксовано активність ворожої тактичної авіації на південно-східному напрямку.</p>
              <p className="mt-2">Загроза застосування авіаційного озброєння!</p>
              <div className="flex justify-end mt-1">
                 <span className="text-[10px] text-[#5d6c7e]">{currentTime.split(':')[0]}:{parseInt(currentTime.split(':')[1]) - 15}</span>
              </div>
            </div>

            {/* Simulated Message 2 */}
            <div className="bg-[#182533] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none p-3 max-w-[90%] text-white text-sm shadow-sm relative group">
              <p className="font-bold text-[#64b5ef] text-xs mb-1">monitor</p>
              <p>📡 Чисто. Дорозвідка повітряного простору.</p>
               <div className="flex justify-end mt-1">
                 <span className="text-[10px] text-[#5d6c7e]">{currentTime.split(':')[0]}:{parseInt(currentTime.split(':')[1]) - 5}</span>
              </div>
            </div>

             {/* Live Indicator */}
             <div className="flex justify-center my-4">
               <a 
                 href="https://t.me/monitorofukraine" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-[#2b5278] hover:bg-[#34628f] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center animate-pulse"
               >
                 <Icons.Telegram />
                 {t.openTelegram}
               </a>
             </div>
          </div>

          {/* Footer Input Area (Simulated) */}
          <div className="h-16 bg-[#17212b] px-4 flex items-center justify-between z-20 shrink-0 pb-4">
             <div className="h-10 bg-[#0e1621] rounded-2xl flex-1 mr-3 flex items-center px-4 text-[#5d6c7e] text-sm">
               Broadcast...
             </div>
             <div className="w-10 h-10 rounded-full bg-[#2b5278] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
             </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full opacity-40 z-50"></div>
          
          {/* Close Area */}
           <button onClick={onClose} className="absolute top-12 right-2 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white bg-black/20 rounded-full backdrop-blur-sm z-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState<LangKey>('uk');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [time, s
