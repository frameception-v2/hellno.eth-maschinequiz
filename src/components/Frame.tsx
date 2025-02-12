"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, { AddFrame, type Context } from "@farcaster/frame-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/components/ui/card";
import { PROJECT_TITLE, QUIZ_TITLE, QUIZ_DESCRIPTION, QUESTIONS } from "~/lib/constants";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";

function QuizCard({ question, onAnswer, selectedAnswer, score, progress }: {
  question: typeof QUESTIONS[number],
  onAnswer: (index: number) => void,
  selectedAnswer: number | null,
  score: number,
  progress: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{QUIZ_TITLE}</CardTitle>
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lg">{question.prompt}</Label>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Score: {score}</span>
                <span>Question {progress / (100 / (QUESTIONS.length - 1)) + 1}/{QUESTIONS.length}</span>
              </div>
            </div>

            <div className="grid gap-2">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => onAnswer(index)}
                  className={`p-2 text-left rounded border ${
                    selectedAnswer === index 
                      ? index === question.correct 
                        ? 'bg-green-100 border-green-500' 
                        : 'bg-red-100 border-red-500'
                      : 'hover:bg-gray-50'
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {answer}
                  {selectedAnswer === index && (
                    <span className="ml-2 text-sm">
                      {index === question.correct 
                        ? question.correctResponse 
                        : question.incorrectResponse}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === QUESTIONS[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      sdk.actions.ready({});
      setIsSDKLoaded(true);
    };
    
    if (!isSDKLoaded) load();
  }, [isSDKLoaded]);

  if (!isSDKLoaded) return <div>Loading...</div>;

  return (
    <div style={{
      paddingTop: context?.client.safeAreaInsets?.top ?? 0,
      paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
      paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
      paddingRight: context?.client.safeAreaInsets?.right ?? 0,
    }}>
      <div className="w-[300px] mx-auto py-2 px-2">
        <h1 className="text-2xl font-bold text-center mb-4 text-neutral-900">
          {PROJECT_TITLE}
        </h1>
        
        {!quizCompleted ? (
          <QuizCard
            question={QUESTIONS[currentQuestion]}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            score={score}
            progress={(currentQuestion / (QUESTIONS.length - 1)) * 100}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Complete! 🎉</CardTitle>
              <CardContent className="space-y-4 pt-4">
                <Label>Final Score: {score}/{QUESTIONS.length}</Label>
                <button
                  onClick={resetQuiz}
                  className="w-full p-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                >
                  Try Again
                </button>
              </CardContent>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
