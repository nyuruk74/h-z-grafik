import React from 'react';
import { CheckCircle, HelpCircle, Calculator, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

interface QuestionProps {
  question: {
    id: number;
    time: number;
    speed: number;
    options: number[];
    correct: number;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    explanation: string;
    solution?: string;
    type: 'calculation' | 'graph' | 'concept';
    questionText: string;
    bloomLevel?: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation';
  };
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  showHint: boolean;
  showResult: boolean;
  hintLevel: number;
}

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
};

const TYPE_ICONS = {
  'calculation': Calculator,
  'graph': TrendingUp,
  'concept': BookOpen
};

const TYPE_LABELS = {
  'calculation': 'Hesaplama',
  'graph': 'Grafik',
  'concept': 'Kavramsal'
};

const BLOOM_LABELS = {
  'knowledge': 'Bilgi',
  'comprehension': 'Kavrama',
  'application': 'Uygulama',
  'analysis': 'Analiz',
  'synthesis': 'Sentez',
  'evaluation': 'Değerlendirme'
};

export function Question({ 
  question,
  selectedAnswer, 
  onAnswerSelect, 
  showHint, 
  showResult,
  hintLevel
}: QuestionProps) {
  const TypeIcon = TYPE_ICONS[question.type];

  const hints = [
    {
      text: "Temel kavramları hatırlayalım:",
      explanation: question.type === 'concept' 
        ? "Sabit hızlı harekette hız değişmez ve her saniye eşit yol alınır."
        : "Yol = Hız × Zaman formülünü kullanacağız."
    },
    {
      text: "Verilen değerleri inceleyelim:",
      explanation: question.type === 'concept'
        ? "Grafikler ve hareket arasındaki ilişkiyi düşünün."
        : `Hız = ${question.speed} m/s, Zaman = ${question.time} s`
    },
    {
      text: "Çözüm yolu:",
      explanation: question.solution || question.explanation
    }
  ];

  const renderOptions = () => {
    if (question.type === 'concept') {
      return (
        <div className="grid grid-cols-1 gap-4 mb-4">
          {['Her saniye eşit yol alır', 'Hızı zamanla artar', 'Hızı zamanla azalır', 'Yol zamana bağlı değildir'].map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-lg transition-all text-left ${
                selectedAnswer === null
                  ? 'bg-white border-2 border-blue-200 hover:border-blue-500'
                  : index === question.correct
                  ? 'bg-green-100 border-2 border-green-500'
                  : selectedAnswer === index
                  ? 'bg-red-100 border-2 border-red-500'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            disabled={selectedAnswer !== null}
            className={`p-4 rounded-lg transition-all ${
              selectedAnswer === null
                ? 'bg-white border-2 border-blue-200 hover:border-blue-500'
                : option === question.correct
                ? 'bg-green-100 border-2 border-green-500'
                : selectedAnswer === option
                ? 'bg-red-100 border-2 border-red-500'
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
          >
            {option} {question.type !== 'concept' ? 'metre' : ''}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${DIFFICULTY_COLORS[question.difficulty]}`}>
            {question.difficulty === 'easy' ? 'Kolay (10p)' : 
             question.difficulty === 'medium' ? 'Orta (15p)' : 'Zor (20p)'}
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <TypeIcon className="w-4 h-4" />
            {TYPE_LABELS[question.type]}
          </span>
          {question.bloomLevel && (
            <span className="text-sm text-gray-500">
              ({BLOOM_LABELS[question.bloomLevel]})
            </span>
          )}
        </div>
        <span className="text-blue-600 font-semibold">{question.points} Puan</span>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {question.questionText}
      </h2>

      {renderOptions()}

      {showResult && selectedAnswer !== question.correct && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <div className="flex items-start gap-2">
            <ArrowRight className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold text-red-700 mb-2">Yanlış Cevap (-3 puan)</h3>
              <div className="text-gray-700 whitespace-pre-line">
                <p className="font-semibold mb-2">Detaylı Çözüm:</p>
                {question.solution}
              </div>
            </div>
          </div>
        </div>
      )}

      {showResult && selectedAnswer === question.correct && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-green-700 mb-2">Doğru Cevap!</h3>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {showHint && !showResult && hintLevel <= hints.length && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-500 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">İpucu {hintLevel}:</h3>
              <p className="text-gray-700">{hints[hintLevel - 1]?.text}</p>
              <p className="text-gray-600 mt-2 text-sm italic">{hints[hintLevel - 1]?.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}