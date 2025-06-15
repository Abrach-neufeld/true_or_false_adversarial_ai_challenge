"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ToolCall from "./tool-call";
import Message from "./message";
import Annotations from "./annotations";
import McpToolsList from "./mcp-tools-list";
import McpApproval from "./mcp-approval";
import { Item, McpApprovalRequestItem } from "@/lib/assistant";

interface ChatProps {
  items: Item[];
  onSendMessage: (message: string) => void;
  onApprovalResponse: (approve: boolean, id: string) => void;
  onSendToBoth?: (message: string) => void;
  assistantTitle?: string;
}

const Chat: React.FC<ChatProps> = ({
  items,
  onSendMessage,
  onApprovalResponse,
  onSendToBoth,
  assistantTitle,
}) => {
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const [inputMessageText, setinputMessageText] = useState<string>("");
  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);
  const [showSendOptions, setShowSendOptions] = useState(false);
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    itemsEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !isComposing) {
        event.preventDefault();
        onSendMessage(inputMessageText);
        setinputMessageText("");
      }
    },
    [onSendMessage, inputMessageText, isComposing]
  );

  const handleSendButtonPress = useCallback(() => {
    if (!onSendToBoth) {
      onSendMessage(inputMessageText);
      setinputMessageText("");
      return;
    }

    const timer = setTimeout(() => {
      setShowSendOptions(true);
    }, 500); // Show options after 500ms hold
    setHoldTimer(timer);
  }, [onSendMessage, onSendToBoth, inputMessageText]);

  const handleSendButtonRelease = useCallback(() => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      setHoldTimer(null);
    }
    
    if (!showSendOptions) {
      // Quick click - send to current assistant
      onSendMessage(inputMessageText);
      setinputMessageText("");
    }
  }, [holdTimer, showSendOptions, onSendMessage, inputMessageText]);

  const handleSendToCurrentAssistant = useCallback(() => {
    onSendMessage(inputMessageText);
    setinputMessageText("");
    setShowSendOptions(false);
  }, [onSendMessage, inputMessageText]);

  const handleSendToBothAssistants = useCallback(() => {
    if (onSendToBoth) {
      onSendToBoth(inputMessageText);
      setinputMessageText("");
    }
    setShowSendOptions(false);
  }, [onSendToBoth, inputMessageText]);

  const handleCancelOptions = useCallback(() => {
    setShowSendOptions(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [holdTimer]);

  return (
    <div className="flex justify-center items-center size-full">
      <div className="flex grow flex-col h-full max-w-[750px] gap-2">
        <div className="flex-1 overflow-y-auto px-2 md:px-10 flex flex-col">
          <div className="mt-auto space-y-5 pt-4">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "tool_call" ? (
                  <ToolCall toolCall={item} />
                ) : item.type === "message" ? (
                  <div className="flex flex-col gap-1">
                    <Message message={item} />
                    {item.content &&
                      item.content[0].annotations &&
                      item.content[0].annotations.length > 0 && (
                        <Annotations
                          annotations={item.content[0].annotations}
                        />
                      )}
                  </div>
                ) : item.type === "mcp_list_tools" ? (
                  <McpToolsList item={item} />
                ) : item.type === "mcp_approval_request" ? (
                  <McpApproval
                    item={item as McpApprovalRequestItem}
                    onRespond={onApprovalResponse}
                  />
                ) : null}
              </React.Fragment>
            ))}
            <div ref={itemsEndRef} />
          </div>
        </div>
        <div className="flex-none p-2 md:p-4 px-2 md:px-10 relative">
          {/* Send Options Modal */}
          {showSendOptions && (
            <div className="absolute bottom-full left-2 md:left-10 right-2 md:right-10 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
              <div className="text-sm text-gray-600 mb-3">Choose where to send your message:</div>
              <div className="space-y-2">
                <button
                  onClick={handleSendToCurrentAssistant}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 text-sm transition-colors border border-gray-200"
                >
                  Send to {assistantTitle || "this assistant"}
                </button>
                <button
                  onClick={handleSendToBothAssistants}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm transition-colors border border-blue-200 text-blue-700"
                >
                  Send to both assistants
                </button>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100">
                <button
                  onClick={handleCancelOptions}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <div className="flex w-full items-center pb-4 md:pb-1">
              <div className="flex w-full flex-col gap-1.5 rounded-[20px] p-2.5 pl-1.5 transition-colors bg-white border border-gray-200 shadow-sm hover:shadow-md">
                <div className="flex items-end gap-1.5 md:gap-2 pl-2 md:pl-4">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <textarea
                      id="prompt-textarea"
                      tabIndex={0}
                      dir="auto"
                      rows={2}
                      placeholder="Message..."
                      className="mb-2 resize-none border-0 focus:outline-none text-sm bg-transparent px-0 pb-6 pt-2 placeholder:text-gray-400"
                      value={inputMessageText}
                      onChange={(e) => setinputMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                  </div>
                  <button
                    disabled={!inputMessageText}
                    data-testid="send-button"
                    className="flex size-8 items-end justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200 disabled:hover:opacity-100 relative"
                    onMouseDown={handleSendButtonPress}
                    onMouseUp={handleSendButtonRelease}
                    onMouseLeave={handleSendButtonRelease}
                    onTouchStart={handleSendButtonPress}
                    onTouchEnd={handleSendButtonRelease}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 32 32"
                      className="icon-2xl"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
