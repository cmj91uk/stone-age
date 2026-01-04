import { useState } from 'react'

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

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

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
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
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 text-stone-800 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border-4 border-amber-200">
          <h1 className="text-4xl font-bold mb-6 text-amber-700">Quiz Finished!</h1>
          <p className="text-2xl mb-8">You scored <span className="font-bold text-amber-600">{score}</span> out of {questions.length}</p>
          <button
            onClick={resetQuiz}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-colors shadow-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 text-stone-800 font-sans">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-xl border-4 border-amber-200">
        <div className="mb-8 flex justify-between items-center">
          <span className="text-amber-600 font-bold text-lg">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="bg-amber-100 px-4 py-1 rounded-full text-amber-700 font-semibold">Score: {score}</span>
        </div>

        <h2 className="text-3xl font-bold mb-10 text-center leading-tight">
          {q.question}
        </h2>

        <div className="space-y-4 mb-10">
          {q.options.map((option, index) => {
            let buttonClass = "w-full text-left p-6 rounded-2xl text-xl font-semibold transition-all border-2 ";

            if (selectedAnswer === null) {
              buttonClass += "border-amber-100 hover:border-amber-400 hover:bg-amber-50 bg-white";
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
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <button
            onClick={handleNextQuestion}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-2xl transition-all shadow-lg animate-bounce mt-4"
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
