import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Loader2, Plus, Edit2, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";

export default function AdminDashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const { data: menuItems, isLoading, refetch } = trpc.menu.list.useQuery();
  const createMutation = trpc.menu.create.useMutation();
  const updateMutation = trpc.menu.update.useMutation();
  const deleteMutation = trpc.menu.delete.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    emoji: "",
    name: "",
    description: "",
    price: "",
  });

  // Redirect if not owner
  if (!authLoading && !user) {
    return (
      <div style={{ backgroundColor: "#0f0e0c", color: "#f0ece4", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "20px" }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", marginBottom: "20px" }}>Acesso Restrito</h1>
        <p style={{ marginBottom: "20px", textAlign: "center" }}>Você precisa fazer login como administrador para acessar esta página.</p>
        <a
          href={getLoginUrl()}
          style={{
            background: "#f5a623",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Fazer Login
        </a>
      </div>
    );
  }

  if (authLoading || isLoading) {
    return (
      <div style={{ backgroundColor: "#0f0e0c", color: "#f0ece4", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" size={40} color="#f5a623" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.emoji || !formData.name || !formData.description || !formData.price) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error("Preço inválido");
        return;
      }

      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          emoji: formData.emoji,
          name: formData.name,
          description: formData.description,
          price,
        });
        toast.success("Item atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync({
          emoji: formData.emoji,
          name: formData.name,
          description: formData.description,
          price,
        });
        toast.success("Item criado com sucesso!");
      }

      setFormData({ emoji: "", name: "", description: "", price: "" });
      setShowForm(false);
      setEditingId(null);
      await refetch();
    } catch (error) {
      toast.error("Erro ao salvar item");
      console.error(error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      emoji: item.emoji,
      name: item.name,
      description: item.description,
      price: item.price.toString(),
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este item?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Item deletado com sucesso!");
      await refetch();
    } catch (error) {
      toast.error("Erro ao deletar item");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({ emoji: "", name: "", description: "", price: "" });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div style={{ backgroundColor: "#0f0e0c", color: "#f0ece4", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar isAdmin={true} />
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #e8431a, #f5a623)",
          padding: "20px 24px",
          paddingLeft: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#fff", margin: 0 }}>
          Painel Admin
        </h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "0.9rem" }}>Olá, {user?.name || "Admin"}</span>
          <button
            onClick={logout}
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
        {/* Botão Novo Item */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "#f5a623",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
            }}
          >
            <Plus size={20} />
            Novo Item
          </button>
        )}

        {/* Formulário */}
        {showForm && (
          <div
            style={{
              background: "#1a1815",
              border: "1px solid #2e2b26",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "16px", color: "#f5a623" }}>
              {editingId ? "Editar Item" : "Novo Item"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", color: "#7a7267" }}>
                    Emoji
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.emoji}
                    onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                    placeholder="🍔"
                    style={{
                      width: "100%",
                      background: "#0f0e0c",
                      border: "1px solid #2e2b26",
                      borderRadius: "8px",
                      color: "#f0ece4",
                      padding: "10px",
                      fontSize: "1.5rem",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", color: "#7a7267" }}>
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="22.00"
                    style={{
                      width: "100%",
                      background: "#0f0e0c",
                      border: "1px solid #2e2b26",
                      borderRadius: "8px",
                      color: "#f0ece4",
                      padding: "10px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", color: "#7a7267" }}>
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: X-Burgão"
                  style={{
                    width: "100%",
                    background: "#0f0e0c",
                    border: "1px solid #2e2b26",
                    borderRadius: "8px",
                    color: "#f0ece4",
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", color: "#7a7267" }}>
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ex: Pão brioche, blend 200g, queijo, alface, tomate"
                  style={{
                    width: "100%",
                    background: "#0f0e0c",
                    border: "1px solid #2e2b26",
                    borderRadius: "8px",
                    color: "#f0ece4",
                    padding: "10px",
                    minHeight: "80px",
                    boxSizing: "border-box",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="submit"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {editingId ? "Atualizar" : "Criar"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    background: "#7a7267",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Itens */}
        <h2 style={{ marginBottom: "16px", color: "#f5a623" }}>Itens do Cardápio</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {menuItems?.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#1a1815",
                border: "1px solid #2e2b26",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                <span style={{ fontSize: "2.5rem" }}>{item.emoji}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      background: "#f5a623",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: "#e8431a",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem", fontWeight: "bold" }}>{item.name}</h3>
              <p style={{ margin: "0 0 12px 0", fontSize: "0.85rem", color: "#7a7267" }}>{item.description}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#f5a623" }}>
                  R$ {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {(!menuItems || menuItems.length === 0) && !showForm && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#7a7267" }}>
            <p>Nenhum item no cardápio ainda. Clique em "Novo Item" para começar.</p>
          </div>
        )}
      </main>
    </div>
  );
}
