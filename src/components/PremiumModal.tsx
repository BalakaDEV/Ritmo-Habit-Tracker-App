import React from 'react';
import * as LucideIcons from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Básico',
      price: 'R$4,90',
      period: 'por mês',
      features: [
        'Até 5 hábitos',
        'Estatísticas básicas',
        'Temas claro e escuro',
        'Suporte por email'
      ],
      popular: false,
      color: 'bg-gray-500'
    },
    {
      name: 'Pro',
      price: 'R$9,90',
      period: 'por mês',
      features: [
        'Hábitos ilimitados',
        'Estatísticas avançadas',
        'Temas personalizados',
        'Backup na nuvem',
        'Suporte prioritário',
        'Widgets personalizados',
        'Sem anúncios'
      ],
      popular: true,
      color: 'bg-purple-600'
    },
    {
      name: 'Família',
      price: 'R$19,90',
      period: 'por mês',
      features: [
        'Tudo do plano Pro',
        'Até 5 membros',
        'Compartilhamento de hábitos',
        'Desafios em grupo',
        'Relatórios familiares',
        'Suporte VIP 24/7'
      ],
      popular: false,
      color: 'bg-teal-600'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-3xl animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Escolha seu plano Premium</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Desbloqueie todo o potencial do Ritmo com nossos planos premium
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <LucideIcons.X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border ${
                plan.popular
                  ? 'border-purple-500 dark:border-purple-400 shadow-lg scale-105'
                  : 'border-gray-200 dark:border-gray-700'
              } p-6 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MAIS POPULAR
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <LucideIcons.Check
                      size={18}
                      className={`mr-2 ${plan.popular ? 'text-purple-500' : 'text-gray-500'}`}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100'
                }`}
              >
                Começar agora
              </button>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <LucideIcons.Shield size={16} />
            <span>Pagamento 100% seguro</span>
            <LucideIcons.CreditCard size={16} className="ml-2" />
            <span>Principais cartões aceitos</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Cancele a qualquer momento. Garantia de 7 dias ou seu dinheiro de volta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;