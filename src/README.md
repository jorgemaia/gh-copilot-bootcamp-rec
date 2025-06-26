# Página de Pesquisa de Pessoas

Esta é uma aplicação web simples que exibe dados de pessoas em uma tabela com atualização automática.

## Arquivos

- `indice.html` - Página principal da aplicação
- `styles.css` - Estilos visuais com tema rosa bebê e azul
- `script.js` - Lógica JavaScript para geração de dados mock e atualização automática

## Funcionalidades

- **Exibição de dados**: Mostra informações de pessoas em colunas (Nome, Email, Telefone)
- **Dados mock**: Gera dados fictícios com nomes brasileiros e telefones no formato nacional
- **Atualização automática**: Refresh a cada 10 segundos
- **Timestamp**: Mostra a hora da última atualização
- **Design responsivo**: Adapta-se a diferentes tamanhos de tela
- **Tema visual**: Cores rosa bebê e azul conforme solicitado

## Como usar

1. Abra o arquivo `indice.html` em um navegador web
2. Ou sirva os arquivos através de um servidor HTTP local:
   ```bash
   cd src
   python3 -m http.server 8080
   # Acesse http://localhost:8080/indice.html
   ```

## Tecnologias

- HTML5
- CSS3 com gradientes e animações
- JavaScript vanilla (ES6+)
- Sem frameworks ou bibliotecas externas

## Características técnicas

- Classes JavaScript para organização do código
- Geração aleatória de dados brasileiros
- Formatação de data/hora em português
- Animações CSS para melhor experiência do usuário
- Cleanup automático de recursos