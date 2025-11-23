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

    // Fallback: responder 404 para rotas não mapeadas
    http.all(`${API_BASE}/*`, (req, res, ctx) => {
        console.log(`❌ MSW: Rota não mapeada - ${req.url.href}`)
        return res(ctx.status(404), ctx.json({ detail: 'Mock: rota não mapeada' }))
    })
]
