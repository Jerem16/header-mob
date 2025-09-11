"use client";

import { useEffect, useState, type ReactNode } from "react";
import Loader from "@/src/components/loader/Loader";

type PageLazyLoaderProps = {
    children: ReactNode;
};

export default function PageLazyLoader({ children }: PageLazyLoaderProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return <>{visible ? children : <Loader />}</>;
}
