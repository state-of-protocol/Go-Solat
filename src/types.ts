export interface PrayerTimes {
  Subuh: string;
  Syuruk: string;
  Zohor: string;
  Asar: string;
  Maghrib: string;
  Isyak: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  type: 'image' | 'video' | 'text';
  duration: number; // seconds
  active: boolean;
  createdAt: number;
}

export interface AppSettings {
  masjidName: string;
  zone: string;
  sidebarText: string;
  sidebarImageUrl: string;
  facebookLiveUrl?: string;
}
