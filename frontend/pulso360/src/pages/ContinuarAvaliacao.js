import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContinuarAvaliacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});

  // Dados da avaliação (em produção virá do backend)
  const evaluationData = {
    id: id,
    title: 'Autoavaliação Q1 2025',
    type: 'Autoavaliação',
    progress: 68,
    sections: [
      {
        id: 1,
        title: 'Competências Técnicas',
        icon: '💻',
        questions: [
          { id: 1, text: 'Como você avalia seu domínio das tecnologias utilizadas no seu trabalho?', type: 'scale' },
          { id: 2, text: 'Você se mantém atualizado com as novidades da sua área?', type: 'scale' },
          { id: 3, text: 'Descreva suas principais conquistas técnicas neste período:', type: 'text' }
        ]
      },
      {
        id: 2,
        title: 'Trabalho em Equipe',
        icon: '👥',
        questions: [
          { id: 4, text: 'Como você avalia sua capacidade de colaboração com colegas?', type: 'scale' },
          { id: 5, text: 'Você compartilha conhecimento com a equipe regularmente?', type: 'scale' },
          { id: 6, text: 'Cite exemplos de situações onde você auxiliou colegas:', type: 'text' }
        ]
      },
      {
        id: 3,
        title: 'Comunicação',
        icon: '💬',
        questions: [
          { id: 7, text: 'Como você avalia sua comunicação escrita?', type: 'scale' },
          { id: 8, text: 'Como você avalia sua comunicação verbal?', type: 'scale' },
          { id: 9, text: 'Você se sente confortável apresentando ideias para a equipe?', type: 'scale' }
        ]
      },
      {
        id: 4,
        title: 'Gestão de Tempo',
        icon: '⏰',
        questions: [
          { id: 10, text: 'Como você avalia sua capacidade de cumprir prazos?', type: 'scale' },
          { id: 11, text: 'Você consegue priorizar tarefas efetivamente?', type: 'scale' },
          { id: 12, text: 'Descreva como você organiza suas atividades diárias:', type: 'text' }
        ]
      }
    ]
  };

  const currentSectionData = evaluationData.sections[currentSection];
  const totalSections = evaluationData.sections.length;
  const overallProgress = Math.round(((currentSection + 1) / totalSections) * 100);

  const handleResponse = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
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

  const handleSubmit = () => {
    console.log('Avaliação enviada:', responses);
    alert('Avaliação concluída com sucesso!');
    navigate('/avaliacoes');
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
            <h1>{evaluationData.title}</h1>
            <div className="eval-meta-tags">
              <span className="eval-type-tag">{evaluationData.type}</span>
              <span className="eval-section-tag">Seção {currentSection + 1} de {totalSections}</span>
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
        {evaluationData.sections.map((section, index) => (
          <button
            key={section.id}
            className={`section-nav-btn ${currentSection === index ? 'active' : ''} ${
              currentSection > index ? 'completed' : ''
            }`}
            onClick={() => setCurrentSection(index)}
          >
            <span className="section-icon">{section.icon}</span>
            <span className="section-title">{section.title}</span>
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
            <span className="section-icon-large">{currentSectionData.icon}</span>
            {currentSectionData.title}
          </h2>
          <p>Responda as questões abaixo de forma honesta e reflexiva</p>
        </div>

        <div className="questions-list">
          {currentSectionData.questions.map((question, qIndex) => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <span className="question-number">Questão {qIndex + 1}</span>
              </div>
              <p className="question-text">{question.text}</p>

              {question.type === 'scale' ? (
                <div className="scale-input">
                  <div className="scale-labels">
                    <span>Discordo Totalmente</span>
                    <span>Concordo Totalmente</span>
                  </div>
                  <div className="scale-options">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                      <button
                        key={value}
                        className={`scale-btn ${responses[question.id] === value ? 'selected' : ''}`}
                        onClick={() => handleResponse(question.id, value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  {responses[question.id] && (
                    <div className="scale-feedback">
                      Você selecionou: <strong>{responses[question.id]}/10</strong>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-input">
                  <textarea
                    className="question-textarea"
                    placeholder="Digite sua resposta aqui..."
                    rows="5"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponse(question.id, e.target.value)}
                  />
                  <div className="textarea-counter">
                    {(responses[question.id] || '').length} caracteres
                  </div>
                </div>
              )}
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
            {evaluationData.sections.map((_, index) => (
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
