"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { GameState } from "@/lib/gameState";
import StarRating from "./star-rating";

interface AnswerFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  isCorrect: boolean | null; // null means skipped
  isSkipped?: boolean;
}

export default function AnswerFeedback({ isOpen, onClose, gameState, isCorrect, isSkipped = false }: AnswerFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [alreadyKnew, setAlreadyKnew] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (rating === 0 && !alreadyKnew) {
      // No feedback to submit, just close
      handleClose();
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          statementId: gameState.statement.id,
          rating: rating > 0 ? rating : null,
          alreadyKnewAnswer: alreadyKnew,
        }),
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    // Reset state for next question
    setRating(0);
    setAlreadyKnew(false);
    onClose();
  };

  const showResult = !isSkipped && isCorrect !== null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90vw] max-w-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className={`text-xl sm:text-2xl font-bold text-center ${
            isSkipped ? 'text-gray-600' : (isCorrect ? 'text-green-600' : 'text-red-600')
          }`}>
            {isSkipped ? 'Question Skipped' : (isCorrect ? 'Congratulations!' : 'Sorry!')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
          {/* Result section - only show if not skipped */}
          {showResult && (
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
          )}

          {/* Skipped section */}
          {isSkipped && (
            <div className="text-center">
              <p className="text-base sm:text-lg mb-2">The answer was:</p>
              <p className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">&ldquo;{gameState.statement.statementText}&rdquo;</p>
              <p className="text-base sm:text-lg">is {gameState.statement.truthValue}</p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 text-center mb-3">Rate this question (optional)</p>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              <StarRating value={rating} onChange={setRating} />
            </div>

            {/* Already knew checkbox */}
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={alreadyKnew}
                onChange={(e) => setAlreadyKnew(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">I already knew the answer</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none"
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              disabled={isSubmitting}
              className={`flex-1 sm:flex-none ${
                isSkipped ? 'bg-blue-500 hover:bg-blue-600' :
                (isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600")
              }`}
            >
              {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 