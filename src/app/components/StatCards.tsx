"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

type StatCardProps = {
  value: number;
  label: string;
  suffix?: string;
};

function StatCard({ value, label, suffix = "" }: StatCardProps) {
  const [startCount, setStartCount] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setStartCount(true);
    const timer = setTimeout(() => setStartCount(false), 2200);
    return () => clearTimeout(timer);
  }, [value, i18n.language]);

  return (
    <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center justify-center py-8">
      <h3 className="text-7xl font-extrabold mb-2 text-white drop-shadow-lg">
        {startCount ? (
          <CountUp end={value} duration={2} suffix={suffix} />
        ) : (
          value + suffix
        )}
      </h3>
      <p className="text-xl bg-clip-text text-transparent bg-white/75 backdrop-blur-sm">
        {t(label)}
      </p>
    </div>
  );
}

export default function StatsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState([
    { id: 1, value: 500, suffix: "+", label: "products" },
    { id: 2, value: 10, suffix: "+", label: "clients" },
    { id: 3, value: 100, suffix: "%", label: "satisfaction" },
    { id: 4, value: 25, suffix: "+", label: "tonsPerDay" },
    { id: 5, value: 9, suffix: "+", label: "countries" },
    { id: 6, value: 7, suffix: "+", label: "productionLines" },
  ]);

  const getVisibleCards = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let visibleCards = getVisibleCards();
    let cardWidth = scrollContainer.clientWidth / visibleCards;

    const handleResize = () => {
      visibleCards = getVisibleCards();
      cardWidth = scrollContainer.clientWidth / visibleCards;
    };

    window.addEventListener("resize", handleResize);

    const loop = () => {
      scrollContainer.scrollBy({ left: cardWidth, behavior: "smooth" });

      setTimeout(() => {
        setStats((prev) => {
          const [first, ...rest] = prev;
          return [...rest, first];
        });

        scrollContainer.scrollLeft -= cardWidth;

        loop();
      }, 2500);
    };

    const timer = setTimeout(loop, 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full bg-[#0056D2] py-12 overflow-hidden" dir="ltr">
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-scroll no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.id + "-" + i18n.language} {...stat} />
        ))}
      </div>
    </div>
  );
}
