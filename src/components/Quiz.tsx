// src/components/Quiz.tsx
import { useState, useEffect } from "react";
import { saveToLocal, getFromLocal } from "../utils/storage";
import { motion } from "framer-motion";

const Quiz = ({ onComplete }: { onComplete: () => void }) => {
  const questions = [
    {
      question: "🎂 ¿Cuándo es mi cumpleaños?",
      options: ["7 de febrero", "9 de febrero", "15 de febrero"],
      answer: "9 de febrero",
    },
    {
      question: "💑 ¿Cuánto tiempo llevamos juntos?",
      options: ["1 año", "1 año con 5 meses", "2 años"],
      answer: "1 año con 5 meses",
    },
    {
      question: "💍 ¿Dónde fue nuestra primera cita?",
      options: ["Cine", "Parque de las Aguas", "Restaurante"],
      answer: "Parque de las Aguas",
    },
    {
      question: "💪 ¿Qué actividad realizo de lunes a viernes?",
      options: ["Estudio inglés", "Voy al gimnasio", "Juego videojuegos"],
      answer: "Voy al gimnasio",
    },
    {
      question: "💖 ¿Qué cualidad especial tiene mi pareja que admiro?",
      options: [
        "Siempre se esfuerza para salir adelante",
        "Es buena cocinando",
        "Nunca se estresa",
      ],
      answer: "Siempre se esfuerza para salir adelante",
    },
    {
      question: "💙 ¿Cuál es mi color favorito?",
      options: ["Rojo", "Azul", "Negro"],
      answer: "Azul",
    },
    {
      question: "🎥 ¿Qué tipo de series me gusta ver?",
      options: ["Telenovelas", "Anime", "Documentales"],
      answer: "Anime",
    },
    {
      question: "🏴‍☠️ ¿Quién es mi personaje favorito de One Piece?",
      options: ["Luffy", "Zoro", "Sanji"],
      answer: "Zoro",
    },
    {
      question: "📚 ¿Cuál es mi manga favorito?",
      options: ["Naruto", "Gantz", "Attack on Titan"],
      answer: "Gantz",
    },
  ];

  const storedIndex = getFromLocal("quizIndex") || 0;
  const storedCorrect = getFromLocal("correctAnswers") || 0;
  const [currentIndex, setCurrentIndex] = useState(storedIndex);
  const [correctAnswers, setCorrectAnswers] = useState(storedCorrect);
  const [answered, setAnswered] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    saveToLocal("quizIndex", currentIndex);
    saveToLocal("correctAnswers", correctAnswers);
  }, [currentIndex, correctAnswers]);

  const handleAnswer = (option: string) => {
    if (!answered) {
      setAnswered(true);
      setTimeout(() => {
        if (option === questions[currentIndex].answer) {
          setCorrectAnswers(correctAnswers + 1);
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
            setAnswered(false);
            setAttempts(0);
          } else {
            saveToLocal("quizCompleted", true);
            onComplete();
          }
        } else {
          setAttempts(attempts + 1);
          setAnswered(false);
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-6 bg-gradient-to-r from-pink-300 to-pink-500 text-white rounded-3xl shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          💭 Responde y desbloquea tu sorpresa 💭
        </h2>
        {/* Indicador de progreso */}
        <div className="w-full bg-pink-200 rounded-full h-3 mb-6">
          <div
            className="bg-pink-600 h-3 rounded-full"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-lg mb-4">
          Pregunta {currentIndex + 1} de {questions.length}
        </p>
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold"
        >
          {questions[currentIndex].question}
        </motion.p>

        <div className="mt-6 space-y-3">
          {questions[currentIndex].options.map((option) => (
            <motion.button
              key={option}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleAnswer(option)}
              className={`w-full py-3 text-lg font-bold rounded-lg transition-all ${
                answered
                  ? option === questions[currentIndex].answer
                    ? "bg-green-500 text-white"
                    : "bg-red-400 text-white"
                  : "bg-white text-pink-600 hover:bg-pink-700 hover:text-white"
              }`}
              disabled={answered}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {attempts > 0 && (
          <p className="mt-4 text-sm text-yellow-200">
            ❗ Respuesta incorrecta, intenta nuevamente.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
