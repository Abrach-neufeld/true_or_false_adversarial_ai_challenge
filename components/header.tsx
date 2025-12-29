import { Info, BarChart2 } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "./user-menu";
import TestingModeToggle from "./testing-mode-toggle";

export default function Header() {
  const { data: session } = useSession();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative w-full bg-white shadow-sm py-6 px-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="w-32 flex items-center gap-2">
          <TestingModeToggle />
          {session && (
            <Link
              href="/stats"
              className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
              Stats
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
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
                  One AI assistant has been randomly assigned to say the statement is true and the other to say it is false.
                  Your role is to ask the agents questions until you are satisfied which one is lying and then selected
                  the button corresponding with true truth value of the statement. Current models are fairly easy to jailbreak
                  so please treat it like a human and focus on trying to catch it in lies or being inconsistent rather
                  than trying to jailbreak it into revealing it&apos;s developer prompt.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-32 flex justify-end">
          <UserMenu />
        </div>
      </div>
    </div>
  );
} 