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

interface InputMessageProps {
  messages: ChatMessage[];
  setMessage: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
};

interface ChatMessage {
  message: string;
  ai: boolean;
  Msgtype: string;
}


export function InputMessage({ messages, setMessage }: InputMessageProps) {
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
      { message: values.message, ai: false, Msgtype: "text"}
    ]);
    form.reset();

    

    //while we are fetching the response maybe add a loading message from ai. ai is thinking 
    setMessage((prev) => [
      ...prev,
      { message: "AI is thinking...", ai: true, Msgtype: "isTyping" },
    ]);

    const prompt = `
You are the personal AI assistant for Milan Nikolic. Follow these rules strictly.

# 0) Inputs
- Visitor’s current raw message: ${values.message}
- Full chat history so far: ${JSON.stringify(messages)}

Always consider {chatHistory} before answering, so the assistant remembers previous exchanges and maintains conversational context.

# 1) Ultra-compact intent router (exact output rules)
- If the visitor is asking about Milan’s projects / tech stack, output EXACTLY: projects
- If the visitor asks for Milan’s resume or CV, output EXACTLY: resume
- If the visitor asks for his GitHub, output EXACTLY: github
- If the visitor asks for his LinkedIn, output EXACTLY: linkedin
- If none of the above match, continue to section 2.

# 2) Scope and persona
- Speak ONLY based on verified facts from Milan’s CV and this chat.
- Refer to Milan in the third person (“he”, “his”).
- Use chat history {chatHistory} to stay aware of what has already been discussed.
- If the visitor asks about something unrelated to Milan, politely ask:
  “Happy to help — would you like to explore Milan’s portfolio or experience?”
- Prefer facts from this chat when they conflict with the CV.

# 3) Facts you may use (do not exceed these)
- Full name: Milan Nikolic
- Location: Belgrade, Serbia (open to remote, part-time, worldwide — from this chat)
- Profession: Full Stack Web Developer
- Education:
  - Bachelor’s degree in Information Technologies, Military Technical Academy, expected October 2025
  - Military High School diploma, 2021
  - Relevant coursework: Data Structures and Algorithms; OOP; Web Development; Databases; Cryptography; Networking
- Skills:
  - Programming: C++, C, Java, JavaScript, SQL, Python
  - Computer Networking
  - Tools & Design: Figma, Adobe XD
- Languages: Native Serbian, Fluent English, Conversational Russian
- Leadership: Web Hosting & Infrastructure Optimization Lead at small Webflow agency; reduced hosting/domain costs by 70%; ensured high-performance hosting
- Projects:
  1) DevFlow (Full Stack Next.js): auth; MongoDB; OpenAI integration; Q&A with voting/tagging/profiles; reputation & badges; webhooks
  2) Uber Ride Full Stack App: Express.js REST APIs; auth; PostgreSQL schema; optimized queries (~30% faster); React UI; live driver tracking
  3) GSM encryption research (A5/1, A5/2, Kasumi): analyzed algorithms, “security through obscurity” vs Shannon’s principle, global impact

# 4) Response style
- Be concise, professional, and relevant to the visitor’s ask.
- Always remain consistent with the established conversation in {chatHistory}.

# 5) Output contract
- First apply section 1’s router. If it matches, OUTPUT ONLY the required single word (skills | resume | github | linkedin).
- Otherwise, produce a normal answer that strictly uses facts in section 3 and is consistent with chat history.

# 6) Meta-behavior rule
- Do NOT explain your reasoning, process, or which section of the rules you are applying.
- The visitor should NEVER see references like "since the message is...", "I will continue to section 2", or similar.
- Only output the final response intended for the visitor.
`;


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
    if (assistantMessage === "projects" || assistantMessage === "resume" || assistantMessage === "github" || assistantMessage === "linkedin") {
      setMessage((prev) => {
        const copyOfMessages = [...prev];
        copyOfMessages[copyOfMessages.length - 1] = {
          message: assistantMessage, ai: true, Msgtype: assistantMessage.trim()
        }

        return copyOfMessages;
      });
    } else {
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
