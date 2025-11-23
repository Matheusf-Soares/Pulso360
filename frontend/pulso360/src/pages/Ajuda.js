import React, { useState } from "react";

export default function Ajuda() {
  const [activeCategory, setActiveCategory] = useState("geral");
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = {
    geral: {
      title: "Perguntas Gerais",
      icon: "❓",
      items: [
        {
          question: "Como posso completar minha avaliação?",
          answer: "Para completar sua avaliação, acesse a seção 'Minhas avaliações' no menu lateral, clique na avaliação em andamento e siga as instruções na tela. Certifique-se de preencher todos os campos obrigatórios antes de finalizar."
        },
        {
          question: "Como faço para alterar minha senha?",
          answer: "Você pode alterar sua senha clicando no seu avatar no canto superior direito, selecionando 'Configurações' e depois 'Segurança'. Digite sua senha atual e a nova senha duas vezes para confirmar."
        },
        {
          question: "O sistema funciona em dispositivos móveis?",
          answer: "Sim! O Pulso360 é totalmente responsivo e funciona perfeitamente em smartphones e tablets. Você pode acessar todas as funcionalidades através do navegador do seu dispositivo móvel."
        }
      ]
    },
    pdi: {
      title: "PDI (Plano de Desenvolvimento)",
      icon: "🎯",
      items: [
        {
          question: "Como atualizo meu PDI?",
          answer: "Vá para a seção 'Meu PDI', selecione a competência que deseja atualizar e clique em 'Atualizar Progresso'. Você pode adicionar comentários sobre seu desenvolvimento e anexar evidências do seu progresso."
        },
        {
          question: "Posso adicionar metas personalizadas ao meu PDI?",
          answer: "Sim! Você pode adicionar metas personalizadas clicando em 'Adicionar Nova Meta' na página do PDI. Defina a competência, prazo e critérios de sucesso para suas metas pessoais."
        },
        {
          question: "Como meu gestor acompanha meu PDI?",
          answer: "Seu gestor tem acesso ao seu PDI e recebe notificações sobre atualizações. Ele pode deixar comentários e sugestões para apoiar seu desenvolvimento profissional."
        }
      ]
    },
    relatorios: {
      title: "Relatórios",
      icon: "📊",
      items: [
        {
          question: "Como posso gerar relatórios?",
          answer: "Na seção 'Relatórios', escolha o tipo de relatório desejado, selecione o período e clique em 'Gerar Novo Relatório'. Os relatórios ficam disponíveis para download em até 5 minutos."
        },
        {
          question: "Posso agendar relatórios automáticos?",
          answer: "Sim! Você pode agendar relatórios para serem gerados automaticamente em intervalos regulares. Configure isso na seção 'Relatórios Agendados'."
        },
        {
          question: "Quais formatos de exportação estão disponíveis?",
          answer: "Oferecemos exportação em PDF, Excel, CSV e PowerPoint, dependendo do tipo de relatório. Relatórios executivos são gerados em PDF, enquanto dados detalhados podem ser exportados em Excel."
        }
      ]
    },
    equipe: {
      title: "Gestão de Equipe",
      icon: "👥",
      items: [
        {
          question: "Como acompanho o desempenho da minha equipe?",
          answer: "Na seção 'Minha Equipe', você encontra dashboards com métricas de performance, progresso de metas e status de avaliações de cada membro da sua equipe."
        },
        {
          question: "Como agendar reuniões de 1:1?",
          answer: "Na página da equipe, clique no botão '1:1' ao lado do nome do colaborador. Isso abrirá a agenda integrada onde você pode escolher horários disponíveis."
        },
        {
          question: "Posso comparar o desempenho entre membros da equipe?",
          answer: "Sim! Temos relatórios comparativos que mostram métricas de performance respeitando a privacidade individual. Os dados são apresentados de forma agregada e anônima quando necessário."
        }
      ]
    }
  };

  const tutorials = [
    {
      title: "Primeiros Passos no Sistema",
      description: "Aprenda a navegar e usar as principais funcionalidades",
      duration: "5 min",
      icon: "🚀",
      difficulty: "Iniciante"
    },
    {
      title: "Completando sua Primeira Avaliação",
      description: "Guia passo a passo para realizar avaliações",
      duration: "10 min",
      icon: "📝",
      difficulty: "Iniciante"
    },
    {
      title: "Gerenciando seu PDI",
      description: "Como criar e acompanhar seu plano de desenvolvimento",
      duration: "8 min",
      icon: "📈",
      difficulty: "Intermediário"
    },
    {
      title: "Utilizando Relatórios Avançados",
      description: "Criando relatórios personalizados e interpretando dados",
      duration: "15 min",
      icon: "📊",
      difficulty: "Avançado"
    }
  ];

  const contactOptions = [
    {
      title: "Chat ao Vivo",
      description: "Suporte instantâneo durante horário comercial",
      icon: "💬",
      action: "Iniciar Chat",
      available: true,
      hours: "8h às 18h"
    },
    {
      title: "E-mail",
      description: "Envie sua dúvida e retornamos em até 24h",
      icon: "📧",
      contact: "suporte@pulso360.com",
      action: "Enviar E-mail"
    },
    {
      title: "Telefone",
      description: "Suporte por telefone em horário comercial",
      icon: "📞",
      contact: "(11) 3000-4000",
      action: "Ligar Agora",
      hours: "8h às 18h"
    },
    {
      title: "Central de Ajuda",
      description: "Documentação completa e artigos detalhados",
      icon: "📚",
      action: "Acessar Central",
      external: true
    }
  ];

  const systemStatus = {
    overall: "operational",
    services: [
      { name: "Plataforma Principal", status: "operational", uptime: "99.9%" },
      { name: "Sistema de Relatórios", status: "operational", uptime: "99.8%" },
      { name: "Notificações", status: "operational", uptime: "100%" },
      { name: "Backup Automático", status: "operational", uptime: "99.9%" },
    ],
    lastUpdate: "Há 2 minutos"
  };

  const filteredFAQs = faqCategories[activeCategory].items.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "operational": return "success";
      case "degraded": return "warning";
      case "outage": return "error";
      default: return "muted";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Iniciante": return "success";
      case "Intermediário": return "warning";
      case "Avançado": return "error";
      default: return "info";
    }
  };

  return (
    <div>
      {/* Header Profissional Moderno */}
      <div className="help-header-modern">
        <div className="header-content-wrapper-help">
          <div className="header-left-section-help">
            <div className="header-icon-wrapper-help">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="white"/>
              </svg>
            </div>
            <div className="header-text-section-help">
              <h1>Central de Ajuda</h1>
              <p>Encontre respostas rápidas, tutoriais detalhados e entre em contato com nosso suporte especializado</p>
            </div>
          </div>
          
          <div className="header-right-section-help">
            <div className="help-quick-stats">
              <div className="quick-stat-help">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
                </svg>
                <span>45 Artigos</span>
              </div>
              <div className="quick-stat-help">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 4H16V0H14V4H6V0H4V4H2C0.89 4 0 4.9 0 6V18C0 19.1 0.89 20 2 20H18C19.1 20 20 19.1 20 18V6C20 4.9 19.1 4 18 4ZM18 18H2V9H18V18Z" fill="currentColor"/>
                </svg>
                <span>Suporte 24/7</span>
              </div>
            </div>
            <button className="btn-header-help-primary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M16 2H2C0.9 2 0.01 2.9 0.01 4L0 18L4 14H16C17.1 14 18 13.1 18 12V4C18 2.9 17.1 2 16 2ZM14 10H4V8H14V10ZM14 7H4V5H14V7Z" fill="currentColor"/>
              </svg>
              Contatar Suporte
            </button>
          </div>
        </div>
      </div>

      <div className="help-container">
        {/* Search Bar */}
        <div className="help-search">
          <div className="search-wrapper">
            <span className="search-icon">�</span>
            <input
              type="text"
              placeholder="Buscar por palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="help-layout">
          {/* FAQ Section */}
          <div className="help-main">
            <section className="help-section">
              <h2>Perguntas Frequentes</h2>
              
              <div className="faq-categories">
                {Object.keys(faqCategories).map((key) => (
                  <button
                    key={key}
                    className={`category-btn ${activeCategory === key ? 'active' : ''}`}
                    onClick={() => setActiveCategory(key)}
                  >
                    <span className="category-icon">{faqCategories[key].icon}</span>
                    <span className="category-title">{faqCategories[key].title}</span>
                  </button>
                ))}
              </div>

              <div className="faq-content">
                {filteredFAQs.length > 0 ? (
                  <div className="faq-list">
                    {filteredFAQs.map((item, index) => (
                      <div key={index} className="faq-item">
                        <h4 className="faq-question">{item.question}</h4>
                        <p className="faq-answer">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Tente buscar com outras palavras-chave ou navegue pelas categorias.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="help-section">
              <h2>Tutoriais em Vídeo</h2>
              <div className="tutorials-grid">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="tutorial-card">
                    <div className="tutorial-header">
                      <div className="tutorial-icon">{tutorial.icon}</div>
                      <div className="tutorial-meta">
                        <span className={`difficulty-badge ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </span>
                        <span className="duration">{tutorial.duration}</span>
                      </div>
                    </div>
                    <h3 className="tutorial-title">{tutorial.title}</h3>
                    <p className="tutorial-description">{tutorial.description}</p>
                    <button 
                      className="btn-primary"
                      onClick={() => window.showNotification && window.showNotification("Abrindo tutorial...", "info")}
                    >
                      Assistir
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="help-sidebar">
            {/* Contact Options */}
            <div className="help-widget">
              <h3>Entre em Contato</h3>
              <div className="contact-grid">
                {contactOptions.map((option, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-header">
                      <div className="contact-icon">{option.icon}</div>
                      {option.available && (
                        <span className="availability-dot"></span>
                      )}
                    </div>
                    <h4>{option.title}</h4>
                    <p>{option.description}</p>
                    {option.contact && (
                      <div className="contact-info">{option.contact}</div>
                    )}
                    {option.hours && (
                      <div className="contact-hours">{option.hours}</div>
                    )}
                    <button 
                      className="btn-outline full-width"
                      onClick={() => window.showNotification && window.showNotification(`${option.action} acionado!`, "success")}
                    >
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="help-widget">
              <h3>Status do Sistema</h3>
              <div className="system-status">
                <div className="overall-status">
                  <div className={`status-indicator ${getStatusColor(systemStatus.overall)}`}></div>
                  <div>
                    <div className="status-title">Todos os sistemas operacionais</div>
                    <div className="status-subtitle">Atualizado {systemStatus.lastUpdate}</div>
                  </div>
                </div>
                
                <div className="services-status">
                  {systemStatus.services.map((service, index) => (
                    <div key={index} className="service-item">
                      <div className="service-info">
                        <span className="service-name">{service.name}</span>
                        <span className="service-uptime">{service.uptime}</span>
                      </div>
                      <div className={`status-dot ${getStatusColor(service.status)}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="help-widget">
              <h3>Ações Rápidas</h3>
              <div className="quick-actions">
                <button 
                  className="quick-action-btn"
                  onClick={() => window.showNotification && window.showNotification("Download iniciado!", "success")}
                >
                  <span className="action-icon">📥</span>
                  <span className="action-text">Baixar Manual Completo</span>
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => window.showNotification && window.showNotification("Agendamento aberto!", "info")}
                >
                  <span className="action-icon">📅</span>
                  <span className="action-text">Agendar Treinamento</span>
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => window.showNotification && window.showNotification("Feedback enviado!", "success")}
                >
                  <span className="action-icon">💬</span>
                  <span className="action-text">Enviar Feedback</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}