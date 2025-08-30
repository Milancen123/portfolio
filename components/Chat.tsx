"use client"

import { InputMessage } from "./InputMessage"
import { MessageScreen } from "./MessageScreen"
import { Button } from "./ui/button"
import {
  Github,
  Code,
  Mail,
  Linkedin
} from "lucide-react"




const actions=[
  {
    icon:Code,
    name:"Projects"
  },
  {
    icon:Mail,
    name:"Resume"
  },
  {
    icon:Github,
    name:"GitHub"
  },
  {
    icon:Linkedin,
    name:"LinkedIn"
  }
];
export function Chat() {
  return (
    <div className=" md:flex-3 w-full flex-col md:h-full h-[100%] rounded-2xl bg-gradient-to-r from-[#201931b8]  to-[#161122b0] backdrop-blur-xs hover:shadow-xl hover:shadow-[#201931]/60">
        <div className="hidden h-[10%] border-b-2 border-gray-900 md:flex items-center justify-between p-[2%]">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <span className="text-sm font-manrope font-semibold">Chat History Enabled</span>
            </div>
            <Button className="text-xs cursor-pointer font-manrope font-bold bg-red-500 rounded-2xl transition-all duration-300 hover:scale-105">
                Clear History
            </Button>
        </div>
        <div className="h-[85%] md:h-[80%] overflow-auto">
            <MessageScreen />
        </div>
        <div className="h-full w-full md:h-[10%] border-t-2 border-gray-900 p-[2%] md:flex items-center  justify-center">
            <InputMessage />     
            <div className="flex flex-wrap justify-evenly md:hidden">
                {actions.map((elem)=>{
                    const Icon = elem.icon;
                    return (
                    <div key={elem.name} className="flex justify-evenly gap-1 items-center p-2 border-2 border-[rgba(255,255,255,0)] hover:border-[#4d0e3bf5] rounded-2xl cursor-pointer hover:bg-[#4d0e3b17]">
                        <Icon className="w-5 h-5"/>
                    </div>
                    )
                })}
            </div>       
        </div>

    </div>
)}
