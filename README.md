# Projeto Frontend — ONG Esperança Solidária

Projeto acadêmico de Desenvolvimento Front-end (HTML5, CSS e JavaScript SPA).

**Aluno:** Herben Silva Oliveira  
**RGM:** 49190431

## Demo online

https://projeto-frontend-faculdade.netlify.app/

## Estrutura de diretórios

```
projeto-1-frontend/
├── index.html          # Shell da SPA (cabeçalho, #app, rodapé)
├── html/               # Templates parciais de cada view
│   ├── inicio.html
│   ├── projetos.html
│   └── cadastro.html
├── css/
│   └── styles.css      # Design System e componentes visuais
├── js/
│   ├── app.js          # Ponto de entrada da aplicação
│   ├── router.js       # Roteamento e injeção no DOM
│   ├── templates.js    # Mapa de rotas e cache de templates
│   ├── menu.js         # Menu hambúrguer e dropdown
│   ├── feedback.js     # Modal e toast
│   └── mascaras.js     # Máscaras de CPF, telefone e CEP
└── img/                # Imagens (logo, equipe, projetos)
```

## Rotas da SPA

- `#/` — Início
- `#/projetos` — Projetos e doações
- `#/cadastro` — Formulário de cadastro

## Abrir localmente

Use um servidor local (Live Server ou `npx serve`) para que o carregamento dos templates em `html/` funcione corretamente.
