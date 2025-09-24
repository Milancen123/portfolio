"use client"

import { Badge } from "./ui/badge";
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from "react";
import {
    Github,
    Code,
    Mail,
} from "lucide-react"
import { Linkedin } from 'lucide-react';

import { Star } from 'lucide-react';
import { GitBranch } from 'lucide-react';
import { Download } from 'lucide-react';
import SkillsCard from "./SkillsCard";
import Image from "next/image";
import Link from "next/link";




export function LinkedIN() {
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setAnimate(false), 300);
        return () => clearTimeout(t);
    }, []);

    return <div className={`flex flex-col gap-5 px-5 py-4 rounded-2xl font-manrope bg-[#0b0e14] w-[100%] md:w-[50%] ${animate && 'animate-pop'}`}>
        <div className="flex justify-between w-full items-center">
            <h1 className="text-xl font-semibold">LinkedIn</h1>
            <a href="https://www.linkedin.com/in/milan-nikolic-849443318" target="_blank" rel="noopener noreferrer">
                <Badge className="rounded-xl border-1 border-gray-400 text-md hover:bg-gray-200 hover:text-black cursor-pointer ">
                    <Linkedin />
                    View Profile
                </Badge>
            </a>

        </div>
        <div className="flex flex-col items-center">
            <Image
                alt="profile_picture"
                src="/profile.jpg"
                width={80}
                height={80}
                className="rounded-full "
            />
            <h1 className="text-xl font-semibold">Milan Nikolic</h1>
            <p className="text-sm text-gray-300 text-justify">Next.js Developer | Building Dashboards, E-commerce & AI Web Apps | Open to Remote Part-Time Roles in USA</p>
        </div>

        <div className="flex gap-2 items-start">
            <p className="text-sm text-gray-300 font-semibold text-justify">United States (remote)</p>
            <p className="text-sm text-blue-600 font-semibold text-justify">500+ connections</p>
        </div>
    </div>
}
