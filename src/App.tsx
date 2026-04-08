/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PrayerBar } from './components/PrayerBar';
import { MainDisplay } from './components/MainDisplay';
import { Sidebar } from './components/Sidebar';
import { BottomBar } from './components/BottomBar';
import { AdminDashboard } from './components/AdminDashboard';
import { getPrayerTimes, getNextPrayer } from './services/prayerService';
import { PrayerTimes, Announcement } from './types';

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Doa Keluar Masjid',
    content: 'Ya Allah, sesungguhnya aku memohon keutamaan/kurniaan-Mu',
    type: 'text',
    duration: 10,
    active: true,
    createdAt: Date.now(),
  },
  {
    id: 'live-1',
    title: 'Live Kuliah',
    content: 'Siaran Langsung Kuliah Maghrib',
    type: 'video',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4', // Placeholder video
    duration: 30,
    active: true,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Halaqah Al Quran',
    content: 'Bersama Ustaz Aiman. Jumaat 10 Apr 2026, Jam 7:50 Malam.',
    imageUrl: 'https://picsum.photos/seed/ustaz/1920/1080',
    type: 'image',
    duration: 15,
    active: true,
    createdAt: Date.now(),
  },
];

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [nextPrayer, setNextPrayer] = useState({ name: '', time: '', remaining: 0 });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    async function init() {
      const times = await getPrayerTimes('SGR03');
      setPrayerTimes(times);
    }
    init();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setNow(currentTime);
      if (prayerTimes) {
        setNextPrayer(getNextPrayer(prayerTimes, currentTime));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Toggle admin view with a hidden key combo or just a button for now
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'm') {
        setIsAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (!prayerTimes) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent mx-auto"></div>
          <p className="text-xl font-bold">Memuatkan MySolatime...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black font-sans">
      {/* Top Bar */}
      <PrayerBar 
        times={prayerTimes} 
        nextPrayer={nextPrayer.name} 
        countdown={formatCountdown(nextPrayer.remaining)} 
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <MainDisplay announcements={MOCK_ANNOUNCEMENTS} />
        </div>
        <Sidebar 
          title="Bacalah Quran" 
          imageUrl="https://picsum.photos/seed/quran-sidebar/400/800" 
        />
      </div>

      {/* Bottom Bar */}
      <BottomBar />

      {/* Admin Toggle Hint (Hidden in production) */}
      <button 
        onClick={() => setIsAdmin(true)}
        className="fixed bottom-0 right-0 h-10 w-10 opacity-0 hover:opacity-10"
      >
        Admin
      </button>
    </div>
  );
}
