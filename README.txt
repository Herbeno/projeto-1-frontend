PROJETO 1 FRONTEND — ONG Esperança Solidária
============================================

Aluno: Herben Silva Oliveira
RGM: 49190431
Disciplina: Design Profissional / Frontend

ESTRUTURA DE PASTAS
-------------------
projeto 1 frontend/
├── index.html          Página inicial
├── projetos.html       Projetos, doação e voluntariado
├── cadastro.html       Formulário com validações nativas
├── css/
│   └── styles.css
├── js/
│   └── mascaras.js     Máscaras CPF, telefone e CEP
├── img/                Imagens em PNG, JPG e WebP
├── gerar_imagens.py    Script para recriar as imagens
└── README.txt

COMO ABRIR
----------
Abra index.html no navegador (duplo clique).

VALIDAÇÃO W3C
-------------
Envie cada arquivo .html em: https://validator.w3.org/#validate_by_upload

IMAGENS
-------
Cada imagem usada nas páginas possui versão WebP (otimizada) e fallback JPG/PNG
via elemento <picture>.

Para regenerar as imagens:
  python gerar_imagens.py
