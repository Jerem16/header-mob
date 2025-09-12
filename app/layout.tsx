import localFont from "next/font/local";
import HeaderLazy from "../src/components/header/HeaderLazy";
import ClientLayout from "./ClientLayout";
import "./globals.css";
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr-FR">
            <head>
                <link rel="preload" href="/img/retroviseur.svg" as="image" />
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
