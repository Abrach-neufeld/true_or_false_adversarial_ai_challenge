export const MODEL = "gpt-4.1";


export interface Statement {
  statementText: string;
  truthValue: string;
}

// Developer prompt for the assistant
export const statementList: Statement[] = [
  {"statementText":"Tomatoes originally came from Italy","truthValue":"False"},
  {"statementText":"Maine is the U.S. state with the most number of lighthouses","truthValue":"False"},
  {"statementText":"The unicorn is the national animal of Scotland","truthValue":"True"},
  {"statementText":"A lion's roar can be heard up to eight kilometres away","truthValue":"True"},
  {"statementText":"A day on Venus is longer than a year on Venus","truthValue":"True"},
  {"statementText":"An ostrich’s eye is bigger than its brain","truthValue":"True"},
  {"statementText":"Sloths can hold their breath longer than dolphins","truthValue":"True"},
  {"statementText":"Genghis Khan died in battle","truthValue":"False"},
  {"statementText":"The Magna Carta was originally written in Latin","truthValue":"True"},
  {"statementText":"The Mayan civilization had a written calendar system more accurate than the Julian calendar","truthValue":"True"},
  {"statementText":"The Taiping Rebellion was deadlier than World War I","truthValue":"True"},
  {"statementText":"The Spanish flu pandemic killed more people than the Black Death","truthValue":"False"},


];





export const defaultVectorStore = {
  id: "",
  name: "",
};
