"use client";
import React, { useEffect } from "react";
import Chat from "./chat";
import useConversationStore from "@/stores/useConversationStore";
import { Item, processMessages } from "@/lib/assistant";
import { GameState } from "@/lib/gameState";

interface AssistantProps {
  gameState: GameState;
}

export default function Assistant({ gameState}: AssistantProps) {
  const { chatMessages, addConversationItem, addChatMessage, initializeChat } =
    useConversationStore();

  useEffect(() => {
    initializeChat(gameState.initialMessage);
  }, [gameState.initialMessage, initializeChat]);

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
      await processMessages(gameState);
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
      await processMessages(gameState);
    } catch (error) {
      console.error("Error sending approval response:", error);
    }
  };

  return (
    <div className="min-h-0 flex-1 p-4 w-full bg-white">
      <Chat
        items={chatMessages}
        onSendMessage={handleSendMessage}
        onApprovalResponse={handleApprovalResponse}
      />
    </div>
  );
}
