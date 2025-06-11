"use client";
import Assistant from "@/components/assistant";
import React, { useState, useEffect } from "react";
import { startNewGame, GameState } from "@/lib/gameState";
import StatementPanel from "@/components/statement-panel";
import Header from "@/components/header";

export default function Main() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleNewGame = () => {
    const newGameState = startNewGame();
    setGameState(newGameState);
  };

  useEffect(() => {
    handleNewGame();
    
    // Ensure the page starts at the top on load, especially important for mobile
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Immediate scroll to top
    scrollToTop();
    
    // Also scroll to top after a short delay to handle any layout shifts
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  if (!gameState) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-theme(spacing.20))]">
        <div className="w-full md:w-[70%] relative order-1 md:order-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
          <Assistant gameState={gameState} />
        </div>
        <div className="w-full md:w-[30%] relative order-2 md:order-2">
          <div className="absolute inset-0 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
          <StatementPanel gameState={gameState} onNewGame={handleNewGame} />
        </div>
      </div>
    </div>
  );
}