import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface MenuItem {
  id: number;
  emoji: string;
  name: string;
  description: string;
  price: string | number;
  categoryId: number;
}

interface FormData {
  emoji: string;
  name: string;
  description: string;
  price: string;
}

interface StoreConfig {
  storeName?: string | null;
  storeDescription?: string | null;
  storePhone?: string | null;
  storeEmail?: string | null;
  storeAddress?: string | null;
  storeInstagram?: string | null;
  whatsappNumber?: string | null;
  openingTime?: string | null;
  closingTime?: string | null;
  isOpen?: number | null;
  closedDays?: string | null;
}

export default function AdminPanel() {
  const [, navigate] = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    emoji: "🍔",
    name: "",
    description: "",
    price: "",
  });
  const [activeTab, setActiveTab] = useState<"menu" | "config">("menu");
  const [config, setConfig] = useState<StoreConfig>({});
  const [configData, setConfigData] = useState<StoreConfig>({});

  // Check admin session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/check-session", {
          credentials: "include",
        });
        if (!response.ok) {
          navigate("/admin/login");
          return;
        }
        setAuthenticated(true);
      } catch (error) {
        console.error("Session check failed:", error);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  // Fetch menu items
  const { data: menuData, isLoading: menuLoading, refetch: refetchMenu } = trpc.menu.list.useQuery(
    undefined,
    { refetchInterval: 3000 }
  );

  // Fetch store config
  const { data: storeConfig } = trpc.storeConfig.get.useQuery();

  // Mutations
  const createMutation = trpc.menu.create.useMutation();
  const updateMutation = trpc.menu.update.useMutation();
  const deleteMutation = trpc.menu.delete.useMutation();
  const updateConfigMutation = trpc.storeConfig.update.useMutation();

  // Update items when data changes
  useEffect(() => {
    if (menuData) {
      setItems(menuData as MenuItem[]);
    }
  }, [menuData]);

  useEffect(() => {
    if (storeConfig) {
      setConfig(storeConfig);
      setConfigData(storeConfig);
    }
  }, [storeConfig]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0f0e0c", color: "#f0ece4" }}>
        Carregando...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          emoji: formData.emoji,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
        });
        toast.success("Item atualizado com sucesso!");
        
        // Update local state immediately
        setItems(items.map(item =>
          item.id === editingId
            ? {
                ...item,
                emoji: formData.emoji,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
              }
            : item
        ));
      } else {
        await createMutation.mutateAsync({
          emoji: formData.emoji,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
        });
        toast.success("Item criado com sucesso!");
      }

      setFormData({ emoji: "🍔", name: "", description: "", price: "" });
      setEditingId(null);
      setShowForm(false);
      
      // Refetch to get fresh data
      setTimeout(() => refetchMenu(), 500);
    } catch (error) {
      toast.error("Erro ao salvar item");
      console.error(error);
    }
  };

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        storeName: configData.storeName || "",
        storeDescription: configData.storeDescription || undefined,
        storePhone: configData.storePhone || undefined,
        storeEmail: configData.storeEmail || undefined,
        storeAddress: configData.storeAddress || undefined,
        storeInstagram: configData.storeInstagram || undefined,
        whatsappNumber: configData.whatsappNumber || undefined,
        openingTime: configData.openingTime || "10:00",
        closingTime: configData.closingTime || "23:00",
        isOpen: configData.isOpen || 1,
        closedDays: configData.closedDays || "",
      };
      await updateConfigMutation.mutateAsync(dataToSubmit);
      toast.success("Configurações atualizadas com sucesso!");
      
      // Refetch menu to update Home.tsx with new config
      setTimeout(() => refetchMenu(), 500);
    } catch (error) {
      toast.error("Erro ao atualizar configurações");
      console.error(error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    const price = typeof item.price === 'string' ? item.price : item.price.toString();
    setFormData({
      emoji: item.emoji,
      name: item.name,
      description: item.description,
      price,
    });
    setEditingId(item.id);
    setShowForm(true);
    setActiveTab("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este item?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Item deletado com sucesso!");
        
        // Update local state immediately
        setItems(items.filter(item => item.id !== id));
        
        // Refetch to confirm
        setTimeout(() => refetchMenu(), 500);
      } catch (error) {
        toast.error("Erro ao deletar item");
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ emoji: "🍔", name: "", description: "", price: "" });
  };

  return (
    <div style={{ background: "#0f0e0c", color: "#f0ece4", minHeight: "100vh" }}>
      <Sidebar />
      
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ color: "#f7931e", textAlign: "center", marginBottom: "40px" }}>PAINEL ADMINISTRATIVO</h1>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px", borderBottom: "2px solid #2e2b26", paddingBottom: "15px" }}>
          <button
            onClick={() => setActiveTab("menu")}
            style={{
              background: activeTab === "menu" ? "#f7931e" : "transparent",
              color: activeTab === "menu" ? "#0f0e0c" : "#f0ece4",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            📋 Cardápio
          </button>
          <button
            onClick={() => setActiveTab("config")}
            style={{
              background: activeTab === "config" ? "#f7931e" : "transparent",
              color: activeTab === "config" ? "#0f0e0c" : "#f0ece4",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            ⚙️ Configurações
          </button>
        </div>

        {/* Menu Tab */}
        {activeTab === "menu" && (
          <>
            <Button
              onClick={() => setShowForm(!showForm)}
              style={{
                background: "#f7931e",
                color: "#0f0e0c",
                padding: "12px 24px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "30px",
                fontSize: "16px",
              }}
            >
              {showForm ? "✕ Cancelar" : "+ Adicionar Item"}
            </Button>

            {showForm && (
              <div
                style={{
                  background: "#1a1815",
                  border: "2px solid #f7931e",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "30px",
                }}
              >
                <h2 style={{ color: "#f7931e", marginTop: 0 }}>
                  {editingId ? "✏️ Editar Item" : "➕ Novo Item"}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div>
                      <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Emoji</label>
                      <Input
                        type="text"
                        maxLength={5}
                        value={formData.emoji}
                        onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                        style={{
                          background: "#2e2b26",
                          border: "1px solid #3a3730",
                          color: "#f0ece4",
                          padding: "10px",
                          borderRadius: "6px",
                          fontSize: "16px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Preço (R$)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        style={{
                          background: "#2e2b26",
                          border: "1px solid #3a3730",
                          color: "#f0ece4",
                          padding: "10px",
                          borderRadius: "6px",
                          fontSize: "16px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Nome</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Combo 01"
                      style={{
                        background: "#2e2b26",
                        border: "1px solid #3a3730",
                        color: "#f0ece4",
                        padding: "10px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Descrição</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Ex: 1 X-Salada + 1 Batata (180ml) + 1 Refri Lata"
                      style={{
                        background: "#2e2b26",
                        border: "1px solid #3a3730",
                        color: "#f0ece4",
                        padding: "10px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        width: "100%",
                        boxSizing: "border-box",
                        minHeight: "80px",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      type="submit"
                      style={{
                        background: "#f7931e",
                        color: "#0f0e0c",
                        padding: "12px 24px",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        flex: 1,
                        opacity: createMutation.isPending || updateMutation.isPending ? 0.6 : 1,
                      }}
                      disabled={createMutation.isPending || updateMutation.isPending}
                    >
                      {editingId ? "💾 Atualizar Item" : "➕ Adicionar Item"}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      style={{
                        background: "#666",
                        color: "#f0ece4",
                        padding: "12px 24px",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      ✕ Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Items List */}
            {menuLoading ? (
              <p style={{ textAlign: "center", color: "#f7931e" }}>Carregando itens...</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
                {items.map((item) => (
                  <div
                    key={`item-${item.id}`}
                    style={{
                      background: "#1a1815",
                      border: editingId === item.id ? "2px solid #f7931e" : "1px solid #2e2b26",
                      borderRadius: "8px",
                      padding: "15px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
                      <div>
                        <h3 style={{ color: "#f7931e", margin: "0 0 5px 0" }}>{item.name}</h3>
                        <p style={{ color: "#f7931e", margin: 0, fontWeight: "bold", fontSize: "1.2rem" }}>R$ {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)}</p>
                      </div>
                    </div>
                    <p style={{ color: "#7a7267", margin: "10px 0", fontSize: "0.9rem" }}>{item.description}</p>
                    <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                      <Button
                        onClick={() => handleEdit(item)}
                        style={{
                          background: "#4a9eff",
                          color: "white",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          flex: 1,
                          fontWeight: "bold",
                        }}
                      >
                        ✏️ Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          background: "#ff4444",
                          color: "white",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          flex: 1,
                          fontWeight: "bold",
                        }}
                      >
                        🗑️ Deletar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Config Tab */}
        {activeTab === "config" && (
          <div
            style={{
              background: "#1a1815",
              border: "1px solid #2e2b26",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <h2 style={{ color: "#f7931e", marginTop: 0 }}>⚙️ Configurações da Lanchonete</h2>
            <form onSubmit={handleConfigSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Nome da Lanchonete</label>
                <Input
                  type="text"
                  value={configData.storeName || ""}
                  onChange={(e) => setConfigData({ ...configData, storeName: e.target.value })}
                  style={{
                    background: "#2e2b26",
                    border: "1px solid #3a3730",
                    color: "#f0ece4",
                    padding: "10px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Descrição</label>
                <textarea
                  value={configData.storeDescription || ""}
                  onChange={(e) => setConfigData({ ...configData, storeDescription: e.target.value })}
                  style={{
                    background: "#2e2b26",
                    border: "1px solid #3a3730",
                    color: "#f0ece4",
                    padding: "10px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    width: "100%",
                    boxSizing: "border-box",
                    minHeight: "80px",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div>
                  <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Telefone</label>
                  <Input
                    type="text"
                    value={configData.storePhone || ""}
                    onChange={(e) => setConfigData({ ...configData, storePhone: e.target.value })}
                    placeholder="(92) 99375-1070"
                    style={{
                      background: "#2e2b26",
                      border: "1px solid #3a3730",
                      color: "#f0ece4",
                      padding: "10px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                  <Input
                    type="email"
                    value={configData.storeEmail || ""}
                    onChange={(e) => setConfigData({ ...configData, storeEmail: e.target.value })}
                    style={{
                      background: "#2e2b26",
                      border: "1px solid #3a3730",
                      color: "#f0ece4",
                      padding: "10px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Endereço</label>
                <Input
                  type="text"
                  value={configData.storeAddress || ""}
                  onChange={(e) => setConfigData({ ...configData, storeAddress: e.target.value })}
                  placeholder="Av. Itacolomy, 34 - Armando Mendes, Manaus - AM"
                  style={{
                    background: "#2e2b26",
                    border: "1px solid #3a3730",
                    color: "#f0ece4",
                    padding: "10px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Instagram</label>
                <Input
                  type="text"
                  value={configData.storeInstagram || ""}
                  onChange={(e) => setConfigData({ ...configData, storeInstagram: e.target.value })}
                  placeholder="@lanchonetetrindade"
                  style={{
                    background: "#2e2b26",
                    border: "1px solid #3a3730",
                    color: "#f0ece4",
                    padding: "10px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>WhatsApp (Número)</label>
                <Input
                  type="text"
                  value={configData.whatsappNumber || ""}
                  onChange={(e) => setConfigData({ ...configData, whatsappNumber: e.target.value })}
                  placeholder="5592993751070"
                  style={{
                    background: "#2e2b26",
                    border: "1px solid #3a3730",
                    color: "#f0ece4",
                    padding: "10px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                <p style={{ fontSize: "0.85rem", color: "#7a7267", margin: "6px 0 0 0" }}>Formato: 55 + DDD + número (ex: 5592993751070)</p>
              </div>
                <div>
                  <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Horário de Abertura</label>
                  <Input
                    type="time"
                    value={configData.openingTime || "10:00"}
                    onChange={(e) => setConfigData({ ...configData, openingTime: e.target.value })}
                    style={{
                      background: "#2e2b26",
                      border: "1px solid #3a3730",
                      color: "#f0ece4",
                      padding: "10px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#f0ece4", marginBottom: "5px", fontWeight: "bold" }}>Horário de Fechamento</label>
                  <Input
                    type="time"
                    value={configData.closingTime || "23:00"}
                    onChange={(e) => setConfigData({ ...configData, closingTime: e.target.value })}
                    style={{
                      background: "#2e2b26",
                      border: "1px solid #3a3730",
                      color: "#f0ece4",
                      padding: "10px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                style={{
                  background: "#f7931e",
                  color: "#0f0e0c",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                  opacity: updateConfigMutation.isPending ? 0.6 : 1,
                }}
                disabled={updateConfigMutation.isPending}
              >
                💾 Salvar Configurações
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
