import React from 'react';
import { format } from 'date-fns';

export function BottomBar() {
  const now = new Date();
  
  // Simple Hijri date calculation (approximate for demo)
  // In real app, use a library like 'hijri-converter' or fetch from API
  const hijriDate = "19 SYAWAL 1447H"; 

  return (
    <div className="flex h-16 w-full items-center justify-between bg-black px-8 text-white">
      <div className="flex items-center gap-6 text-3xl font-bold">
        <span className="text-white">RABU</span>
        <span className="text-red-600">{format(now, 'dd-MMM-yyyy').toUpperCase()}</span>
        <span className="text-green-500">{hijriDate}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="font-mono text-5xl font-bold tracking-wider">
          {format(now, 'h:mm:ss a').toUpperCase()}
        </div>
        <button className="text-white/50 hover:text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
