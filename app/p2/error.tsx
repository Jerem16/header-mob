"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <section className="section" id="s1">
            <div className="fixed-menu"></div>
            <div className="s1">
                <h2>Une erreur est survenue</h2>
                <p>
                    {process.env.NODE_ENV === "development"
                        ? error.message
                        : "Réessaie plus tard."}
                </p>
                <button onClick={() => reset()}>Réessayer</button>
            </div>
        </section>
    );
}
