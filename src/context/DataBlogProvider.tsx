// src/context/DataBlogContext.tsx
"use client";
import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useMemo,
} from "react";
import { createUseContext } from "../utils/context/utils/createUseContext";
import type { BlogData } from "@src/types/blog";

const PUBLIC_DATA_URL = `${
    process.env.NEXT_PUBLIC_BASE_PATH ?? ""
}/mob-peur-de-la-conduite/data/data.json`;

interface DataBlogContextProps {
    data: BlogData | null;
    loading: boolean;
    error: Error | null;
}

const DataBlogContext = createContext<DataBlogContextProps | undefined>(
    undefined
);

export function DataBlogProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<BlogData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Charge le JSON depuis l’URL publique
    async function fetchData() {
        try {
            setLoading(true);
            const res = await fetch(PUBLIC_DATA_URL);
            if (!res.ok) throw new Error(`Erreur fetch : ${res.status}`);
            const json = (await res.json()) as BlogData;
            setData(json);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const value = useMemo(
        () => ({ data, loading, error }),
        [data, loading, error]
    );

    return (
        <DataBlogContext.Provider value={value}>
            {children}
        </DataBlogContext.Provider>
    );
}
export const useDataBlog = createUseContext(DataBlogContext, "useDataBlog");
