"use client"

import Link from "next/link"
import { Menu, Rss } from 'lucide-react';;
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import {
  Github,
  Code,
  Mail,
  Linkedin
} from "lucide-react"




const actions = [
  {
    icon: Code,
    name: "Projects"
  },
  {
    icon: Mail,
    name: "Resume"
  },
  {
    icon: Github,
    name: "GitHub"
  },
  {
    icon: Linkedin,
    name: "LinkedIn"
  }
];

import { Badge } from "./ui/badge";


const skills = [
  {
    name: "Next.js"
  },
  {
    name: "React"
  },
  {
    name: "Tailwind CSS"
  },
  {
    name: "Node.js"
  },
  {
    name: "PostgreSQL"
  },
  {
    name: "MongoDB"
  },
  {
    name: "Express.js"
  },
  {
    name: "TypeScript"
  }
];
interface NavbarProps {
  setQuickAction: (action: string) => void;
};

export function Navbar({ setQuickAction }: NavbarProps) {
  const handleQuickAction = (action: string) => {
    setQuickAction(action);
  }
  return (
    <div className=" bg-gradient-to-r from-[#09080b5b]  to-[#06040b45] backdrop-blur-xs z-2 top-0 sticky">
      <div className="flex justify-between  border-b-2 border-gray-900 px-[5%] md:py-[30px] py-[1%]">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="md:h-12 md:w-12 h-9 w-9 rounded-xl bg-green-700 flex items-center justify-center">
            <h1 className="md:text-lg text-[18px] font-manrope font-bold text-white p-4">MN</h1>
          </div>
          <div>
            <h1 className="md:text-xl text-[20px] font-manrope font-bold text-white">Milan Nikolic</h1>
            <h1 className="hidden md:block md:text-base text-[18px] font-manrope text-gray-400 opacity-80">Next.js Developer | Building Dashboards | E-commerce | AI Web Apps</h1>
            <h1 className="md:hidden block md:text-base text-[16px] font-manrope text-gray-400 opacity-80">Next.js Developer</h1>
          </div>
        </Link>
        <a href="https://blog.milannikolic.dev" target="_blank" className=" hidden md:block ">
            <Badge className="rounded-2xl border-1 border-gray-400 text-md font-semibold hover:bg-gray-200 hover:text-black cursor-pointer ">
                <Rss/>
                Visit blog
            </Badge>
        </a>
        <div className="block md:hidden">
          <Drawer direction="left">
            <DrawerTrigger><Menu className="block md:hidden text-gray-0 w-6 h-6" /></DrawerTrigger>
            <DrawerContent className="bg-black border-none opacity-95">
              <DrawerHeader>
                <DrawerTitle className="text-2xl">Menu</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-8 p-[5%]">
                <div className="flex flex-col gap-3">
                  <h1 className="text-md text-gray-400 font-manrope">QUICK ACTIONS</h1>
                  <div className="flex flex-col gap-2 justify-center">
                    {actions.map((elem) => {
                      const Icon = elem.icon;
                      return (
                        <div key={elem.name} className="flex gap-2 items-center p-2 border-2 border-[rgba(255,255,255,0)] hover:border-[#4d0e3bf5] rounded-2xl cursor-pointer hover:bg-[#4d0e3b17] text-lg text-gray-200 font-semibold" onClick={() => handleQuickAction(elem.name)}>
                          <Icon className="w-5 h-5" />
                          <span>{elem.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="text-md text-gray-400 font-manrope">TECH STACK</h1>
                  <div>
                    <div>
                      {skills.map((skill) => (
                        <Badge variant="outline" key={skill.name} className="rounded-2xl border-[#171025dc] px-3 py-1 hover:border-[#4d0e3bf5] hover:bg-[#4d0e3b17] transition-all mr-2 mb-2 cursor-pointer text-md">{skill.name}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
