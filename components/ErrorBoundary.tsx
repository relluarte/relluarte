import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado</h1>
          <p className="text-secondary mb-4">Ocorreu um erro inesperado. Tente recarregar a página.</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;