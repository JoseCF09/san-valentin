// src/components/Countdown.tsx
import { useEffect, useState } from "react";
import { saveToLocal } from "../utils/storage";
import { motion } from "framer-motion";

const Countdown = ({ onTimeUp }: { onTimeUp: () => void }) => {
  const targetDate = new Date("2025-02-14T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = targetDate - Date.now();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        saveToLocal("timeUp", true);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-6 bg-gradient-to-r from-pink-300 to-pink-500 text-white rounded-3xl shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold">
          💖 Falta muy poco para San Valentín 💖
        </h2>
        <motion.p
          animate={{
            opacity: [1, 0.5, 1],
            transition: { repeat: Infinity, duration: 1.5 },
          }}
          className="mt-4 text-4xl font-extrabold"
        >
          {timeLeft > 0 ? formatTime(timeLeft) : "¡El tiempo se agotó! 💔"}
        </motion.p>
        <p className="mt-2 text-lg font-light">
          Prepárate para una sorpresa especial ✨
        </p>
      </motion.div>
    </div>
  );
};

export default Countdown;
