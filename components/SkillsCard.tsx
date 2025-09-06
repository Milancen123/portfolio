"use client";
import React from "react";

type Skill = { name: string; percent: number };
type SkillGroup = { title: string; items: Skill[] };

const data: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "React / Next.js", percent: 95 },
      { name: "TypeScript", percent: 90 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", percent: 88 },
      { name: "Express.js", percent: 80 }, // no % provided—assumed
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", percent: 85 },
      { name: "MongoDB", percent: 80 }, // assumed
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { name: "AWS/Cloud", percent: 80 },
      { name: "Docker", percent: 75 },
    ],
  },
];

function SkillBar({ name, percent }: Skill) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-gray-200">{name}</span>
        <span className="text-xs text-gray-400">{clamped}%</span>
      </div>

      {/* Track */}
      <div
        className="h-1 w-full rounded-full bg-neutral-800/80"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={name}
      >
        {/* Fill */}
        <div
          className="h-full rounded-full bg-pink-500 transition-all duration-700"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default function SkillsCard({
  groups = data,
  title = "Skills",
}: {
  groups?: SkillGroup[];
  title?: string;
}) {
  return (
    

      <div className="grid gap-6 grid-cols-2">
        {groups.map((group) => (
          <div key={group.title} className="space-y-3">
            
            <div className="space-y-3">
              {group.items.map((s) => (
                <SkillBar key={s.name} name={s.name} percent={s.percent} />
              ))}
            </div>
          </div>
        ))}
      </div>

  );
}
