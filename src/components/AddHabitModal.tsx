import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { habitIcons, habitColors } from '../data/habitIcons';
import * as LucideIcons from 'lucide-react';
import PremiumModal from './PremiumModal';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  showPaywall: boolean;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, showPaywall }) => {
  const { addHabit } = useAppContext();
  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(habitIcons[0].icon);
  const [frequency, setFrequency] = useState(1);
  const [selectedColor, setSelectedColor] = useState(habitColors[0].id);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (habitName.trim() === '') return;
    
    addHabit({
      name: habitName,
      icon: selectedIcon,
      frequency,
      color: selectedColor,
    });
    
    // Reset form
    setHabitName('');
    setSelectedIcon(habitIcons[0].icon);
    setFrequency(1);
    setSelectedColor(habitColors[0].id);
    
    onClose();
  };

  if (!isOpen) return null;

  if (showPaywall) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <LucideIcons.Lock className="mx-auto mb-4 text-purple-500\" size={48} />
              <h2 className="text-xl font-semibold mb-2">Limite de Hábitos Atingido</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Você atingiu o limite gratuito de 3 hábitos. Para registrar mais, assine o plano Premium.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                setIsPremiumModalOpen(true);
              }}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium mb-4 transition-colors duration-200"
            >
              Ver planos Premium
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              Talvez depois
            </button>
          </div>
        </div>
        <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Adicionar Hábito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <LucideIcons.X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="habitName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome do hábito
            </label>
            <input
              type="text"
              id="habitName"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700"
              placeholder="Ex: Beber água"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ícone
            </label>
            <div className="grid grid-cols-4 gap-2">
              {habitIcons.map((iconItem) => {
                const Icon = LucideIcons[iconItem.icon as keyof typeof LucideIcons] || LucideIcons.Activity;
                return (
                  <button
                    key={iconItem.id}
                    type="button"
                    onClick={() => setSelectedIcon(iconItem.icon)}
                    className={`p-3 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      selectedIcon === iconItem.icon
                        ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 border-2 border-teal-500'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cor
            </label>
            <div className="flex flex-wrap gap-2">
              {habitColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-8 h-8 rounded-full transition-transform duration-200 ${
                    selectedColor === color.id ? 'transform scale-110 ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: `var(--${color.preview})` }}
                >
                  <span className="sr-only">{color.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Frequência diária
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setFrequency(Math.max(1, frequency - 1))}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-l-lg"
              >
                <LucideIcons.Minus size={16} />
              </button>
              <input
                type="number"
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-16 text-center border-t border-b border-gray-300 dark:border-gray-600 py-2 dark:bg-gray-700"
              />
              <button
                type="button"
                onClick={() => setFrequency(frequency + 1)}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-r-lg"
              >
                <LucideIcons.Plus size={16} />
              </button>
              <span className="ml-2 text-gray-600 dark:text-gray-400">vezes por dia</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;