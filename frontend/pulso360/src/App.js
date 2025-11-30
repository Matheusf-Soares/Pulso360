import NovaTarefa from './pages/NovaTarefa';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import DebugPanel from "./components/DebugPanel";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Home from "./pages/Home";
import Avaliacoes from "./pages/Avaliacoes";
import ContinuarAvaliacao from "./pages/ContinuarAvaliacao";
import ResultadoAvaliacao from "./pages/ResultadoAvaliacao";
import PDI from "./pages/PDI";
import Equipe from "./pages/Equipe";
import MembroPerfil from "./pages/MembroPerfil";
import Relatorios from "./pages/Relatorios";
import Administracao from "./pages/Administracao";
import Ajuda from "./pages/Ajuda";
import Perfil from "./pages/Perfil";
import Notificacoes from "./pages/Notificacoes";

// Admin Pages
import GerenciarUsuarios from "./pages/admin/GerenciarUsuarios";
import Permissoes from "./pages/admin/Permissoes";
import Analytics from "./pages/admin/Analytics";
import Comunicacao from "./pages/admin/Comunicacao";
import ConfiguracoesGerais from "./pages/admin/ConfiguracoesGerais";
import Integracoes from "./pages/admin/Integracoes";
import Performance from "./pages/admin/Performance";
import Manutencao from "./pages/admin/Manutencao";
import BackupRestore from "./pages/admin/BackupRestore";
import LogsAcesso from "./pages/admin/LogsAcesso";
import PoliticasSeguranca from "./pages/admin/PoliticasSeguranca";
import Alertas from "./pages/admin/Alertas";
import DashboardExecutivo from "./pages/admin/DashboardExecutivo";
import RelatoriosCustomizados from "./pages/admin/RelatoriosCustomizados";
import RelatoriosAgendados from "./pages/admin/RelatoriosAgendados";
import ExportarDados from "./pages/admin/ExportarDados";

import "./index.css";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DebugPanel />
        <Routes>
          {/* Rotas públicas - Login, Cadastro e Recuperação de Senha */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/tarefas/nova" element={<NovaTarefa />} />
          
          {/* Rotas protegidas - requerem autenticação */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/avaliacoes" element={<Avaliacoes />} />
                    <Route path="/avaliacao/:id/continuar" element={<ContinuarAvaliacao />} />
                    <Route path="/avaliacao/:id/resultado" element={<ResultadoAvaliacao />} />
                    <Route path="/pdi" element={<PDI />} />
                    <Route path="/equipe" element={<Equipe />} />
                    <Route path="/membro/:id" element={<MembroPerfil />} />
                    <Route path="/relatorios" element={<Relatorios />} />
                    <Route path="/administracao" element={<Administracao />} />
                    <Route path="/ajuda" element={<Ajuda />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/notificacoes" element={<Notificacoes />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/gerenciar-usuarios" element={<GerenciarUsuarios />} />
                    <Route path="/admin/permissoes" element={<Permissoes />} />
                    <Route path="/admin/analytics" element={<Analytics />} />
                    <Route path="/admin/comunicacao" element={<Comunicacao />} />
                    <Route path="/admin/configuracoes-gerais" element={<ConfiguracoesGerais />} />
                    <Route path="/admin/integracoes" element={<Integracoes />} />
                    <Route path="/admin/performance" element={<Performance />} />
                    <Route path="/admin/manutencao" element={<Manutencao />} />
                    <Route path="/admin/backup-restore" element={<BackupRestore />} />
                    <Route path="/admin/logs-acesso" element={<LogsAcesso />} />
                    <Route path="/admin/politicas-seguranca" element={<PoliticasSeguranca />} />
                    <Route path="/admin/alertas" element={<Alertas />} />
                    <Route path="/admin/dashboard-executivo" element={<DashboardExecutivo />} />
                    <Route path="/admin/relatorios-customizados" element={<RelatoriosCustomizados />} />
                    <Route path="/admin/relatorios-agendados" element={<RelatoriosAgendados />} />
                    <Route path="/admin/exportar-dados" element={<ExportarDados />} />
                    
                    {/* Rota 404 - Redirecionar para home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
