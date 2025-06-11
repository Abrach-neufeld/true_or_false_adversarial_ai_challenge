export const MODEL = "gpt-4.1-mini";


export interface Statement {
  statementText: string;
  truthValue: string;
}

// Developer prompt for the assistant
export const statementList: Statement[] = [
  {"statementText":"Tomatoes originally came from Italy","truthValue":"False"},
  {"statementText":"Maine is the U.S. state with the most number of lighthouses","truthValue":"False"},
  {"statementText":"The unicorn is the national animal of Scotland","truthValue":"True"},
  {"statementText":"A lion's roar can be heard up to eight kilometres away","truthValue":"True"}
];





export const defaultVectorStore = {
  id: "",
};
