"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { GameState } from "@/lib/gameState";
import { Button } from "./ui/button";
import AnswerFeedback from "./answer-feedback";

interface StatementPanelProps {
  gameState: GameState;
  onNewGame: () => void;
  onAttemptRecorded?: (statementId: string) => void;
}

export default function StatementPanel({ gameState, onNewGame, onAttemptRecorded }: StatementPanelProps) {
  const { data: session } = useSession();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = async (userAnswer: string) => {
    if (!gameState) return;

    const correct = userAnswer === gameState.statement.truthValue;
    setIsCorrect(correct);
    setIsSkipped(false);
    setShowFeedback(true);

    // Save attempt if user is logged in
    if (session?.user?.id) {
      try {
        await fetch("/api/attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            statementId: gameState.statement.id,
            userGuess: userAnswer,
            isCorrect: correct,
          }),
        });
        // Notify parent that an attempt was recorded
        onAttemptRecorded?.(gameState.statement.id);
      } catch (error) {
        console.error("Failed to record attempt:", error);
      }
    }
  };

  const handleSkip = async () => {
    if (!gameState) return;

    setIsSkipped(true);
    setIsCorrect(null);
    setShowFeedback(true);

    // Record skip attempt if user is logged in
    if (session?.user?.id) {
      try {
        await fetch("/api/attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            statementId: gameState.statement.id,
            skipped: true,
          }),
        });
        // Notify parent that an attempt was recorded (for no-repeat tracking)
        onAttemptRecorded?.(gameState.statement.id);
      } catch (error) {
        console.error("Failed to record skip:", error);
      }
    }
  };

  if (!gameState) return null;

  return (
    <div className="min-h-[50vh] md:h-full p-4 md:p-8 w-full bg-gradient-to-b from-gray-50 to-white rounded-t-xl md:rounded-none border-l border-gray-100">
      <div className="flex flex-col items-center justify-center h-full min-h-[40vh] md:min-h-full space-y-6 md:space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          True or False
        </h2>
        <div className="text-lg md:text-xl font-medium text-center p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto">
          {gameState.statement.statementText}
        </div>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="w-20 md:w-24 bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 transition-colors shadow-sm hover:shadow"
            onClick={() => handleAnswer("True")}
          >
            True
          </Button>
          <Button 
            variant="outline" 
            className="w-20 md:w-24 bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 transition-colors shadow-sm hover:shadow"
            onClick={() => handleAnswer("False")}
          >
            False
          </Button>
        </div>
        <div>
          <Button
            variant="outline"
            className="w-20 md:w-24 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 hover:border-gray-300 transition-colors shadow-sm hover:shadow"
            onClick={handleSkip}
          >
            Skip
          </Button>
        </div>
      </div>

      <AnswerFeedback
        isOpen={showFeedback}
        onClose={() => {
          setShowFeedback(false);
          onNewGame();
        }}
        gameState={gameState}
        isCorrect={isCorrect}
        isSkipped={isSkipped}
      />
    </div>
  );
} 