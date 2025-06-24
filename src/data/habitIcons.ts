// Icons are imported from lucide-react
export const habitIcons = [
  {
    id: 'water',
    name: 'Água',
    icon: 'Droplets',
  },
  {
    id: 'exercise',
    name: 'Exercício',
    icon: 'Dumbbell',
  },
  {
    id: 'reading',
    name: 'Leitura',
    icon: 'BookOpen',
  },
  {
    id: 'meditation',
    name: 'Meditação',
    icon: 'Sparkles',
  },
  {
    id: 'sleep',
    name: 'Sono',
    icon: 'Moon',
  },
  {
    id: 'coding',
    name: 'Programação',
    icon: 'Code',
  },
  {
    id: 'healthy-food',
    name: 'Alimentação',
    icon: 'Apple',
  },
  {
    id: 'journaling',
    name: 'Diário',
    icon: 'PenTool',
  },
  {
    id: 'walking',
    name: 'Caminhada',
    icon: 'Footprints',
  },
  {
    id: 'vitamins',
    name: 'Vitaminas',
    icon: 'Pill',
  },
  {
    id: 'no-sugar',
    name: 'Sem Açúcar',
    icon: 'Candy',
  },
  {
    id: 'languages',
    name: 'Idiomas',
    icon: 'Languages',
  },
];

export const habitColors = [
  {
    id: 'teal',
    value: 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    accent: 'bg-teal-500 dark:bg-teal-400',
    preview: 'bg-teal-500',
  },
  {
    id: 'blue',
    value: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    accent: 'bg-blue-500 dark:bg-blue-400',
    preview: 'bg-blue-500',
  },
  {
    id: 'purple',
    value: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    accent: 'bg-purple-500 dark:bg-purple-400',
    preview: 'bg-purple-500',
  },
  {
    id: 'pink',
    value: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    accent: 'bg-pink-500 dark:bg-pink-400',
    preview: 'bg-pink-500',
  },
  {
    id: 'orange',
    value: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    accent: 'bg-orange-500 dark:bg-orange-400',
    preview: 'bg-orange-500',
  },
  {
    id: 'amber',
    value: 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    accent: 'bg-amber-500 dark:bg-amber-400',
    preview: 'bg-amber-500',
  },
  {
    id: 'green',
    value: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 border-green-200 dark:border-green-800',
    accent: 'bg-green-500 dark:bg-green-400',
    preview: 'bg-green-500',
  },
  {
    id: 'red',
    value: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 border-red-200 dark:border-red-800',
    accent: 'bg-red-500 dark:bg-red-400',
    preview: 'bg-red-500',
  },
];

export const getColorById = (id: string) => {
  return habitColors.find((color) => color.id === id) || habitColors[0];
};