# Portfolio João

Este projeto é um portfólio pessoal desenvolvido com Next.js e React, com o objetivo de apresentar experiências profissionais, projetos, habilidades técnicas e informações de contato de forma interativa.

## Tecnologias Utilizadas
- Next.js
- React
- TypeScript
- Tailwind CSS
- pnpm

## Estrutura do Projeto
- `app/`: Páginas principais e layout global
- `components/`: Componentes reutilizáveis, incluindo jogos e seções do terminal
- `contexts/`: Contextos globais (ex: idioma)
- `data/`: Dados estáticos e configurações
- `hooks/`: Hooks customizados
- `lib/`: Funções utilitárias e lógica de estado
- `public/`: Arquivos públicos e assets
- `types/`: Tipagens TypeScript

## Como rodar localmente
1. Instale as dependências:
	```sh
	pnpm install
	```
2. Rode o servidor de desenvolvimento:
	```sh
	pnpm dev
	```
3. Acesse em [http://localhost:3000](http://localhost:3000)

## Funcionalidades
- Terminal interativo simulando comandos reais
- Jogos clássicos integrados (Doom, Snake)
- Seções para experiência, formação, projetos, stack e contato
- Suporte a temas e múltiplos idiomas

## Observações
- Alguns jogos requerem arquivos adicionais presentes em `public/doom/`
- O projeto é modular e fácil de expandir com novas seções ou comandos

## Licença
Este projeto está sob a licença MIT.
