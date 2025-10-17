"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

const aboutImages = [
  "/images/bonn1.jpeg",
  "/images/bonn2.jpeg",
  "/images/bonn3.jpeg",
];

function useTypingEffect(texts: string[], typingSpeed = 100, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= texts.length) return;

    const currentText = texts[index];
    if (!deleting && subIndex === currentText.length) {
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setDisplayText(currentText.substring(0, subIndex));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting]);

  return displayText;
}

export default function About() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToImage = (index: number) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        left: scrollContainer.clientWidth * index,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
  };

  const handleArrowClick = (dir: "next" | "prev") => {
    const newIndex =
      dir === "next"
        ? (activeIndex + 1) % aboutImages.length
        : (activeIndex - 1 + aboutImages.length) % aboutImages.length;
    scrollToImage(newIndex);
  };

  const typingText = useTypingEffect([
    t("whoWeAre"),
    t("weAreDifferent"),
    t("bmiIsFuture"),
  ]);

  const activeIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndexRef.current + 1) % aboutImages.length;
      activeIndexRef.current = nextIndex;
      scrollToImage(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-white to-[#F1F6FD] py-16 px-6 md:px-8">
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row-reverse">
        {/* Carousel */}
        <div className="w-full md:w-1/2 relative">
          <div
            dir="ltr"
            ref={scrollRef}
            className="flex overflow-x-scroll no-scrollbar scroll-smooth snap-x snap-mandatory rounded-xl shadow-lg"
            style={{ scrollbarWidth: "none" }}
            onScroll={(e) => {
              const index = Math.round(
                e.currentTarget.scrollLeft / e.currentTarget.clientWidth
              );
              setActiveIndex(index);
            }}
          >
            {aboutImages.map((src, i) => (
              <div
                key={i}
                className="min-w-full h-110 max-[1055px]:h-150 max-[768px]:h-50 snap-center relative"
              >
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => handleArrowClick("prev")}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white text-[#0056D2] p-2 rounded-full shadow hover:bg-gray-100"
            aria-label="Previous"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => handleArrowClick("next")}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white text-[#0056D2] p-2 rounded-full shadow hover:bg-gray-100"
            aria-label="Next"
          >
            <FaArrowRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4" dir="ltr">
            {aboutImages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToImage(i)}
                className={clsx(
                  "h-3 rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-6 bg-[#0056D2]"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                    
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-[#003D99] space-y-6">
          <h2 className="text-4xl font-extrabold min-h-[48px] drop-shadow-md">
            {typingText}
            <span className="blinking-cursor">|</span>
          </h2>

          <p className="text-lg leading-relaxed text-[#1A3351]">
            {t("aboutParagraph1")}
          </p>
          <p className="text-lg leading-relaxed text-[#1A3351]">
            {t("aboutParagraph2")}
          </p>
          <Link
            href="/about"
            className="inline-block mt-4 text-[#0056D2] font-semibold hover:underline transition"
          >
            {t("readMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
