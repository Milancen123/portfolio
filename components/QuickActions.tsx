"use client"
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

export function QuickActions() {
  return (
    <div className="hidden rounded-2xl bg-gradient-to-r from-[#201931a3] via-[#1a14287f] to-[#1611229a] backdrop-blur-xs md:flex flex-col p-5 gap-5 hover:shadow-xl hover:shadow-[#201931]/60">
      <h1 className="text-2xl font-manrope font-semibold text-white">Quick Actions</h1>
      <div className="flex flex-col gap-4 justify-center">
        {actions.map((elem)=>{
          const Icon = elem.icon;
          return (
            <div key={elem.name} className="flex gap-2 items-center p-2 border-2 border-[rgba(255,255,255,0)] hover:border-[#4d0e3bf5] rounded-2xl cursor-pointer hover:bg-[#4d0e3b17]">
              <Icon className="w-5 h-5"/>
              <p>{elem.name}</p>
            </div>
          )
        })}
      </div>
    </div>
)}
