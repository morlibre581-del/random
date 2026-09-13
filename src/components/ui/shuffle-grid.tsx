"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ShuffleHero = ({ ctaHref }: { ctaHref?: string }) => {
  return (
    <section className="w-full px-6 py-8 md:px-8 md:py-12 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-6xl mx-auto">
      <div className="text-center md:text-left w-full max-w-lg">
        <span className="block mb-4 text-xs md:text-sm uppercase tracking-[0.2em] text-indigo-200/70 font-medium">
          Судьба выбирает за тебя
        </span>
        <h3 className="font-display text-4xl md:text-5xl font-semibold text-white leading-[1.15] tracking-tight">
          Какой метод сегодня?{" "}
          <span className="text-indigo-200">Крути и узнай</span>
        </h3>
        <p className="text-base md:text-lg text-indigo-100/70 my-4 md:my-6 font-light leading-relaxed">
          Рандомайзер выбирает метод учёбы (или не очень) — тебе остаётся только{" "}
          <em className="not-italic font-medium text-white">решиться.</em>
        </p>
        {ctaHref ? (
          <Link
            to={ctaHref}
            className={cn(
              "group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2.5 px-6 rounded-lg",
              "transition-all duration-300 hover:from-indigo-400 hover:to-purple-500 active:scale-95",
              "shadow-[0_6px_20px_-6px_rgba(99,60,220,0.6)] hover:shadow-[0_8px_30px_-6px_rgba(99,60,220,0.8)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2",
              "inline-block"
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative">Приступить 🎲</span>
          </Link>
        ) : (
          <button className={cn(
            "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2 px-4 rounded-md",
            "transition-all hover:from-indigo-400 hover:to-purple-500 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2"
          )}>
            Приступить 🎲
          </button>
        )}
      </div>
      <div className="hidden md:block w-full">
        <ShuffleGrid />
      </div>
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: import.meta.env.BASE_URL + "photos/photo-01.jpg" },
  { id: 2, src: import.meta.env.BASE_URL + "photos/photo-02.jpg" },
  { id: 3, src: import.meta.env.BASE_URL + "photos/photo-03.jpg" },
  { id: 4, src: import.meta.env.BASE_URL + "photos/photo-04.jpg" },
  { id: 5, src: import.meta.env.BASE_URL + "photos/photo-05.jpg" },
  { id: 6, src: import.meta.env.BASE_URL + "photos/photo-06.jpg" },
  { id: 7, src: import.meta.env.BASE_URL + "photos/photo-07.jpg" },
  { id: 8, src: import.meta.env.BASE_URL + "photos/photo-08.jpg" },
  { id: 9, src: import.meta.env.BASE_URL + "photos/photo-09.jpg" },
  { id: 10, src: import.meta.env.BASE_URL + "photos/photo-10.jpg" },
  { id: 11, src: import.meta.env.BASE_URL + "photos/photo-11.jpg" },
  { id: 12, src: import.meta.env.BASE_URL + "photos/photo-12.jpg" },
  { id: 13, src: import.meta.env.BASE_URL + "photos/photo-01.jpg" },
  { id: 14, src: import.meta.env.BASE_URL + "photos/photo-02.jpg" },
  { id: 15, src: import.meta.env.BASE_URL + "photos/photo-03.jpg" },
  { id: 16, src: import.meta.env.BASE_URL + "photos/photo-04.jpg" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden relative"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(100%) sepia(100%) hue-rotate(235deg) saturate(120%) brightness(0.65) contrast(0.9)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1554]/30 via-transparent to-[#3a1f8f]/30" />
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="relative rounded-3xl p-2 bg-white/[0.04] border border-white/15 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.7),0_20px_60px_-20px_rgba(99,60,220,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
      <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1.5">
        {squares.map((sq) => sq)}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.02]" />
      </div>
    </div>
  );
};