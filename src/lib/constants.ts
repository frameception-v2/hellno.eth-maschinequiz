export const PROJECT_ID = 'MaschineQuiz';
export const PROJECT_TITLE = "MaschineQuiz";
export const PROJECT_DESCRIPTION = "Test your knowledge of Maschine's capabilities with this interactive quiz!";
export const QUIZ_TITLE = "Maschine Capabilities Quiz";
export const QUIZ_DESCRIPTION = "Test your knowledge of Maschine's current capabilities";

export const QUESTIONS = [
  {
    prompt: "What can you build with Maschine RIGHT NOW?",
    answers: [
      "Complex DAO governance system",
      "Interactive quiz frames",
      "NFT minting contract",
      "Cross-chain bridge"
    ],
    correct: 1,
    correctResponse: "Exactly! Maschine excels at simple interactive frames like quizzes",
    incorrectResponse: "Not yet! Complex systems require more infrastructure"
  },
  {
    prompt: "What does Maschine NOT support yet?",
    answers: [
      "Basic frame interactions",
      "On-chain transactions", 
      "Multiple choice questions",
      "Progress tracking"
    ],
    correct: 3,
    correctResponse: "Correct! Progress tracking requires persistent storage",
    incorrectResponse: "Actually, Maschine handles these basic interactions well"
  },
  {
    prompt: "Which feature is coming soon?",
    answers: [
      "Simple buttons",
      "Text responses",
      "User authentication",
      "Image generation"
    ],
    correct: 2,
    correctResponse: "Yes! Basic auth is on the roadmap",
    incorrectResponse: "Not quite - that's already possible or needs more infrastructure"
  }
];
