import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Input, Layout } from './CSSModulesExample';
import { StyledButton, DynamicButton, StyledCard } from '../styles/styled-components';

// Exemplo demonstrando as três abordagens modernas de CSS em React

const ExampleContainer = styled.div`
  padding: var(--spacing-8);
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: var(--spacing-12);

  h2 {
    color: var(--color-text-primary);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-6);
    text-align: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-8);
`;

const CodeBlock = styled.pre`
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-4);
  overflow-x: auto;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-top: var(--spacing-4);
`;

export const ModernCSSShowcase: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulário enviado! (exemplo)');
  };

  return (
    <Layout
      header={
        <div className="bg-gradient-primary text-center py-8 px-4">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Abordagens Modernas de CSS em React
          </h1>
          <p className="text-primary/80 text-lg">
            Demonstração prática de Tailwind CSS, Styled Components e CSS Modules
          </p>
        </div>
      }
      sidebar={
        <nav className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Navegação</h3>
          <ul className="space-y-2">
            <li>
              <a href="#tailwind" className="text-accent hover:text-accent-light transition-colors">
                Tailwind CSS
              </a>
            </li>
            <li>
              <a href="#styled" className="text-accent hover:text-accent-light transition-colors">
                Styled Components
              </a>
            </li>
            <li>
              <a href="#modules" className="text-accent hover:text-accent-light transition-colors">
                CSS Modules
              </a>
            </li>
            <li>
              <a
                href="#comparison"
                className="text-accent hover:text-accent-light transition-colors"
              >
                Comparação
              </a>
            </li>
          </ul>
        </nav>
      }
    >
      <ExampleContainer>
        {/* Seção 1: Tailwind CSS */}
        <Section id="tailwind">
          <h2>1. Tailwind CSS</h2>
          <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
            Framework utilitário que acelera a estilização sem sair do JSX. Perfeito para
            prototipagem rápida e designs consistentes.
          </p>

          <Grid>
            <Card title="Vantagens">
              <ul className="space-y-2 text-text-secondary">
                <li>✅ Desenvolvimento rápido</li>
                <li>✅ Consistência garantida</li>
                <li>✅ Sem conflitos de nomes</li>
                <li>✅ Responsivo por padrão</li>
                <li>✅ Tree-shaking automático</li>
              </ul>
            </Card>

            <Card title="Exemplo Prático">
              <div className="space-y-4">
                <button className="bg-gradient-primary text-primary font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 w-full">
                  Botão com Tailwind
                </button>
                <div className="bg-card p-6 rounded-2xl shadow-md border border-border">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Card Exemplo</h3>
                  <p className="text-text-secondary">
                    Este card foi estilizado usando classes do Tailwind CSS.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>

          <CodeBlock>
            {`<button className="bg-gradient-primary text-primary font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
  Botão com Tailwind
</button>`}
          </CodeBlock>
        </Section>

        {/* Seção 2: Styled Components */}
        <Section id="styled">
          <h2>2. Styled Components</h2>
          <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
            Permite escrever CSS diretamente no JavaScript com escopo automático, evitando conflitos
            e deixando o código modular.
          </p>

          <Grid>
            <Card title="Vantagens">
              <ul className="space-y-2 text-text-secondary">
                <li>✅ Escopo automático</li>
                <li>✅ Props dinâmicas</li>
                <li>✅ CSS-in-JS power</li>
                <li>✅ Theming integrado</li>
                <li>✅ Server-side rendering</li>
              </ul>
            </Card>

            <Card title="Exemplo Prático">
              <div className="space-y-4">
                <StyledButton>Botão Styled</StyledButton>
                <DynamicButton variant="secondary" size="lg">
                  Botão Dinâmico
                </DynamicButton>
                <StyledCard>
                  <h3>Card com Styled Components</h3>
                  <p>Este card foi criado usando styled-components com acesso às variáveis CSS.</p>
                </StyledCard>
              </div>
            </Card>
          </Grid>

          <CodeBlock>
            {`const StyledButton = styled.button\`
  background: var(--gradient-primary);
  color: var(--color-text-primary);
  border: none;
  padding: var(--padding-md);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
\`;`}
          </CodeBlock>
        </Section>

        {/* Seção 3: CSS Modules */}
        <Section id="modules">
          <h2>3. CSS Modules</h2>
          <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
            Escopam CSS para componentes específicos, evitando vazamento de estilos e facilitando
            manutenção com nomes únicos gerados automaticamente.
          </p>

          <Grid>
            <Card title="Vantagens">
              <ul className="space-y-2 text-text-secondary">
                <li>✅ Escopo local</li>
                <li>✅ Nomes únicos</li>
                <li>✅ CSS padrão</li>
                <li>✅ Composição de estilos</li>
                <li>✅ Hot reload</li>
              </ul>
            </Card>

            <Card title="Exemplo Prático">
              <div className="space-y-4">
                <Button variant="primary" size="large">
                  Botão CSS Modules
                </Button>
                <Button variant="secondary" size="medium">
                  Botão Secundário
                </Button>
                <Card
                  title="Card com CSS Modules"
                  footer={
                    <div className="flex gap-2">
                      <Button variant="danger" size="small">
                        Cancelar
                      </Button>
                      <Button variant="primary" size="small">
                        Confirmar
                      </Button>
                    </div>
                  }
                >
                  <p>Este card demonstra o uso de CSS Modules com composição de classes.</p>
                </Card>
              </div>
            </Card>
          </Grid>

          <CodeBlock>
            {`/* Button.module.css */
.button {
  background: var(--gradient-primary);
  /* ... outros estilos ... */
}

.primary {
  composes: button;
  background: var(--gradient-primary);
}

.secondary {
  composes: button;
  background: var(--gradient-secondary);
}`}
          </CodeBlock>
        </Section>

        {/* Seção 4: Formulário Demonstrativo */}
        <Section id="comparison">
          <h2>Formulário Comparativo</h2>
          <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
            Um formulário que demonstra todas as três abordagens funcionando juntas.
          </p>

          <div className="max-w-2xl mx-auto">
            <Card title="Formulário de Contato">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nome"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-text-primary font-medium">Mensagem</label>
                  <textarea
                    className="w-full p-4 border-2 border-input-border rounded-xl bg-input text-text-primary transition-base focus:border-accent focus:ring-4 focus:ring-accent/20 resize-vertical min-h-[100px]"
                    placeholder="Digite sua mensagem..."
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex gap-4 justify-end">
                  <Button variant="secondary" type="button">
                    Cancelar
                  </Button>
                  <DynamicButton variant="primary" size="lg" type="submit">
                    Enviar Mensagem
                  </DynamicButton>
                </div>
              </form>
            </Card>
          </div>
        </Section>

        {/* Seção 5: Comparação */}
        <Section>
          <h2>Comparação das Abordagens</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-admin-border rounded-xl bg-admin-card">
              <thead>
                <tr className="bg-admin-background-secondary">
                  <th className="border border-admin-border p-4 text-left text-admin-primary font-semibold">
                    Aspecto
                  </th>
                  <th className="border border-admin-border p-4 text-left text-admin-primary font-semibold">
                    Tailwind CSS
                  </th>
                  <th className="border border-admin-border p-4 text-left text-admin-primary font-semibold">
                    Styled Components
                  </th>
                  <th className="border border-admin-border p-4 text-left text-admin-primary font-semibold">
                    CSS Modules
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-admin-border p-4 text-admin-secondary font-medium">
                    Curva de Aprendizado
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">Baixa</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Média</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Baixa</td>
                </tr>
                <tr className="bg-admin-background-tertiary">
                  <td className="border border-admin-border p-4 text-admin-secondary font-medium">
                    Escopo
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">
                    Global (com @apply)
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">Componente</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Componente</td>
                </tr>
                <tr>
                  <td className="border border-admin-border p-4 text-admin-secondary font-medium">
                    Reutilização
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">Alta</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Alta</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Média-Alta</td>
                </tr>
                <tr className="bg-admin-background-tertiary">
                  <td className="border border-admin-border p-4 text-admin-secondary font-medium">
                    Manutenção
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">Fácil</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Fácil</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Fácil</td>
                </tr>
                <tr>
                  <td className="border border-admin-border p-4 text-admin-secondary font-medium">
                    Bundle Size
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">
                    Pequeno (tree-shaking)
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">Médio</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Pequeno</td>
                </tr>
                <tr className="bg-admin-background-tertiary">
                  <td className="border border-admin-border p-4 text-admin-secondary font-medium">
                    SSR Support
                  </td>
                  <td className="border border-admin-border p-4 text-admin-primary">Excelente</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Excelente</td>
                  <td className="border border-admin-border p-4 text-admin-primary">Bom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </ExampleContainer>
    </Layout>
  );
};
