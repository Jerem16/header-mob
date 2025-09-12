import type { Metadata } from "next";
import metaData from "./metaData";
import localFont from "next/font/local";
import HeaderLazy from "../src/components/header/HeaderLazy";
import ClientLayout from "./ClientLayout";
import "./globals.css";
import "./tarifs.css";
const Montserrat = localFont({
    src: "./fonts/Montserrat.woff2",
    variable: "--montserrat",
    weight: "100 900",
    display: "swap",
});
export const Roboto = localFont({
    src: "/fonts/Roboto.woff2",
    variable: "--Roboto",
    weight: "700",
    display: "swap",
});
const Nunito = localFont({
    src: "./fonts/Nunito.woff2",
    variable: "--nunito",
    weight: "400",
    display: "swap",
});
export const metadata: Metadata = metaData;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr-FR">
            <head>
                <link rel="preload" href="/img/retroviseur.svg" as="image" />

                {/* <link rel="preload" href="/css/globals.css" as="style" />
                <link
                    rel="stylesheet"
                    href="/css/globals.css"
                    fetchPriority="high"
                /> */}

                {/* <link rel="preload" href="/css/mobileDefer.css" as="style" />
                <link
                    rel="stylesheet"
                    href="/css/mobileDefer.css"
                    fetchPriority="low"
                /> */}

                {/* <>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        var l = document.createElement('link');
                        l.rel = 'stylesheet';
                        l.href = '/css/mobileDefer.css';
                        document.head.appendChild(l);
                    `,
                    }}
                />
                <noscript>
                    <link rel="stylesheet" href="/css/mobileDefer.css" fetchPriority="low"/>
                </noscript>
                </> */}

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            "@id": "https://www.peur-de-la-conduite.fr/",
                            name: "Peur de la conduite - Coaching Auto",
                            image: [
                                "/mob-peur-de-la-conduite/img/about/avatar.webp",
                            ],
                            url: "https://www.peur-de-la-conduite.fr/",
                            telephone: "+33 6 74 25 91 81",
                            email: "contact.peurdelaconduite@gmail.com",
                            description:
                                "Coaching individuel pour surmonter l'amaxophobie, gérer le stress, réussir l'examen de conduite ou reprendre confiance au volant.",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "17 Allée Didier Daurat",
                                addressLocality: "Le Havre",
                                addressRegion: "Normandie",
                                postalCode: "76620",
                                addressCountry: "FR",
                            },
                            geo: {
                                "@type": "GeoCoordinates",
                                latitude: "49.5051",
                                longitude: "0.1604",
                            },
                            openingHoursSpecification: [
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: [
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                        "Sunday",
                                    ],
                                    opens: "07:00",
                                    closes: "20:00",
                                },
                            ],
                            priceRange: "39.99€ - 59.99€",
                            offers: [
                                {
                                    "@type": "Offer",
                                    name: "Coaching Conducteurs Débutants",
                                    price: "39.99",
                                    priceCurrency: "EUR",
                                },
                                {
                                    "@type": "Offer",
                                    name: "Coaching Conducteurs Confirmés (Amaxophobie)",
                                    price: "49.99",
                                    priceCurrency: "EUR",
                                },
                            ],
                            sameAs: [
                                "http://www.youtube.com/@MounirBouakkaz-r4i",
                                "https://wa.me/33674259181",
                                "https://www.tiktok.com/@peur.de.la.condui?_t=ZN-8taHCRDnmnH&_r=1",
                                "https://www.instagram.com/peurdelaconduite.fr/",
                                "https://www.facebook.com/profile.php?id=61567260421073",
                                "https://www.linkedin.com/in/mounir-bouakkaz",
                            ],
                            founder: {
                                "@type": "Person",
                                name: "Mounir Bouakkaz",
                            },
                        }),
                    }}
                />
            </head>
            <body
                className={`${Montserrat.variable} ${Roboto.variable} ${Nunito.variable}`}
                id="top"
            >
                {/* <DesktopRedirect /> */}
                <ClientLayout>
                    <header>
                        <div className="content-wrapper">
                            <HeaderLazy />
                        </div>
                    </header>
                    <main>{children}</main>
                </ClientLayout>
            </body>
        </html>
    );
}
