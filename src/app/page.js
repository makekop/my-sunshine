"use client";
import { useState, useEffect } from "react";
import { getSunShineData } from "./actions";
import Button from "./Button";

export default function App() {
    const [pastDays, setPastDays] = useState(1);
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
        <div className="mx-auto flex flex-col items-center max-w-max gap-4 rounded-xl bg-gray-700 p-6 font-arial tracking-tight dark:outline-white/10">
            <div className="text-4xl font-semibold text-center">
                {total}
                {` of sunshine in the past ${pastDays} days`}
            </div>
            {loading && <p>Loading...</p>}
            <div className="flex gap-x-4 ">
                <Button onClick={() => setPastDays(5)} text={"GET 5"} />
                <Button onClick={() => setPastDays(10)} text={"GET 10"} />
                <Button onClick={() => setPastDays(15)} text={"GET 15"} />
            </div>
        </div>
    );
}
{
    /* Will comment this out since it is not used Im returning only the total amount          <ul>
                {data.map((item) => (
                    <li key={item.date}>
                        {item.date}:{" "}
                        {item.sunshine / 3600 < 1
                            ? (item.sunshine / 60).toFixed(2)
                            : (item.sunshine / 3600).toFixed(2)}
                        {item.sunshine / 3600 < 1 ? "minutes" : "hours"}
                    </li>
                ))}
            </ul>*/
}
{
}
/* This is the forecast part, which is not necessary yet <div>
                {" "}
                <button onClick={() => setForecastDays(5)}>Get 5</button>*/
