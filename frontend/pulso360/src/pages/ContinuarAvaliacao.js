import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import avaliacoesService from '../services/avaliacoesService';
import itemAvaliacaoService from '../services/itemAvaliacaoService';
import usuarioService from '../services/usuarioService';

const ContinuarAvaliacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [avaliacao, setAvaliacao] = useState(null);
  const [competencias, setCompetencias] = useState([]);
  const [itensAvaliacao, setItensAvaliacao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState(null);

  // Carrega dados da avaliação
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca avaliação
        const avaliacaoData = await avaliacoesService.getById(id);
        setAvaliacao(avaliacaoData);

        // Busca competências do usuário avaliado
        const competenciasData = await usuarioService.getCompetencias(avaliacaoData.avaliado_id);
        setCompetencias(competenciasData || []);

        // Busca itens já respondidos
        const itensData = await itemAvaliacaoService.listByAvaliacao(id);
        setItensAvaliacao(itensData || []);

      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar avaliação. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Agrupa competências por categoria (usando primeiras palavras do nome)
  const sections = competencias.reduce((acc, comp) => {
    // Extrai categoria do nome (ex: "Técnica - React" -> "Técnica")
    const categoria = comp.nome.includes('-') 
      ? comp.nome.split('-')[0].trim() 
      : 'Geral';
    
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(comp);
    return acc;
  }, {});

  const sectionKeys = Object.keys(sections);
  const totalSections = sectionKeys.length;

  // Auto-save com debounce
  const autoSave = useCallback(async (competenciaId, nota, comentario) => {
    try {
      setSaving(true);
      
      // Verifica se já existe um item para esta competência
      const existingItem = itensAvaliacao.find(
        item => item.competencia_id === competenciaId
      );

      let savedItem;
      if (existingItem) {
        // Atualiza item existente
        savedItem = await itemAvaliacaoService.update(existingItem.id, {
          nota,
          comentario
        });
      } else {
        // Cria novo item
        savedItem = await itemAvaliacaoService.create({
          avaliacao_id: id,
          competencia_id: competenciaId,
          nota,
          comentario
        });
        setItensAvaliacao([...itensAvaliacao, savedItem]);
      }

      setLastSaved(new Date());
    } catch (err) {
      console.error('Erro ao salvar:', err);
    } finally {
      setSaving(false);
    }
  }, [id, itensAvaliacao]);

  // Debounced auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-save logic handled in handleResponse
    }, 2000);
    return () => clearTimeout(timer);
  }, [itensAvaliacao]);

  const handleResponse = (competenciaId, value, isCommentario = false) => {
    const existingItem = itensAvaliacao.find(
      item => item.competencia_id === competenciaId
    );

    const updatedItem = {
      ...existingItem,
      competencia_id: competenciaId,
      [isCommentario ? 'comentario' : 'nota']: value
    };

    // Atualiza estado local
    if (existingItem) {
      setItensAvaliacao(
        itensAvaliacao.map(item =>
          item.competencia_id === competenciaId ? updatedItem : item
        )
      );
    } else {
      setItensAvaliacao([...itensAvaliacao, updatedItem]);
    }

    // Auto-save após 2 segundos
    setTimeout(() => {
      autoSave(
        competenciaId,
        updatedItem.nota,
        updatedItem.comentario
      );
    }, 2000);
  };

  const getItemValue = (competenciaId, field = 'nota') => {
    const item = itensAvaliacao.find(i => i.competencia_id === competenciaId);
    return item ? item[field] : (field === 'nota' ? null : '');
  };

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Valida se todas as competências foram respondidas
      const totalCompetencias = competencias.length;
      const totalRespondidas = itensAvaliacao.filter(i => i.nota !== null).length;

      if (totalRespondidas < totalCompetencias) {
        alert(`Você precisa responder todas as ${totalCompetencias} competências antes de finalizar. ${totalRespondidas}/${totalCompetencias} respondidas.`);
        return;
      }

      // Atualiza status da avaliação para concluída
      await avaliacoesService.update(id, { status: 'concluida' });
      
      alert('Avaliação concluída com sucesso!');
      navigate('/avaliacoes');
    } catch (err) {
      console.error('Erro ao finalizar avaliação:', err);
      alert('Erro ao finalizar avaliação. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="continue-evaluation-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando avaliação...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="continue-evaluation-page">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => navigate('/avaliacoes')}>Voltar</button>
        </div>
      </div>
    );
  }

  if (!avaliacao || totalSections === 0) {
    return (
      <div className="continue-evaluation-page">
        <div className="error-state">
          <p>Avaliação não encontrada ou sem competências definidas.</p>
          <button onClick={() => navigate('/avaliacoes')}>Voltar</button>
        </div>
      </div>
    );
  }

  const currentSectionKey = sectionKeys[currentSection];
  const currentSectionData = sections[currentSectionKey];
  const overallProgress = Math.round(((currentSection + 1) / totalSections) * 100);

  // Ícones por categoria
  const categoryIcons = {
    'Técnica': '💻',
    'Técnicas': '💻',
    'Comunicação': '💬',
    'Liderança': '👑',
    'Trabalho em Equipe': '👥',
    'Gestão': '⏰',
    'Geral': '⭐'
  };

  return (
    <div className="continue-evaluation-page">
      {/* Header */}
      <div className="eval-continue-header">
        <button className="back-button-eval" onClick={() => navigate('/avaliacoes')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar para Avaliações
        </button>

        <div className="eval-continue-info">
          <div className="eval-info-left">
            <h1>Avaliação - {avaliacao.tipo === 'autoavaliacao' ? 'Autoavaliação' : avaliacao.tipo}</h1>
            <div className="eval-meta-tags">
              <span className="eval-type-tag">{avaliacao.tipo}</span>
              <span className="eval-section-tag">Seção {currentSection + 1} de {totalSections}</span>
              {saving && <span className="saving-indicator">💾 Salvando...</span>}
              {lastSaved && !saving && (
                <span className="saved-indicator">
                  ✓ Salvo às {lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>

          <div className="eval-info-right">
            <div className="progress-circle-eval">
              <svg viewBox="0 0 100 100" className="circle-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="url(#evalGradient)" 
                  strokeWidth="8"
                  strokeDasharray={`${(overallProgress / 100) * 283} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="evalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="circle-text">
                <span className="circle-percentage">{overallProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação de Seções */}
      <div className="sections-nav">
        {sectionKeys.map((sectionKey, index) => (
          <button
            key={sectionKey}
            className={`section-nav-btn ${currentSection === index ? 'active' : ''} ${
              currentSection > index ? 'completed' : ''
            }`}
            onClick={() => setCurrentSection(index)}
          >
            <span className="section-icon">{categoryIcons[sectionKey] || '⭐'}</span>
            <span className="section-title">{sectionKey}</span>
            {currentSection > index && (
              <span className="section-check">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Conteúdo da Seção */}
      <div className="section-content">
        <div className="section-header-eval">
          <h2>
            <span className="section-icon-large">{categoryIcons[currentSectionKey] || '⭐'}</span>
            {currentSectionKey}
          </h2>
          <p>Avalie cada competência de 1 a 5 e adicione comentários se desejar</p>
        </div>

        <div className="questions-list">
          {currentSectionData.map((competencia, qIndex) => (
            <div key={competencia.id} className="question-card">
              <div className="question-header">
                <span className="question-number">Competência {qIndex + 1}</span>
                <span className="competencia-nivel">Nível Atual: {competencia.nivel}/5</span>
              </div>
              <p className="question-text">{competencia.nome}</p>
              {competencia.descricao && (
                <p className="competencia-descricao">{competencia.descricao}</p>
              )}

              <div className="scale-input">
                <div className="scale-labels">
                  <span>Inadequado</span>
                  <span>Excelente</span>
                </div>
                <div className="scale-options">
                  {[1, 2, 3, 4, 5].map(value => (
                    <button
                      key={value}
                      className={`scale-btn ${getItemValue(competencia.id, 'nota') === value ? 'selected' : ''}`}
                      onClick={() => handleResponse(competencia.id, value, false)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                {getItemValue(competencia.id, 'nota') && (
                  <div className="scale-feedback">
                    Você selecionou: <strong>{getItemValue(competencia.id, 'nota')}/5</strong>
                  </div>
                )}
              </div>

              <div className="text-input">
                <label>Comentários (opcional):</label>
                <textarea
                  className="question-textarea"
                  placeholder="Adicione observações sobre esta competência..."
                  rows="3"
                  value={getItemValue(competencia.id, 'comentario')}
                  onChange={(e) => handleResponse(competencia.id, e.target.value, true)}
                />
                <div className="textarea-counter">
                  {(getItemValue(competencia.id, 'comentario') || '').length} caracteres
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegação de Página */}
      <div className="eval-navigation">
        <button 
          className="nav-btn secondary"
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Anterior
        </button>

        <div className="nav-progress">
          <span className="nav-text">Seção {currentSection + 1} de {totalSections}</span>
          <div className="nav-dots">
            {sectionKeys.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSection === index ? 'active' : ''} ${
                  currentSection > index ? 'completed' : ''
                }`}
              ></span>
            ))}
          </div>
        </div>

        {currentSection < totalSections - 1 ? (
          <button 
            className="nav-btn primary"
            onClick={handleNext}
          >
            Próxima
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <button 
            className="nav-btn success"
            onClick={handleSubmit}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 2L5.5 10L2.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Enviar Avaliação
          </button>
        )}
      </div>
    </div>
  );
};

export default ContinuarAvaliacao;
