"use client";
import { useState, useEffect } from "react";
import { getSunShineData } from "./actions";
import Button from "../components/Button";
import SliderSizes from "../components/Slider";

export default function App() {
    const [pastDays, setPastDays] = useState(null);
    const [forecastDays, setForecastDays] = useState(0);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState("");
    const [sliderValue, setSliderValue] = useState(null);

    const dayOptions = [5, 10, 15, 30];

    useEffect(() => {
        if (pastDays === null) return;
        async function load() {
            setLoading(true);
            try {
                const result = await getSunShineData(pastDays, forecastDays);
                setTotal(result.total);
            } catch (err) {
                console.error("Error", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [pastDays]);

    return (
        <div className="bg-red-200 min-h-screen flex items-center justify-center">
            <div
                className="flex flex-col items-center justify-center
                gap-6 sm:gap-10
                rounded-xl bg-gray-700 
                p-6 sm:p-10
                min-h-[280px] w-full max-w-[420px] mx-4
                sm:mx-0"
            >
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <>
                        <div className="text-xl text-center text-white mb-2">
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
                                        active={pastDays === days}
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
                            {/*<span className="text-xs text-gray-300 opacity-70 mt-1">
                                slide below
                            </span> */}

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
