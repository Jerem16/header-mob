import React, { lazy } from "react";
import dynamic from "next/dynamic";
import { SliderProvider } from "../../utils/context/slider/SliderContext";

const SliderContentX = lazy(() => import("./SliderContentX"));

const ClientSldProvider = () => {
    return (
        <SliderProvider>
            <SliderContentX />
        </SliderProvider>
    );
};

export default dynamic(() => Promise.resolve(ClientSldProvider), {
    ssr: false,
});
