"use client";
import { useState, useEffect } from "react";
import { getSunShineData } from "./actions";
import Button from "../components/Button";
import SliderSizes from "../components/Slider";

export default function App() {
    const [pastDays, setPastDays] = useState(null);
    const [forecastDays, setForecastDays] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState(null); // Added this - was missing
    const [total, setTotal] = useState("");
    const [sliderValue, setSliderValue] = useState(null);

    const dayOptions = [5, 10, 15, 30];

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const result = await getSunShineData(50, 0);
                setAllData(result.daily);
            } catch (err) {
                console.error("Error", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Calculate total when pastDays changes
    useEffect(() => {
        if (!allData || pastDays === null) return;
        function sunShineTotal(sum) {
            if (sum === 0) return "0 minutes";
            let h = Math.floor(sum / 3600);
            let m = Math.floor((sum % 3600) / 60);
            const hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
            const mDisplay =
                m > 0 ? m + (m === 1 ? " minute" : " minutes ") : "";
            return hDisplay + mDisplay;
        }
        const relevantDays = allData.slice(-pastDays);
        const sumSeconds = relevantDays.reduce(
            (acc, item) => acc + item.sunshine,
            0
        );
        const sunshineTotalVariable = sunShineTotal(sumSeconds);
        setTotal(sunshineTotalVariable);
    }, [pastDays, allData]);

    return (
        <div className="bg-slate-950 min-h-screen flex items-center justify-center">
            <div
                className=" flex flex-col items-center justify-center bg-slate-800 shadow-xl
                gap-6 sm:gap-10
                rounded-xl
                p-10 sm:p-14
                min-h-[280px] w-full max-w-[640px] mx-4
                sm:mx-0"
            >
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <>
                        <div className="text-2xl sm:text-3xl text-center text-slate-300 mb-2">
                            {total !== "" ? (
                                <>
                                    Over the past{" "}
                                    <span className="font-extrabold">
                                        {pastDays === 1
                                            ? "day"
                                            : `${pastDays} days`}
                                    </span>
                                    , Helsinki has managed a grand total of{" "}
                                    <span className="font-bold">{total} </span>{" "}
                                    of sunshine
                                </>
                            ) : (
                                "Check how much Helsinki, Finland has had sunshine in past :"
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex gap-2">
                                {dayOptions.map((days) => (
                                    <Button
                                        key={days}
                                        onClick={() => setPastDays(days)}
                                        text={`${days} days`}
                                        active={pastDays === days} // Fixed: was setPastDays === days
                                    />
                                ))}
                            </div>

                            <Button
                                onClick={() =>
                                    sliderValue !== null &&
                                    setPastDays(sliderValue)
                                }
                                text={
                                    sliderValue === null
                                        ? "slide"
                                        : `${sliderValue} ${
                                              sliderValue === 1 ? "day" : "days"
                                          }`
                                }
                                active={
                                    sliderValue !== null &&
                                    pastDays === sliderValue
                                }
                            />

                            <SliderSizes
                                value={sliderValue}
                                onChange={(newValue) =>
                                    setSliderValue(newValue)
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
