// import localFont from "next/font/local";
import HeaderLazy from "../src/components/header/HeaderLazy";
import ClientLayout from "./ClientLayout";

/* const Montserrat = localFont({
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
}); */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr-FR">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link rel="preload" href="/img/retroviseur.svg" as="image" />

                <link rel="preload" href="/css/globals.css" as="style" />
                <link
                    rel="stylesheet"
                    href="/css/globals.css"
                    fetchPriority="high"
                />

                <link rel="preload" href="/css/mobileDefer.css" as="style" />
                <link
                    rel="stylesheet"
                    href="/css/mobileDefer.css"
                    fetchPriority="low"
                />
            </head>
            <body
                /* className={`${Montserrat.variable} ${Roboto.variable} ${Nunito.variable}`} */
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
