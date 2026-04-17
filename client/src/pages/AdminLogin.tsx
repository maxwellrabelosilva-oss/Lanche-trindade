import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login realizado com sucesso!");
        setLocation("/admin");
      } else {
        toast.error(data.message || "Email ou senha inválidos");
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#1a1815",
          borderRadius: "12px",
          padding: "40px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontFamily: "Bebas Neue, sans-serif",
            color: "#f7931e",
            textAlign: "center",
            marginBottom: "10px",
            letterSpacing: "2px",
          }}
        >
          PAINEL ADMIN
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#7a7267",
            marginBottom: "30px",
            fontSize: "0.9rem",
          }}
        >
          Lanchonete do Trindade
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#f0ece4",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: "#2e2b26",
                border: "1px solid #3a3730",
                color: "#f0ece4",
                padding: "10px 12px",
                borderRadius: "6px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#f0ece4",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              Senha
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                background: "#2e2b26",
                border: "1px solid #3a3730",
                color: "#f0ece4",
                padding: "10px 12px",
                borderRadius: "6px",
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            style={{
              background: "#f7931e",
              color: "#1a1815",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "10px",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#7a7267",
            marginTop: "20px",
            fontSize: "0.85rem",
          }}
        >
          Acesso exclusivo para administrador
        </p>
      </div>
    </div>
  );
}
