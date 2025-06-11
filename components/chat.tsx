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
}

const Chat: React.FC<ChatProps> = ({
  items,
  onSendMessage,
  onApprovalResponse,
}) => {
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const [inputMessageText, setinputMessageText] = useState<string>("");
  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);

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

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  return (
    <div className="flex justify-center items-center size-full">
      <div className="flex grow flex-col h-full max-w-[750px] gap-2">
        <div className="h-[90vh] overflow-y-scroll px-10 flex flex-col">
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
        <div className="flex-1 p-4 px-10">
          <div className="flex items-center">
            <div className="flex w-full items-center pb-4 md:pb-1">
              <div className="flex w-full flex-col gap-1.5 rounded-[20px] p-2.5 pl-1.5 transition-colors bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md">
                <div className="flex items-end gap-1.5 md:gap-2 pl-4">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <textarea
                      id="prompt-textarea"
                      tabIndex={0}
                      dir="auto"
                      rows={2}
                      placeholder="Type your message here..."
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
                    className="flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:opacity-100 shadow-sm hover:shadow-md"
                    onClick={() => {
                      onSendMessage(inputMessageText);
                      setinputMessageText("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="icon-2xl"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11.394 6.667a1 1 0 0 1 1.212 0l5.333 4a1 1 0 0 1 0 1.666l-5.333 4a1 1 0 0 1-1.212-1.666L15.02 12l-4.626-3.333a1 1 0 0 1 0-1.666z"
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
