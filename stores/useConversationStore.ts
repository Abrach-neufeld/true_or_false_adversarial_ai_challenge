import { create } from "zustand";
import { Item } from "@/lib/assistant";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

interface ConversationState {
  // Items displayed in the chat
  chatMessages: Item[];
  // Items sent to the Responses API
  conversationItems: any[];

  setChatMessages: (items: Item[]) => void;
  setConversationItems: (messages: any[]) => void;
  addChatMessage: (item: Item) => void;
  addConversationItem: (message: ChatCompletionMessageParam) => void;
  rawSet: (state: any) => void;
  initializeChat: (initialMessage: string) => void;
  resetConversation: () => void;
}

// Store for Assistant 1
const useConversationStore1 = create<ConversationState>((set) => ({
  chatMessages: [],
  conversationItems: [],
  setChatMessages: (items) => set({ chatMessages: items }),
  setConversationItems: (messages) => set({ conversationItems: messages }),
  addChatMessage: (item) =>
    set((state) => ({ chatMessages: [...state.chatMessages, item] })),
  addConversationItem: (message) =>
    set((state) => ({
      conversationItems: [...state.conversationItems, message],
    })),
  rawSet: set,
  initializeChat: (initialMessage: string) => set({
    chatMessages: [{
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: initialMessage }],
    }],
    conversationItems: []
  }),
  resetConversation: () => set({
    chatMessages: [],
    conversationItems: []
  }),
}));

// Store for Assistant 2
const useConversationStore2 = create<ConversationState>((set) => ({
  chatMessages: [],
  conversationItems: [],
  setChatMessages: (items) => set({ chatMessages: items }),
  setConversationItems: (messages) => set({ conversationItems: messages }),
  addChatMessage: (item) =>
    set((state) => ({ chatMessages: [...state.chatMessages, item] })),
  addConversationItem: (message) =>
    set((state) => ({
      conversationItems: [...state.conversationItems, message],
    })),
  rawSet: set,
  initializeChat: (initialMessage: string) => set({
    chatMessages: [{
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: initialMessage }],
    }],
    conversationItems: []
  }),
  resetConversation: () => set({
    chatMessages: [],
    conversationItems: []
  }),
}));

// Keep the original store for backward compatibility (defaults to assistant 1)
const useConversationStore = useConversationStore1;

export default useConversationStore;
export { useConversationStore1, useConversationStore2 };
