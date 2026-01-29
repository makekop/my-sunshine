import { useEffect, useState } from 'react';

export function useSunshineTotal(allData, pastDays) {
  const [total, setTotal] = useState('');

  useEffect(() => {
    if (!allData || pastDays === null) return;

    function formatSunshine(sum) {
      if (sum === 0) return '0 minutes';

      let h = Math.floor(sum / 3600);
      let m = Math.floor((sum % 3600) / 60);

      const hDisplay = h > 0 ? `${h} ${h === 1 ? 'hour' : 'hours'} ` : '';
      const mDisplay = m > 0 ? `${m} ${m === 1 ? 'minute' : 'minutes'}` : '';

      return hDisplay + mDisplay;
    }

    const relevantDays = allData.slice(-pastDays);

    const sumSeconds = relevantDays.reduce(
      (acc, item) => acc + item.sunshine,
      0,
    );

    setTotal(formatSunshine(sumSeconds));
  }, [allData, pastDays]);

  return total;
}
