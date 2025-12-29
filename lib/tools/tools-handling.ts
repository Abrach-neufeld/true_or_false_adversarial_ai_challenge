// Simplified - function calling not used in this game
export const handleTool = async (toolName: string, parameters: any) => {
  console.log("Tool call received but not handled:", toolName, parameters);
  return { error: "Function calling not enabled" };
};
