import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Moon, Sun, Info, Lock, Bell, Star, Award, LogOut } from 'lucide-react';
import PremiumModal from './PremiumModal';

const ProfileTab: React.FC = () => {
  const { state, toggleTheme } = useAppContext();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Perfil</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie sua conta e preferências
        </p>
      </div>

      <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
              U
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">Usuário</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">usuario@example.com</p>
            </div>
            {state.isPremium && (
              <div className="ml-auto bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Premium
              </div>
            )}
          </div>
        </div>

        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium mb-3">
            Preferências
          </h3>
          <div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                  {state.theme === 'dark' ? (
                    <Moon size={18} className="text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Sun size={18} className="text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <span>Tema {state.theme === 'dark' ? 'escuro' : 'claro'}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 relative transition-colors duration-300"
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                    state.theme === 'dark' ? 'transform translate-x-6' : ''
                  }`}
                ></span>
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                  <Bell size={18} className="text-green-600 dark:text-green-400" />
                </div>
                <span>Notificações</span>
              </div>
              <button className="w-12 h-6 rounded-full bg-teal-500 relative">
                <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transform translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>

        {!state.isPremium && (
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-start mb-3">
                <Star className="mr-2 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Ritmo Premium</h3>
                  <p className="text-sm opacity-90">
                    Desbloqueie hábitos ilimitados e recursos exclusivos!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPremiumModalOpen(true)}
                className="w-full bg-white text-purple-700 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
              >
                Assinar Premium
              </button>
            </div>
          </div>
        )}

        <div className="p-5">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium mb-3">
            Suporte
          </h3>
          <div>
            <button className="flex items-center w-full py-3 text-left">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                <Info size={18} className="text-purple-600 dark:text-purple-400" />
              </div>
              <span>Ajuda e suporte</span>
            </button>
            <button className="flex items-center w-full py-3 text-left">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg mr-3">
                <Lock size={18} className="text-red-600 dark:text-red-400" />
              </div>
              <span>Privacidade</span>
            </button>
            <button className="flex items-center w-full py-3 text-left">
              <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-lg mr-3">
                <Award size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <span>Conquistas</span>
            </button>
            <button className="flex items-center w-full py-3 text-left text-red-500">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mr-3">
                <LogOut size={18} />
              </div>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Ritmo v1.0.0</p>
        <p className="mt-1">© 2025 Ritmo App. Todos os direitos reservados.</p>
      </div>

      <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} />
    </div>
  );
};

export default ProfileTab;