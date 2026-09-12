import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const METHODS = [
  "Помодоро (25 минут работы / 5 минут отдыха)",
  "Фейнман (объясни тему простыми словами)",
  "Активное припоминание (вспоминай материал по памяти, без подсказок)",
  "Интервальное повторение (повторяй через растущие интервалы)",
  "Метод Лейтнера (карточки с интервалами по уровням)",
  "Учись, обучая другого (объясни тему воображаемому ученику)",
  "Карта мыслей (нарисуй схему темы)",
  "Помодоро 52/17 (52 минуты работы / 17 минут отдыха)",
  "PQ4R (опрос — чтение — пересказ — вопросы — обзор — самопроверка)",
  "Интерливинг (чередуй разные темы за одну сессию)",
  "Позвонить бывшему и признаться в чувствах",
  "Признаться в чувствах парню и не заходить в телефон 24 часа",
  "Учись лежа (или наоборот — встань и ходи, пока читаешь)",
  "Метод помидора наоборот: 5 минут работы / 25 минут отдыха (для тяжёлых дней)",
  "Разбей тему на пункты и питайся «съесть слона по кусочку»",
  "Пиши конспект от руки, без компьютера",
  "Слушай тему как подкаст/аудио и повторяй по памяти",
  "Учись в новом месте (кафе, библиотека, парк)",
  "Приложи усилия наоборот: перескажи тему наоборот (от результата к началу)",
  "Сам себе тест: придумывай вопросы к теме и отвечай",
  "Учебная прогулка: гуляй и вслух проговаривай материал",
  "Учись до первого пробела знания и заполняй его сразу",
  "Метод «вопрос — поиск — ответ» без интернета",
  "Придумай мем/анекдот по теме",
  "Никакой учёбы — сегодня день отдыха (и это тоже метод)",
];

const FATE_METHODS = [
  "Позвонить бывшему и признаться в чувствах",
  "Признаться в чувствах парню и не заходить в телефон 24 часа",
];

const SLOT_DURATION = 2400;

const Randomizer = () => {
  const [current, setCurrent] = useState(
    () => METHODS[Math.floor(Math.random() * METHODS.length)]
  );
  const [spinning, setSpinning] = useState(false);
  const [fateIndex, setFateIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const start = performance.now();
    const final = FATE_METHODS[fateIndex];

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / SLOT_DURATION, 1);

      if (progress >= 1) {
        setCurrent(final);
        setFateIndex((prev) => (prev + 1) % FATE_METHODS.length);
        timerRef.current = null;
        setSpinning(false);
        return;
      }

      setCurrent(METHODS[Math.floor(Math.random() * METHODS.length)]);

      const delay = 45 + Math.pow(progress, 3) * 300;
      timerRef.current = setTimeout(tick, delay);
    };

    timerRef.current = setTimeout(tick, 45);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const displayLabel = spinning ? "Крутится..." : "Крути";

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-full max-w-2xl bg-gradient-to-br from-white/10 via-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/15 shadow-[0_4px_0_rgba(255,255,255,0.08),0_24px_60px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.15)] p-8 md:p-12 text-center">
        <Link
          to="/"
          className="inline-block mb-8 text-xs uppercase tracking-[0.2em] text-indigo-300/70 hover:text-white transition-colors"
        >
          ← Назад
        </Link>

        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-indigo-200/60 font-medium">
          Судьба решает
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight mb-10 block text-center">
          Рандомайзер методов учебы
          <svg
            viewBox="0 0 24 24"
            className="hidden md:inline-block align-middle ml-2 w-10 h-10 text-amber-300 -translate-y-px"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 3 1 8l11 5 11-5-11-5Z" />
            <path d="M22 11.3 21 9l-9 4.1L3 9l-1 2.3L12 15l10-3.7Z" />
            <path d="M12 15.5 7 13.5V16c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2v-2.5l-5 2Z" />
          </svg>
        </h1>

        <div className="relative h-28 md:h-32 w-full max-w-md mx-auto flex items-center justify-center overflow-hidden rounded-2xl bg-black/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_0_40px_rgba(0,0,0,0.35)]">
          {spinning && (
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-amber-100/15 to-transparent"
              initial={{ x: "-150%" }}
              animate={{ x: "300%" }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={current + (spinning ? "-spin" : "-settle")}
              initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: spinning ? 0.22 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "text-xl md:text-2xl font-medium leading-snug line-clamp-3 px-6",
                spinning ? "text-white/85" : "text-white"
              )}
              aria-live="polite"
            >
              {current}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className={cn(
            "mt-10 px-10 py-3 rounded-full text-lg font-bold text-yellow-950",
            "bg-gradient-to-b from-amber-300 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 active:scale-95",
            "transition-all shadow-lg shadow-amber-500/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
            spinning && "from-amber-300/70 to-yellow-400/70 hover:from-amber-300/70 hover:to-yellow-400/70 cursor-not-allowed"
          )}
        >
          {displayLabel}
        </button>
      </div>
    </motion.div>
  );
};

export default Randomizer;