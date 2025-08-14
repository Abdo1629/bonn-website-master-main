"use client";

import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";

type StatCardProps = {
  id: number;
  value: number;
  label: string;
  suffix?: string;
  shouldCount: boolean;
};

function StatCard({ value, label, suffix = "", shouldCount }: StatCardProps) {
  return (
    <div className="flex-shrink-0 w-1/3 flex flex-col items-center justify-center">
      <h3 className="text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-white/30 backdrop-blur-sm drop-shadow-lg">
        {shouldCount ? (
          <CountUp end={value} duration={2} suffix={suffix} />
        ) : (
          value
        )}
      </h3>
      <p className="text-xl bg-clip-text text-transparent bg-white/50 backdrop-blur-sm">
        {label}
      </p>
    </div>
  );
}

export default function StatsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState([
    { id: 1, value: 150, suffix: "+", label: "Products" },
    { id: 2, value: 100000, suffix: "+", label: "Clients" },
    { id: 3, value: 100, suffix: "%", label: "Satisfaction" },
    { id: 4, value: 25, suffix: "+", label: "Countries" },
  ]);

  const [countingIds, setCountingIds] = useState<number[]>([1, 2, 3, 4]); 

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = scrollContainer.clientWidth / 3;
    let currentIndex = 0;

    const moveNext = () => {
      scrollContainer.scrollBy({ left: cardWidth, behavior: "smooth" });
      currentIndex++;

      setTimeout(() => {
        if (currentIndex >= 1) {
          setStats((prev) => {
            const first = prev[0];
            const rest = prev.slice(1);

            setCountingIds((prevIds) => [...prevIds, first.id]);

            return [...rest, first];
          });
          scrollContainer.scrollLeft -= cardWidth;
        }
        moveNext();
      }, 2500);
    };

    setTimeout(moveNext, 2000);
  }, []);

  return (
    <div className="w-full bg-[#0056D2] py-12 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-scroll no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            {...stat}
            shouldCount={countingIds.includes(stat.id)}
          />
        ))}
      </div>
    </div>
  );
}
