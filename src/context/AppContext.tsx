import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, Habit } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  state: AppState;
  addHabit: (habit: Omit<Habit, 'id' | 'completedToday' | 'streak' | 'history'>) => void;
  trackHabit: (id: string) => void;
  resetDailyProgress: () => void;
  changeTab: (tab: 'habits' | 'dashboard' | 'profile') => void;
  toggleTheme: () => void;
}

const initialState: AppState = {
  habits: [],
  isPremium: false,
  activeTab: 'habits',
  theme: 'light',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedState, setStoredState] = useLocalStorage<AppState>('ritmo-app-state', initialState);
  const [state, setState] = useState<AppState>(storedState);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  // Check if we need to reset daily progress (new day)
  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const lastResetDay = localStorage.getItem('ritmo-last-reset-day');

    if (lastResetDay !== today) {
      resetDailyProgress();
      localStorage.setItem('ritmo-last-reset-day', today);
    }
  }, []);

  const addHabit = (
    habit: Omit<Habit, 'id' | 'completedToday' | 'streak' | 'history'>
  ) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      completedToday: 0,
      streak: 0,
      history: [],
    };

    setState((prev) => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  };

  const trackHabit = (id: string) => {
    setState((prev) => {
      const today = new Date().toISOString().split('T')[0];
      
      const updatedHabits = prev.habits.map((habit) => {
        if (habit.id === id && habit.completedToday < habit.frequency) {
          // Find or create today's history entry
          const todayEntryIndex = habit.history.findIndex(
            (entry) => entry.date === today
          );
          
          let updatedHistory = [...habit.history];
          if (todayEntryIndex >= 0) {
            updatedHistory[todayEntryIndex] = {
              ...updatedHistory[todayEntryIndex],
              completed: updatedHistory[todayEntryIndex].completed + 1,
            };
          } else {
            updatedHistory.push({ date: today, completed: 1 });
          }
          
          return {
            ...habit,
            completedToday: habit.completedToday + 1,
            history: updatedHistory,
          };
        }
        return habit;
      });

      return {
        ...prev,
        habits: updatedHabits,
      };
    });
  };

  const resetDailyProgress = () => {
    setState((prev) => {
      // Update streaks before resetting
      const updatedHabits = prev.habits.map((habit) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const yesterdayCompleted = habit.history.find(
          (entry) => entry.date === yesterdayStr
        );
        
        // Increase streak if yesterday's goal was met, otherwise reset
        const metYesterdayGoal = yesterdayCompleted && 
          yesterdayCompleted.completed >= habit.frequency;
        
        const newStreak = metYesterdayGoal ? habit.streak + 1 : 0;
        
        return {
          ...habit,
          completedToday: 0,
          streak: newStreak,
        };
      });

      return {
        ...prev,
        habits: updatedHabits,
      };
    });
  };

  const changeTab = (tab: 'habits' | 'dashboard' | 'profile') => {
    setState((prev) => ({
      ...prev,
      activeTab: tab,
    }));
  };

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addHabit,
        trackHabit,
        resetDailyProgress,
        changeTab,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};