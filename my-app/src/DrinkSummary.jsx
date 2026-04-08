import { useEffect, useState, useRef } from "react";

const URL =
    "https://crm.skch.cz/ajax0/procedure.php?cmd=getSummaryOfDrinks&userId=3";

const DrinkSummary = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const prevJson = useRef(null); // uchování předchozích dat kvůli porovnání

    const fetchData = async () => {
        console.log("fetch data");
        
        setLoading(true);
        setError("");

        const controller = new AbortController();

        try {
            const response = await fetch(URL, {
                method: "GET",
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error("Chyba při načítání dat");
            }

            const json = await response.json();

            // ✅ Aktualizace jen když se data změnila
            if (JSON.stringify(json) !== JSON.stringify(prevJson.current)) {
                prevJson.current = json;
                setData(json);
            }

        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message);
            }
        }

        setLoading(false);

        // automatické přerušení (ochrana proti dlouhému čekání)
        return () => controller.abort();
    };

    // ✅ Spuštění při načtení komponenty
    useEffect(() => {
        fetchData();
    }, []);


    // automatická aktualizace každých 60s
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Automatická aktualizace…");
            fetchData();
        }, 6000); // 60 000 ms = 60s

        return () => clearInterval(interval); // cleanup
    }, []);

  return (
        <div>
            <h2>Souhrn nápojů</h2>

            {loading && <p>Načítám data… (odezva může být dlouhá)</p>}

            {error && <p style={{ color: "red" }}>Chyba: {error}</p>}

            {!loading && data && (
                <pre style={{ background: "#eee", padding: "10px" }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}

            <button onClick={fetchData}>Znovu načíst</button>
        </div>
    );
};

export default DrinkSummary;