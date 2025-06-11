import { Info } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative w-full bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-2xl font-bold text-center">
          True or False: An Adversarial AI Challenge
        </h1>
        <div className="relative">
          <Info
            size={20}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          />
          {showInfo && (
            <div className="absolute right-0 mt-2 w-[512px] p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <h2 className="font-semibold mb-2">How to Play:</h2>
              <p className="text-sm text-gray-600">
                In this game, you&apos;ll be presented with statements that may be true or false. 
                The AI assistant has been randomly assigned to either say the statement is true or false.
                Your role is to ask the agent questions until you are satisfied if it is lying and then selected
                the true truth value of the statement in the right panel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 