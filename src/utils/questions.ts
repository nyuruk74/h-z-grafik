interface Question {
  id: number;
  time: number;
  speed: number;
  options: number[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  explanation: string;
  type: 'calculation' | 'graph' | 'concept';
  questionText: string;
  solution?: string;
  bloomLevel?: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation';
}

const DIFFICULTY_POINTS = {
  easy: 10,
  medium: 15,
  hard: 20,
};

const WRONG_ANSWER_PENALTY = -3;

function generateCalculationQuestion(speed: number, difficulty: 'easy' | 'medium' | 'hard'): Question {
  let time: number;
  let bloomLevel: Question['bloomLevel'];
  
  switch (difficulty) {
    case 'easy':
      time = Math.floor(Math.random() * 5) + 1;
      bloomLevel = 'knowledge';
      break;
    case 'medium':
      time = Math.floor(Math.random() * 10) + 6;
      bloomLevel = 'application';
      break;
    case 'hard':
      time = Math.floor(Math.random() * 15) + 16;
      bloomLevel = 'analysis';
      break;
  }
  
  const correct = Math.round(speed * time);
  const solution = `Çözüm Adımları:
1. Verilen değerler:
   • Hız (v) = ${speed} m/s
   • Zaman (t) = ${time} s

2. Formül:
   • Alınan yol = Hız × Zaman
   • x = v × t

3. Hesaplama:
   • x = ${speed} × ${time}
   • x = ${correct} metre`;
  
  return {
    id: Math.random(),
    time,
    speed,
    options: generateOptions(correct, difficulty === 'easy' ? 0.1 : difficulty === 'medium' ? 0.15 : 0.2),
    correct,
    difficulty,
    points: DIFFICULTY_POINTS[difficulty],
    type: 'calculation',
    questionText: `${speed} m/s sabit hızla hareket eden araç ${time} saniye sonra kaç metre yol almış olur?`,
    explanation: `Sabit hızda hareket eden bir araç için her saniye eşit yol alınır. ${time} saniye boyunca ${speed} m/s hızla giden araç toplam ${correct} metre yol alır.`,
    solution,
    bloomLevel
  };
}

function generateGraphQuestion(speed: number, difficulty: 'easy' | 'medium' | 'hard'): Question {
  let time: number;
  let questionText: string;
  let explanation: string;
  let solution: string;
  let bloomLevel: Question['bloomLevel'];

  switch (difficulty) {
    case 'easy':
      time = Math.floor(Math.random() * 5) + 1;
      bloomLevel = 'comprehension';
      questionText = `Yol-zaman grafiğinde gösterilen ${speed} m/s hızla hareket eden aracın ${time}. saniyedeki konumu nedir?`;
      solution = `Çözüm Adımları:
1. Yol-zaman grafiğinde:
   • Grafiğin eğimi hızı verir
   • Eğim = ${speed} m/s (sabit)

2. Konum hesaplama:
   • Konum = Hız × Zaman
   • x = ${speed} × ${time}
   • x = ${speed * time} metre`;
      break;

    case 'medium':
      time = Math.floor(Math.random() * 10) + 6;
      bloomLevel = 'analysis';
      questionText = `Hız-zaman grafiğinde ${speed} m/s'lik sabit hızla ${time} saniye hareket eden aracın aldığı toplam yol kaç metredir?`;
      solution = `Çözüm Adımları:
1. Hız-zaman grafiğinde:
   • Grafiğin altında kalan alan yolu verir
   • Alan = Yükseklik × Taban
   • Alan = Hız × Zaman

2. Hesaplama:
   • Alan = ${speed} × ${time}
   • Yol = ${speed * time} metre`;
      break;

    case 'hard':
      time = Math.floor(Math.random() * 15) + 16;
      bloomLevel = 'evaluation';
      questionText = `Yol-zaman grafiğinin eğiminden hızı ${speed} m/s olarak hesaplanan araç ${time} saniye sonra kaç metre yol almış olur? Grafiği yorumlayarak açıklayınız.`;
      solution = `Çözüm Adımları:
1. Grafiğin analizi:
   • Eğim = Δx/Δt = ${speed} m/s
   • Doğrusal grafik → Sabit hız

2. Yol hesaplama:
   • Toplam yol = Hız × Zaman
   • x = ${speed} × ${time}
   • x = ${speed * time} metre

3. Yorumlama:
   • Sabit eğim → Düzgün doğrusal hareket
   • Her saniye ${speed} metre yol alınır`;
      break;
  }

  const correct = speed * time;
  explanation = `Grafikte ${speed} m/s sabit hızla ${time} saniye hareket eden araç ${correct} metre yol alır.`;

  return {
    id: Math.random(),
    time,
    speed,
    options: generateOptions(correct, difficulty === 'easy' ? 0.1 : difficulty === 'medium' ? 0.15 : 0.2),
    correct,
    difficulty,
    points: DIFFICULTY_POINTS[difficulty],
    type: 'graph',
    questionText,
    explanation,
    solution,
    bloomLevel
  };
}

function generateConceptQuestion(speed: number, difficulty: 'easy' | 'medium' | 'hard'): Question {
  const time = Math.floor(Math.random() * 5) + 1;
  let bloomLevel: Question['bloomLevel'];

  const concepts = {
    easy: [
      {
        question: `${speed} m/s hızla giden bir araç için aşağıdakilerden hangisi doğrudur?`,
        options: [
          `Her saniye ${speed} metre yol alır`,
          `Hızı zamanla artar`,
          `Hızı zamanla azalır`,
          `Aldığı yol zamana bağlı değildir`
        ],
        correctIndex: 0,
        explanation: `Sabit hızlı harekette araç her saniye eşit mesafe alır ve bu mesafe hıza eşittir.`,
        solution: `Çözüm:
1. Sabit hız kavramı:
   • Hız değişmez (${speed} m/s)
   • Her saniye aynı mesafe alınır
   • Alınan mesafe = Hız değeri
   • Her saniye ${speed} metre yol alınır`
      }
    ],
    medium: [
      {
        question: `${speed} m/s sabit hızla giden bir aracın grafikleri için ne söylenebilir?`,
        options: [
          'Hız-zaman grafiği yatay doğrudur',
          'Yol-zaman grafiği yataydır',
          'Hız-zaman grafiği eğimlidir',
          'Yol zamanın karesiyle değişir'
        ],
        correctIndex: 0,
        explanation: `Sabit hızlı harekette hız-zaman grafiği yatay, yol-zaman grafiği eğimli doğrudur.`,
        solution: `Çözüm:
1. Hız-zaman grafiği analizi:
   • Sabit hız → Yatay doğru
   • y = ${speed} (sabit)

2. Yol-zaman grafiği analizi:
   • Eğim = Hız = ${speed} m/s
   • Doğrusal artış
   • x = v × t formülü geçerli`
      }
    ],
    hard: [
      {
        question: `${speed} m/s hızla giden bir aracın hareketi için yapılan yorumlardan hangisi doğrudur?`,
        options: [
          `Yol-zaman grafiğinin eğimi ${speed} m/s'dir`,
          'İvmesi zamanla değişir',
          'Hızı zamanla artar',
          'Yol-zaman grafiği paraboliktir'
        ],
        correctIndex: 0,
        explanation: `Yol-zaman grafiğinin eğimi hızı verir ve sabit hızlı harekette bu eğim sabittir.`,
        solution: `Çözüm:
1. Hareket analizi:
   • Sabit hız → İvme yok
   • v = ${speed} m/s (değişmez)

2. Grafik yorumu:
   • Yol-zaman grafiği doğrusal
   • Eğim = Δx/Δt = ${speed} m/s
   • Eğim = Hız

3. Değerlendirme:
   • Sabit eğim → Sabit hız
   • Doğrusal ilişki → x = v × t`
      }
    ]
  };

  const selectedConcept = concepts[difficulty][0];
  bloomLevel = difficulty === 'easy' ? 'comprehension' : difficulty === 'medium' ? 'analysis' : 'synthesis';

  return {
    id: Math.random(),
    time,
    speed,
    options: Array.from({ length: 4 }, (_, i) => i),
    correct: selectedConcept.correctIndex,
    difficulty,
    points: DIFFICULTY_POINTS[difficulty],
    type: 'concept',
    questionText: selectedConcept.question,
    explanation: selectedConcept.explanation,
    solution: selectedConcept.solution,
    bloomLevel
  };
}

function generateOptions(correct: number, variance: number): number[] {
  const options = [
    Math.round(correct * (1 - variance)),
    correct,
    Math.round(correct * (1 + variance)),
    Math.round(correct * (1 + variance * 2))
  ];
  return options.sort(() => Math.random() - 0.5);
}

export function generateQuestionSet(speed: number, difficulty: 'easy' | 'medium' | 'hard'): Question[] {
  const questions: Question[] = [];
  
  // Her zorluk seviyesi için 5 soru
  for (let i = 0; i < 2; i++) questions.push(generateCalculationQuestion(speed, difficulty));
  for (let i = 0; i < 2; i++) questions.push(generateGraphQuestion(speed, difficulty));
  questions.push(generateConceptQuestion(speed, difficulty));
  
  return questions.sort(() => Math.random() - 0.5);
}

export function generateQuestion(speed: number, difficulty: 'easy' | 'medium' | 'hard'): Question {
  const questionTypes = [
    { type: generateCalculationQuestion, weight: 2 },
    { type: generateGraphQuestion, weight: 2 },
    { type: generateConceptQuestion, weight: 1 }
  ];

  const totalWeight = questionTypes.reduce((sum, type) => sum + type.weight, 0);
  let random = Math.random() * totalWeight;

  for (const questionType of questionTypes) {
    if (random < questionType.weight) {
      return questionType.type(speed, difficulty);
    }
    random -= questionType.weight;
  }

  return generateCalculationQuestion(speed, difficulty);
}