import React from "react";
import SunBG from "./SunBG";
import SliderRoad from "./SliderRoad";
import SliderContent from "./SliderContent";
import SliderCTA from "./SliderCTA";
import SliderInfo from "./SliderInfo";
const Slider = () => {
    return (
        <>
            <SunBG />
            <SliderRoad />
            <div className="slider">
                <div className="content-wrapper">
                    <SliderContent />
                    <div className="flx-c info">
                        <SliderCTA />
                        <SliderInfo />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slider;
