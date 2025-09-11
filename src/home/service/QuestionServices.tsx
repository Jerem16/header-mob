"use client";
import React from "react";
import DriveQuestions from "./questions/driveQuestions";
import AccQuestions from "./questions/accompanistQuestions";
import PermitStatus from "./permitStatus";
import DrivingLazyWrapper from "@src/components/DrivingLazyWrapper";
const QuestionServices: React.FC = () => {
    return (
        <>
            <div className="services content-wrapper">
                <div className="sgm">
                    <div className="card_cnt">
                        <DrivingLazyWrapper>
                            <DriveQuestions />
                            <AccQuestions />
                        </DrivingLazyWrapper>
                    </div>
                    {/**
                     * //! if hasPermit === true && supervisedDriving === true
                     * //! return <AccQuestions/>
                     */}
                </div>
            </div>
            {/**
             * //! if hasPermit === true  => <Confirmed />
             * //! if hasPermit === false => <Beginner />
             */}
            <PermitStatus />
        </>
    );
};

export default QuestionServices;
