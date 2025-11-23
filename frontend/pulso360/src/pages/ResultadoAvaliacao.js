import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResultadoAvaliacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('visao-geral');

  // Dados do resultado (em produção virá do backend)
  const resultData = {
    id: id,
    title: 'Avaliação de Liderança',
    type: 'Gestor',
    completedDate: '15 Nov 2025',
    evaluator: 'Carlos Oliveira',
    overallScore: 8.5,
    sections: [
      {
        id: 1,
        title: 'Competências Técnicas',
        score: 9.0,
        icon: '💻',
        feedback: 'Excelente domínio técnico. Demonstra conhecimento profundo das tecnologias e ferramentas necessárias.',
        strengths: ['Conhecimento em React', 'Boas práticas de código', 'Arquitetura de software'],
        improvements: ['Aprofundar em testes automatizados']
      },
      {
        id: 2,
        title: 'Trabalho em Equipe',
        score: 8.5,
        icon: '👥',
        feedback: 'Ótima colaboração com o time. Sempre disposto a ajudar e compartilhar conhecimento.',
        strengths: ['Comunicação clara', 'Mentoria de júniores', 'Participação ativa'],
        improvements: ['Liderar mais iniciativas de equipe']
      },
      {
        id: 3,
        title: 'Comunicação',
        score: 8.0,
        icon: '💬',
        feedback: 'Comunicação efetiva tanto escrita quanto verbal. Apresentações claras e objetivas.',
        strengths: ['Documentação de código', 'Apresentações técnicas'],
        improvements: ['Melhorar comunicação com stakeholders não-técnicos']
      },
      {
        id: 4,
        title: 'Gestão de Tempo',
        score: 8.5,
        icon: '⏰',
        feedback: 'Excelente gerenciamento de prazos e prioridades. Consegue equilibrar múltiplas demandas.',
        strengths: ['Cumprimento de prazos', 'Priorização eficaz'],
        improvements: ['Delegar mais tarefas quando apropriado']
      }
    ],
    generalFeedback: 'Profissional exemplar com excelente desempenho em todas as áreas avaliadas. Demonstra maturidade técnica e interpessoal. Recomendo para posições de liderança técnica.',
    actionPlan: [
      'Participar de curso avançado de testes automatizados',
      'Liderar projeto de arquitetura do próximo trimestre',
      'Apresentar tech talk sobre boas práticas de React',
      'Mentoria formal de 2 desenvolvedores júnior'
    ],
    nextSteps: 'Revisar este feedback com seu gestor em reunião 1:1 e definir metas específicas para o próximo ciclo de avaliação.'
  };

  const getScoreColor = (score) => {
    if (score >= 9) return 'excellent';
    if (score >= 8) return 'good';
    if (score >= 7) return 'average';
    return 'needs-improvement';
  };

  const getScoreLabel = (score) => {
    if (score >= 9) return 'Excelente';
    if (score >= 8) return 'Muito Bom';
    if (score >= 7) return 'Bom';
    if (score >= 6) return 'Satisfatório';
    return 'Precisa Melhorar';
  };

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
              <h1>{resultData.title}</h1>
              <div className="result-meta">
                <span className="meta-tag type">{resultData.type}</span>
                <span className="meta-tag date">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 2H11V0H9V2H5V0H3V2H2C0.89 2 0 2.9 0 4V12C0 13.1 0.89 14 2 14H12C13.1 14 14 13.1 14 12V4C14 2.9 13.1 2 12 2ZM12 12H2V6H12V12Z" fill="currentColor"/>
                  </svg>
                  {resultData.completedDate}
                </span>
                <span className="meta-tag evaluator">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 7C8.66 7 10 5.66 10 4C10 2.34 8.66 1 7 1C5.34 1 4 2.34 4 4C4 5.66 5.34 7 7 7ZM7 8.5C4.67 8.5 0 9.67 0 12V13.5H14V12C14 9.67 9.33 8.5 7 8.5Z" fill="currentColor"/>
                  </svg>
                  {resultData.evaluator}
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
                    strokeDasharray={`${(resultData.overallScore / 10) * 314} 314`}
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
                  <span className="score-number">{resultData.overallScore}</span>
                  <span className="score-label">de 10</span>
                </div>
              </div>
              <div className="score-info">
                <span className="score-title">Nota Geral</span>
                <span className={`score-status ${getScoreColor(resultData.overallScore)}`}>
                  {getScoreLabel(resultData.overallScore)}
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
        <button
          className={`result-tab ${activeTab === 'plano' ? 'active' : ''}`}
          onClick={() => setActiveTab('plano')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16 2L6 12L2 8L0.5 9.5L6 15L17.5 3.5L16 2Z" fill="currentColor"/>
          </svg>
          Plano de Ação
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="result-content">
        {activeTab === 'visao-geral' && (
          <div className="tab-pane">
            {/* Scores por Seção */}
            <div className="sections-scores">
              <h2>Desempenho por Competência</h2>
              <div className="scores-grid">
                {resultData.sections.map(section => (
                  <div key={section.id} className={`score-card ${getScoreColor(section.score)}`}>
                    <div className="score-card-header">
                      <span className="score-icon">{section.icon}</span>
                      <span className="score-value">{section.score}</span>
                    </div>
                    <h3>{section.title}</h3>
                    <div className="score-bar-container">
                      <div 
                        className={`score-bar ${getScoreColor(section.score)}`}
                        style={{width: `${(section.score / 10) * 100}%`}}
                      ></div>
                    </div>
                    <span className={`score-label ${getScoreColor(section.score)}`}>
                      {getScoreLabel(section.score)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Geral */}
            <div className="general-feedback-card">
              <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
                </svg>
                Feedback Geral do Avaliador
              </h2>
              <p className="feedback-text">{resultData.generalFeedback}</p>
            </div>
          </div>
        )}

        {activeTab === 'detalhes' && (
          <div className="tab-pane">
            <h2>Análise Detalhada por Seção</h2>
            <div className="sections-details">
              {resultData.sections.map(section => (
                <div key={section.id} className="section-detail-card">
                  <div className="section-detail-header">
                    <div className="section-title-group">
                      <span className="section-icon-detail">{section.icon}</span>
                      <div>
                        <h3>{section.title}</h3>
                        <span className={`section-score ${getScoreColor(section.score)}`}>
                          {section.score}/10 - {getScoreLabel(section.score)}
                        </span>
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
                          stroke={`var(--${getScoreColor(section.score)}-color)`}
                          strokeWidth="8"
                          strokeDasharray={`${(section.score / 10) * 220} 220`}
                          strokeLinecap="round"
                          transform="rotate(-90 40 40)"
                        />
                      </svg>
                      <span className="mini-score">{section.score}</span>
                    </div>
                  </div>

                  <div className="section-feedback">
                    <h4>Feedback</h4>
                    <p>{section.feedback}</p>
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
                        {section.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
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
                        {section.improvements.map((improvement, index) => (
                          <li key={index}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'plano' && (
          <div className="tab-pane">
            <div className="action-plan-section">
              <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2L6 10L2 6L0.5 7.5L6 13L15.5 3.5L14 2Z" fill="currentColor"/>
                </svg>
                Plano de Desenvolvimento
              </h2>
              <p className="plan-intro">Ações recomendadas para o seu desenvolvimento profissional:</p>

              <div className="action-items">
                {resultData.actionPlan.map((action, index) => (
                  <div key={index} className="action-item">
                    <div className="action-number">{index + 1}</div>
                    <div className="action-content">
                      <p>{action}</p>
                      <div className="action-meta">
                        <span className="action-tag">Recomendado</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="next-steps-card">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="currentColor"/>
                  </svg>
                  Próximos Passos
                </h3>
                <p>{resultData.nextSteps}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultadoAvaliacao;
