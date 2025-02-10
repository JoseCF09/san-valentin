import { useState, useEffect } from "react";
import { saveToLocal } from "../utils/storage";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { FaHeart } from "react-icons/fa";

const images = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
];

const LoveLetter = () => {
  const [accepted, setAccepted] = useState(false);
  const { width, height } = useWindowSize();
  const fullMessage =
    "Desde que te conocí, supe que eras especial. Hemos crecido juntos, enfrentado desafíos y aprendido a ser mejores cada día. Admiro tu esfuerzo, tu dedicación y cómo, incluso bajo presión, logras cumplir todos tus sueños. Quiero seguir compartiendo momentos únicos contigo, como aquel día en el Parque de las Aguas, donde empezó todo.";
  const [displayedText, setDisplayedText] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [showHearts, setShowHearts] = useState(false); // Nuevo estado

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullMessage.length) {
        setDisplayedText(() => fullMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowHearts(true), 500); // Muestra los corazones medio segundo después
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(imageInterval);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    saveToLocal("valentineAccepted", true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-pink-300 via-pink-100 to-white p-6 overflow-hidden">
      {accepted && <Confetti width={width} height={height} />}

      {/* Corazones flotando */}
      {showHearts && (
        <div className="absolute inset-0 flex justify-center items-center">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: Math.random() * 100 + 50, opacity: 0 }}
              animate={{
                y: -100,
                opacity: 1,
                transition: {
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                },
              }}
              className="absolute text-red-400"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1}rem`,
              }}
            >
              <FaHeart />
            </motion.div>
          ))}
        </div>
      )}

      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 bg-white/90 text-pink-800 rounded-3xl shadow-2xl text-center relative"
      >
        <h1 className="text-4xl font-bold">💌 Para Ti 💌</h1>

        {/* Carrusel de fotos */}
        <div className="relative w-full h-80 mt-4 overflow-hidden rounded-lg">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Foto ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover rounded-lg ${
                index === currentImage ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
            />
          ))}
        </div>

        {/* Carta con máquina de escribir */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mt-4 text-lg font-medium leading-relaxed"
        >
          {displayedText}
        </motion.p>

        <p className="mt-4 text-lg">¿Quieres ser mi San Valentín? 💘</p>

        {/* Botón con efecto de latido */}
        <motion.button
          onClick={handleAccept}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-8 py-3 text-lg font-bold text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-all animate-pulse"
        >
          Sí, quiero 💖
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoveLetter;
