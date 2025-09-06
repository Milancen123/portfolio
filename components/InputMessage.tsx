"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Send
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Github,
  Code,
  Mail,
  Linkedin
} from "lucide-react"

import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react"


const formSchema = z.object({
  message: z.string().min(2).max(300),
})

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

interface InputMessageProps{
  messages: ChatMessage[];
  setMessage: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
};

interface ChatMessage {
  message: string;
  ai: boolean;
  Msgtype:string;
}


export function InputMessage({messages, setMessage}:InputMessageProps) {
  const [isThinking, setIsThinking] = useState(false);
  
  console.log(messages);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    
    setMessage((prev) => [
      ...prev,
      { message: values.message, ai:false, Msgtype:"text"}
    ]);
    form.reset();

    //while we are fetching the response maybe add a loading message from ai. ai is thinking 
    setMessage((prev) => [
      ...prev,
      { message: "AI is thinking...", ai: true, Msgtype: "isTyping" },
    ]);

    const prompt = `
You are the personal AI assistant for Milan Nikolic. Follow these rules strictly.

# 0) Input
The visitors raw message will be inserted here: ${values.message}

# 1) Ultra-compact intent router (exact output rules)
- If the visitor is asking about Milans projects in plural, not just particular one (e.g., “skills”, “tech stack”, “what technologies”, “programming languages”), output EXACTLY: projects
- If the visitor asks for Milans resume or CV, output EXACTLY: resume
- If the visitor asks for his GitHub (e.g., “GitHub”, “repo”, “github link”), output EXACTLY: github
- If the visitor asks for his LinkedIn (e.g., “LinkedIn”, “linkedin profile”, “linkedin link”), output EXACTLY: linkedin
- If none of the above match, continue to section 2.

# 2) Scope and persona
- Speak ONLY based on verified facts from Milans CV and this chat. Do NOT invent or assume anything.
- Refer to Milan in the third person (“he”, “his”).
- If the visitor asks about something unrelated to Milan (e.g., general how-to, random topics), politely ask if they need help discovering his portfolio.
- Prefer facts from this chat when they conflict with the CV; otherwise use the CV.

# 3) Facts you may use (do not exceed these)
- Full name: Milan Nikolic.
- Location: Belgrade, Serbia (open to remote, part-time, anywhere — from this chat).
- Profession: Full Stack Web Developer.
- Education (from CV): Bachelors degree in Information Technologies, Military Technical Academy, expected October 2025 :contentReference[oaicite:0]{index=0}; Military High School diploma, September 2021 :contentReference[oaicite:1]{index=1}.
- Coursework (CV): Data Structures and Algorithms; Object-Oriented Programming; Web Development; Databases; Introduction to Cryptography; Networking. :contentReference[oaicite:2]{index=2}
- Skills (CV):
  - Programming: C++, C, Java, JavaScript, SQL, Python; Computer Networking. :contentReference[oaicite:3]{index=3}
  - Design: Figma, Adobe XD. :contentReference[oaicite:4]{index=4}
- Languages (CV): Native Serbian, Fluent English, Conversational Russian. :contentReference[oaicite:5]{index=5}
- Leadership (CV): Web Hosting & Infrastructure Optimization Lead at a small Webflow agency; reduced hosting/domain costs by 70%; maintained performant, reliable hosting infrastructure for client sites. :contentReference[oaicite:6]{index=6}
- Projects (CV):
  1) DevFlow (Full Stack Next.js): auth; MongoDB; OpenAI integration; Q&A with voting/tagging/profiles; reputation & badges; real-time via webhooks. :contentReference[oaicite:7]{index=7}
  2) Uber Ride Full Stack App: Express.js REST APIs; auth; real-time status; PostgreSQL schema for profiles/histories/payments/tracking; ~30% perf gain via indexed queries; React UI with live driver tracking. :contentReference[oaicite:8]{index=8}
  3) GSM encryption research (A5/1, A5/2, Kasumi): examined algorithms, “security through obscurity” vs Shannon’s principle, global impact. :contentReference[oaicite:9]{index=9}
- Additional from this chat: Open to remote & part-time roles worldwide; based in Belgrade, Serbia.

# 4) Response style
- Be concise, professional, and relevant to the visitors ask.
- If the visitors message is not about Milan, reply: 
  “Happy to help — would you like to explore Milans portfolio or experience?”

# 5) Output contract
- First apply section 1s router. If it matches, OUTPUT ONLY the required single word (skills | resume | github | linkedin), with no extra characters.
- Otherwise produce a normal answer that strictly uses facts in section 3.
    `
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", parts: [{ type: "text", text: prompt }] }
        ]
      }),
    });

    //@ts-expect-error because it will never be null
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let assistantMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      assistantMessage += chunk;

    }
    if(assistantMessage === "projects" || assistantMessage === "resume" || assistantMessage === "github" || assistantMessage === "linkedin") {
      setMessage((prev) => {
        const copyOfMessages = [...prev];
        copyOfMessages[copyOfMessages.length - 1] = {
          message: assistantMessage, ai: true, Msgtype: assistantMessage.trim()
        }

        return copyOfMessages;
      });
    }else{
      setMessage((prev) => {
        const copyOfMessages = [...prev];
        copyOfMessages[copyOfMessages.length - 1] = {
          message: assistantMessage, ai: true, Msgtype: "text"
        }

        return copyOfMessages;
      });
    }

    

    // setMessage((prev) => [
    //   ...prev,
    //  { message: assistantMessage, ai:true, Msgtype:"text"}
    // ]);

  }

  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);
  return (
    <div className="w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between gap-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">

                <FormControl className=" bg-[#11131F] border-[1px] border-gray-700">
                  <Input onKeyDown={(e) => {
                    if (e.key === "Emter" && !e.shiftKey) {
                      e.preventDefault();

                      form.handleSubmit(onSubmit)();

                    }
                  }} className="block rounded-2xl focus:outline-none focus:ring-0 p-2" placeholder="Ask me about Milan's projects, skills, or try '/help' for commands..." {...field} />
                </FormControl>
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-2xl glow-[#7A6EFF] bg-[#7A6EFF] hover:scale-110 transition-all duration-300 shadow-lg shadow-[#7A6EFF]/30 hover:shadow-xl hover:shadow-[#7A6EFF]/40 cursor-pointer"><Send className="w-4 h-4" /></Button>

        </form>
      </Form>
    </div>
  )
}
