"use server";

export async function getSunShineData(past_days = 0, forecast_days = 0) {
    const dataObject = {
        latitude: 60.3172,
        longitude: 24.9633,
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

        return {
            daily: sunshineAndDateData,
        };
    } catch (err) {
        console.error("Error", err);
        return { daily: [] };
    }
}
