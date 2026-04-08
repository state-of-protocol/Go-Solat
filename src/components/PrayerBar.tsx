import React from 'react';
import { PrayerTimes } from '../types';
import { cn } from '../lib/utils';

interface PrayerBarProps {
  times: PrayerTimes;
  nextPrayer: string;
  countdown: string;
}

export function PrayerBar({ times, nextPrayer, countdown }: PrayerBarProps) {
  const prayers = [
    { name: 'SUBUH', time: times.Subuh },
    { name: 'SYURUK', time: times.Syuruk },
    { name: 'ZOHOR', time: times.Zohor },
    { name: 'ASAR', time: times.Asar },
    { name: 'MAGHRIB', time: times.Maghrib },
    { name: 'ISYAK', time: times.Isyak },
  ];

  return (
    <div className="flex h-20 w-full items-stretch bg-black text-white">
      {prayers.map((p) => (
        <div
          key={p.name}
          className={cn(
            "flex flex-1 flex-col items-center justify-center border-r border-white/20 px-2 transition-colors",
            nextPrayer.toUpperCase() === p.name ? "bg-red-600" : "bg-black"
          )}
        >
          <span className="text-xs font-bold italic tracking-tighter text-yellow-400">{p.name}</span>
          <span className="text-3xl font-black">{p.time}</span>
        </div>
      ))}
      <div className="flex w-64 flex-col items-center justify-center bg-black px-4">
        <span className="text-xs font-bold tracking-widest text-yellow-400">COUNTDOWN</span>
        <span className="text-4xl font-black tabular-nums tracking-tighter">{countdown}</span>
      </div>
      <div className="flex w-20 items-center justify-center bg-black">
        <img src="https://picsum.photos/seed/mosque-logo/100/100" alt="Logo" className="h-16 w-16 object-contain" referrerPolicy="no-referrer" />
      </div>
    </div>
  );
}
