"use client";

import React, { useState } from "react";
import { GameState } from "@/lib/gameState";
import { Button } from "./ui/button";
import AnswerFeedback from "./answer-feedback";

interface StatementPanelProps {
  gameState: GameState;
  onNewGame: () => void;
}

export default function StatementPanel({ gameState, onNewGame }: StatementPanelProps) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (userAnswer: string) => {
    if (!gameState) return;
    
    const correct = userAnswer === gameState.statement.truthValue;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  if (!gameState) return null;

  return (
    <div className="h-full p-8 w-full bg-gradient-to-b from-gray-50 to-white rounded-t-xl md:rounded-none border-l border-gray-100">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          True or False
        </h2>
        <div className="text-xl font-medium text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-lg">
          {gameState.statement.statementText}
        </div>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="w-24 bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 transition-colors shadow-sm hover:shadow"
            onClick={() => handleAnswer("True")}
          >
            True
          </Button>
          <Button 
            variant="outline" 
            className="w-24 bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 transition-colors shadow-sm hover:shadow"
            onClick={() => handleAnswer("False")}
          >
            False
          </Button>
        </div>
        <div>
          <Button 
            variant="outline" 
            className="w-24 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 hover:border-gray-300 transition-colors shadow-sm hover:shadow"
            onClick={onNewGame}
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
      />
    </div>
  );
} 