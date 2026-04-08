import { PrayerTimes } from '../types';

// Mock prayer times for SGR03 (Klang/Kuala Langat) as seen in the screenshots
export const MOCK_PRAYER_TIMES: PrayerTimes = {
  Subuh: "06:03",
  Syuruk: "07:10",
  Zohor: "13:18",
  Asar: "16:26",
  Maghrib: "19:22",
  Isyak: "20:32",
};

export async function getPrayerTimes(zone: string): Promise<PrayerTimes> {
  try {
    // In a real app, we would fetch from an API like Aladhan or Jakim
    // For now, we return mock data or try Aladhan
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Klang&country=Malaysia&method=11`);
    const data = await response.json();
    if (data.code === 200) {
      const t = data.data.timings;
      return {
        Subuh: t.Fajr,
        Syuruk: t.Sunrise,
        Zohor: t.Dhuhr,
        Asar: t.Asr,
        Maghrib: t.Maghrib,
        Isyak: t.Isha,
      };
    }
  } catch (error) {
    console.error("Failed to fetch prayer times", error);
  }
  return MOCK_PRAYER_TIMES;
}

export function getNextPrayer(times: PrayerTimes, now: Date): { name: string; time: string; remaining: number } {
  const prayerOrder = ['Subuh', 'Syuruk', 'Zohor', 'Asar', 'Maghrib', 'Isyak'];
  
  for (const name of prayerOrder) {
    const [hours, minutes] = times[name as keyof PrayerTimes].split(':').map(Number);
    const prayerTime = new Date(now);
    prayerTime.setHours(hours, minutes, 0, 0);
    
    if (prayerTime > now) {
      return { name, time: times[name as keyof PrayerTimes], remaining: prayerTime.getTime() - now.getTime() };
    }
  }
  
  // If all prayers passed today, next is Subuh tomorrow
  const [hours, minutes] = times.Subuh.split(':').map(Number);
  const tomorrowSubuh = new Date(now);
  tomorrowSubuh.setDate(now.getDate() + 1);
  tomorrowSubuh.setHours(hours, minutes, 0, 0);
  return { name: 'Subuh', time: times.Subuh, remaining: tomorrowSubuh.getTime() - now.getTime() };
}
