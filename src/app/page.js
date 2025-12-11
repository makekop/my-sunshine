"use client";
import { useState } from "react";

const App = () => {
    const [shine, setShine] = useState(null);
    const [loading, setLoading] = useState(null);

    const latitude = 60.17136;
    const longitude = 24.927353;
    const timezone = "auto";
    const daily = "sunshine_duration";
    const past_days = 10;

    async function getSunShineData() {
        "use server";
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${daily}&timezone=${timezone}&past_days=${past_days}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            const sunshineData = data.daily.time.map((date, i) => ({
                date,
                sunshine: data.daily.sunshine_duration[i],
            }));
            setShine(sunshineData);
        } catch (err) {
            console.error("Error", err);
            setShine(null);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <button onClick={getSunShineData}>GET</button>
            {shine ? (
                <ul>
                    {shine.map((item) => (
                        <li key={item.date}>
                            {item.date}: {(item.sunshine / 3600).toFixed(2)}{" "}
                            hours
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Data Yet</p>
            )}
        </div>
    );
};
export default App;
