import styled from 'styled-components';

// Exemplo de componente estilizado com styled-components
export const StyledButton = styled.button`
  background: var(--gradient-primary);
  color: var(--color-text-primary);
  border: none;
  padding: var(--padding-md);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  box-shadow: var(--shadow-md);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Exemplo de componente com props dinâmicas
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const DynamicButton = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);

  /* Estilos baseados em props */
  background: ${props => {
    switch (props.variant) {
      case 'secondary':
        return 'var(--gradient-secondary)';
      case 'danger':
        return 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
      default:
        return 'var(--gradient-primary)';
    }
  }};

  padding: ${props => {
    switch (props.size) {
      case 'sm':
        return 'var(--padding-sm)';
      case 'lg':
        return 'var(--padding-xl)';
      default:
        return 'var(--padding-md)';
    }
  }};

  font-size: ${props => {
    switch (props.size) {
      case 'sm':
        return 'var(--font-size-sm)';
      case 'lg':
        return 'var(--font-size-lg)';
      default:
        return 'var(--font-size-base)';
    }
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

// Exemplo de card estilizado
export const StyledCard = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-xl);
  padding: var(--padding-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-accent);
  }
`;

// Exemplo de input estilizado
export const StyledInput = styled.input`
  width: 100%;
  padding: var(--padding-md);
  border: 2px solid var(--color-input-border);
  border-radius: var(--border-radius-lg);
  background: var(--color-input);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  transition: var(--transition-base);

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgb(184 134 11 / 20%);
  }

  &:invalid {
    border-color: #dc3545;
  }
`;
