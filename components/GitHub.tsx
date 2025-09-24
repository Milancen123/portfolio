"use client"

import { Badge } from "./ui/badge";
import { ExternalLink } from 'lucide-react';
import {
    Github,
    Code,
    Mail,
    Linkedin,
    Rss 
} from "lucide-react"

import { Star } from 'lucide-react';
import { GitBranch } from 'lucide-react';
import { useEffect, useState } from "react";

const githubStats = {
    repositories: 52,
    contributions: 1247
}

export function GitHub() {
    const [animate, setAnimate] = useState(true);

  useEffect(()=>{
    const t = setTimeout(() => setAnimate(false), 300); 
    return () => clearTimeout(t);
  }, []);

    return <div className={`${animate && 'animate-pop'} flex flex-col gap-10 px-5 py-4 rounded-2xl font-manrope bg-[#0b0e14] w-[100%] md:w-[50%]`}>
        <div className="flex justify-between w-full items-center">
            <h1 className="text-xl font-semibold">GitHub Profile</h1>
            <Badge className="rounded-xl border-1 border-gray-400 text-md hover:bg-gray-200 hover:text-black cursor-pointer ">
                <Github/>
                View Profile
            </Badge>
        </div>
        <div className="flex justify-center gap-4">
            <div className="w-full self-center text-center">
                <h1 className="text-2xl text-[#7A6EFF] font-semibold">{githubStats.repositories}</h1>
                <p className="text-sm text-gray-300">Repositories</p>
            </div>
            <div className="w-full self-center text-center">
                <h1 className="text-2xl text-[#7A6EFF] font-semibold">{githubStats.contributions}</h1>
                <p className="text-sm text-gray-300">Contributions</p>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Featured Repositorius</h1>
            <div className="flex items-center justify-between bg-gray-800 p-2 rounded-2xl">
                <div className="flex flex-col gap-1">
                    <h1>E-commerce Platform</h1>
                    <div className="flex gap-2">
                        <div className="flex gap-1  items-center text-gray-400">
                            <Star/>
                            58
                        </div>
                        <div className="flex gap-1  items-center text-gray-400">
                            <GitBranch/>
                            12
                        </div>
                    </div>
                </div>
                <div>
                    <ExternalLink/>
                </div>
            </div>
            <div className="flex items-center justify-between bg-gray-800 p-2 rounded-2xl">
                <div className="flex flex-col gap-1">
                    <h1>E-commerce Platform</h1>
                    <div className="flex gap-2">
                        <div className="flex gap-1  items-center text-gray-400">
                            <Star/>
                            58
                        </div>
                        <div className="flex gap-1  items-center text-gray-400">
                            <GitBranch/>
                            12
                        </div>
                    </div>
                </div>
                <div>
                    <ExternalLink/>
                </div>
            </div>
        </div>
    </div>
}
