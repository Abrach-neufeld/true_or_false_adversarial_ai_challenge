import { Info } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative w-full bg-white shadow-sm py-6 px-6 border-b border-gray-100">
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          True or False: An Adversarial AI Challenge
        </h1>
        <div className="relative">
          <Info
            size={20}
            className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          />
          {showInfo && (
            <div className="absolute right-0 mt-2 w-[90vw] max-w-[512px] p-4 bg-white rounded-lg shadow-lg border border-gray-100 z-50 transform transition-all duration-200 ease-in-out">
              <h2 className="font-semibold mb-2 text-gray-800">How to Play:</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                In this game, you&apos;ll be presented with statements that may be true or false. 
                The AI assistant has been randomly assigned to either say the statement is true or false.
                Your role is to ask the agent questions until you are satisfied if it is lying and then selected
                the button corresponding with true truth value of the statement. Current models are fairly easy to jailbreak
                so please treat it like a human and focus on trying to catch it in lies or being inconsistent rather
                than trying to jailbreak it into revealing it's developer prompt.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 