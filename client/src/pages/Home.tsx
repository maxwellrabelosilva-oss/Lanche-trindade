import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import Sidebar from "@/components/Sidebar";
import StatusBanner from "@/components/StatusBanner";

interface MenuItem {
  id: number;
  emoji: string;
  name: string;
  description: string;
  price: string | number;
  categoryId: number;
}

const CATEGORIES = [
  { id: 0, name: "Todos", emoji: "🍽️" },
  { id: 1, name: "X-Salada", emoji: "🥗" },
  { id: 2, name: "X-Salada Especial", emoji: "⭐" },
  { id: 3, name: "Artesanais", emoji: "👨‍🍳" },
  { id: 4, name: "Kikão", emoji: "🌮" },
  { id: 5, name: "Pastéis", emoji: "🥐" },
  { id: 6, name: "Mistos", emoji: "🍱" },
];

export default function Home() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "dinheiro" | "cartao">("pix");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderObservations, setOrderObservations] = useState("");

  const { data: menuItems } = trpc.menu.list.useQuery(undefined, {
    refetchInterval: 3000,
  });

  const { data: storeConfig } = trpc.storeConfig.get.useQuery();

  useEffect(() => {
    if (menuItems) {
      setItems(menuItems as MenuItem[]);
    }
  }, [menuItems]);

  const handleAddItem = (id: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveItem = (id: number) => {
    setSelectedItems((prev) => {
      const newState = { ...prev };
      if (newState[id] > 1) {
        newState[id]--;
      } else {
        delete newState[id];
      }
      return newState;
    });
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [id, qty]) => {
      const item = items.find((i) => i.id === Number(id));
      const price = typeof item?.price === 'string' ? parseFloat(item.price) : (item?.price || 0);
      return total + price * qty;
    }, 0);
  };

  const generateOrderNumber = () => {
    return `TRD${Date.now().toString().slice(-8)}`;
  };

  const handleConfirmOrder = () => {
    if (!customerName.trim()) {
      alert("Por favor, digite seu nome para continuar");
      return;
    }
    if (!customerLocation.trim()) {
      alert("Por favor, digite seu local/endereço para continuar");
      return;
    }
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    // Gerar mensagem com o novo número
    const currentOrderNumber = newOrderNumber;
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR");
    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const orderLines = Object.entries(selectedItems).map(([id, qty]) => {
      const item = items.find((i) => i.id === Number(id));
      const price = typeof item?.price === 'string' ? parseFloat(item.price) : (item?.price || 0);
      return `${qty}x ${item?.emoji} ${item?.name} - R$ ${price.toFixed(2)}\n   ${item?.description}`;
    });

    const total = calculateTotal();
    const name = customerName.trim() || "Cliente";
    const location = customerLocation.trim() || "Não informado";
    const paymentMethodText = paymentMethod === "pix" ? "PIX" : paymentMethod === "dinheiro" ? "Dinheiro" : "Cartão";
    const observationsText = orderObservations.trim() ? `\n📝 *Observações:* ${orderObservations}` : "";
    
    const message = `🍔 *TRINDADE LANCHONETE*\n\n📋 *PEDIDO #${currentOrderNumber}*\n\n👤 *Nome:* ${name}\n📍 *Local:* ${location}\n📅 *Data:* ${date}\n🕐 *Hora:* ${time}\n\n*ITENS:*\n${orderLines.join("\n\n")}\n\n💰 *Total:* R$ ${total.toFixed(2)}\n\n💳 *Forma de Pagamento:* ${paymentMethodText}${observationsText}\n\n⚠️ Considere a taxa de entrega para sua localização`;
    
    const encodedMessage = encodeURIComponent(message);
    const finalLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Redirecionar para WhatsApp após gerar o número
    setTimeout(() => {
      window.location.href = finalLink;
    }, 100);
  };

  const generateOrderMessage = () => {
    const currentOrderNumber = orderNumber || generateOrderNumber();
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR");
    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const orderLines = Object.entries(selectedItems).map(([id, qty]) => {
      const item = items.find((i) => i.id === Number(id));
      const price = typeof item?.price === 'string' ? parseFloat(item.price) : (item?.price || 0);
      return `${qty}x ${item?.emoji} ${item?.name} - R$ ${price.toFixed(2)}\n   ${item?.description}`;
    });

    const total = calculateTotal();
    const name = customerName.trim() || "Cliente";
    const location = customerLocation.trim() || "Não informado";

    const paymentMethodText = paymentMethod === "pix" ? "PIX" : paymentMethod === "dinheiro" ? "Dinheiro" : "Cartão";
    const observationsText = orderObservations.trim() ? `\n📝 *Observações:* ${orderObservations}` : "";
    const message = `🍔 *TRINDADE LANCHONETE*\n\n📋 *PEDIDO #${currentOrderNumber}*\n\n👤 *Nome:* ${name}\n📍 *Local:* ${location}\n📅 *Data:* ${date}\n🕐 *Hora:* ${time}\n\n*ITENS:*\n${orderLines.join("\n\n")}\n\n💰 *Total:* R$ ${total.toFixed(2)}\n\n💳 *Forma de Pagamento:* ${paymentMethodText}${observationsText}\n\n⚠️ Considere a taxa de entrega para sua localização`;
    return encodeURIComponent(message);
  };

  const filteredItems = activeCategory === 0
    ? items
    : items.filter((item) => item.categoryId === activeCategory);

  const whatsappNumber = storeConfig?.whatsappNumber || "5592993751070";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Lanche do Trindade - Cardápio`;

  const itemCount = Object.values(selectedItems).reduce((a, b) => a + b, 0);

  return (
    <div style={{ background: "#0f0e0c", color: "#f0ece4", minHeight: "100vh" }}>
      <StatusBanner 
        openingTime={storeConfig?.openingTime || "18:00"} 
        closingTime={storeConfig?.closingTime || "23:00"} 
      />
      <Sidebar />

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #f7931e 0%, #d84315 100%)",
          padding: "50px 20px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <h1 style={{ fontSize: "3.5rem", margin: "0 0 5px 0", fontWeight: "900", letterSpacing: "2px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            TRINDADE
          </h1>
          <h2 style={{ fontSize: "2.5rem", margin: "0 0 15px 0", fontWeight: "bold", letterSpacing: "1px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            LANCHONETE
          </h2>
        </div>
        <p style={{ fontSize: "1.1rem", margin: "0 0 20px 0", fontWeight: "600", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
          ✨ Nunca foi sorte, sempre foi Deus ✨
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "15px", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(0,0,0,0.25)", display: "inline-block", padding: "10px 20px", borderRadius: "25px", backdropFilter: "blur(10px)" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>⭐ Desde 2020</span>
          </div>
          <a 
            href="https://www.instagram.com/lanchonetetrindade?igsh=YXo3bHZwdWR2MTBl"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "rgba(0,0,0,0.25)", display: "inline-block", padding: "10px 20px", borderRadius: "25px", backdropFilter: "blur(10px)", textDecoration: "none", color: "white", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.25)")}
          >
            <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>📱 Instagram</span>
          </a>
        </div>
      </div>

      {/* Category Filters - Enhanced */}
      <div style={{ padding: "40px 20px", background: "#0f0e0c", borderBottom: "3px solid #f7931e" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h3 style={{ color: "#f7931e", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
            ESCOLHA SUA CATEGORIA
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? "#f7931e" : "transparent",
                  color: activeCategory === cat.id ? "#0f0e0c" : "#f0ece4",
                  border: "2px solid #f7931e",
                  padding: "12px 24px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  boxShadow: activeCategory === cat.id ? "0 4px 12px rgba(247, 147, 30, 0.4)" : "none",
                  transform: activeCategory === cat.id ? "scale(1.05)" : "scale(1)",
                }}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 20px" }}>
        <h2 style={{ color: "#f7931e", textAlign: "center", fontSize: "3rem", marginBottom: "50px", fontWeight: "900", letterSpacing: "1px" }}>
          CARDÁPIO
        </h2>

        {/* Items Grid - Enhanced */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px", marginBottom: "80px" }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "linear-gradient(135deg, #1a1815 0%, #2e2b26 100%)",
                border: "2px solid #2e2b26",
                borderRadius: "12px",
                padding: "20px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#f7931e";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(247, 147, 30, 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#2e2b26";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                <span style={{ fontSize: "3rem" }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: "#f7931e", margin: "0 0 8px 0", fontSize: "1.3rem", fontWeight: "bold" }}>{item.name}</h3>
                  <p style={{ color: "#f7931e", margin: 0, fontWeight: "900", fontSize: "1.5rem" }}>
                    R$ {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <p style={{ color: "#a89968", margin: "15px 0", fontSize: "0.95rem", lineHeight: "1.5", fontStyle: "italic" }}>
                {item.description}
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    style={{
                      background: "#d84315",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#ff5722"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "#d84315"}
                  >
                    −
                  </button>
                  <span style={{ color: "#f7931e", fontWeight: "bold", minWidth: "40px", textAlign: "center", fontSize: "1.1rem" }}>
                    {selectedItems[item.id] || 0}
                  </span>
                  <button
                    onClick={() => handleAddItem(item.id)}
                    style={{
                      background: "#f7931e",
                      color: "#0f0e0c",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#ffb74d"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "#f7931e"}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#f7931e" }}>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>😕 Nenhum item nesta categoria</p>
          </div>
        )}
      </div>

      {/* Order Summary Sticky - Enhanced */}
      {itemCount > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(135deg, #f7931e 0%, #d84315 100%)",
            padding: "20px",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 100,
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div style={{ color: "white", fontWeight: "bold" }}>
            <p style={{ margin: "0 0 5px 0", fontSize: "1rem" }}>
              {itemCount} {itemCount === 1 ? "item" : "itens"}
            </p>
            <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: "900" }}>
              Total: R$ {calculateTotal().toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => setShowOrderForm(!showOrderForm)}
            style={{
              background: "white",
              color: "#f7931e",
              padding: "14px 32px",
              borderRadius: "30px",
              border: "none",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
          >
            📞 Fazer Pedido
          </button>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && itemCount > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            zIndex: 200,
            padding: "20px",
            overflowY: "auto",
          }}
          onClick={() => setShowOrderForm(false)}
        >
          <div
            style={{
              background: "#1a1815",
              border: "2px solid #f7931e",
              borderRadius: "12px",
              padding: "40px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              marginTop: "20px",
              marginBottom: "20px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#f7931e", marginTop: 0, marginBottom: "30px", fontSize: "1.8rem", fontWeight: "bold" }}>
              📋 Seus Dados
            </h2>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", color: "#f0ece4", marginBottom: "10px", fontWeight: "bold", fontSize: "1.1rem" }}>
                👤 Seu Nome:
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Digite seu nome"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#2e2b26",
                  border: "2px solid #3a3730",
                  color: "#f0ece4",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#f7931e")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#3a3730")}
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", color: "#f0ece4", marginBottom: "10px", fontWeight: "bold", fontSize: "1.1rem" }}>
                📍 Seu Local/Endereço:
              </label>
              <input
                type="text"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
                placeholder="Ex: Rua das Flores, 123 - Apto 45"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#2e2b26",
                  border: "2px solid #3a3730",
                  color: "#f0ece4",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#f7931e")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#3a3730")}
              />
            </div>

            <div style={{ background: "#2e2b26", padding: "20px", borderRadius: "8px", marginBottom: "25px" }}>
              <h3 style={{ color: "#f7931e", marginTop: 0, marginBottom: "15px", fontSize: "1.1rem" }}>📦 Resumo do Pedido:</h3>
              {Object.entries(selectedItems).map(([id, qty]) => {
                const item = items.find((i) => i.id === Number(id));
                const price = typeof item?.price === 'string' ? parseFloat(item.price) : (item?.price || 0);
                return (
                  <div key={id} style={{ color: "#a89968", marginBottom: "15px", fontSize: "0.9rem", borderBottom: "1px solid #3a3730", paddingBottom: "10px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{qty}x {item?.emoji} {item?.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#8b7d6b", marginBottom: "5px" }}>{item?.description}</div>
                    <div style={{ textAlign: "right", color: "#f7931e", fontWeight: "bold" }}>R$ {(price * qty).toFixed(2)}</div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid #3a3730", paddingTop: "10px", marginTop: "10px", color: "#f7931e", fontWeight: "bold", fontSize: "1.1rem" }}>
                <span>Total:</span>
                <span style={{ float: "right" }}>R$ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", color: "#f0ece4", marginBottom: "10px", fontWeight: "bold", fontSize: "1.1rem" }}>
                💳 Forma de Pagamento:
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { value: "pix", label: "PIX", emoji: "📱" },
                  { value: "dinheiro", label: "Dinheiro", emoji: "💵" },
                  { value: "cartao", label: "Cartão", emoji: "💳" },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value as "pix" | "dinheiro" | "cartao")}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: paymentMethod === method.value ? "#f7931e" : "#2e2b26",
                      color: paymentMethod === method.value ? "#1a1815" : "#f0ece4",
                      border: "2px solid " + (paymentMethod === method.value ? "#f7931e" : "#3a3730"),
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (paymentMethod !== method.value) {
                        (e.currentTarget as HTMLElement).style.borderColor = "#f7931e";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (paymentMethod !== method.value) {
                        (e.currentTarget as HTMLElement).style.borderColor = "#3a3730";
                      }
                    }}
                  >
                    {method.emoji} {method.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", color: "#f0ece4", marginBottom: "10px", fontWeight: "bold", fontSize: "1.1rem" }}>
                📝 Observações (Alterações):
              </label>
              <textarea
                value={orderObservations}
                onChange={(e) => setOrderObservations(e.target.value)}
                placeholder="Ex: Sem cebola, com maionese extra, sem picante..."
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#2e2b26",
                  border: "2px solid #3a3730",
                  color: "#f0ece4",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  minHeight: "80px",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#f7931e")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#3a3730")}
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  setShowOrderForm(false);
                  setOrderNumber(null);
                }}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "#3a3730",
                  color: "#f0ece4",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#4a4a40"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "#3a3730"}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmOrder}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "#25d366",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#1ead4f"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "#25d366"}
              >
                📱 Enviar Pedido WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          background: "#1a1815",
          borderTop: "3px solid #f7931e",
          padding: "60px 20px",
          marginTop: itemCount > 0 ? "100px" : "0",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", marginBottom: "40px" }}>
            {/* Informações */}
            <div>
              <h3 style={{ color: "#f7931e", marginBottom: "15px", fontSize: "1.2rem", fontWeight: "bold" }}>📍 Localização</h3>
              <p style={{ color: "#a89968", lineHeight: "1.6", margin: 0 }}>
                {storeConfig?.storeAddress || "Av. Itacolomy, 34 - Armando Mendes, Manaus - AM"}
              </p>
            </div>

            {/* Contato */}
            <div>
              <h3 style={{ color: "#f7931e", marginBottom: "15px", fontSize: "1.2rem", fontWeight: "bold" }}>📞 Contato</h3>
              <p style={{ color: "#a89968", margin: "0 0 10px 0" }}>
                <strong>WhatsApp:</strong> (92) 99375-1070
              </p>
              {(storeConfig as any)?.storeInstagram && (
                <p style={{ color: "#a89968", margin: 0 }}>
                  <strong>Instagram:</strong> {(storeConfig as any).storeInstagram}
                </p>
              )}
            </div>

            {/* Horário */}
            <div>
              <h3 style={{ color: "#f7931e", marginBottom: "15px", fontSize: "1.2rem", fontWeight: "bold" }}>⏰ Horário</h3>
              <p style={{ color: "#a89968", margin: 0 }}>
                {storeConfig?.openingTime || "10:00"} às {storeConfig?.closingTime || "23:00"}
              </p>
              <p style={{ color: "#a89968", margin: "10px 0 0 0", fontSize: "0.9rem", fontStyle: "italic" }}>
                Desde 2020 • Nunca foi sorte, sempre foi Deus!
              </p>
            </div>
          </div>

          {/* Formas de Pagamento */}
          <div style={{ background: "linear-gradient(135deg, #2e2b26 0%, #3a3730 100%)", padding: "25px", borderRadius: "12px", textAlign: "center", marginBottom: "30px", border: "2px solid #f7931e" }}>
            <p style={{ color: "#f7931e", fontWeight: "bold", margin: "0 0 12px 0", fontSize: "1.1rem" }}>💳 Formas de Pagamento</p>
            <p style={{ color: "#a89968", margin: 0, fontSize: "1rem" }}>
              Aceitamos todas as formas de pagamento! 🎉
            </p>
          </div>

          {/* Copyright */}
          <div style={{ textAlign: "center", borderTop: "1px solid #2e2b26", paddingTop: "25px" }}>
            <p style={{ color: "#7a7267", margin: 0, fontSize: "0.9rem" }}>
              © 2020-2026 Trindade Lanchonete. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
