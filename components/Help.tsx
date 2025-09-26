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

export function Help() {
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setAnimate(false), 300);
        return () => clearTimeout(t);
    }, []);

    return <div className={`${animate && 'animate-pop'} flex flex-col gap-10 px-5 py-4 rounded-2xl font-manrope bg-[#0b0e14] w-[100%] md:w-[50%]`}>
        <header className="mb-2">
            <h2
                id="assistant-title"
                className="text-lg font-semibold leading-tight text-white"
            >
                🤖 Milan’s AI Assistant
            </h2>
            <p className="mt-1 text-sm text-gray-300">
                <strong className="font-semibold text-white">/help</strong> — Here’s
                what I can do for you 👇
            </p>
        </header>

        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-title" className="mt-6">
            <h3
                id="quick-actions-title"
                className="text-sm font-semibold text-white"
            >
                ⚡ Quick Actions
            </h3>
            <p className="mt-1 text-sm text-gray-300">
                Use the buttons to instantly view:
            </p>
            <ul className="mt-3 space-y-1 flex flex-col gap-2 pl-5 text-sm text-gray-200">
                <li className="flex gap-2 items-center"><Mail/>CV / Resume</li>
                <li className="flex gap-2 items-center"><Github/>GitHub</li>
                <li className="flex gap-2 items-center"><Linkedin/>LinkedIn</li>
                <li className="flex gap-2 items-center"><Code/>Projects</li>
            </ul>
        </section>

        {/* Pro Tips */}
        <section aria-labelledby="pro-tips-title" className="mt-6">
            <h3 id="pro-tips-title" className="text-sm font-semibold text-white">
                💡 Pro Tips
            </h3>
            <p className="mt-1 text-sm text-gray-300">
                You can also just ask me questions in plain English or any language, like:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-200">
                <li>“Show me Milan’s best project”</li>
                <li>“Why should I hire him?”</li>
                <li>“What’s his strongest skill?”</li>
            </ul>
        </section>
    </div>
}
