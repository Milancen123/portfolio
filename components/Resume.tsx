"use client"

import { Badge } from "./ui/badge";
import { ExternalLink } from 'lucide-react';
import {
    Github,
    Code,
    Mail,
    Linkedin
} from "lucide-react"

import { Star } from 'lucide-react';
import { GitBranch } from 'lucide-react';
import { Download } from 'lucide-react';
import SkillsCard from "./SkillsCard";

const githubStats = {
    repositories: 52,
    contributions: 1247
}



export function Resume() {
    return <div className="flex flex-col gap-10 px-5 py-4 rounded-2xl font-manrope bg-[#0b0e14] w-[100%] md:w-[50%]">
        <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Professional Resume</h1>
            <a
            href="/Milan_Nikolic_CV.pdf"
            download="Milan_Nikolic_CV.pdf"
            >
                <Badge className="rounded-xl border-1 border-gray-400 text-md hover:bg-gray-200 hover:text-black cursor-pointer text-sm">
                    <Download/>
                    PDF
                </Badge>
            </a>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">Experience</h1>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 text-justify">
                    <div>
                        <h1 className="text-base font-semibold">Web Hosting & Infrastructure Lead — Scorpion Agency</h1>
                    </div>
                    <div className="text-sm text-gray-400">
                        <ul className="list-disc list-inside marker:text-pink-500 space-y-1 text-justify">
                            <li>Reduced hosting & domain costs by 70%</li>
                            <li>Managed web server & infrastructure to ensure performance & reliability</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <h1 className="text-base font-semibold">Project Developer — Military Technical Academy (Academic Projects)</h1>
                    </div>
                    <div className="text-sm text-gray-400">
                        <ul className="list-disc list-inside marker:text-pink-500 space-y-1 text-justify">
                            <li>Built DevFlow: Full-stack Next.js Q&A app with auth, real-time updates, MongoDB, and OpenAI integration</li>
                            <li>Built Uber Ride Clone: Express.js backend, PostgreSQL optimization (30% faster queries), React frontend with real-time tracking</li>
                            <li>Researched GSM Encryption (A5/1, A5/2, Kasumi): security analysis and impact on global telecom</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">Skills</h1>
            <SkillsCard />
        </div>
        
    </div>
}
