import React from "react";
import Arrow from "../../components/svg_Icon/utils/Arrow";

interface SliderArrowProps {
    nextSlide: (event?: React.MouseEvent | React.KeyboardEvent) => void;
    prevSlide: (event?: React.MouseEvent | React.KeyboardEvent) => void;
}

const SliderArrow: React.FC<SliderArrowProps> = ({ nextSlide, prevSlide }) => {
    return (
        <span className="banner-arrow flx-c">
            <Arrow
                className="slider-arrow left-arrow flx-c"
                ariaLabel="Aller à la diapositive précédente"
                onClick={prevSlide}
            />
            <Arrow
                className="slider-arrow right-arrow flx-c"
                ariaLabel="Aller à la diapositive suivante"
                onClick={nextSlide}
            />
        </span>
    );
};

export default React.memo(SliderArrow);
