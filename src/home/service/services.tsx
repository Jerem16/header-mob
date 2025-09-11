"use client";
import React from "react";
import Image from "next/image";
import { serviceContent } from "../../assets/data/content/services";
import ButtonLink from "@components/button/ButtonLink";
const Services: React.FC = () => {
    return (
        <>
            <div className="services content-wrapper">
                <div className="sgm">
                    <h2 className="card_title">Services</h2>
                    <div className="card_H flx-c">
                        <Image
                            className="srv-img_typo"
                            src="/mob-peur-de-la-conduite/img/services/TYPO-LOGO.svg"
                            alt="Image cours de conduite"
                            width={360}
                            height={83}
                            loading="lazy"
                        />
                        <Image
                            className="srv-img_lesson"
                            src="/mob-peur-de-la-conduite/img/services/cours-de-conduite.webp"
                            alt="Image cours de conduite"
                            width={288}
                            height={265}
                            loading="lazy"
                        />
                    </div>

                    <div className="card_cnt">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: serviceContent[0].description,
                            }}
                        />
                        <ButtonLink href="services">
                            Choisis ton coaching 👈
                        </ButtonLink>
                    </div>
                    {/* <ButtonLink href="services">
                            Découvrir les services
                        </ButtonLink> */}
                    {/* <div className="card_cnt"></div> */}
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
            {/* <PermitStatus /> */}
        </>
    );
};

export default Services;
