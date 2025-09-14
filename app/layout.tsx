import HeaderLazy from "../src/components/header/HeaderLazy";
import ClientLayout from "./ClientLayout";
import { NavigationProvider } from "../src/utils/context/NavigationContext";
import localFont from "next/font/local";

const montserrat = localFont({
    src: "./fonts/Montserrat.woff2",
    display: "swap",
    variable: "--font-montserrat",
});

const roboto = localFont({
    src: "./fonts/Roboto.woff2",
    display: "swap",
    variable: "--font-roboto",
});

const nunito = localFont({
    src: "./fonts/Nunito.woff2",
    display: "swap",
    variable: "--font-nunito",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fr-FR"
            className={`${montserrat.variable} ${roboto.variable} ${nunito.variable}`}
        >
            <head>
                <link rel="preload" href="/img/retroviseur.svg" as="image" />

                <link rel="preload" href="/css/globals.css" as="style" />
                <link rel="stylesheet" href="/css/globals.css" fetchPriority="high" />

                <link rel="preload" href="/css/mobileDefer.css" as="style" />
                <link rel="stylesheet" href="/css/mobileDefer.css" fetchPriority="low" />
            </head>
            <body id="top">
                {/* <DesktopRedirect /> */}
                <NavigationProvider>
                    <ClientLayout>
                        <header>
                            <div className="content-wrapper">
                                <HeaderLazy />
                            </div>
                        </header>
                        <main>{children}</main>
                    </ClientLayout>
                </NavigationProvider>
            </body>
        </html>
    );
}
