# Sorteio — Escola de Música

Site de cadastro e sorteio para a escola de música: participantes se inscrevem com nome e telefone e recebem um número único; o organizador sorteia um vencedor em uma área restrita.

## Stack
- **Frontend:** React 19 + Vite, React Router, Framer Motion (animações), React Icons
- **Backend:** n8n (workflows expostos via Webhook)
- **Armazenamento:** Google Sheets

## Como rodar localmente

```bash
npm install
cp .env.example .env   # depois edite com a URL do seu webhook do n8n
npm run dev
```

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base do webhook do n8n, ex: `https://seu-n8n.exemplo.com/webhook` |

## Estrutura do projeto

```
├── main.jsx / App.jsx      # entry point real da aplicação e rotas
├── pages/
│   ├── Cadastro/            # página pública de inscrição
│   ├── Login/                # login do organizador
│   └── Organizador/          # área restrita: sortear e ver histórico
├── components/                # componentes reutilizáveis (UI + animações)
├── context/AuthContext.jsx    # sessão do organizador (token salvo no localStorage)
├── hooks/                      # useAuth, useCountUp, usePrefersReducedMotion, useWordReveal
├── services/api.js             # chamadas HTTP para o n8n (axios)
├── utils/format.js              # formatação de telefone, número e data
└── styles/                       # design tokens e estilos globais
```

## Contrato esperado da API (n8n)

O `services/api.js` espera os seguintes endpoints e formatos de resposta:

- `POST /cadastro` → `{ nome, telefone }` → responde `{ numero, nome, totalParticipantes }`
- `GET /participantes` → responde uma lista de `{ numero, nome, telefone }`
- `POST /login` → `{ email, senha }` → responde `{ token, nome }`
- `POST /sortear` → `{ ignorarGanhadores }` → responde o vencedor `{ numero, nome, telefone }`
- `GET /historico` → responde uma lista de `{ numero, nome, telefone, sorteadoEm }` (data ISO 8601), mais recente primeiro

## Pontos de atenção para produção

- **Autenticação real:** o login e a proteção da rota `/organizador` dependem inteiramente do backend (n8n) validar e emitir o token — o frontend só guarda e reenvia o que a API der.
- **Concorrência na geração de números:** cadastros simultâneos podem gerar números duplicados se o workflow do n8n ler e gravar a planilha sem controle de concorrência. Configure o workflow para execução em fila (sem paralelismo) ou use uma célula-contador dedicada.
- **CORS:** habilite o domínio do frontend nas opções do node Webhook no n8n.
- **`npm audit`** pode acusar um aviso de segurança em `react-router-dom` (GHSA-qwww-vcr4-c8h2). Ele afeta apenas o modo experimental "RSC" do React Router, que este projeto não usa (aqui é `BrowserRouter` + `Routes` tradicional) — não representa risco real para esta aplicação.
