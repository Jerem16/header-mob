"use client";
import { useEffect, useRef, useState } from "react";

const useT = (callback: () => void, delay: number) => {
    const workerRef = useRef<Worker | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        workerRef.current = new Worker(
            new URL("/public/workers/timeoutWorker.js", import.meta.url)
        );

        workerRef.current.onmessage = (event) => {
            const { type, isRunning } = event.data;

            if (type === "timeoutComplete") {
                callback();
            }

            if (type === "status") {
                setIsRunning(isRunning);
            }
        };

        workerRef.current.postMessage({ type: "start", delay });

        return () => {
            workerRef.current?.postMessage({ type: "clear" });
            workerRef.current?.terminate();
        };
    }, [callback, delay]);

    return isRunning;
};

export default useT;

//? Utilisation :
/*
    !!! "use client";
    * const [showSlider, setShowSlider] = useState(false);

    useT(() => {
        setShowSlider(true);
    }, 2600);

    if (!showSlider) {
        return <SliderIntro />;
    }


"use client";
import { useState } from "react";
import useTimeoutWorker from "../hooks/useTimeoutWorker";

const TimeoutWorkerComponent = () => {
    const [message, setMessage] = useState("Attends...");
    const isRunning = useTimeoutWorker(() => {
        setMessage("C'est fait !");
    }, 3000); // Timer de 3 secondes

    return (
        <div>
            <h2>{message}</h2>
            <p>{isRunning ? "⏳ Timer en cours..." : "✅ Timer terminé !"}</p>
        </div>
    );
};

export default TimeoutWorkerComponent;


*/
