"use client"

import { Message } from "./Message"


export function MessageScreen() {
  return (
    <div className="flex flex-col p-[2%] gap-5 h-full overflow-y-auto ">
        <Message message="Hi! I'm Milan's AI assistant. I can help you explore his portfolio. Want to see his projects, resume, or GitHub?" ai={true} />

    </div>
)}
