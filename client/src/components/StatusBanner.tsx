import { useMemo } from "react";

interface StatusBannerProps {
  openingTime: string;
  closingTime: string;
}

export default function StatusBanner({ openingTime = "18:00", closingTime = "23:00" }: StatusBannerProps) {
  const status = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const [openHour, openMin] = (openingTime || "18:00").split(":").map(Number);
    const [closeHour, closeMin] = (closingTime || "23:00").split(":").map(Number);
    
    const openTimeInMinutes = openHour * 60 + openMin;
    const closeTimeInMinutes = closeHour * 60 + closeMin;

    const isOpen = currentTime >= openTimeInMinutes && currentTime < closeTimeInMinutes;

    return {
      isOpen,
      backgroundColor: isOpen 
        ? "linear-gradient(135deg, #25D366 0%, #20a752 100%)" 
        : "linear-gradient(135deg, #8b7355 0%, #6b5645 100%)",
      statusText: isOpen ? "🟢 Aberto agora!" : "🔴 Fechado no momento",
      message: isOpen ? "Faça seu pedido! 🍔" : `Reabre às ${openingTime}`,
    };
  }, [openingTime, closingTime]);

  return (
    <div
      style={{
        background: status.backgroundColor,
        color: "#fff",
        padding: "16px 24px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "0.95rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        animation: status.isOpen ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <span style={{ fontSize: "1.2rem" }}>{status.statusText}</span>
        <span>|</span>
        <span style={{ fontSize: "0.9rem" }}>
          ⏰ {openingTime} - {closingTime}
        </span>
      </div>
      <div style={{ fontSize: "0.85rem", marginTop: "6px", fontWeight: "normal", opacity: 0.95 }}>
        {status.message}
      </div>
    </div>
  );
}
