import React from 'react';
import { MessageSquare, Settings, ExternalLink, Bot, Phone } from 'lucide-react';

const AutomationPanel: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-admin-primary">Central de Atendimento e Automação</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card de Status do Serviço */}
                <div className="bg-admin-card rounded-lg shadow-lg p-6 border border-admin-border">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Bot className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-admin-primary">Automação (n8n)</h2>
                    </div>
                    <p className="text-admin-secondary mb-4">
                        Gerencie seus fluxos de atendimento automático para WhatsApp, Instagram e Facebook.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-4 mb-4">
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                            ⚠️ O serviço n8n precisa ser configurado no EasyPanel.
                        </p>
                    </div>
                    <a
                        href="https://easypanel.io/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-400 font-medium"
                    >
                        Configurar n8n <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                </div>

                {/* Card de Chat Unificado */}
                <div className="bg-admin-card rounded-lg shadow-lg p-6 border border-admin-border">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <MessageSquare className="w-6 h-6 text-green-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-admin-primary">Chat Unificado</h2>
                    </div>
                    <p className="text-admin-secondary mb-4">
                        Atenda clientes do WhatsApp, Instagram e Facebook em um único lugar.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-admin-secondary">
                            <Phone className="w-4 h-4 mr-2" /> Múltiplos números de WhatsApp
                        </div>
                        <div className="flex items-center text-sm text-admin-secondary">
                            <Bot className="w-4 h-4 mr-2" /> Integração com Loja Virtual
                        </div>
                    </div>
                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
                        Acessar Chatwoot
                    </button>
                </div>
            </div>

            {/* Área de Integração (Placeholder para Iframe) */}
            <div className="bg-admin-card rounded-lg shadow-lg border border-admin-border h-[600px] flex flex-col justify-center items-center text-center p-8">
                <Settings className="w-16 h-16 text-admin-border mb-4" />
                <h3 className="text-xl font-semibold text-admin-primary mb-2">Integração Pendente</h3>
                <p className="text-admin-secondary max-w-md">
                    Para visualizar o painel de atendimento aqui, você precisa fazer o deploy do Chatwoot ou n8n no seu servidor EasyPanel e configurar a URL de integração.
                </p>
            </div>
        </div>
    );
};

export default AutomationPanel;
