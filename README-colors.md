# Paleta de Cores Premium - Relluarte

## 🎨 Visão Geral da Paleta

Esta paleta foi inspirada em designs de luxo, utilizando tons de dourado metálico, preto profundo e champanhe suave para criar uma estética elegante e premium adequada para uma empresa de decoração.

## 🏗️ Design Tokens

### Cores Principais
```css
--color-primary: #000000;     /* Preto profundo - fundo principal */
--color-secondary: #D4AF37;   /* Dourado metálico - destaques premium */
--color-accent: #C9A227;      /* Dourado alternativo - variações */
--color-tertiary: #E8DCC2;    /* Champanhe suave - seções intermediárias */
--color-surface: #E4D8C5;     /* Bege alternativo - variações */
```

### Backgrounds
```css
--color-background: #000000;              /* Fundo principal */
--color-background-secondary: #1E1E1E;    /* Fundo secundário */
--color-background-tertiary: #2A2A2A;     /* Fundo terciário */
```

### Textos
```css
--color-text-primary: #FFFFFF;     /* Branco suave - textos principais */
--color-text-secondary: #E8DCC2;   /* Bege - textos secundários */
--color-text-muted: #A0AEC0;       /* Cinza - textos muted */
```

### Bordas e Estados
```css
--color-border: #D4AF37;           /* Dourado - bordas premium */
--color-border-secondary: #2A2A2A; /* Cinza grafite - bordas neutras */
--color-hover: #C9A227;            /* Hover dourado */
--color-active: #B8860B;           /* Active dourado escuro */
--color-focus: #D4AF37;            /* Focus dourado */
```

### Cards e Formulários
```css
--color-card: #1E1E1E;         /* Cinza grafite - cards */
--color-input: #1E1E1E;        /* Fundo de inputs */
```

## 🎯 Como Usar

### Classes Utilitárias Customizadas

#### Backgrounds
```html
<div class="bg-primary">Fundo preto profundo</div>
<div class="bg-secondary">Fundo dourado metálico</div>
<div class="bg-accent">Fundo dourado alternativo</div>
<div class="bg-tertiary">Fundo champanhe</div>
<div class="bg-card">Fundo de card</div>
```

#### Textos
```html
<h1 class="text-primary">Texto principal branco</h1>
<p class="text-secondary">Texto secundário bege</p>
<span class="text-muted">Texto muted cinza</span>
```

#### Bordas
```html
<div class="border-primary">Borda dourada premium</div>
<div class="border-secondary">Borda cinza neutra</div>
```

#### Estados de Interação
```html
<button class="hover:bg-hover">Hover dourado</button>
<input class="focus:border-focus">Focus dourado</input>
```

### Componentes Pré-definidos

#### Botões
```html
<button class="btn-primary">Botão Primário Dourado</button>
<button class="btn-secondary">Botão Secundário</button>
```

#### Cards
```html
<div class="card-primary">
  <h3>Card com fundo cinza grafite</h3>
  <p>Conteúdo do card</p>
</div>
```

#### Formulários
```html
<input class="input-primary" placeholder="Campo de entrada">
<select class="input-primary">
  <option>Opção 1</option>
</select>
```

## 🎨 Aplicação nos Componentes

### Landing Page
- **Header**: Fundo preto com texto branco, hover dourado
- **Hero**: Fundo preto com overlay, botões dourados
- **Cards de Produto**: Fundo cinza grafite com bordas douradas
- **Formulário**: Inputs com fundo cinza e bordas douradas
- **Footer**: Fundo preto com ícones dourados

### Dashboard
- **Cards Métricos**: Fundo cinza grafite com ícones dourados
- **Gráficos**: Fundo cinza grafite com elementos dourados
- **Alertas**: Fundo dourado claro com bordas douradas
- **Atividades**: Fundo cinza escuro com status coloridos

### Sidebar
- **Fundo**: Preto profundo
- **Links**: Texto muted com hover dourado
- **Logo**: Fundo preto com imagem
- **Select**: Input com fundo cinza e bordas douradas

## 🌟 Variações e Estados

### Hover Effects
- Botões: Transição suave para dourado mais claro
- Cards: Leve aumento de brilho no fundo
- Links: Mudança para dourado metálico

### Focus States
- Inputs: Borda dourada intensa
- Botões: Anel de foco dourado
- Formulários: Destaque visual premium

### Active States
- Botões: Dourado mais escuro para feedback
- Elementos: Redução sutil de brilho

## 🎯 Princípios de Uso

1. **Dourado Premium**: Use apenas para destaques e elementos de luxo
2. **Contraste Adequado**: Branco em fundo escuro, bege para suavizar
3. **Consistência**: Aplique a paleta uniformemente em todos os componentes
4. **Elegância**: Evite saturação excessiva, mantenha o minimalismo
5. **Acessibilidade**: Garanta bom contraste para leitura confortável

## 🔧 Implementação Técnica

### CSS Custom Properties
Todas as cores são definidas como variáveis CSS no arquivo `index.css`, permitindo fácil manutenção e consistência.

### Tailwind Configuration
Configuração inline no `index.html` para integração perfeita com Tailwind CDN.

### Componentes Reutilizáveis
Classes utilitárias criadas para botões, cards e formulários padronizados.

## 📝 Notas de Design

- **Luxo e Elegância**: A combinação de preto, dourado e champanhe cria uma atmosfera premium
- **Minimalismo**: Uso estratégico de cores para não sobrecarregar a interface
- **Contraste Visual**: Branco em preto para máxima legibilidade
- **Hierarquia**: Dourado para destaques, bege para suavização, cinza para neutralidade

Esta paleta transforma a interface em uma experiência visual sofisticada, alinhada com a identidade de uma empresa de decoração de alto padrão.</content>
<parameter name="filePath">e:\CB\www\relluarte\README-colors.md