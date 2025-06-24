import React from 'react';
import { Habit } from '../types';
import { useAppContext } from '../context/AppContext';
import * as LucideIcons from 'lucide-react';
import { getColorById } from '../data/habitIcons';

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { trackHabit } = useAppContext();
  const colorClasses = getColorById(habit.color).value;
  const accentColor = getColorById(habit.color).accent;

  // Get the appropriate icon from Lucide
  const IconComponent = LucideIcons[habit.icon as keyof typeof LucideIcons] || LucideIcons.Activity;

  // Calculate progress percentage
  const progressPercent = (habit.completedToday / habit.frequency) * 100;
  const isComplete = habit.completedToday >= habit.frequency;

  const handleTrack = () => {
    if (!isComplete) {
      trackHabit(habit.id);
    }
  };

  return (
    <div className={`rounded-xl border ${colorClasses} p-4 mb-4 transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${accentColor} text-white`}>
            <IconComponent size={20} />
          </div>
          <h3 className="ml-3 font-medium text-lg">{habit.name}</h3>
        </div>
        {habit.streak > 0 && (
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            <LucideIcons.Flame size={14} className="text-orange-500" />
            <span className="ml-1 text-xs font-medium">{habit.streak}</span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <div className="flex justify-between mb-1 text-sm">
          <span>Progresso diário</span>
          <span>
            {habit.completedToday}/{habit.frequency}
          </span>
        </div>
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${accentColor} transition-all duration-500 ease-out`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <button
        onClick={handleTrack}
        disabled={isComplete}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 
          ${
            isComplete
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              : `${accentColor} text-white hover:opacity-90 transform hover:-translate-y-0.5 active:translate-y-0`
          }`}
      >
        {isComplete ? (
          <div className="flex items-center justify-center">
            <LucideIcons.CheckCircle size={18} className="mr-2" />
            Concluído
          </div>
        ) : (
          'Registrar'
        )}
      </button>
    </div>
  );
};

export default HabitCard;