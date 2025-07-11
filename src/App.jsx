import React, { useState } from "react";
import questions from "./data/questions.json";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleRandom = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (randomIndex === currentIndex && questions.length > 1);
    setDirection(0);
    setCurrentIndex(randomIndex);
    setShowAnswer(false);
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center px-4 overflow-hidden">
      <div className="relative w-full max-w-md min-h-[400px] max-h-[90vh]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            variants={variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 w-full h-auto min-h-[400px] max-h-[90vh] bg-white rounded-3xl shadow-xl p-8 text-center flex flex-col overflow-y-auto"
          >
            <h1 className="text-2xl font-bold mb-4 text-blue-900">Full-Stack</h1>
            <p className="text-lg font-semibold text-gray-800 mb-6">{currentQuestion.question}</p>

            {showAnswer ? (
              <div className="text-green-700 font-medium mb-6">{currentQuestion.answer}</div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition mb-6"
              >
                Show Answer
              </button>
            )}

            <div className="h-2 bg-gray-300 rounded-full mb-6">
              <div
                className="h-full bg-orange-400 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Soru sayısı ve random butonu */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-orange-300 hover:bg-orange-400 disabled:opacity-50 text-white px-4 py-2 rounded-full"
              >
                ←
              </button>
              <span className="text-gray-700 font-semibold">{currentIndex + 1}</span>
              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="bg-orange-300 hover:bg-orange-400 disabled:opacity-50 text-white px-4 py-2 rounded-full"
              >
                →
              </button>
            </div>

            {/* Zar ikonlu random buton */}
            <div className="flex justify-center">
              <button
                onClick={handleRandom}
                className="mx-auto bg-orange-400 hover:bg-orange-200 text-white px-5 py-2 rounded-full shadow transition flex items-center gap-2 text-lg"
                title="Rastgele Soru"
              >
                <span role="img" aria-label="dice">🎲</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
