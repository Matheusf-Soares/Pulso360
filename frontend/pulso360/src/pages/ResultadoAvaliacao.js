import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import avaliacoesService from '../services/avaliacoesService';
import itemAvaliacaoService from '../services/itemAvaliacaoService';
import usuarioService from '../services/usuarioService';

const ResultadoAvaliacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [avaliacao, setAvaliacao] = useState(null);
  const [itensAvaliacao, setItensAvaliacao] = useState([]);
  const [competencias, setCompetencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca avaliação
        const avaliacaoData = await avaliacoesService.getById(id);
        setAvaliacao(avaliacaoData);

        // Busca itens da avaliação
        const itensData = await itemAvaliacaoService.listByAvaliacao(id);
        setItensAvaliacao(itensData || []);

        // Busca competências do usuário avaliado
        const competenciasData = await usuarioService.getCompetencias(avaliacaoData.avaliado_id);
        setCompetencias(competenciasData || []);

      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar resultado da avaliação.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Agrupa itens por categoria
  const sections = itensAvaliacao.reduce((acc, item) => {
    const competencia = competencias.find(c => c.id === item.competencia_id);
    if (!competencia) return acc;

    // Extrai categoria do nome da competência
    const categoria = competencia.nome.includes('-') 
      ? competencia.nome.split('-')[0].trim() 
      : 'Geral';

    if (!acc[categoria]) {
      acc[categoria] = {
        items: [],
        totalScore: 0,
        count: 0
      };
    }

    acc[categoria].items.push({ ...item, competencia });
    if (item.nota !== null) {
      acc[categoria].totalScore += parseFloat(item.nota);
      acc[categoria].count += 1;
    }

    return acc;
  }, {});

  // Calcula score médio por seção
  Object.keys(sections).forEach(key => {
    const section = sections[key];
    section.averageScore = section.count > 0 
      ? (section.totalScore / section.count).toFixed(1) 
      : 0;
  });

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'excellent';
    if (score >= 4) return 'good';
    if (score >= 3) return 'average';
    return 'needs-improvement';
  };

  const getScoreLabel = (score) => {
    if (score >= 4.5) return 'Excelente';
    if (score >= 4) return 'Muito Bom';
    if (score >= 3) return 'Bom';
    if (score >= 2) return 'Satisfatório';
    return 'Precisa Melhorar';
  };

  const categoryIcons = {
    'Técnica': '💻',
    'Técnicas': '💻',
    'Comunicação': '💬',
    'Liderança': '👑',
    'Trabalho em Equipe': '👥',
    'Gestão': '⏰',
    'Geral': '⭐'
  };

  if (loading) {
    return (
      <div className="result-evaluation-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando resultado...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-evaluation-page">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => navigate('/avaliacoes')}>Voltar</button>
        </div>
      </div>
    );
  }

  if (!avaliacao) {
    return (
      <div className="result-evaluation-page">
        <div className="error-state">
          <p>Avaliação não encontrada.</p>
          <button onClick={() => navigate('/avaliacoes')}>Voltar</button>
        </div>
      </div>
    );
  }

  const overallScore = avaliacao.nota_global || 0;

  return (
    <div className="result-evaluation-page">
      {/* Header */}
      <div className="result-header">
        <button className="back-button-result" onClick={() => navigate('/avaliacoes')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar para Avaliações
        </button>

        <div className="result-header-content">
          <div className="result-header-left">
            <div className="result-icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="white"/>
              </svg>
            </div>
            <div className="result-header-info">
              <h1>Resultado da Avaliação</h1>
              <div className="result-meta">
                <span className="meta-tag type">
                  {avaliacao.tipo === 'autoavaliacao' ? 'Autoavaliação' : avaliacao.tipo}
                </span>
                {avaliacao.data_conclusao && (
                  <span className="meta-tag date">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12 2H11V0H9V2H5V0H3V2H2C0.89 2 0 2.9 0 4V12C0 13.1 0.89 14 2 14H12C13.1 14 14 13.1 14 12V4C14 2.9 13.1 2 12 2ZM12 12H2V6H12V12Z" fill="currentColor"/>
                    </svg>
                    {new Date(avaliacao.data_conclusao).toLocaleDateString('pt-BR')}
                  </span>
                )}
                <span className="meta-tag status">
                  Status: {avaliacao.status}
                </span>
              </div>
            </div>
          </div>

          <div className="result-header-right">
            <div className="overall-score-card">
              <div className="score-circle-large">
                <svg viewBox="0 0 120 120" className="score-svg">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="12"/>
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="url(#scoreGradient)" 
                    strokeWidth="12"
                    strokeDasharray={`${(overallScore / 5) * 314} 314`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00b894" />
                      <stop offset="100%" stopColor="#00cec9" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="score-content">
                  <span className="score-number">{overallScore.toFixed(1)}</span>
                  <span className="score-label">de 5</span>
                </div>
              </div>
              <div className="score-info">
                <span className="score-title">Nota Geral</span>
                <span className={`score-status ${getScoreColor(overallScore)}`}>
                  {getScoreLabel(overallScore)}
                </span>
              </div>
            </div>

            <div className="result-actions">
              <button className="btn-result-action secondary">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 13.5L4.5 9L6 7.5L8.25 9.75V0H9.75V9.75L12 7.5L13.5 9L9 13.5Z" fill="currentColor"/>
                  <path d="M0 15.75V18H18V15.75H0Z" fill="currentColor"/>
                </svg>
                Exportar PDF
              </button>
              <button className="btn-result-action primary">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16 0H14V2H2V16H0V18H14V16H16V0ZM14 14H4V4H14V14Z" fill="currentColor"/>
                </svg>
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="result-tabs">
        <button
          className={`result-tab ${activeTab === 'visao-geral' ? 'active' : ''}`}
          onClick={() => setActiveTab('visao-geral')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H17C18.1 18 19 17.1 19 16V4C19 2.9 18.1 2 17 2ZM17 16H3V4H17V16Z" fill="currentColor"/>
            <path d="M5 8H7V14H5V8ZM9 6H11V14H9V6ZM13 10H15V14H13V10Z" fill="currentColor"/>
          </svg>
          Visão Geral
        </button>
        <button
          className={`result-tab ${activeTab === 'detalhes' ? 'active' : ''}`}
          onClick={() => setActiveTab('detalhes')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L12.5 7.5L18 8.5L13.5 12.5L14.5 18L10 15L5.5 18L6.5 12.5L2 8.5L7.5 7.5L10 2Z" fill="currentColor"/>
          </svg>
          Detalhes por Seção
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="result-content">
        {activeTab === 'visao-geral' && (
          <div className="tab-pane">
            {/* Scores por Seção */}
            <div className="sections-scores">
              <h2>Desempenho por Categoria</h2>
              <div className="scores-grid">
                {Object.keys(sections).map(categoryName => {
                  const section = sections[categoryName];
                  const score = parseFloat(section.averageScore);
                  return (
                    <div key={categoryName} className={`score-card ${getScoreColor(score)}`}>
                      <div className="score-card-header">
                        <span className="score-icon">{categoryIcons[categoryName] || '⭐'}</span>
                        <span className="score-value">{score.toFixed(1)}</span>
                      </div>
                      <h3>{categoryName}</h3>
                      <div className="score-bar-container">
                        <div 
                          className={`score-bar ${getScoreColor(score)}`}
                          style={{width: `${(score / 5) * 100}%`}}
                        ></div>
                      </div>
                      <span className={`score-label ${getScoreColor(score)}`}>
                        {getScoreLabel(score)}
                      </span>
                      <div className="score-details">
                        <span>{section.count} competências avaliadas</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resumo Estatístico */}
            <div className="general-feedback-card">
              <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 13H5V21H3V13ZM7 9H9V21H7V9ZM11 5H13V21H11V5ZM15 9H17V21H15V9ZM19 13H21V21H19V13Z" fill="currentColor"/>
                </svg>
                Resumo Estatístico
              </h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Total de Competências</span>
                  <span className="stat-value">{itensAvaliacao.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Competências Avaliadas</span>
                  <span className="stat-value">{itensAvaliacao.filter(i => i.nota !== null).length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Nota Média</span>
                  <span className="stat-value">{overallScore.toFixed(2)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Categorias</span>
                  <span className="stat-value">{Object.keys(sections).length}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detalhes' && (
          <div className="tab-pane">
            <h2>Análise Detalhada por Categoria</h2>
            <div className="sections-details">
              {Object.keys(sections).map(categoryName => {
                const section = sections[categoryName];
                const score = parseFloat(section.averageScore);
                
                return (
                  <div key={categoryName} className="section-detail-wrapper">
                    <div className="section-detail-card">
                      <div className="section-detail-header">
                        <div className="section-title-group">
                          <span className="section-detail-icon">{categoryIcons[categoryName] || '⭐'}</span>
                          <div>
                            <h3>{categoryName}</h3>
                            <span className="section-subtitle">{section.count} competências</span>
                          </div>
                        </div>
                        <div className="section-score-badge">
                          <span className="badge-score">{score.toFixed(1)}</span>
                          <span className="badge-label">/5</span>
                        </div>
                      </div>
                      <div className="section-score-circle">
                        <svg viewBox="0 0 80 80" className="mini-circle">
                          <circle cx="40" cy="40" r="35" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                          <circle 
                            cx="40" 
                            cy="40" 
                            r="35" 
                            fill="none" 
                            stroke={`var(--${getScoreColor(score)}-color)`}
                            strokeWidth="8"
                            strokeDasharray={`${(score / 5) * 220} 220`}
                            strokeLinecap="round"
                            transform="rotate(-90 40 40)"
                          />
                        </svg>
                        <span className="mini-score">{score.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="section-feedback">
                      <h4>Feedback</h4>
                      <p>{section.feedback || 'Nenhum feedback disponível para esta categoria.'}</p>
                    </div>

                    <div className="section-lists">
                      <div className="strengths-list">
                        <h4>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 11L2 7L3.4 5.6L6 8.2L12.6 1.6L14 3L6 11Z" fill="#00b894"/>
                          </svg>
                          Pontos Fortes
                        </h4>
                        <ul>
                          {section.strengths && section.strengths.length > 0 ? (
                            section.strengths.map((strength, index) => (
                              <li key={index}>{strength}</li>
                            ))
                          ) : (
                            <li>Nenhum ponto forte identificado.</li>
                          )}
                        </ul>
                      </div>

                      <div className="improvements-list">
                        <h4>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" fill="#fdcb6e"/>
                          </svg>
                          Oportunidades de Melhoria
                        </h4>
                        <ul>
                          {section.improvements && section.improvements.length > 0 ? (
                            section.improvements.map((improvement, index) => (
                              <li key={index}>{improvement}</li>
                            ))
                          ) : (
                            <li>Nenhuma oportunidade de melhoria identificada.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResultadoAvaliacao;
