"use server";
export async function getSunShineData() {
    const latitude = 60.17136;
    const longitude = 24.927353;
    const timezone = "auto";
    const daily = "sunshine_duration";
    const past_days = 10;
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${daily}&timezone=${timezone}&past_days=${past_days}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        return data.daily.time.map((date, i) => ({
            date,
            sunshine: data.daily.sunshine_duration[i],
        }));
    } catch (err) {
        console.error("Error", err);
    }
}
