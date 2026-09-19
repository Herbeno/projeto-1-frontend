# Projeto Frontend — ONG Esperança Solidária

Aplicação web SPA desenvolvida para a ONG Esperança Solidária (Gramado/RS), com foco em captação de doadores e voluntários. Projeto acadêmico de Desenvolvimento Front-end.

**Aluno:** Herben Silva Oliveira  
**RGM:** 49190431  
**Instituição:** Cruzeiro do Sul Virtual — Bacharelado em Ciência da Computação

## Sobre o projeto

Plataforma institucional que apresenta a missão da ONG, projetos sociais em andamento e formulário de cadastro de doadores/voluntários. A aplicação foi evoluída de páginas estáticas para uma **Single Page Application (SPA)** com roteamento por hash, validação de formulários, persistência em `localStorage` e arquitetura modular em ES6.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| HTML5 | Estrutura semântica, formulários e templates parciais |
| CSS3 | Design System, Grid responsivo, componentes e WCAG |
| JavaScript (ES6+) | SPA, roteamento, validação, storage e módulos |
| Day.js (CDN ESM) | Formatação de datas no histórico de cadastros |
| Git / GitHub | Controle de versões e GitFlow (`main` + `develop`) |
| Netlify | Deploy em produção (HTTPS) |

## Pré-requisitos

- Navegador moderno (Chrome, Firefox ou Edge)
- [Git](https://git-scm.com/) para clonar o repositório
- Servidor local para desenvolvimento (a SPA usa `fetch` para carregar templates)
  - Extensão **Live Server** (VS Code/Cursor), ou
  - Node.js com `npx serve`

> **Nota:** abrir `index.html` diretamente via `file://` não funciona — o `fetch` dos templates em `html/` é bloqueado pelo navegador.

## Instalação e execução

```bash
# 1. Clonar o repositório
git clone https://github.com/Herbeno/projeto-1-frontend.git
cd projeto-1-frontend

# 2. Instalar dependências
npm install

# 3. Desenvolvimento (Vite)
npm run dev

# 4. Build de produção (minificação JS/CSS)
npm run build

# 5. Testar a build localmente
npm run preview
```

Os templates ficam em `public/html/` e as imagens em `public/img/`, publicados na raiz do site em produção.

## Rotas da SPA

| Rota | Conteúdo |
|---|---|
| `#/` | Página inicial — missão e apresentação |
| `#/projetos` | Projetos, voluntariado e doações |
| `#/cadastro` | Formulário de cadastro com validação |

## Estrutura de diretórios

```
projeto-1-frontend/
├── index.html          # Shell da SPA
├── vite.config.js      # Build de produção (Vite)
├── public/
│   ├── html/           # Templates parciais (views)
│   └── img/            # Imagens
├── css/styles.css      # Design System e componentes
├── js/
│   ├── app.js          # Entrada da aplicação
│   ├── router.js       # Roteamento e DOM
│   ├── templates.js    # Mapa de rotas e cache
│   ├── components.js   # Cards dinâmicos (template literals)
│   ├── validation.js   # Validação com RegEx
│   ├── storage.js      # localStorage e Day.js
│   ├── feedback.js     # Modal e toast
│   ├── mascaras.js     # Máscaras de entrada
│   └── menu.js         # Menu hambúrguer
```

## Deploy (produção)

A aplicação está publicada em:

**https://projeto-frontend-faculdade.netlify.app/**

O Netlify executa `npm run build` (Vite) e publica a pasta `dist/`, com JavaScript e CSS minificados. O deploy automático na branch `main` será reativado ao concluir o projeto.

## Controle de versões (GitFlow)

| Branch | Função |
|---|---|
| `main` | Versão estável em produção |
| `develop` | Integração contínua de desenvolvimento |
| `feature/*` | Novas funcionalidades isoladas |

Commits seguem padrão **Conventional Commits** (`feat`, `fix`, `chore`, `docs`).

## Acessibilidade

O projeto segue diretrizes **WCAG 2.1 Nível AA**: HTML semântico, `aria-label`/`aria-expanded`, navegação por teclado (`:focus-visible`), contraste adequado e `aria-live` em mensagens dinâmicas.

## Licença

Projeto acadêmico — uso educacional.
