"use client";
import { useState, useEffect } from "react";
import { getSunShineData } from "./actions";

export default function App() {
    const [pastDays, setPastDays] = useState(5);
    const [forecastDays, setForecastDays] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const result = await getSunShineData(pastDays, forecastDays);
                setData(result.daily);
                setTotal(result.total);
            } catch (err) {
                console.error("Error", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [pastDays, forecastDays, total]);
    return (
        <div className="">
            <ul>
                {data.map((item) => (
                    <li key={item.date}>
                        {item.date}:{" "}
                        {item.sunshine / 3600 < 1
                            ? (item.sunshine / 60).toFixed(2)
                            : (item.sunshine / 3600).toFixed(2)}
                        {item.sunshine / 3600 < 1 ? "minutes" : "hours"}
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => setPastDays(10)}>Get 10 pastDays</button>
            </div>
            <div>
                {" "}
                <button onClick={() => setForecastDays(10)}>
                    Get 10 forecastDays
                </button>
            </div>
            <div>{total}</div>
            {loading && <p>Loading...</p>}
        </div>
    );
}
