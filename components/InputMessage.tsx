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


    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", parts: [{ type: "text", text: values.message }] }
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

    setMessage((prev) => {
      const copyOfMessages = [...prev];
      copyOfMessages[copyOfMessages.length - 1] = {
        message: assistantMessage, ai: true, Msgtype: "text"
      }

      return copyOfMessages;
    });

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
