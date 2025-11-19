import React from 'react';
import styles from './Button.module.css';

// Exemplo de componente usando CSS Modules
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
}) => {
  // Combina as classes usando CSS Modules
  const buttonClasses = [styles.button, styles[variant], styles[size], disabled && styles.disabled]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

// Exemplo de componente Card usando CSS Modules
interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, footer, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
};

// Exemplo de componente Input usando CSS Modules
interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${styles.formGroup} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.input}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <div id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

// Exemplo de layout usando CSS Modules
interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, header, sidebar }) => {
  return (
    <div className={styles.container}>
      {header && <header>{header}</header>}
      <div className={styles.flex}>
        {sidebar && <aside style={{ minWidth: '250px' }}>{sidebar}</aside>}
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  );
};
