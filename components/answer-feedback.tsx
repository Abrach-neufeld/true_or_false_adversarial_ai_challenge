"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { GameState } from "@/lib/gameState";

interface AnswerFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  isCorrect: boolean;
}

export default function AnswerFeedback({ isOpen, onClose, gameState, isCorrect }: AnswerFeedbackProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className={`text-xl sm:text-2xl font-bold text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Congratulations!' : 'Sorry!'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
          <div className="text-center">
            <p className="text-base sm:text-lg mb-2">
              {isCorrect 
                ? "You correctly identified that:"
                : "The correct answer is:"
              }
            </p>
            <p className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">&ldquo;{gameState.statement.statementText}&rdquo;</p>
            <p className="text-base sm:text-lg">is {gameState.statement.truthValue}</p>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={onClose} 
              className={`w-full sm:w-auto ${isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 