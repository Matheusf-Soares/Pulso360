import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import tasksService from '../services/tasksService';
import PriorityDropdown from '../components/PriorityDropdown';

export default function NovaTarefa() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
      const payload = {
        titulo: titulo.trim(),
        prioridade,
        categoria,
        due_date: dueDate || null,
        completed: false,
      };
      await tasksService.create(payload);
      if (window.showNotification) window.showNotification('Tarefa criada com sucesso', 'success');
      navigate('/');
    } catch (err) {
      setError('Não foi possível criar a tarefa.');
      console.error('Erro criar tarefa', err);
      if (window.showNotification) window.showNotification('Falha ao criar tarefa', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card" style={{ maxWidth: 640, margin: '24px auto' }}>
        <div className="card-header">
          <h3>📝 Criar Nova Tarefa</h3>
          <button className="btn-outline small" onClick={() => navigate(-1)}>Voltar</button>
        </div>
        <form onSubmit={handleSubmit} className="task-create-form">
          <label>
            Título
            <input
              type="text"
              placeholder="Ex.: Preparar relatório mensal"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </label>
          <label>
            Prioridade
            <PriorityDropdown
              value={prioridade}
              onChange={setPrioridade}
              ariaLabel="Prioridade"
            />
          </label>
          <label>
            Data de vencimento
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label>
            Categoria
            <input
              type="text"
              placeholder="geral, dev, suporte..."
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </label>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button type="button" className="btn-outline" onClick={() => navigate('/')}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={!canSubmit}>
              {isSubmitting ? 'Salvando...' : 'Criar Tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
