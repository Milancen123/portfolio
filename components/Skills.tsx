"use client"

import { Badge } from "./ui/badge";


const skills = [
  {
    name:"Next.js"
  },
  {
    name:"React"
  },
  {
    name:"Tailwind CSS"
  },
  {
    name:"Node.js"
  },
  {
    name:"PostgreSQL"
  },
  {
    name:"MongoDB"
  },
  {
    name:"Express.js"
  },
  {
    name:"TypeScript"
  }
];
//bg-[#201931]
export function Skills() {
  return (
    <div className="hidden rounded-2xl bg-gradient-to-r from-[#201931a3] via-[#1a14287f] to-[#1611229a] backdrop-blur-xs md:flex flex-col p-5 gap-5 hover:shadow-xl hover:shadow-[#201931]/60 transition-all">
      <h1 className="text-2xl font-manrope font-semibold text-white">Skills</h1>
      <div>
        {skills.map((skill)=>(
          <Badge variant="outline" key={skill.name} className="rounded-2xl border-[#171025dc] px-3 py-1 hover:border-[#4d0e3bf5] hover:bg-[#4d0e3b17] transition-all mr-5 mb-2 cursor-pointer">{skill.name}</Badge>
        ))}
      </div>
    </div>
)}
