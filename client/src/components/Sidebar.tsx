import { useState } from "react";
import { Menu, X, Home, LogOut, Lock } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

interface SidebarProps {
  isAdmin?: boolean;
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    closeSidebar();
  };

  return (
    <>
      {/* Menu Hamburger Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "#f5a623",
          border: "none",
          borderRadius: "8px",
          padding: "10px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: "280px",
          backgroundColor: "#1a1815",
          borderRight: "1px solid #2e2b26",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #e8431a, #f5a623)",
            padding: "24px 20px",
            color: "#fff",
            borderBottom: "1px solid #2e2b26",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem",
              margin: 0,
              letterSpacing: "2px",
            }}
          >
            Menu
          </h2>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: "16px 0" }}>
          {/* Home */}
          <button
            onClick={() => handleNavigation("/")}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: location === "/" ? "#2e2b26" : "transparent",
              border: "none",
              color: "#f0ece4",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "0.95rem",
              borderLeft: location === "/" ? "4px solid #f5a623" : "4px solid transparent",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2e2b26";
            }}
            onMouseLeave={(e) => {
              if (location !== "/") {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <Home size={18} color="#f5a623" />
            <span>Home</span>
          </button>



          {/* Admin Panel - Only for authenticated users */}
          {user && (
            <button
              onClick={() => handleNavigation("/admin")}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: location === "/admin" ? "#2e2b26" : "transparent",
                border: "none",
                color: "#f5a623",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "0.95rem",
                fontWeight: "bold",
                borderLeft: location === "/admin" ? "4px solid #f5a623" : "4px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2e2b26";
              }}
              onMouseLeave={(e) => {
                if (location !== "/admin") {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Lock size={18} />
              <span>Painel Admin</span>
            </button>
          )}

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "#2e2b26",
              margin: "12px 0",
            }}
          />

          {/* Contact Info */}
          <div style={{ padding: "12px 20px" }}>
            <p style={{ fontSize: "0.75rem", color: "#7a7267", textTransform: "uppercase", margin: "0 0 8px 0" }}>
              Contato
            </p>
            <a
              href="https://wa.me/5592993751070"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#25D366",
                textDecoration: "none",
                fontSize: "0.9rem",
                marginBottom: "8px",
              }}
            >
              <span>💬</span>
              <span>(92) 99375-1070</span>
            </a>
          </div>
        </nav>

        {/* User Info and Logout */}
        {user && (
          <div
            style={{
              borderTop: "1px solid #2e2b26",
              padding: "16px 20px",
              background: "#0f0e0c",
            }}
          >
            <p style={{ fontSize: "0.8rem", color: "#7a7267", margin: "0 0 8px 0" }}>
              Conectado como
            </p>
            <p style={{ fontSize: "0.9rem", color: "#f0ece4", margin: "0 0 12px 0", fontWeight: "bold" }}>
              {user.name || user.email}
            </p>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "#e8431a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </div>
        )}

        {/* Login Link */}
        {!user && (
          <div
            style={{
              borderTop: "1px solid #2e2b26",
              padding: "16px 20px",
              background: "#0f0e0c",
            }}
          >
            <a
              href={getLoginUrl()}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 12px",
                background: "#f5a623",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              Fazer Login
            </a>
          </div>
        )}
      </div>
    </>
  );
}
