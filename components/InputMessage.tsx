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



const formSchema = z.object({
  message: z.string().min(2).max(300),
})

const actions=[
  {
    icon:Code,
    name:"Projects"
  },
  {
    icon:Mail,
    name:"Resume"
  },
  {
    icon:Github,
    name:"GitHub"
  },
  {
    icon:Linkedin,
    name:"LinkedIn"
  }
];

export function InputMessage() {
   // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
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
                        <Input className="block rounded-2xl focus:outline-none focus:ring-0 p-2" placeholder="Ask me about Milan's projects, skills, or try '/help' for commands..." {...field} />
                    </FormControl>
                    <FormDescription>
                        
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="rounded-2xl glow-[#7A6EFF] bg-[#7A6EFF] hover:scale-110 transition-all duration-300 shadow-lg shadow-[#7A6EFF]/30 hover:shadow-xl hover:shadow-[#7A6EFF]/40 cursor-pointer"><Send className="w-4 h-4"/></Button>
              
            </form>
        </Form>
    </div>
)}
