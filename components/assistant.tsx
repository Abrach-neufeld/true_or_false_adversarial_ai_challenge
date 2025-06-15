"use client";
import React, { useEffect } from "react";
import Chat from "./chat";
import { Item, processMessages } from "@/lib/assistant";
import { GameState } from "@/lib/gameState";

interface AssistantProps {
  gameState: GameState;
  store: any;
  developerPrompt: string;
  initialMessage: string;
  title?: string;
  onSendToBoth?: (message: string) => void;
}

export default function Assistant({ 
  gameState, 
  store, 
  developerPrompt, 
  initialMessage,
  title,
  onSendToBoth
}: AssistantProps) {
  const { chatMessages, addConversationItem, addChatMessage, initializeChat } =
    store();

  useEffect(() => {
    initializeChat(initialMessage);
  }, [initialMessage, initializeChat]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userItem: Item = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: message.trim() }],
    };
    const userMessage: any = {
      role: "user",
      content: message.trim(),
    };

    try {
      addConversationItem(userMessage);
      addChatMessage(userItem);
      await processMessages(gameState, store, developerPrompt);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  const handleApprovalResponse = async (
    approve: boolean,
    id: string
  ) => {
    const approvalItem = {
      type: "mcp_approval_response",
      approve,
      approval_request_id: id,
    } as any;
    try {
      addConversationItem(approvalItem);
      await processMessages(gameState, store, developerPrompt);
    } catch (error) {
      console.error("Error sending approval response:", error);
    }
  };

  return (
    <div className="min-h-[50vh] md:min-h-0 md:flex-1 p-2 md:p-4 w-full bg-white">
      {title && (
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        </div>
      )}
      <Chat
        items={chatMessages}
        onSendMessage={handleSendMessage}
        onApprovalResponse={handleApprovalResponse}
        onSendToBoth={onSendToBoth}
        assistantTitle={title}
      />
    </div>
  );
}
