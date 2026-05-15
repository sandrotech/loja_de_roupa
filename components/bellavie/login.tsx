"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginProps {
  onLogin: (user: { name: string; role: string; store: string }) => void;
}

// Usuários mockados para demo
const DEMO_USERS = [
  { email: "ana@bellavie.com", password: "bellavie123", name: "Ana Silva", role: "Gerente", store: "Jangurussu" },
  { email: "carla@bellavie.com", password: "bellavie123", name: "Carla Mendes", role: "Gerente", store: "Iguatemi" },
  { email: "admin@bellavie.com", password: "admin123", name: "Administrador", role: "Admin", store: "Matriz" },
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simula delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const user = DEMO_USERS.find(
      (u) => u.email === email.toLowerCase().trim() && u.password === password
    );

    if (user) {
      onLogin({ name: user.name, role: user.role, store: user.store });
    } else {
      setError("E-mail ou senha incorretos. Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#F9DDE5] via-[#f4e8ef] to-[#ede4ea]">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#9A7A8F]/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#9A7A8F]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-[#F9DDE5]/40 blur-2xl" />
      </div>

      {/* Card de Login */}
      <div className="relative w-full max-w-md mx-4">
        {/* Card de glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_24px_60px_-12px_rgba(154,122,143,0.25)] border border-white/60 p-8 sm:p-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-20 relative mb-4">
              <Image
                src="/logo_bellavie.jpeg"
                alt="Bellavie"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-[#2D1D25] tracking-tight">
              Bellavie Hub
            </h1>
            <p className="text-sm text-[#9A7A8F] mt-1 font-medium">
              Sistema de Gestão
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-[#2D1D25]">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A7A8F]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@bellavie.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-[#e2e8f0] focus:border-[#9A7A8F] focus:ring-[#9A7A8F]/20 bg-white/70"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-[#2D1D25]">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A7A8F]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl border-[#e2e8f0] focus:border-[#9A7A8F] focus:ring-[#9A7A8F]/20 bg-white/70"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A7A8F] hover:text-[#2D1D25] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-medium animate-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#9A7A8F] hover:bg-[#7d6175] text-white font-semibold text-base shadow-lg shadow-[#9A7A8F]/30 hover:shadow-[#9A7A8F]/40 transition-all duration-300 hover:-translate-y-0.5 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          {/* Dica para demo */}
          <div className="mt-6 p-4 bg-[#F9DDE5]/50 rounded-2xl border border-[#9A7A8F]/10">
            <p className="text-xs font-semibold text-[#9A7A8F] mb-2 uppercase tracking-wider">Acesso Demo</p>
            <div className="space-y-1">
              <p className="text-xs text-[#2D1D25]/70 font-mono">ana@bellavie.com / bellavie123</p>
              <p className="text-xs text-[#2D1D25]/70 font-mono">admin@bellavie.com / admin123</p>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs text-[#9A7A8F]/60 mt-6 font-medium">
          © 2025 Bellavie Moda Feminina • Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
