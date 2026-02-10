
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Radar, ShieldAlert, Map as MapIcon, Target, 
  ShieldCheck, Trash2, LayoutDashboard, Database,
  Zap, AlertTriangle, Lock, Unlock, CheckCircle, Info, ChevronRight
} from 'lucide-react';
import { AIRFIELDS, INITIAL_HISTORICAL_STATS, GLOBAL_SUMMARY } from './constants';
import { Theme, BallisticDirection } from './types';
import { AirfieldCard } from './components/AirfieldCard';
import { KyivClock } from './components/KyivClock';
import { ThemeToggle } from './components/ThemeToggle';
import { getTacticalBriefing } from './services/geminiService';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 5}s`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 4 + 2}px`,
      opacity: Math.random() * 0.6 + 0.2
    })), []);

  return (
    <>
      {snowflakes.map(s => (
        <div key={s.id} className="snowflake" style={{
          left: s.left,
          width: s.size,
          height: s.size,
          opacity: s.opacity,
          animationDuration: s.duration,
          animationDelay: s.delay
        }} />
      ))}
    </>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isAdmin, setIsAdmin] = useState(false);
  const [markedAirfields, setMarkedAirfields] = useState<Set<string>>(new Set());
  const [ballisticDir, setBallisticDir] = useState<BallisticDirection>('None');
  const [briefing, setBriefing] = useState<string>("Синхронізація...");

  useEffect(() => {
    const updateBrief = async () => {
      const active = AIRFIELDS.filter(a => markedAirfields.has(a.id)).map(a => a.name);
      if (ballisticDir !== 'None') active.push(`Балістика з напрямку: ${ballisticDir}`);
      const text = await getTacticalBriefing(active);
      setBriefing(text);
    };
    updateBrief();
  }, [markedAirfields, ballisticDir]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleAdminAuth = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      const pass = prompt("Введіть пароль адміна:");
      if (pass === "admin123") setIsAdmin(true);
      else alert("Невірний пароль!");
    }
  };

  const directions: { label: string, value: BallisticDirection }[] = [
    { label: 'Північ', value: 'North' },
    { label: 'Схід', value: 'East' },
    { label: 'Південь', value: 'South' },
    { label: 'Захід', value: 'West' }
  ];

  return (
    <div className="min-h-screen pb-20 bg-slate-50 dark:bg-sky-dark transition-colors duration-500 font-sans selection:bg-blue-600 selection:text-white">
      <Snowfall />
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-sky-dark/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Radar className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-xl font-black tracking-tight">SkyTrack<span className="text-blue-600">Ua</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <KyivClock />
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <button 
              onClick={handleAdminAuth}
              className={`p-2 rounded-xl transition-all ${isAdmin ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
              title={isAdmin ? "Вийти з режиму адміна" : "Вхід для адміна"}
            >
              {isAdmin ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8 space-y-10">
        {!isAdmin && (
          <div className="bg-blue-600/5 border border-blue-600/20 p-4 rounded-2xl flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <Info className="w-5 h-5" />
            <p className="text-xs font-bold uppercase tracking-widest">Ви у режимі перегляду. Тільки адмін може змінювати статус загрози.</p>
          </div>
        )}

        {/* SECTION 3: BALLISTIC THREAT */}
        <section className="bg-white dark:bg-sky-card p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 text-amber-500">
                <Zap className="w-6 h-6" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Розділ 3: Напрямок Загрози</h2>
              </div>
              <p className="text-slate-500 font-bold text-sm">Виберіть сектор для сповіщення про балістику.</p>
            </div>

            <div className={`flex items-center gap-4 px-8 py-5 rounded-2xl font-black text-sm transition-all duration-500
              ${ballisticDir !== 'None' ? 'bg-shahed-red text-white animate-pulse-red scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
              {ballisticDir !== 'None' ? (
                <>
                  <AlertTriangle className="w-6 h-6 animate-bounce" />
                  ⚠️ ЗАГРОЗА ЗАСТОСУВАННЯ БАЛІСТИЧНОГО ОЗБРОЄННЯ!
                </>
              ) : (
                "СТАТУС: СПОКІЙНО"
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {directions.map(dir => (
              <button
                key={dir.value}
                disabled={!isAdmin}
                onClick={() => setBallisticDir(ballisticDir === dir.value ? 'None' : dir.value)}
                className={`p-5 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all
                  ${ballisticDir === dir.value 
                    ? 'border-shahed-red bg-shahed-red text-white shadow-lg' 
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500'
                  }
                  ${isAdmin ? 'hover:border-blue-500 active:scale-95' : 'cursor-not-allowed opacity-50'}`}
              >
                Напрямок: {dir.label}
              </button>
            ))}
          </div>
        </section>

        {/* AIRFIELDS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Майданчики Пуску</h2>
              <p className="text-slate-500 font-bold text-sm">Моніторинг активності на аеродромах РФ та Криму.</p>
            </div>
            {isAdmin && markedAirfields.size > 0 && (
              <button onClick={() => setMarkedAirfields(new Set())} className="text-xs font-black uppercase text-shahed-red hover:underline flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Скинути все
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AIRFIELDS.map(airfield => (
              <AirfieldCard 
                key={airfield.id}
                airfield={airfield}
                isAdmin={isAdmin}
                isMarked={markedAirfields.has(airfield.id)}
                onToggle={(id) => {
                  const next = new Set(markedAirfields);
                  if (next.has(id)) next.delete(id); else next.add(id);
                  setMarkedAirfields(next);
                }}
              />
            ))}
          </div>
        </section>

        {/* AI BRIEFING */}
        <section className="bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-blue-100 font-black uppercase text-[10px] tracking-[0.2em]">
              <Database className="w-4 h-4" /> AI OSINT Briefing
            </div>
            <p className="text-xl md:text-2xl font-bold leading-tight italic">"{briefing}"</p>
          </div>
          <Radar className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
        </section>
      </main>

      <footer className="mt-20 py-10 border-t border-slate-200 dark:border-slate-800 text-center opacity-50">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">SkyTrackUa © 2025 • Slava Ukraini</p>
      </footer>
    </div>
  );
};

export default App;