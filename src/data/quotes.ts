export const motivationalQuotes = [
  {
    quote: "Pequenas ações repetidas levam a grandes mudanças.",
    author: "Anonymous"
  },
  {
    quote: "Disciplina é escolher entre o que você quer agora e o que você quer mais.",
    author: "Abraham Lincoln"
  },
  {
    quote: "Comece onde você está. Use o que você tem. Faça o que você pode.",
    author: "Arthur Ashe"
  },
  {
    quote: "A consistência é o que transforma o excelente em extraordinário.",
    author: "Anonymous"
  },
  {
    quote: "O sucesso não é construído em um dia, mas em todos os dias.",
    author: "Anonymous"
  },
  {
    quote: "Hábitos são os compostos de juros da auto-melhoria.",
    author: "James Clear"
  },
  {
    quote: "A chave não é priorizar o que está na sua agenda, mas agendar suas prioridades.",
    author: "Stephen Covey"
  },
  {
    quote: "Não se meça pelo que você conquistou, mas pelo que deveria ter conquistado com sua capacidade.",
    author: "John Wooden"
  },
  {
    quote: "Você não tem que ser grande para começar, mas precisa começar para ser grande.",
    author: "Zig Ziglar"
  },
  {
    quote: "O progresso consiste em fazer um passo adiante todos os dias.",
    author: "Anonymous"
  }
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};