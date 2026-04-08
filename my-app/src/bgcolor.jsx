import { useState, useEffect } from "react";
import { useUrl } from './UrlProvider';

export default function BgColor() {
  const { apiUrl } = useUrl();

  const [color, setColor] = useState("lightblue");

  const randomColor = () => {
    const colors = ["lightblue", "lightgreen", "lightpink", "orange", "yellow", "violet"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const changeColor = () => {
    const newColor = randomColor();
    setColor(newColor);
    document.body.style.backgroundColor = newColor;
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={changeColor}
        style={{
          backgroundColor: color,
          padding: "10px 20px",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 16,
          color: "black",
        }}
      >
        Změnit barvu
      </button>      
      <p>Aktuální barva: <strong>{color}</strong></p>
      <p>{apiUrl}</p>
    </div>
  );
}