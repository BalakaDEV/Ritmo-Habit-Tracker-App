import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import HabitCard from './HabitCard';
import AddHabitModal from './AddHabitModal';
import { getRandomQuote } from '../data/quotes';
import { PlusCircle, Quote } from 'lucide-react';

const HabitsList: React.FC = () => {
  const { state } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [quote] = useState(getRandomQuote());

  const showPaywall = state.habits.length >= 3 && !state.isPremium;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Meus Hábitos</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-start">
        <Quote size={18} className="mr-2 mt-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        <div>
          <p className="text-sm italic mb-1">{quote.quote}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">— {quote.author}</p>
        </div>
      </div>

      {state.habits.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusCircle size={28} className="text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Comece adicionando um hábito</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
            Acompanhe suas atividades diárias e construa uma rotina consistente.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Adicionar hábito
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {state.habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <PlusCircle size={20} className="mr-2" />
            <span>Adicionar hábito</span>
          </button>
        </>
      )}

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        showPaywall={showPaywall}
      />
    </div>
  );
};

export default HabitsList;