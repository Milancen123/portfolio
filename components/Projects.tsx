"use client"

import Image from "next/image";
import { Message } from "./Message";
import { Badge } from "./ui/badge";
import { ExternalLink } from 'lucide-react';
import {
    Github,
    Code,
    Mail,
    Linkedin
} from "lucide-react"
const projects = [
    {
        title: "E-commerce Platform",
        description: "Full-stack Next.js application with Stripe integration, handling 1000+ daily users",
        tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
        demoURL: "/",
        githubCode: "/",
        image: "/modern-ecommerce-interface.png"
    },
    {
        title: "AI Chat Bot",
        description: "Intelligent chatbot using OpenAI API with 10k+ conversations processed",
        tags: ["Next.js", "OpenAI API", "Node.js", "WebSocket"],
        demoURL: "/",
        githubCode: "/",
        image: "/ai-chatbot-interface-with-messages.png"
    },
    {
        title: "Task Manager Pro",
        description: "Advanced CRUD application with real-time collaboration and team management",
        tags: ["Next.js", "PostgreSQL", "Socket.io", "Express.js"],
        demoURL: "/",
        githubCode: "/",
        image: "/task-management-dashboard.png"
    }
]

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    demoURL: string;
    githubCode: string;
    image: string;
}

function Project({ title, description, tags, demoURL, githubCode, image }: ProjectProps) {

    return (
        <div className="flex gap-3 px-5 py-4 rounded-2xl font-manrope bg-[#0b0e14] w-[100%] md:w-[70%]">
            <div className="relative flex-shrink-0 aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="rounded-2xl object-cover"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 112px, 128px"
                />
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="text-sm text-gray-300">{description}</p>
                <div className="mt-1 flex flex-wrap">
                    {tags.map((tag) => (
                        <Badge variant="outline" key={tag} className="rounded-2xl border-[#171025dc] bg-gray-900 px-3 py-1 hover:border-[#4d0e3bf5] hover:bg-[#4d0e3b17] transition-all mr-5 mb-2 cursor-pointer">{tag}</Badge>
                    ))}
                </div>
                <div className="flex">
                    <Badge variant="outline" className="rounded-2xl  border-[#171025dc] px-3 py-1 hover:border-[#4d0e3bf5] hover:bg-[#c11891] transition-all mr-5 mb-2 cursor-pointer">
                        <ExternalLink className="w-5 h-5" size={22} />
                        Demo
                    </Badge>
                    <Badge variant="outline" className="rounded-2xl   border-[#171025dc] px-3 py-1 hover:border-[#4d0e3bf5] hover:bg-[#c11891] transition-all mr-5 mb-2 cursor-pointer">
                        <Github />
                        Code
                    </Badge>
                </div>
            </div>
        </div>
    )
}


export function Projects() {


    return <div className="flex flex-col gap-3 ">
        {projects.map((project) => (
            <Project
                title={project.title}
                description={project.description}
                tags={project.tags}
                demoURL={project.demoURL}
                githubCode={project.githubCode}
                image={project.image}
                key={project.title + Math.random()}
            />
        ))}
    </div>
}
