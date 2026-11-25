# Topps Burguer — Cardápio Digital e Pedidos via WhatsApp

Site oficial da **Topps Burguer** (Pendências - Rio Grande do Norte), desenvolvido com **HTML5**, **CSS3** e **JavaScript puro**, preparado para hospedagem gratuita no **GitHub Pages**.

## Funcionalidades

- **Identidade visual oficial** em Preto (`#050505` / `#111111`) e Laranja (`#FF8A00` / `#FF6A00`), com a logo da hamburgueria em destaque na página principal, cabeçalho e rodapé.
- **Cardápio completo e interativo** separado por categorias:
  - Hambúrgueres e lanches
  - Sucos
  - Vitaminas
  - Refrigerantes
  - Acréscimos
- **Sistema de adicionais** com cálculo automático em centavos inteiros e vinculação por lanche.
- **Sacola de compras persistente** (`localStorage`), permitindo produtos iguais com personalizações diferentes, controle de quantidade e remoção individual de itens ou adicionais.
- **Formulário de endereço de entrega** com validação de campos obrigatórios e máscaras de CEP e telefone.
- **Tela de revisão completa** e envio da mensagem formatada diretamente para o WhatsApp oficial: `(84) 99655-4600`.

## Estrutura de Arquivos

```text
topps-burguer/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── logo-topps-burguer.png
│   └── icons/
└── README.md
```

## Como executar localmente

1.  Baixe ou clone este repositório.
2.  Salve a imagem da logo oficial em assets/images/logo-topps-burguer.png (ou
    .jpg).
3.  Abra o arquivo index.html diretamente no navegador (ou utilize uma extensão
    como o Live Server no VS Code).

## Passo a passo para publicar no GitHub Pages

1.  Crie um repositório no GitHub (por exemplo, topps-burguer).
2.  Envie todos os arquivos e pastas (index.html, css/, js/, assets/, README.md)
    para a branch principal (main).
3.  No repositório do GitHub, acesse Settings (Configurações) > Pages (no menu
    lateral).
4.  Em Source, selecione Deploy from a branch.
5.  Em Branch, escolha main e a pasta / (root) e clique em Save.
6.  Aguarde cerca de 1 a 2 minutos e acesse o link gerado pelo GitHub Pages
    (https://seu-usuario.github.io/topps-burguer/).
