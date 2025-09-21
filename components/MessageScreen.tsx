"use client"

import { useEffect, useRef, useState } from "react";
import { Message } from "./Message"
import { Projects } from "./Projects";


interface MessageScreenProps{
  quickAction:string;
  messages: ChatMessage[];
  setMessage: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
};

interface ChatMessage {
  message: string;
  ai: boolean;
  Msgtype:string;
  animate?:boolean;
}

export function MessageScreen({quickAction, messages, setMessage}:MessageScreenProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(()=>{
    setMessage([...messages, {message:"Hi! I'm Milan's AI assistant. I can help you explore his portfolio. Want to see his projects, resume, or GitHub?", ai:true, Msgtype: "text",}]);
    if(quickAction){
      setMessage([...messages, {message:"What are Milan's skills", ai:false, Msgtype: "text",}]);
    }
    console.log(messages);
  }, []);


  useEffect(()=>{
    //scroll to the bottom of the messagescreen whenever new message is added in the queue
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(()=>{

    if (quickAction) {
      if (quickAction.toLowerCase() === "projects") {
        setMessage(prev => [
          ...prev,
          { message: "What are Milan's skills", ai: false, Msgtype: "text" },
          { message: "Here are Milan's featured projects. Each one showcases different aspects of his full-stack development skills:", ai: true, Msgtype: "projects" }
        ]);
      } else if (quickAction.toLowerCase() === "resume") {
        setMessage(prev => [
          ...prev,
          { message: "Show me Milan resume", ai: false, Msgtype: "text" },
          { message: "Here is Milans resume :)", ai: true, Msgtype: "resume" }
        ]);
      } else if (quickAction.toLowerCase() === "github") {
        setMessage(prev => [
          ...prev,
          { message: "Tell me about Milan's GitHub profile", ai: false, Msgtype: "text" },
          { message: "Here are Milan's featured projects. Each one showcases different aspects of his full-stack development skills:", ai: true, Msgtype: "github" }
        ]);
      } else if (quickAction.toLowerCase() === "linkedin") {
        setMessage(prev => [
          ...prev,
          { message: "Show me Milan resume", ai: false, Msgtype: "text" },
          { message: "Here is Milans resume :)", ai: true, Msgtype: "resume" }
        ]);
      }

    }
  }, [quickAction]);

  return (
    <div className="flex flex-col p-[2%] gap-5 h-full overflow-y-auto" ref={containerRef}>
        {messages?.map((message, index)=>(
         <div className="flex flex-col gap-5" key={index}>
            <Message message={message.message} Msgtype={message.Msgtype} ai={message.ai} animatePop={index === messages.length - 1}/>
          </div>
        ))}
        <div ref={bottomRef} />
    </div>
)}
