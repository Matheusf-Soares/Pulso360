import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Avaliacoes from "./pages/Avaliacoes";
import PDI from "./pages/PDI";
import Equipe from "./pages/Equipe";
import Relatorios from "./pages/Relatorios";
import Administracao from "./pages/Administracao";
import Ajuda from "./pages/Ajuda";
import Perfil from "./pages/Perfil";
import Notificacoes from "./pages/Notificacoes";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/avaliacoes" element={<Avaliacoes />} />
          <Route path="/pdi" element={<PDI />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/administracao" element={<Administracao />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
        </Routes>
      </Layout>
    </Router>
  );
}
