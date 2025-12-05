import { http } from 'msw'

const API_BASE = '/api/v1'

// Sample mock data — adapte conforme as necessidades das telas
const usuarios = [
    {
        id: 1,
        nome: 'Ed Oliveira',
        email: 'ed.dev@email.com',
        cargo: 'Analista',
        senioridade: 'Pleno',
        foto_url: '',
        departamento: 'Engenharia',
        telefone: '11 99999-0001',
        data_admissao: '2022-03-01',
        salario: '7000',
        endereco: { rua: 'Rua A, 123', cidade: 'São Paulo' },
        configuracoes: { theme: 'light' }
    },
    {
        id: 2,
        nome: 'Matheus Felipe',
        email: 'matheus@email.com',
        cargo: 'Gestor',
        senioridade: 'Sênior',
        foto_url: '',
        departamento: 'Produtos',
        telefone: '11 99999-0002',
        data_admissao: '2020-07-15',
        salario: '12000',
        endereco: { rua: 'Av. B, 456', cidade: 'Rio de Janeiro' },
        configuracoes: { theme: 'dark' }
    }
]

const equipes = [
    { id: 1, nome: 'Equipe A', membros: [1, 2] },
    { id: 2, nome: 'Equipe B', membros: [] }
]

const ciclosAvaliacao = [
    {
        id: 'c1',
        nome: 'Ciclo 2024 Q4',
        periodo_inicio: '2024-10-01',
        periodo_fim: '2024-12-31',
        status: 'ativo'
    },
    {
        id: 'c2',
        nome: 'Ciclo 2025 Q1',
        periodo_inicio: '2025-01-01',
        periodo_fim: '2025-03-31',
        status: 'planejado'
    }
]

const avaliacoes = [
    {
        id: 'a1',
        avaliado_id: 1,
        avaliador_id: 2,
        ciclo_id: 'c1',
        tipo: 'gestor',
        status: 'em_andamento',
        nota_global: null,
        comentarios_gerais: null,
        data_criacao: '2024-11-01T10:00:00Z',
        data_conclusao: null,
        progresso: 60,
        total_itens: 10,
        itens_respondidos: 6,
        avaliador: usuarios[1],
        avaliado: usuarios[0],
        ciclo: ciclosAvaliacao[0]
    },
    {
        id: 'a2',
        avaliado_id: 1,
        avaliador_id: 1,
        ciclo_id: 'c1',
        tipo: 'autoavaliacao',
        status: 'concluida',
        nota_global: 8.5,
        comentarios_gerais: 'Ótimo desempenho no trimestre',
        data_criacao: '2024-10-15T10:00:00Z',
        data_conclusao: '2024-11-20T15:30:00Z',
        progresso: 100,
        total_itens: 8,
        itens_respondidos: 8,
        avaliador: usuarios[0],
        avaliado: usuarios[0],
        ciclo: ciclosAvaliacao[0]
    },
    {
        id: 'a3',
        avaliado_id: 2,
        avaliador_id: 1,
        ciclo_id: 'c1',
        tipo: '360',
        status: 'rascunho',
        nota_global: null,
        comentarios_gerais: null,
        data_criacao: '2024-11-25T10:00:00Z',
        data_conclusao: null,
        progresso: 0,
        total_itens: 15,
        itens_respondidos: 0,
        avaliador: usuarios[0],
        avaliado: usuarios[1],
        ciclo: ciclosAvaliacao[0]
    },
    {
        id: 'a4',
        avaliado_id: 1,
        avaliador_id: 2,
        ciclo_id: 'c2',
        tipo: 'gestor',
        status: 'aguardando',
        nota_global: null,
        comentarios_gerais: null,
        data_criacao: '2024-12-01T10:00:00Z',
        data_conclusao: null,
        progresso: 0,
        total_itens: 10,
        itens_respondidos: 0,
        avaliador: usuarios[1],
        avaliado: usuarios[0],
        ciclo: ciclosAvaliacao[1]
    }
]

export const handlers = [
    // Usuarios list
    http.get(`${API_BASE}/usuarios`, (req, res, ctx) => {
        console.log('📥 MSW: Requisição recebida para /usuarios')
        return res(
            ctx.status(200),
            ctx.json({ results: usuarios, total: usuarios.length })
        )
    }),

    // Usuario detail
    http.get(`${API_BASE}/usuarios/:id`, (req, res, ctx) => {
        const { id } = req.params
        console.log(`📥 MSW: Requisição recebida para /usuarios/${id}`)
        const u = usuarios.find((x) => String(x.id) === String(id))
        if (!u) {
            console.log('❌ MSW: Usuário não encontrado')
            return res(ctx.status(404), ctx.json({ detail: 'Usuário não encontrado' }))
        }
        return res(ctx.status(200), ctx.json(u))
    }),

    // Equipes list
    http.get(`${API_BASE}/equipes`, (req, res, ctx) => {
        console.log('📥 MSW: Requisição recebida para /equipes')
        return res(ctx.status(200), ctx.json({ results: equipes, total: equipes.length }))
    }),

    // Auth fake login
    http.post(`${API_BASE}/auth/login`, async (req, res, ctx) => {
        console.log('📥 MSW: Requisição recebida para /auth/login')

        const body = await req.json().catch(() => ({}))
        const { email, senha } = body || {}

        console.log('📥 MSW: Dados recebidos:', { email, senha })

        const adminUser = {
            id: 999,
            nome: 'Administrador Teste',
            email: 'admin@pulso360.local',
            cargo: 'Administrador',
            senioridade: 'Diretoria',
            foto_url: '',
            departamento: 'Administração',
            telefone: '11 90000-0000',
            data_admissao: '2019-01-01',
            salario: '0',
            endereco: { rua: 'Sede', cidade: 'Remoto' },
            configuracoes: { theme: 'dark', receiveEmails: true }
        }

        if (email === 'admin@pulso360.local' && senha === 'admin') {
            console.log('✅ MSW: Login bem-sucedido para admin')
            return res(
                ctx.status(200),
                ctx.json({ access_token: 'fake-jwt-token', token_type: 'bearer', user: adminUser })
            )
        }

        const found = usuarios.find((u) => u.email === email)
        if (found) {
            console.log('✅ MSW: Login bem-sucedido para usuário:', found)
            return res(ctx.status(200), ctx.json({ access_token: 'fake-jwt-token-user', token_type: 'bearer', user: found }))
        }

        console.log('❌ MSW: Credenciais inválidas')
        return res(ctx.status(401), ctx.json({ detail: 'Credenciais inválidas' }))
    }),

    // Avaliações - Lista
    http.get(`${API_BASE}/avaliacoes`, (req, res, ctx) => {
        console.log('📥 MSW: Requisição recebida para /avaliacoes')
        return res(ctx.status(200), ctx.json(avaliacoes))
    }),

    // Avaliações - Stats
    http.get(`${API_BASE}/avaliacoes/stats`, (req, res, ctx) => {
        console.log('📥 MSW: Requisição recebida para /avaliacoes/stats')
        const total = avaliacoes.length
        const pending = avaliacoes.filter(a => ['em_andamento', 'rascunho', 'aguardando'].includes(a.status)).length
        const completed = avaliacoes.filter(a => a.status === 'concluida').length
        const scores = avaliacoes.filter(a => a.nota_global).map(a => a.nota_global)
        const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0
        
        return res(ctx.status(200), ctx.json({
            total,
            pending,
            completed,
            avgScore: parseFloat(avgScore)
        }))
    }),

    // Avaliações - Export
    http.get(`${API_BASE}/avaliacoes/export`, (req, res, ctx) => {
        console.log('📥 MSW: Requisição recebida para /avaliacoes/export')
        const csv = 'ID,Avaliado,Avaliador,Ciclo,Tipo,Status,Nota,Data\n' +
            avaliacoes.map(a => `${a.id},${a.avaliado.nome},${a.avaliador.nome},${a.ciclo.nome},${a.tipo},${a.status},${a.nota_global || ''},${a.data_criacao}`).join('\n')
        return res(
            ctx.status(200),
            ctx.set('Content-Type', 'text/csv'),
            ctx.set('Content-Disposition', 'attachment; filename=avaliacoes.csv'),
            ctx.body(csv)
        )
    }),

    // Fallback: responder 404 para rotas não mapeadas
    http.all(`${API_BASE}/*`, (req, res, ctx) => {
        console.log(`❌ MSW: Rota não mapeada - ${req.url.href}`)
        return res(ctx.status(404), ctx.json({ detail: 'Mock: rota não mapeada' }))
    })
]
