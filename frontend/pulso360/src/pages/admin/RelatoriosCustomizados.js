import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RelatoriosCustomizados() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState({
    periodo: "30",
    dataInicio: "",
    dataFim: "",
    departamento: "todos",
    status: "todos",
    usuario: ""
  });
  const [visualizationType, setVisualizationType] = useState("tabela");
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  // Fontes de dados disponíveis
  const dataSources = [
    { 
      id: "usuarios", 
      nome: "Usuários", 
      icon: "👥", 
      color: "#667eea",
      descricao: "Dados de colaboradores e perfis",
      campos: 12,
      registros: 845
    },
    { 
      id: "avaliacoes", 
      nome: "Avaliações de Desempenho", 
      icon: "⭐", 
      color: "#00b894",
      descricao: "Resultados e ciclos de avaliação",
      campos: 18,
      registros: 1230
    },
    { 
      id: "pdis", 
      nome: "PDIs", 
      icon: "🎯", 
      color: "#fdcb6e",
      descricao: "Planos de desenvolvimento individual",
      campos: 15,
      registros: 456
    },
    { 
      id: "equipes", 
      nome: "Equipes", 
      icon: "🏢", 
      color: "#0984e3",
      descricao: "Estrutura organizacional e times",
      campos: 10,
      registros: 78
    },
    { 
      id: "metas", 
      nome: "Metas e Objetivos", 
      icon: "🎪", 
      color: "#6c5ce7",
      descricao: "OKRs e metas individuais/coletivas",
      campos: 14,
      registros: 567
    },
    { 
      id: "feedbacks", 
      nome: "Feedbacks", 
      icon: "💬", 
      color: "#e17055",
      descricao: "Feedbacks dados e recebidos",
      campos: 9,
      registros: 2345
    },
    { 
      id: "competencias", 
      nome: "Competências", 
      icon: "💡", 
      color: "#00b894",
      descricao: "Competências e habilidades",
      campos: 11,
      registros: 234
    },
    { 
      id: "treinamentos", 
      nome: "Treinamentos", 
      icon: "📚", 
      color: "#d63031",
      descricao: "Cursos e capacitações realizadas",
      campos: 13,
      registros: 789
    },
  ];

  // Campos disponíveis por fonte de dados
  const availableFields = {
    usuarios: [
      { id: "nome", label: "Nome", type: "texto" },
      { id: "email", label: "Email", type: "texto" },
      { id: "departamento", label: "Departamento", type: "categoria" },
      { id: "cargo", label: "Cargo", type: "categoria" },
      { id: "data_admissao", label: "Data de Admissão", type: "data" },
      { id: "status", label: "Status", type: "categoria" },
    ],
    avaliacoes: [
      { id: "ciclo", label: "Ciclo de Avaliação", type: "categoria" },
      { id: "nota_final", label: "Nota Final", type: "numero" },
      { id: "avaliador", label: "Avaliador", type: "texto" },
      { id: "data_avaliacao", label: "Data da Avaliação", type: "data" },
      { id: "status_ciclo", label: "Status do Ciclo", type: "categoria" },
    ],
    pdis: [
      { id: "titulo", label: "Título do PDI", type: "texto" },
      { id: "area_desenvolvimento", label: "Área de Desenvolvimento", type: "categoria" },
      { id: "progresso", label: "Progresso (%)", type: "numero" },
      { id: "prazo", label: "Prazo", type: "data" },
      { id: "status_pdi", label: "Status", type: "categoria" },
    ],
    equipes: [
      { id: "nome_equipe", label: "Nome da Equipe", type: "texto" },
      { id: "lider", label: "Líder", type: "texto" },
      { id: "num_membros", label: "Número de Membros", type: "numero" },
      { id: "departamento_equipe", label: "Departamento", type: "categoria" },
    ],
    metas: [
      { id: "titulo_meta", label: "Título da Meta", type: "texto" },
      { id: "tipo_meta", label: "Tipo de Meta", type: "categoria" },
      { id: "progresso_meta", label: "Progresso (%)", type: "numero" },
      { id: "prazo_meta", label: "Prazo", type: "data" },
      { id: "responsavel", label: "Responsável", type: "texto" },
    ],
    feedbacks: [
      { id: "tipo_feedback", label: "Tipo de Feedback", type: "categoria" },
      { id: "remetente", label: "Remetente", type: "texto" },
      { id: "destinatario", label: "Destinatário", type: "texto" },
      { id: "data_feedback", label: "Data", type: "data" },
    ],
  };

  // Tipos de visualização
  const visualizationTypes = [
    { 
      id: "tabela", 
      nome: "Tabela", 
      icon: "📊", 
      descricao: "Dados em formato tabular",
      preview: "grid"
    },
    { 
      id: "barras", 
      nome: "Gráfico de Barras", 
      icon: "📊", 
      descricao: "Comparação entre categorias",
      preview: "bars"
    },
    { 
      id: "linhas", 
      nome: "Gráfico de Linhas", 
      icon: "📈", 
      descricao: "Tendências ao longo do tempo",
      preview: "lines"
    },
    { 
      id: "pizza", 
      nome: "Gráfico de Pizza", 
      icon: "🥧", 
      descricao: "Proporções e percentuais",
      preview: "pie"
    },
    { 
      id: "area", 
      nome: "Gráfico de Área", 
      icon: "📉", 
      descricao: "Volume ao longo do tempo",
      preview: "area"
    },
    { 
      id: "scatter", 
      nome: "Gráfico de Dispersão", 
      icon: "🔵", 
      descricao: "Correlação entre variáveis",
      preview: "scatter"
    },
  ];

  // Relatórios salvos
  const savedReports = [
    {
      id: 1,
      nome: "Avaliações Q1 2025",
      descricao: "Consolidado de avaliações do primeiro trimestre",
      fontes: ["avaliacoes", "usuarios"],
      criadoEm: "15/01/2025",
      ultimaExecucao: "2 horas atrás",
      executacoes: 12,
      tipo: "tabela"
    },
    {
      id: 2,
      nome: "PDIs por Departamento",
      descricao: "Análise de PDIs distribuídos por área",
      fontes: ["pdis", "equipes"],
      criadoEm: "10/01/2025",
      ultimaExecucao: "1 dia atrás",
      executacoes: 8,
      tipo: "barras"
    },
    {
      id: 3,
      nome: "Evolução de Metas",
      descricao: "Progresso de metas nos últimos 6 meses",
      fontes: ["metas"],
      criadoEm: "05/01/2025",
      ultimaExecucao: "3 dias atrás",
      executacoes: 15,
      tipo: "linhas"
    },
  ];

  const toggleSource = (sourceId) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const toggleField = (fieldId) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const getAvailableFieldsForSelectedSources = () => {
    let fields = [];
    selectedSources.forEach(sourceId => {
      if (availableFields[sourceId]) {
        fields = [...fields, ...availableFields[sourceId]];
      }
    });
    return fields;
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateReport = () => {
    console.log("Gerando relatório...", {
      nome: reportName,
      descricao: reportDescription,
      fontes: selectedSources,
      campos: selectedFields,
      filtros: filters,
      visualizacao: visualizationType
    });
    alert("Relatório gerado com sucesso!");
  };

  const steps = [
    { number: 1, label: "Fontes de Dados", icon: "📊" },
    { number: 2, label: "Campos", icon: "📝" },
    { number: 3, label: "Filtros", icon: "🔍" },
    { number: 4, label: "Visualização", icon: "📈" },
    { number: 5, label: "Exportar", icon: "💾" },
  ];

  return (
    <div className="admin-page-reports-custom">
      <div className="page-header-admin">
        <button className="back-button" onClick={() => navigate("/administracao")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar
        </button>
        
        <div className="header-content">
          <div className="header-icon-circle" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Relatórios Customizados</h1>
            <p>Crie relatórios personalizados com dados do sistema</p>
          </div>
        </div>

        <button className="btn-saved-reports">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Relatórios Salvos ({savedReports.length})
        </button>
      </div>

      {/* Progress Steps */}
      <div className="wizard-steps-container">
        <div className="wizard-steps">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div 
                className={`wizard-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
                onClick={() => setCurrentStep(step.number)}
              >
                <div className="step-circle">
                  {currentStep > step.number ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <div className="step-info">
                  <div className="step-label">{step.label}</div>
                  <div className="step-number-label">Passo {step.number}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${currentStep > step.number ? 'active' : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="wizard-content-card">
        {/* Step 1: Data Sources */}
        {currentStep === 1 && (
          <div className="step-content">
            <div className="step-header">
              <h2>📊 Selecione as Fontes de Dados</h2>
              <p>Escolha quais tabelas e entidades você deseja incluir no relatório</p>
            </div>

            <div className="data-sources-grid">
              {dataSources.map((source) => (
                <div 
                  key={source.id}
                  className={`data-source-card ${selectedSources.includes(source.id) ? 'selected' : ''}`}
                  onClick={() => toggleSource(source.id)}
                >
                  <div className="source-checkbox">
                    {selectedSources.includes(source.id) && (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="source-icon" style={{ background: `${source.color}15`, color: source.color }}>
                    {source.icon}
                  </div>
                  <div className="source-info">
                    <h3>{source.nome}</h3>
                    <p>{source.descricao}</p>
                    <div className="source-stats">
                      <span className="stat-item">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M3 3H17V7H3V3ZM3 9H17V13H3V9ZM3 15H17V19H3V15Z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        {source.campos} campos
                      </span>
                      <span className="stat-item">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M9 2C10.1 2 11 2.9 11 4V6H9V4C9 2.9 9.9 2 11 2ZM7 4V6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H15C16.1 18 17 17.1 17 16V8C17 6.9 16.1 6 15 6H13V4C13 2.9 13.9 2 15 2C16.1 2 17 2.9 17 4V6H19V4C19 1.8 17.2 0 15 0H11C8.8 0 7 1.8 7 4Z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        {source.registros.toLocaleString()} registros
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-summary">
              <strong>{selectedSources.length}</strong> fonte(s) selecionada(s)
            </div>
          </div>
        )}

        {/* Step 2: Fields Selection */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="step-header">
              <h2>📝 Selecione os Campos</h2>
              <p>Escolha quais informações você deseja exibir no relatório</p>
            </div>

            {selectedSources.length === 0 ? (
              <div className="empty-state-wizard">
                <div className="empty-icon">⚠️</div>
                <h3>Nenhuma fonte de dados selecionada</h3>
                <p>Volte ao passo anterior e selecione ao menos uma fonte de dados</p>
                <button className="btn-secondary-wizard" onClick={() => setCurrentStep(1)}>
                  Voltar para Fontes de Dados
                </button>
              </div>
            ) : (
              <div className="fields-container">
                {selectedSources.map(sourceId => {
                  const source = dataSources.find(s => s.id === sourceId);
                  const fields = availableFields[sourceId] || [];
                  
                  return (
                    <div key={sourceId} className="fields-group">
                      <div className="group-header">
                        <span className="group-icon" style={{ color: source.color }}>
                          {source.icon}
                        </span>
                        <h3>{source.nome}</h3>
                        <span className="fields-count">{fields.length} campos disponíveis</span>
                      </div>
                      
                      <div className="fields-list">
                        {fields.map(field => (
                          <label key={field.id} className="field-checkbox-item">
                            <input
                              type="checkbox"
                              checked={selectedFields.includes(field.id)}
                              onChange={() => toggleField(field.id)}
                            />
                            <div className="field-info">
                              <span className="field-label">{field.label}</span>
                              <span className="field-type">{field.type}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="step-summary">
              <strong>{selectedFields.length}</strong> campo(s) selecionado(s)
            </div>
          </div>
        )}

        {/* Step 3: Filters */}
        {currentStep === 3 && (
          <div className="step-content">
            <div className="step-header">
              <h2>🔍 Configure os Filtros</h2>
              <p>Defina critérios para filtrar os dados do relatório</p>
            </div>

            <div className="filters-form">
              <div className="filter-section">
                <h3>⏰ Período de Tempo</h3>
                <div className="filter-row">
                  <div className="form-group-wizard">
                    <label>Período Predefinido</label>
                    <select 
                      value={filters.periodo}
                      onChange={(e) => setFilters({...filters, periodo: e.target.value})}
                    >
                      <option value="7">Últimos 7 dias</option>
                      <option value="30">Últimos 30 dias</option>
                      <option value="90">Últimos 90 dias</option>
                      <option value="365">Último ano</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>

                  {filters.periodo === "custom" && (
                    <>
                      <div className="form-group-wizard">
                        <label>Data Início</label>
                        <input 
                          type="date"
                          value={filters.dataInicio}
                          onChange={(e) => setFilters({...filters, dataInicio: e.target.value})}
                        />
                      </div>
                      <div className="form-group-wizard">
                        <label>Data Fim</label>
                        <input 
                          type="date"
                          value={filters.dataFim}
                          onChange={(e) => setFilters({...filters, dataFim: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="filter-section">
                <h3>🏢 Organização</h3>
                <div className="filter-row">
                  <div className="form-group-wizard">
                    <label>Departamento</label>
                    <select
                      value={filters.departamento}
                      onChange={(e) => setFilters({...filters, departamento: e.target.value})}
                    >
                      <option value="todos">Todos os Departamentos</option>
                      <option value="rh">Recursos Humanos</option>
                      <option value="ti">Tecnologia da Informação</option>
                      <option value="comercial">Comercial</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="operacoes">Operações</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>

                  <div className="form-group-wizard">
                    <label>Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="todos">Todos os Status</option>
                      <option value="ativo">Ativo</option>
                      <option value="concluido">Concluído</option>
                      <option value="em_andamento">Em Andamento</option>
                      <option value="pendente">Pendente</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <h3>👤 Usuários</h3>
                <div className="filter-row">
                  <div className="form-group-wizard full-width">
                    <label>Filtrar por Usuário Específico</label>
                    <input
                      type="text"
                      placeholder="Digite o nome ou email do usuário..."
                      value={filters.usuario}
                      onChange={(e) => setFilters({...filters, usuario: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="filter-preview">
                <h4>📋 Resumo dos Filtros Aplicados:</h4>
                <ul>
                  <li><strong>Período:</strong> {filters.periodo === "custom" ? `${filters.dataInicio} até ${filters.dataFim}` : `Últimos ${filters.periodo} dias`}</li>
                  <li><strong>Departamento:</strong> {filters.departamento === "todos" ? "Todos" : filters.departamento}</li>
                  <li><strong>Status:</strong> {filters.status === "todos" ? "Todos" : filters.status}</li>
                  {filters.usuario && <li><strong>Usuário:</strong> {filters.usuario}</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Visualization */}
        {currentStep === 4 && (
          <div className="step-content">
            <div className="step-header">
              <h2>📈 Escolha a Visualização</h2>
              <p>Selecione como os dados serão apresentados no relatório</p>
            </div>

            <div className="visualization-grid">
              {visualizationTypes.map((viz) => (
                <div
                  key={viz.id}
                  className={`visualization-card ${visualizationType === viz.id ? 'selected' : ''}`}
                  onClick={() => setVisualizationType(viz.id)}
                >
                  <div className="viz-radio">
                    {visualizationType === viz.id && (
                      <div className="radio-dot"></div>
                    )}
                  </div>
                  <div className="viz-icon">{viz.icon}</div>
                  <h3>{viz.nome}</h3>
                  <p>{viz.descricao}</p>
                  <div className={`viz-preview ${viz.preview}`}>
                    {/* Visual preview based on type */}
                    {viz.preview === "grid" && (
                      <div className="preview-grid">
                        {[...Array(12)].map((_, i) => <div key={i} className="grid-cell"></div>)}
                      </div>
                    )}
                    {viz.preview === "bars" && (
                      <div className="preview-bars">
                        {[60, 85, 45, 70].map((h, i) => <div key={i} style={{height: `${h}%`}}></div>)}
                      </div>
                    )}
                    {viz.preview === "lines" && (
                      <div className="preview-lines">
                        <svg viewBox="0 0 100 50" className="line-chart">
                          <polyline points="0,40 25,25 50,30 75,10 100,20" />
                        </svg>
                      </div>
                    )}
                    {viz.preview === "pie" && (
                      <div className="preview-pie">
                        <div className="pie-chart"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Export */}
        {currentStep === 5 && (
          <div className="step-content">
            <div className="step-header">
              <h2>💾 Configurações de Exportação</h2>
              <p>Defina nome, descrição e formato de exportação do relatório</p>
            </div>

            <div className="export-configuration">
              <div className="config-section">
                <h3>ℹ️ Informações do Relatório</h3>
                <div className="form-group-wizard">
                  <label>Nome do Relatório *</label>
                  <input
                    type="text"
                    placeholder="Ex: Avaliações do 1º Trimestre 2025"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                <div className="form-group-wizard">
                  <label>Descrição</label>
                  <textarea
                    rows="3"
                    placeholder="Descreva o objetivo e conteúdo deste relatório..."
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="config-section">
                <h3>📄 Formatos de Exportação</h3>
                <div className="export-formats">
                  <button className="export-format-btn">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="#d63031" strokeWidth="2" fill="#d6303115"/>
                      <text x="12" y="15" fontSize="8" fontWeight="bold" fill="#d63031" textAnchor="middle">PDF</text>
                    </svg>
                    <span>Exportar PDF</span>
                    <small>Formato ideal para impressão</small>
                  </button>

                  <button className="export-format-btn">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="#00b894" strokeWidth="2" fill="#00b89415"/>
                      <text x="12" y="15" fontSize="7" fontWeight="bold" fill="#00b894" textAnchor="middle">XLS</text>
                    </svg>
                    <span>Exportar Excel</span>
                    <small>Planilha com fórmulas e gráficos</small>
                  </button>

                  <button className="export-format-btn">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="#0984e3" strokeWidth="2" fill="#0984e315"/>
                      <text x="12" y="15" fontSize="7" fontWeight="bold" fill="#0984e3" textAnchor="middle">CSV</text>
                    </svg>
                    <span>Exportar CSV</span>
                    <small>Dados brutos separados por vírgula</small>
                  </button>

                  <button className="export-format-btn">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="#fdcb6e" strokeWidth="2" fill="#fdcb6e15"/>
                      <text x="12" y="15" fontSize="6" fontWeight="bold" fill="#fdcb6e" textAnchor="middle">JSON</text>
                    </svg>
                    <span>Exportar JSON</span>
                    <small>Formato para integração com APIs</small>
                  </button>
                </div>
              </div>

              <div className="config-section">
                <h3>📊 Resumo da Configuração</h3>
                <div className="summary-card">
                  <div className="summary-item">
                    <span className="summary-label">Fontes de Dados:</span>
                    <span className="summary-value">{selectedSources.length} selecionada(s)</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Campos:</span>
                    <span className="summary-value">{selectedFields.length} campo(s)</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Visualização:</span>
                    <span className="summary-value">
                      {visualizationTypes.find(v => v.id === visualizationType)?.nome}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Período:</span>
                    <span className="summary-value">Últimos {filters.periodo} dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="wizard-navigation">
          <button 
            className="btn-nav-wizard secondary"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </button>

          {currentStep < 5 ? (
            <button 
              className="btn-nav-wizard primary"
              onClick={handleNextStep}
              disabled={currentStep === 1 && selectedSources.length === 0}
            >
              Próximo
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button 
              className="btn-nav-wizard success"
              onClick={handleGenerateReport}
              disabled={!reportName}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Gerar Relatório
            </button>
          )}
        </div>
      </div>

      {/* Saved Reports Section */}
      <div className="saved-reports-section">
        <h2>📚 Relatórios Salvos</h2>
        <div className="saved-reports-grid">
          {savedReports.map((report) => (
            <div key={report.id} className="saved-report-card">
              <div className="report-card-header">
                <h3>{report.nome}</h3>
                <span className="report-type-badge">
                  {visualizationTypes.find(v => v.id === report.tipo)?.icon}
                </span>
              </div>
              <p className="report-description">{report.descricao}</p>
              <div className="report-meta">
                <span className="meta-item">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 5V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {report.ultimaExecucao}
                </span>
                <span className="meta-item">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4H16V16H4V4Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {report.executacoes} execuções
                </span>
              </div>
              <div className="report-card-actions">
                <button className="btn-report-action primary">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V10M10 10V16M10 10H16M10 10H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Executar
                </button>
                <button className="btn-report-action secondary">Editar</button>
                <button className="btn-report-action danger">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
