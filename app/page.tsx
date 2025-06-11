"use client";
import Assistant from "@/components/assistant";
import React, { useState, useEffect } from "react";
import { startNewGame, GameState } from "@/lib/gameState";
import StatementPanel from "@/components/statement-panel";
import Header from "@/components/header";
import { Menu, X } from "lucide-react";

export default function Main() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false);

  const handleNewGame = () => {
    const newGameState = startNewGame();
    setGameState(newGameState);
  };

  // Start a new game when the component mounts
  useEffect(() => {
    handleNewGame();
  }, []);

  if (!gameState) return null;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="flex flex-1 overflow-auto">
        <div className="w-full md:w-[70%] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
          <Assistant gameState={gameState} />
        </div>
        <div className="hidden md:block w-[30%] relative">
          <div className="absolute inset-0 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
          <StatementPanel gameState={gameState} onNewGame={handleNewGame} />
        </div>
        {/* Hamburger menu for small screens */}
        <div className="absolute top-4 right-4 md:hidden">
          <button 
            onClick={() => setIsToolsPanelOpen(true)}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
        </div>
        {/* Mobile panel */}
        {isToolsPanelOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden transition-opacity">
            <div className="absolute right-0 top-0 h-full w-[80%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
              <div className="p-4">
                <button
                  onClick={() => setIsToolsPanelOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
                <StatementPanel gameState={gameState} onNewGame={handleNewGame} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}