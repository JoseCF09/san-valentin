import { useState } from "react";
import Countdown from "./components/Countdown";
import Quiz from "./components/Quiz";
import LoveLetter from "./components/LoveLetter";
import { getFromLocal } from "./utils/storage";

const App = () => {
  const [quizCompleted, setQuizCompleted] = useState(
    getFromLocal("quizCompleted") || false
  );
  const [timeUp, setTimeUp] = useState(getFromLocal("timeUp") || false);
  const [valentineAccepted] = useState(
    getFromLocal("valentineAccepted") || false
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-200 via-pink-100 to-white flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-6 flex flex-col items-center">
        {!quizCompleted && !timeUp && (
          <>
            <Countdown onTimeUp={() => setTimeUp(true)} />
            <p className="mt-4 text-center text-lg text-pink-700">
              ¡Responde las preguntas y desbloquea tu sorpresa! 💝
            </p>
          </>
        )}

        {!quizCompleted && !timeUp && (
          <Quiz onComplete={() => setQuizCompleted(true)} />
        )}

        {(quizCompleted || valentineAccepted) && <LoveLetter />}

        {timeUp && !quizCompleted && (
          <div className="text-center text-pink-800">
            <h2 className="text-2xl font-semibold">Se acabó el tiempo... 💔</h2>
            <p className="mt-2 text-lg">Pero aún puedes sorprenderme 🌹</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
