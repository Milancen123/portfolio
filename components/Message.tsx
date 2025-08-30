"use client"

interface messageProps {
    message:string,
    ai:boolean,
};

export function Message({message,ai}:messageProps) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={`w-[70%] p-4 rounded-2xl font-manrope bg-[#0b0e14] flex flex-col gap-2 ${ai ? 'self-start' : 'self-end'} ${ai ? 'bg-[#0b0e14]' : 'bg-[#7A6EFF]'}`}>
        <div>{message}</div>
        <div>
            <h1 className={`text-xs ${ai ? 'text-gray-400' : 'text-gray-200'}`}>{time}</h1>
        </div>
    </div>
)}
