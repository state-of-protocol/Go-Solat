import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Announcement } from '../types';

interface MainDisplayProps {
  announcements: Announcement[];
}

export function MainDisplay({ announcements }: MainDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcements.length === 0) return;

    const current = announcements[currentIndex];
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, (current?.duration || 10) * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, announcements]);

  if (announcements.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl italic">Tiada hebahan buat masa ini...</p>
      </div>
    );
  }

  const current = announcements[currentIndex];

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full w-full"
        >
          {current.type === 'image' && (
            <img
              src={current.imageUrl}
              alt={current.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          {current.type === 'text' && (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 p-12 text-center text-white">
              <h2 className="mb-8 text-6xl font-black italic text-yellow-400">{current.title}</h2>
              <div className="max-w-4xl rounded-3xl bg-white/10 p-12 backdrop-blur-md">
                <p className="text-5xl font-bold leading-tight">{current.content}</p>
              </div>
              <p className="mt-12 text-xl opacity-50">@masjidkampungsungailangbaru</p>
            </div>
          )}
          {current.type === 'video' && (
            <video
              src={current.videoUrl}
              autoPlay
              muted
              loop
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
