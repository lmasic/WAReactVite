import { useEffect, useState, useRef, useCallback } from "react";

const URL =
  "http://lmpss3.dev.spsejecna.net/procedure.php?cmd=getSummaryOfDrinks&userId=1&month=1&year=2025";

const DrinkSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const prevJson = useRef(null);

  // ✅ použijeme useCallback místo useMemo (správně!)
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    const controller = new AbortController();

    try {
      const response = await fetch(URL, { signal: controller.signal });

      if (!response.ok) throw new Error("Chyba při načítání dat");

      const json = await response.json();

      if (JSON.stringify(json) !== JSON.stringify(prevJson.current)) {
        prevJson.current = json;
        setData(json);
      }

    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    }

    setLoading(false);
    return () => controller.abort();
  }, []); // ✅ stabilní funkce

  // ✅ první načtení
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ auto refresh každých 60s
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      setCountdown(60);
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  // ✅ odpočet
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Souhrn nápojů</h2>

      <p>Další automatická aktualizace za: <strong>{countdown}s</strong></p>

      {loading && <p>Načítám data…</p>}
      {error && <p style={{ color: "red" }}>Chyba: {error}</p>}

      {data && (
        <pre style={{ background: "#eee", padding: "10px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      <button onClick={() => { setCountdown(60); fetchData(); }}>
        Ruční refresh
      </button>
    </div>
  );
};

export default DrinkSummary;
