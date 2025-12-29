export const MODEL = "gpt-4.1";

// Statement interface - now fetched from database
export interface Statement {
  id: string;
  statementText: string;
  truthValue: string;
  category?: {
    id: string;
    name: string;
  };
}

export const defaultVectorStore = {
  id: "",
  name: "",
};
