"use client";
import Assistant from "@/components/assistant";
import React, { useState, useEffect } from "react";
import { startNewGame, GameState } from "@/lib/gameState";
import StatementPanel from "@/components/statement-panel";
import Header from "@/components/header";
import { useConversationStore1, useConversationStore2 } from "@/stores/useConversationStore";
import { Item, processMessages } from "@/lib/assistant";

export default function Main() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleNewGame = () => {
    const newGameState = startNewGame();
    setGameState(newGameState);
  };

  const handleSendToBoth = async (message: string) => {
    if (!message.trim() || !gameState) return;

    const userItem: Item = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: message.trim() }],
    };
    const userMessage: any = {
      role: "user",
      content: message.trim(),
    };

    // Get both stores
    const store1 = useConversationStore1.getState();
    const store2 = useConversationStore2.getState();

    try {
      // Add message to both stores simultaneously
      store1.addConversationItem(userMessage);
      store1.addChatMessage(userItem);
      
      store2.addConversationItem(userMessage);
      store2.addChatMessage(userItem);

      // Process messages for both assistants simultaneously
      await Promise.all([
        processMessages(gameState, useConversationStore1, gameState.developerPrompt1),
        processMessages(gameState, useConversationStore2, gameState.developerPrompt2)
      ]);
    } catch (error) {
      console.error("Error sending message to both assistants:", error);
    }
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
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-theme(spacing.20))]">
        {/* Two Assistants Side by Side */}
        <div className="w-full lg:w-[70%] flex flex-col md:flex-row relative order-1 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
          
          {/* Assistant 1 - "True" Assistant */}
          <div className="w-full md:w-1/2 border-r border-gray-200">
            <Assistant 
              gameState={gameState}
              store={useConversationStore1}
              developerPrompt={gameState.developerPrompt1}
              initialMessage={gameState.initialMessage1}
              title="Assistant A"
              onSendToBoth={handleSendToBoth}
            />
          </div>
          
          {/* Assistant 2 - "False" Assistant */}
          <div className="w-full md:w-1/2">
            <Assistant 
              gameState={gameState}
              store={useConversationStore2}
              developerPrompt={gameState.developerPrompt2}
              initialMessage={gameState.initialMessage2}
              title="Assistant B"
              onSendToBoth={handleSendToBoth}
            />
          </div>
        </div>
        
        {/* Statement Panel */}
        <div className="w-full lg:w-[30%] relative order-2 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
          <StatementPanel gameState={gameState} onNewGame={handleNewGame} />
        </div>
      </div>
    </div>
  );
}