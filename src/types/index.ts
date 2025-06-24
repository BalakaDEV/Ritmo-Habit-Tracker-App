export interface Habit {
  id: string;
  name: string;
  icon: string;
  frequency: number;
  color: string;
  completedToday: number;
  streak: number;
  history: {
    date: string;
    completed: number;
  }[];
}

export interface AppState {
  habits: Habit[];
  isPremium: boolean;
  activeTab: 'habits' | 'dashboard' | 'profile';
  theme: 'light' | 'dark';
}