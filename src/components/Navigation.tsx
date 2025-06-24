import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Home, BarChart2, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const { state, changeTab } = useAppContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-10">
      <div className="max-w-md mx-auto flex justify-around">
        <button
          onClick={() => changeTab('habits')}
          className={`flex flex-col items-center py-3 px-6 transition-colors duration-200 ${
            state.activeTab === 'habits' 
              ? 'text-teal-600 dark:text-teal-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Home 
            size={24} 
            className={state.activeTab === 'habits' ? 'animate-bounce-once' : ''} 
          />
          <span className="text-xs mt-1">Hábitos</span>
        </button>
        
        <button
          onClick={() => changeTab('dashboard')}
          className={`flex flex-col items-center py-3 px-6 transition-colors duration-200 ${
            state.activeTab === 'dashboard' 
              ? 'text-teal-600 dark:text-teal-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <BarChart2 
            size={24} 
            className={state.activeTab === 'dashboard' ? 'animate-bounce-once' : ''} 
          />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        
        <button
          onClick={() => changeTab('profile')}
          className={`flex flex-col items-center py-3 px-6 transition-colors duration-200 ${
            state.activeTab === 'profile' 
              ? 'text-teal-600 dark:text-teal-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <User 
            size={24} 
            className={state.activeTab === 'profile' ? 'animate-bounce-once' : ''} 
          />
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;