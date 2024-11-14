import React, { useState, useEffect, useCallback } from 'react';
import { SpeedInput } from './components/SpeedInput';
import { SimulationTrack } from './components/SimulationTrack';
import { InfoPanel } from './components/InfoPanel';
import { Question } from './components/Question';
import { Graphs } from './components/Graphs';
import { generateQuestionSet } from './utils/questions';

const MAX_DISTANCE = 500; // metres
const MAX_TIME = 50; // seconds
const WRONG_ANSWER_PENALTY = -3;

const App: React.FC = () => {
  const [speed, setSpeed] = useState(10);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentQuestionSet, setCurrentQuestionSet] = useState(generateQuestionSet(speed, selectedDifficulty));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [graphData, setGraphData] = useState({
    time: [] as number[],
    distance: [] as number[],
    speed: [] as number[],
  });

  const currentQuestion = currentQuestionSet[currentQuestionIndex];

  const animate = useCallback(() => {
    if (!isAnimating) return;
    
    setDistance(prev => {
      const newDistance = prev + speed / 10;
      if (newDistance >= MAX_DISTANCE) {
        setIsAnimating(false);
        return MAX_DISTANCE;
      }
      return newDistance;
    });
    
    setTime(prev => {
      const newTime = prev + 0.1;
      if (newTime >= MAX_TIME) {
        setIsAnimating(false);
        return MAX_TIME;
      }
      setGraphData(prevData => ({
        time: [...prevData.time, newTime],
        distance: [...prevData.distance, distance],
        speed: [...prevData.speed, speed],
      }));
      return newTime;
    });
  }, [isAnimating, speed, distance]);

  useEffect(() => {
    const interval = setInterval(animate, 100);
    return () => clearInterval(interval);
  }, [animate]);

  const handleStart = () => {
    setIsAnimating(true);
    setDistance(0);
    setTime(0);
    setGraphData({
      time: [],
      distance: [],
      speed: [],
    });
  };

  const handleStop = () => {
    setIsAnimating(false);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (!isAnimating) {
      setCurrentQuestionSet(generateQuestionSet(newSpeed, selectedDifficulty));
      setCurrentQuestionIndex(0);
    }
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty);
    setCurrentQuestionSet(generateQuestionSet(speed, difficulty));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowHint(false);
    setShowResult(false);
    setHintLevel(0);
  };

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct) {
      setScore(prev => prev + currentQuestion.points);
    } else {
      setScore(prev => prev + WRONG_ANSWER_PENALTY);
      setShowHint(true);
      setShowResult(true);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestionSet.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setShowResult(false);
      setHintLevel(0);
    } else {
      setCurrentQuestionSet(generateQuestionSet(speed, selectedDifficulty));
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowHint(false);
      setShowResult(false);
      setHintLevel(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Hız-Mesafe-Zaman Simülasyonu</h1>
          <p className="text-lg text-gray-600">Puan: {score} | Soru: {currentQuestionIndex + 1}/{currentQuestionSet.length}</p>
        </div>

        <div className="mb-6">
          <SpeedInput 
            speed={speed} 
            onSpeedChange={handleSpeedChange}
            disabled={isAnimating}
          />
        </div>

        <div className="mb-6">
          <SimulationTrack distance={distance} />
        </div>

        <div className="mb-6">
          <InfoPanel speed={speed} distance={distance} time={time} />
        </div>

        <div className="mb-6">
          <Graphs data={graphData} />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleStart}
            disabled={isAnimating}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            Simülasyonu Başlat
          </button>
          <button
            onClick={handleStop}
            disabled={!isAnimating}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            Simülasyonu Durdur
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleDifficultyChange('easy')}
            className={`px-4 py-2 rounded-lg ${
              selectedDifficulty === 'easy'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Kolay
          </button>
          <button
            onClick={() => handleDifficultyChange('medium')}
            className={`px-4 py-2 rounded-lg ${
              selectedDifficulty === 'medium'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Orta
          </button>
          <button
            onClick={() => handleDifficultyChange('hard')}
            className={`px-4 py-2 rounded-lg ${
              selectedDifficulty === 'hard'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Zor
          </button>
        </div>

        {currentQuestion && (
          <>
            <Question
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              showHint={showHint}
              showResult={showResult}
              hintLevel={hintLevel}
            />
            {showResult && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Sonraki Soru
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;