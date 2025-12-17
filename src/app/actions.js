"use server";

export async function getSunShineData(past_days = 0, forecast_days = 0) {
    const dataObject = {
        latitude: 60.17136,
        longitude: 24.927353,
        timezone: "auto",
        daily: "sunshine_duration",
        past_days: past_days,
        forecast_days: forecast_days,
    };
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${dataObject.latitude}&longitude=${dataObject.longitude}&daily=${dataObject.daily}&timezone=${dataObject.timezone}&past_days=${dataObject.past_days}&forecast_days=${dataObject.forecast_days}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const sunshineAndDateData = data.daily.time.map((date, i) => ({
            date,
            sunshine: data.daily.sunshine_duration[i] ?? 0,
        }));
        const sumWithSunInitial = sunshineAndDateData.reduce(
            (acc, item) => acc + item.sunshine,
            0
        );
        function sunshineTotalReturn(sum) {
            let h = Math.floor(sum / 3600);
            let m = Math.floor((sum % 3600) / 60);
            let s = Math.floor((sum % 3600) % 60);

            const hDisplay =
                h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
            const mDisplay =
                m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
            const sDisplay =
                s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay;
        }
        const sunshineTotal = sunshineTotalReturn(sumWithSunInitial);

        return {
            daily: sunshineAndDateData,
            total: sunshineTotal,
        };
    } catch (err) {
        console.error("Error", err);
        return [];
    }
}
