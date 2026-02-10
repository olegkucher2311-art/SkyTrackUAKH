
import React from 'react';
import { MapPin, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import { Airfield } from '../types';

interface AirfieldCardProps {
  airfield: Airfield;
  isMarked: boolean;
  onToggle: (id: string) => void;
  isAdmin: boolean;
}

export const AirfieldCard: React.FC<AirfieldCardProps> = ({ airfield, isMarked, onToggle, isAdmin }) => {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border-2 transition-all duration-500 
      ${isMarked ? 'border-shahed-red bg-shahed-red/5 animate-pulse-red' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-sky-card'}`}>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"><MapPin className="w-5 h-5" /></div>
          {isMarked && <span className="text-[10px] font-black uppercase text-shahed-red flex items-center gap-1 animate-pulse"><AlertTriangle className="w-3 h-3" /> Пуск</span>}
        </div>
        <div>
          <h3 className="text-lg font-black">{airfield.name}</h3>
          <p className="text-xs text-slate-500 font-medium">{airfield.location}</p>
        </div>
        <button
          disabled={!isAdmin}
          onClick={() => onToggle(airfield.id)}
          className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all
            ${isMarked ? 'bg-shahed-red text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}
            ${isAdmin ? 'hover:scale-105 active:scale-95' : 'cursor-not-allowed opacity-50'}`}
        >
          {isAdmin ? (isMarked ? "Скасувати пуск" : "Відмітити пуск") : (isMarked ? "⚠️ ЗАФІКСОВАНО ПУСК" : "Статус: Спокійно")}
        </button>
      </div>
    </div>
  );
};