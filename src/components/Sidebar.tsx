import React from 'react';

interface SidebarProps {
  title: string;
  imageUrl: string;
}

export function Sidebar({ title, imageUrl }: SidebarProps) {
  return (
    <div className="flex h-full w-80 flex-col border-l border-white/20 bg-gray-100">
      <div className="flex-1 overflow-hidden">
        <img
          src={imageUrl || "https://picsum.photos/seed/quran/400/800"}
          alt="Sidebar Content"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="bg-black p-4 text-center text-white">
        <p className="text-sm font-medium opacity-60">@masjidkampungsungailangbaru</p>
      </div>
    </div>
  );
}
