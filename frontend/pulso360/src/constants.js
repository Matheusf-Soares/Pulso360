// Constantes compartilhadas para o projeto

export const dataSources = [
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

export const availableFields = {
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

export const visualizationTypes = [
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