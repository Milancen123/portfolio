"use client"

import { useEffect } from "react";
import { Projects } from "./Projects";
import { GitHub } from "./GitHub";
import { Resume } from "./Resume";
import { LoaderCircle } from 'lucide-react';


interface ChatMessage {
  message: string;
  ai: boolean;
  Msgtype:string;
}


interface messageProps {
    message:string;
    Msgtype?:string;
    isTyping?: boolean;
    ai:boolean;
    setMessage?: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    messages?: ChatMessage[];
};

export function Message({message,Msgtype, isTyping, ai, setMessage, messages}:messageProps) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  
  return (<>
    {Msgtype === "text" && (
      <div className={`px-5 py-4 rounded-2xl font-manrope bg-[#0b0e14] flex flex-col gap-2 ${ai ? 'self-start' : 'self-end'} ${ai ? 'bg-[#0b0e14]' : 'bg-[#7A6EFF]'}`}>
        <div>{message}</div>
        <div>
          <h1 className={`text-xs ${ai ? 'text-gray-400' : 'text-gray-200'}`}>{time}</h1>
        </div>
      </div>
    )}

    {Msgtype === "projects" && (
      <Projects />      
    )}

    {Msgtype === "resume" && (
      <div>
        <Resume/>
      </div>
    )}

    {Msgtype === "linkedin" && (
      <div>

      </div>
    )}

    {Msgtype === "github" && (
      <div>
          <GitHub/>
      </div>
    )}


    
    {Msgtype === "isTyping" && (
      <div className={`px-5 py-4 rounded-2xl font-manrope bg-[#0b0e14] flex flex-col gap-2 ${ai ? 'self-start' : 'self-end'} ${ai ? 'bg-[#0b0e14]' : 'bg-[#7A6EFF]'} animate-pulse`}>
        <div className="flex gap-3"><LoaderCircle className="animate-spin"/>Milan's AI is thinking...</div>
        <div>
          <h1 className={`text-xs ${ai ? 'text-gray-400' : 'text-gray-200'}`}>{time}</h1>
        </div>
      </div>
    )}


    </>
)}
