import { motion } from "framer-motion";
import { ShuffleHero } from "@/components/ui/shuffle-grid";

const Home = () => {
  return (
    <motion.div
      className="flex w-full min-h-screen justify-center items-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-full max-w-5xl bg-gradient-to-br from-white/10 via-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/15 shadow-[0_4px_0_rgba(255,255,255,0.08),0_24px_60px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.15)] px-6 py-10 md:p-12">
        <ShuffleHero ctaHref="/randomizer" />
      </div>
    </motion.div>
  );
};

export default Home;