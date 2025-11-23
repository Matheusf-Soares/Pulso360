/**
 * Componente de Rota Protegida
 * Redireciona para login se usuário não estiver autenticado
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>; // Tela de carregamento enquanto verifica autenticação
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirecionar para login se não autenticado
  }

  return children; // Renderizar o conteúdo protegido se autenticado
};

export default ProtectedRoute;
