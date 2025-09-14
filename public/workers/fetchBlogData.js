self.onmessage = async function(event) {
    const { url } = event.data;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch error " + res.status);
        const json = await res.json();
        self.postMessage({ type: "success", data: json });
    } catch (err) {
        self.postMessage({ type: "error", message: err.message });
    }
};
