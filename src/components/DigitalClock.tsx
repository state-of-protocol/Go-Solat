import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4 font-mono text-5xl font-bold tracking-wider text-white">
      {format(time, 'h:mm:ss a')}
    </div>
  );
}
