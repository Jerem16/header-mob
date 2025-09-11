// src/components/Blog/MarkdownRenderer.tsx
"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("./MarkdownRendererLib"), {
    ssr: false,
});
interface MarkdownRendererProps {
    children: string; // contenu Markdown passé en tant que children
}

export default function MarkdownRenderer({ children }: MarkdownRendererProps) {
    return (
        <div className="md-c">
            <Suspense fallback={null}>
                <Markdown>{children}</Markdown>
            </Suspense>
        </div>
    );
}
