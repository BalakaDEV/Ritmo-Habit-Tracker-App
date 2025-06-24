import React, { useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getColorById } from '../data/habitIcons';
import * as LucideIcons from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const [selectedRange, setSelectedRange] = useState<'week' | 'month'>('week');

  // Calculate stats based on habits
  const stats = useMemo(() => {
    // Get dates for selected range
    const today = new Date();
    const dates: string[] = [];
    const daysToShow = selectedRange === 'week' ? 7 : 30;
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    // Calculate completion rates for each habit
    const habitsData = state.habits.map(habit => {
      const dateCompletions = dates.map(date => {
        const historyEntry = habit.history.find(entry => entry.date === date);
        const completed = historyEntry ? historyEntry.completed : 0;
        const completionRate = habit.frequency > 0 ? Math.min(completed / habit.frequency, 1) : 0;
        return {
          date,
          completed,
          completionRate
        };
      });
      
      const totalCompletions = dateCompletions.reduce((sum, day) => sum + day.completed, 0);
      const totalPossible = dates.length * habit.frequency;
      const overallCompletionRate = totalPossible > 0 ? totalCompletions / totalPossible : 0;
      
      return {
        id: habit.id,
        name: habit.name,
        icon: habit.icon,
        color: habit.color,
        dateCompletions,
        overallCompletionRate,
        streak: habit.streak
      };
    });
    
    // Calculate overall app stats
    const totalCompletions = habitsData.reduce((sum, habit) => 
      sum + habit.dateCompletions.reduce((sum, day) => sum + day.completed, 0), 0);
    
    const totalPossibleCompletions = habitsData.reduce((sum, habit) => 
      sum + (habit.dateCompletions.length * habit.streak), 0);
    
    const overallCompletionRate = totalPossibleCompletions > 0 
      ? totalCompletions / totalPossibleCompletions 
      : 0;
    
    const bestStreak = Math.max(...habitsData.map(habit => habit.streak), 0);
    
    // Format dates for display (e.g., "Mon", "Tue", etc.)
    const formattedDates = dates.map(dateStr => {
      const date = new Date(dateStr);
      return selectedRange === 'week'
        ? date.toLocaleDateString('pt-BR', { weekday: 'short' })
        : date.getDate().toString();
    });
    
    return {
      habitsData,
      totalCompletions,
      overallCompletionRate,
      bestStreak,
      dates,
      formattedDates
    };
  }, [state.habits, selectedRange]);

  if (state.habits.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-6 text-center">
        <div className="py-10">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <LucideIcons.BarChart3 size={28} className="text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Sem dados para exibir</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
            Adicione hábitos e comece a registrá-los para ver suas estatísticas aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe seu progresso e conquistas
        </p>
      </div>

      <div className="mb-6 flex justify-between">
        <button
          onClick={() => setSelectedRange('week')}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            selectedRange === 'week' 
              ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Semana
        </button>
        <button
          onClick={() => setSelectedRange('month')}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            selectedRange === 'month' 
              ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Mês
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Conclusões</div>
          <div className="text-2xl font-bold">{stats.totalCompletions}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Melhor sequência</div>
          <div className="text-2xl font-bold">{stats.bestStreak} dias</div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Atividade recente</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between mb-2">
            {stats.formattedDates.map((date, index) => (
              <div key={index} className="text-xs text-center w-6">
                {date}
              </div>
            ))}
          </div>
          {stats.habitsData.map((habit) => {
            const Icon = LucideIcons[habit.icon as keyof typeof LucideIcons] || LucideIcons.Activity;
            const accentColor = getColorById(habit.color).accent;
            
            return (
              <div key={habit.id} className="mb-3 last:mb-0">
                <div className="flex items-center mb-1">
                  <div className={`p-1 rounded-full ${accentColor} text-white mr-2`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-medium">{habit.name}</span>
                </div>
                <div className="flex justify-between">
                  {habit.dateCompletions.map((day, index) => (
                    <div 
                      key={index} 
                      className={`w-6 h-6 rounded-sm ${
                        day.completionRate > 0 
                          ? day.completionRate >= 1 
                            ? accentColor
                            : `bg-opacity-${Math.round(day.completionRate * 100)} ${accentColor}`
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      style={{ opacity: day.completionRate > 0 ? 0.3 + (day.completionRate * 0.7) : undefined }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Taxa de conclusão</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="relative pt-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
              <span className="text-sm font-medium">
                {Math.round(stats.overallCompletionRate * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-teal-500 rounded-full"
                style={{ width: `${Math.round(stats.overallCompletionRate * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {stats.habitsData.map(habit => {
              const accentColor = getColorById(habit.color).accent;
              return (
                <div key={habit.id} className="relative pt-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{habit.name}</span>
                    <span className="text-sm font-medium">
                      {Math.round(habit.overallCompletionRate * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className={`h-2 rounded-full ${accentColor}`}
                      style={{ width: `${Math.round(habit.overallCompletionRate * 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;