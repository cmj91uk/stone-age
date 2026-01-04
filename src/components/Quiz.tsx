import { useState } from 'react'
import { TbCheck, TbX } from 'react-icons/tb'
import party from 'party-js'

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ColorTheme {
  name: string
  bgPage: string
  bgCard: string
  borderCard: string
  textTitle: string
  textPrimary: string
  textSecondary: string
  bgScore: string
  textScore: string
  bgButton: string
  bgButtonHover: string
  borderOption: string
  borderOptionHover: string
  bgOptionHover: string
}

export const colorOptions: ColorTheme[] = [
  {
    name: 'Amber',
    bgPage: 'bg-amber-50',
    bgCard: 'bg-white',
    borderCard: 'border-amber-200',
    textTitle: 'text-amber-700',
    textPrimary: 'text-amber-600',
    textSecondary: 'text-stone-800',
    bgScore: 'bg-amber-100',
    textScore: 'text-amber-700',
    bgButton: 'bg-amber-500',
    bgButtonHover: 'hover:bg-amber-600',
    borderOption: 'border-amber-100',
    borderOptionHover: 'hover:border-amber-400',
    bgOptionHover: 'hover:bg-amber-50'
  },
  {
    name: 'Blue',
    bgPage: 'bg-blue-50',
    bgCard: 'bg-white',
    borderCard: 'border-blue-200',
    textTitle: 'text-blue-700',
    textPrimary: 'text-blue-600',
    textSecondary: 'text-slate-800',
    bgScore: 'bg-blue-100',
    textScore: 'text-blue-700',
    bgButton: 'bg-blue-500',
    bgButtonHover: 'hover:bg-blue-600',
    borderOption: 'border-blue-100',
    borderOptionHover: 'hover:border-blue-400',
    bgOptionHover: 'hover:bg-blue-50'
  },
  {
    name: 'Purple',
    bgPage: 'bg-purple-50',
    bgCard: 'bg-white',
    borderCard: 'border-purple-200',
    textTitle: 'text-purple-700',
    textPrimary: 'text-purple-600',
    textSecondary: 'text-slate-800',
    bgScore: 'bg-purple-100',
    textScore: 'text-purple-700',
    bgButton: 'bg-purple-500',
    bgButtonHover: 'hover:bg-purple-600',
    borderOption: 'border-purple-100',
    borderOptionHover: 'hover:border-purple-400',
    bgOptionHover: 'hover:bg-purple-50'
  },
  {
    name: 'Pink',
    bgPage: 'bg-pink-50',
    bgCard: 'bg-white',
    borderCard: 'border-pink-200',
    textTitle: 'text-pink-700',
    textPrimary: 'text-pink-600',
    textSecondary: 'text-slate-800',
    bgScore: 'bg-pink-100',
    textScore: 'text-pink-700',
    bgButton: 'bg-pink-500',
    bgButtonHover: 'hover:bg-pink-600',
    borderOption: 'border-pink-100',
    borderOptionHover: 'hover:border-pink-400',
    bgOptionHover: 'hover:bg-pink-50'
  },
  {
    name: 'Green',
    bgPage: 'bg-emerald-50',
    bgCard: 'bg-white',
    borderCard: 'border-emerald-200',
    textTitle: 'text-emerald-700',
    textPrimary: 'text-emerald-600',
    textSecondary: 'text-slate-800',
    bgScore: 'bg-emerald-100',
    textScore: 'text-emerald-700',
    bgButton: 'bg-emerald-500',
    bgButtonHover: 'hover:bg-emerald-600',
    borderOption: 'border-emerald-100',
    borderOptionHover: 'hover:border-emerald-400',
    bgOptionHover: 'hover:bg-emerald-50'
  },
  {
    name: 'Red',
    bgPage: 'bg-rose-50',
    bgCard: 'bg-white',
    borderCard: 'border-rose-200',
    textTitle: 'text-rose-700',
    textPrimary: 'text-rose-600',
    textSecondary: 'text-slate-800',
    bgScore: 'bg-rose-100',
    textScore: 'text-rose-700',
    bgButton: 'bg-rose-500',
    bgButtonHover: 'hover:bg-rose-600',
    borderOption: 'border-rose-100',
    borderOptionHover: 'hover:border-rose-400',
    bgOptionHover: 'hover:bg-rose-50'
  }
]

const questions: Question[] = [
  {
    question: "What did Stone Age people use to make their tools?",
    options: ["Plastic", "Flint", "Steel"],
    correctAnswer: 1
  },
  {
    question: "Where did many Stone Age people live?",
    options: ["Skyscrapers", "Caves", "Houseboats"],
    correctAnswer: 1
  },
  {
    question: "Which of these animals lived during the Stone Age?",
    options: ["Woolly Mammoth", "Giraffe", "Penguin"],
    correctAnswer: 0
  },
  {
    question: "What was used to make fire in the Stone Age?",
    options: ["Lighters", "Rubbing sticks or striking stones", "Gas stoves"],
    correctAnswer: 1
  },
  {
    question: "What did Stone Age people paint on cave walls?",
    options: ["Cars", "Animals and handprints", "Computers"],
    correctAnswer: 1
  },
  {
    question: "What did Stone Age people wear for clothes?",
    options: ["Cotton T-shirts", "Animal skins", "Polyester suits"],
    correctAnswer: 1
  },
  {
    question: "What were Stone Age spears used for?",
    options: ["Fishing and hunting", "Painting", "Gardening"],
    correctAnswer: 0
  },
  {
    question: "Which period came first?",
    options: ["Iron Age", "Bronze Age", "Stone Age"],
    correctAnswer: 2
  },
  {
    question: "What did they use to make jewelry?",
    options: ["Shells and bones", "Plastic beads", "Glass"],
    correctAnswer: 0
  },
  {
    question: "How did Stone Age people get their food?",
    options: ["Supermarkets", "Hunting and gathering", "Ordering pizza"],
    correctAnswer: 1
  }
];

export function Quiz({ userName, theme }: { userName: string; theme: ColorTheme }) {
  const [currentTheme] = useState(theme);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerClick = (index: number, target: HTMLElement) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      party.confetti(target, {
        count: party.variation.range(20, 40)
      });
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className={`min-h-screen ${currentTheme.bgPage} flex flex-col items-center justify-center p-4 ${currentTheme.textSecondary} font-sans`}>
        <div className={`${currentTheme.bgCard} p-8 rounded-3xl shadow-xl max-w-md w-full text-center border-4 ${currentTheme.borderCard}`}>
          <h1 className={`text-4xl font-bold mb-6 ${currentTheme.textTitle}`}>Well done, {userName}!</h1>
          <p className="text-2xl mb-8">You scored <span className={`font-bold ${currentTheme.textPrimary}`}>{score}</span> out of {questions.length}</p>
          <button
            onClick={resetQuiz}
            className={`w-full ${currentTheme.bgButton} ${currentTheme.bgButtonHover} text-white font-bold py-4 px-8 rounded-2xl text-xl transition-colors shadow-lg`}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className={`min-h-screen ${currentTheme.bgPage} flex flex-col items-center justify-center p-4 ${currentTheme.textSecondary} font-sans`}>
      <div className={`max-w-2xl w-full ${currentTheme.bgCard} p-8 rounded-3xl shadow-xl border-4 ${currentTheme.borderCard}`}>
        <div className="mb-4 text-center">
          <span className={`text-xl font-bold ${currentTheme.textPrimary}`}>Good luck, {userName}!</span>
        </div>
        <div className="mb-8 flex justify-between items-center">
          <span className={`${currentTheme.textPrimary} font-bold text-lg`}>Question {currentQuestion + 1} of {questions.length}</span>
          <span className={`${currentTheme.bgScore} px-4 py-1 rounded-full ${currentTheme.textScore} font-semibold`}>Score: {score}</span>
        </div>

        <h2 className="text-3xl font-bold mb-10 text-center leading-tight">
          {q.question}
        </h2>

        <div className="space-y-4 mb-10">
          {q.options.map((option, index) => {
            let buttonClass = "w-full text-left p-6 rounded-2xl text-xl font-semibold transition-all border-2 ";

            if (selectedAnswer === null) {
              buttonClass += `${currentTheme.borderOption} ${currentTheme.borderOptionHover} ${currentTheme.bgOptionHover} ${currentTheme.bgCard}`;
            } else {
              if (index === q.correctAnswer) {
                buttonClass += "border-green-500 bg-green-100 text-green-800 ring-4 ring-green-200";
              } else if (index === selectedAnswer) {
                buttonClass += "border-red-500 bg-red-100 text-red-800";
              } else {
                buttonClass += "border-gray-100 bg-gray-50 text-gray-400 opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={(e) => handleAnswerClick(index, e.currentTarget)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{option}</span>
                  {selectedAnswer !== null && (
                    <>
                      {index === q.correctAnswer && <TbCheck className="text-3xl text-green-600" />}
                      {index === selectedAnswer && index !== q.correctAnswer && <TbX className="text-3xl text-red-600" />}
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <button
            onClick={handleNextQuestion}
            className={`w-full ${currentTheme.bgButton} ${currentTheme.bgButtonHover} text-white font-bold py-4 px-8 rounded-2xl text-2xl transition-all shadow-lg animate-bounce mt-4`}
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
