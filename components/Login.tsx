import React from 'react';
import { UserRole } from '../types';
import { Shield, User, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center" style={{backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/wcAAscBA/2642wAAAAASUVORK5CYII=')"}}>
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-sm p-8 space-y-8 bg-gray-800/80 border border-gray-700 rounded-lg shadow-2xl">
        <div className="flex justify-center">
            <img src="/logo.png" alt="Relluarte Logo" style={{ height: '175px', width: 'auto' }} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Acesso ao Sistema</h1>
          <p className="text-gray-400">Selecione seu perfil para continuar.</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => onLogin('admin')}
            className="w-full flex items-center justify-center px-4 py-3 font-semibold text-gray-900 bg-yellow-500 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-gray-800 transition-colors"
          >
            <Shield className="w-5 h-5 mr-2" />
            Acessar como Administrador
          </button>
          <button
            onClick={() => onLogin('vendedor')}
            className="w-full flex items-center justify-center px-4 py-3 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-offset-gray-800 transition-colors"
          >
            <User className="w-5 h-5 mr-2" />
            Acessar como Vendedor
          </button>
        </div>
         <div className="text-center">
            <button onClick={onBack} className="text-sm text-gray-400 hover:text-yellow-500 transition-colors flex items-center justify-center w-full">
                <ArrowLeft size={14} className="mr-1" />
                Voltar ao site
            </button>
        </div>
      </div>
    </div>
  );
};