import React, { useState, useEffect } from 'react';
import PriorityDropdown from './PriorityDropdown';
import tasksService from '../services/tasksService';

export default function NewTaskModal({ open, onClose, onCreated }) {
  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('medium');
  const [categoria, setCategoria] = useState('geral');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setTitulo('');
      setPrioridade('medium');
      setCategoria('geral');
      setDueDate('');
      setIsSubmitting(false);
      setError('');
    }
  }, [open]);

  if (!open) return null;

  const canSubmit = titulo.trim().length > 0 && !isSubmitting;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay-modern')) onClose();
  };

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
      const created = await tasksService.create(payload);
      onCreated?.(created);
      if (window.showNotification) window.showNotification('Tarefa criada com sucesso', 'success');
      onClose();
    } catch (err) {
      console.error('Erro criar tarefa', err);
      setError('Não foi possível criar a tarefa.');
      if (window.showNotification) window.showNotification('Falha ao criar tarefa', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay-modern" onClick={handleOverlayClick}>
      <div className="modal-content-modern new-task-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header-modern">
          <div className="modal-header-left">
            <div className="modal-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM6 10V7H4V10H1V12H4V15H6V12H9V10H6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h2>Adicionar Nova Tarefa</h2>
              <p>Preencha as informações da nova tarefa</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div className="modal-body-modern">
          <form onSubmit={handleSubmit}>
            <div className="form-grid-modern">
              <div className="form-group-modern full-width">
                <label className="form-label-modern">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                  </svg>
                  Título *
                </label>
                <input
                  type="text"
                  className="form-input-modern"
                  placeholder="Ex.: Preparar relatório mensal"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12.5 7C13.88 7 14.99 5.88 14.99 4.5C14.99 3.12 13.88 2 12.5 2C11.12 2 10 3.12 10 4.5C10 5.88 11.12 7 12.5 7ZM5.5 7C6.88 7 7.99 5.88 7.99 4.5C7.99 3.12 6.88 2 5.5 2C4.12 2 3 3.12 3 4.5C3 5.88 4.12 7 5.5 7ZM5.5 9C3.67 9 0 9.92 0 11.75V14H11V11.75C11 9.92 7.33 9 5.5 9ZM12.5 9C12.25 9 11.96 9.02 11.67 9.05C12.61 9.75 13.25 10.62 13.25 11.75V14H18V11.75C18 9.92 14.33 9 12.5 9Z" fill="currentColor"/>
                  </svg>
                  Prioridade *
                </label>
                <PriorityDropdown
                  value={prioridade}
                  onChange={setPrioridade}
                  ariaLabel="Prioridade"
                />
              </div>
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 0H4C2.9 0 2 0.9 2 2V14C2 15.1 2.9 16 4 16H12C13.1 16 14 15.1 14 14V2C14 0.9 13.1 0 12 0ZM6 14H4V12H6V14ZM6 11H4V9H6V11ZM6 8H4V6H6V8ZM6 5H4V3H6V5ZM10 14H8V12H10V14ZM10 11H8V9H10V11ZM10 8H8V6H10V8ZM10 5H8V3H10V5ZM12 14H12V3H12V14Z" fill="currentColor"/>
                  </svg>
                  Categoria
                </label>
                <input
                  type="text"
                  className="form-input-modern"
                  placeholder="geral, dev, suporte..."
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                />
              </div>
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 2H12V0H10V2H6V0H4V2H3C1.89 2 1 2.9 1 4V16C1 17.1 1.89 18 3 18H13C14.1 18 15 17.1 15 16V4C15 2.9 14.1 2 13 2ZM13 16H3V7H13V16Z" fill="currentColor"/>
                  </svg>
                  Data de Vencimento
                </label>
                <input
                  type="date"
                  className="form-input-modern"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-info-box">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
              </svg>
              <p>Os campos marcados com * são obrigatórios.</p>
            </div>
          </form>
        </div>
        <div className="modal-footer-modern">
          <button className="btn-modal-secondary" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Cancelar
          </button>
          <button className="btn-modal-primary" onClick={handleSubmit} disabled={!canSubmit}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.6 10.4L2.2 7L0.8 8.4L5.6 13.2L16 2.8L14.6 1.4L5.6 10.4Z" fill="currentColor"/>
            </svg>
            {isSubmitting ? 'Salvando...' : 'Adicionar Tarefa'}
          </button>
        </div>
      </div>
    </div>
  );
}
