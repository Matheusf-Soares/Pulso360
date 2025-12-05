import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tasksService from '../services/tasksService';
import authService from '../services/authService';
import PriorityDropdown from '../components/PriorityDropdown';
import '../styles/Tarefas.css';

export default function NovaTarefa() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('medium');
  const [categoria, setCategoria] = useState('geral');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = titulo.trim().length > 0 && !isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError('');
    try {
      const user = authService.getCurrentUser();
      if (!user || !user.id) {
        setError('Usuário não autenticado. Faça login novamente.');
        if (window.showNotification) window.showNotification('Usuário não autenticado', 'error', 3000);
        return;
      }

      const payload = {
        titulo: titulo.trim(),
        prioridade,
        categoria,
        due_date: dueDate || null,
        completed: false,
        usuario_id: user.id,
      };
      await tasksService.create(payload);
      if (window.showNotification) window.showNotification('Tarefa criada com sucesso! ✅', 'success', 3000);
      navigate('/tarefas');
    } catch (err) {
      setError('Não foi possível criar a tarefa.');
      console.error('Erro criar tarefa', err);
      if (window.showNotification) window.showNotification('Falha ao criar tarefa', 'error', 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      <div className="page-header" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <div>
          <h1 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '700' }}>
            📝 Criar Nova Tarefa
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem' }}>
            Adicione uma nova tarefa ao seu fluxo de trabalho
          </p>
        </div>
        <button 
          className="btn-secondary" 
          onClick={() => navigate('/tarefas')}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontWeight: '600',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L7 1L2 6H5V16H11V6H14L9 1L8 0Z" fill="currentColor" transform="rotate(180 8 8)"/>
          </svg>
          Voltar
        </button>
      </div>

      <div className="modal-content" style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        animation: 'slideUp 0.3s ease',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
      }}>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ padding: '2rem' }}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#667eea' }}>
                  <path d="M2 2h12v2H2V2zm0 4h12v2H2V6zm0 4h12v2H2v-2zm0 4h8v2H2v-2z" fill="currentColor"/>
                </svg>
                Título *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex.: Preparar relatório mensal"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#f59e0b' }}>
                    <path d="M8 0L10 5L16 6L11 10L13 16L8 13L3 16L5 10L0 6L6 5L8 0Z" fill="currentColor"/>
                  </svg>
                  Prioridade
                </label>
                <PriorityDropdown
                  value={prioridade}
                  onChange={setPrioridade}
                  ariaLabel="Prioridade"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#10b981' }}>
                    <path d="M13 2H11V0H9V2H7V0H5V2H3C2.45 2 2 2.45 2 3V14C2 14.55 2.45 15 3 15H13C13.55 15 14 14.55 14 14V3C14 2.45 13.55 2 13 2ZM13 14H3V6H13V14Z" fill="currentColor"/>
                  </svg>
                  Data de Vencimento
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#8b5cf6' }}>
                  <path d="M2 2H14V4H2V2ZM2 6H10V8H2V6ZM2 10H14V12H2V10Z" fill="currentColor"/>
                </svg>
                Categoria
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex.: geral, dev, suporte, reunião..."
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <small style={{ 
                display: 'block', 
                marginTop: '0.5rem', 
                color: '#6b7280', 
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7V7h2v5zm0-6H7V4h2v2z"/>
                </svg>
                Organize suas tarefas por categoria para facilitar a busca
              </small>
            </div>

            {error && (
              <div style={{ 
                padding: '1rem', 
                background: '#fee2e2', 
                border: '2px solid #fca5a5',
                borderRadius: '12px', 
                color: '#991b1b',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1.5rem',
                animation: 'shake 0.3s'
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            )}
          </div>

          <div className="modal-footer" style={{
            padding: '1.5rem 2rem',
            background: '#f9fafb',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate('/tarefas')}
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                background: 'white',
                color: '#6b7280',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={!canSubmit}
              style={{
                padding: '0.75rem 2rem',
                border: 'none',
                borderRadius: '10px',
                background: canSubmit ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#d1d5db',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: canSubmit ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (canSubmit) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = canSubmit ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none';
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                  Criando...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Criar Tarefa
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
