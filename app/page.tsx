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
  }, []);

  if (!gameState) return null;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 overflow-auto">
        <div className="w-full md:w-[70%] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
          <Assistant gameState={gameState} />
        </div>
        <div className="w-full md:w-[30%] relative">
          <div className="absolute inset-0 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
          <StatementPanel gameState={gameState} onNewGame={handleNewGame} />
        </div>
      </div>
    </div>
  );
}