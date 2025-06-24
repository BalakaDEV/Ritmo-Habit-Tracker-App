import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import HabitsList from './components/HabitsList';
import Dashboard from './components/Dashboard';
import ProfileTab from './components/ProfileTab';
import Navigation from './components/Navigation';

const AppContent: React.FC = () => {
  const { state } = useAppContext();
  
  // Set document title
  useEffect(() => {
    document.title = 'Ritmo - Acompanhamento de Hábitos';
  }, []);

  // Apply theme class to body
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-20">
      {state.activeTab === 'habits' && <HabitsList />}
      {state.activeTab === 'dashboard' && <Dashboard />}
      {state.activeTab === 'profile' && <ProfileTab />}
      <Navigation />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;