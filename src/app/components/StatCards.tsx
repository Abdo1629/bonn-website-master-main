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
    <div
      className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center justify-center py-8"
      style={{ scrollSnapAlign: "center" }}
    >
      <h3 className="text-7xl font-extrabold mb-2 bg-clip-text text-transparent bg-white/75 backdrop-blur-sm drop-shadow-lg">
        {shouldCount ? (
          <CountUp end={value} duration={2} suffix={suffix} />
        ) : (
          value
        )}
      </h3>
      <p className="text-xl bg-clip-text text-transparent bg-white/75 backdrop-blur-sm">
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
    { id: 4, value: 50, suffix: "+", label: "Tons/Day" },
  ]);

  const [countingIds, setCountingIds] = useState<number[]>([1, 2, 3, 4]);

  const getVisibleCards = () => {
    if (window.innerWidth < 640) return 1; // موبايل
    if (window.innerWidth < 1024) return 2; // تابلت
    return 3; // ديسكتوب
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let visibleCards = getVisibleCards();
    let currentIndex = 0;

    const handleResize = () => {
      visibleCards = getVisibleCards();
    };

    window.addEventListener("resize", handleResize);

    const moveNext = () => {
      currentIndex = (currentIndex + 1) % stats.length;

      const cardWidth = scrollContainer.clientWidth / visibleCards;
      const scrollPosition =
        currentIndex * cardWidth - (scrollContainer.clientWidth - cardWidth) / 2;

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setTimeout(moveNext, 2500);
    };

    setTimeout(moveNext, 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [stats.length]);

  return (
    <div className="w-full bg-[#0056D2] py-12 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-scroll no-scrollbar"
        style={{
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory", // لليوزر بس
        }}
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
