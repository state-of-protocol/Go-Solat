import React, { useState } from 'react';
import { cn } from '../lib/utils';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold text-yellow-500">MySolatime Admin</h1>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('announcements')}
            className={cn(
              "flex w-full items-center px-6 py-3 text-sm font-medium transition-colors",
              activeTab === 'announcements' ? "bg-slate-800 text-yellow-500" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            Hebahan (Slides)
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "flex w-full items-center px-6 py-3 text-sm font-medium transition-colors",
              activeTab === 'settings' ? "bg-slate-800 text-yellow-500" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            Tetapan Masjid
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {activeTab === 'announcements' && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Pengurusan Hebahan</h2>
              <button className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-slate-900 hover:bg-yellow-400">
                Tambah Hebahan Baru
              </button>
            </div>
            
            <div className="grid gap-6">
              {/* Placeholder for list */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-slate-500 italic">Sila log masuk ke Firebase untuk menguruskan data...</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="mb-8 text-2xl font-bold text-slate-800">Tetapan Sistem</h2>
            <div className="max-w-2xl rounded-xl bg-white p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nama Masjid</label>
                  <input type="text" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none" defaultValue="MASJID KAMPUNG SUNGAI LANG BARU" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Kod Zon (Jakim)</label>
                  <input type="text" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none" defaultValue="SGR03" />
                </div>
                <button className="rounded-lg bg-slate-900 px-6 py-2 font-bold text-white hover:bg-slate-800">
                  Simpan Tetapan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
