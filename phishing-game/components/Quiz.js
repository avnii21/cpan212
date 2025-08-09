import { useState, useEffect, useRef } from "react";

const questions = [
  {
    type: "truefalse",
    text: 'Your account will be suspended unless you verify your password.',
    correctAnswer: true,
    tip: 'This is a common phishing tactic to create urgency.',
  },
  {
    type: "truefalse",
    text: 'Your recent order has been shipped.',
    correctAnswer: false,
    tip: 'This message is usually safe if it matches your recent activity.',
  },
  {
    type: "truefalse",
    text: 'Click this link to win a free iPhone!',
    correctAnswer: true,
    tip: 'Be suspicious of unexpected prize claims or offers.',
  },
  {
    type: "multiplechoice",
    text: "Which of the following is a common sign of a phishing email?",
    options: [
      "Urgent requests for personal information",
      "Professional email signature",
      "Correct spelling and grammar",
      "Known contact from your address book",
    ],
    correctAnswer: 0,
    tip: "Phishing emails often create urgency to trick victims.",
  },
  {
    type: "multiplechoice",
    text: "What should you do if you receive a suspicious email?",
    options: [
      "Click any links to verify",
      "Reply asking for more info",
      "Delete it or report as phishing",
      "Forward it to friends",
    ],
    correctAnswer: 2,
    tip: "Avoid clicking or replying; report suspicious emails instead.",
  },
  {
    type: "truefalse",
    text: 'Your friend tagged you in a photo on social media.',
    correctAnswer: false,
    tip: 'Social notifications like this are usually legitimate.',
  },
  {
    type: "truefalse",
    text: 'Download this invoice attached to your email.',
    correctAnswer: true,
    tip: 'Unexpected attachments can contain malware.',
  },
  {
    type: "truefalse",
    text: 'We noticed a login from a new device, please verify your identity.',
    correctAnswer: true,
    tip: 'Phishing emails often mimic security alerts.',
  },
  {
    type: "truefalse",
    text: 'Your subscription has been renewed successfully.',
    correctAnswer: false,
    tip: 'Subscription confirmations are generally safe.',
  },
];

function shuffleArray(array) {
  return array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    shuffleArray(questions)
  );
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);
  const [bestScore, setBestScore] = useState(
    () => parseInt(localStorage.getItem("bestScore")) || 0
  );

  useEffect(() => {
    if (answer === null) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [answer, current]);

  useEffect(() => {
    if (timeLeft <= 0 && answer === null) {
      setAnswer("timeout");
      clearInterval(timerRef.current);
    }
  }, [timeLeft, answer]);

  const question = shuffledQuestions[current];

  const handleAnswer = (choice) => {
    if (answer !== null) return;
    setAnswer(choice);
    clearInterval(timerRef.current);

    let isCorrect = false;
    if (question.type === "multiplechoice") {
      isCorrect = choice === question.correctAnswer;
    } else {
      isCorrect = choice === question.correctAnswer;
    }
    if (isCorrect) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    setAnswer(null);
    setTimeLeft(15);
    if (current + 1 >= shuffledQuestions.length) {
      if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        setBestScore(score);
      }
    }
    setCurrent((c) => c + 1);
  };

  if (current >= shuffledQuestions.length) {
    return (
      <div className="p-4 max-w-md mx-auto mt-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="mb-2">
          Your score: {score} / {shuffledQuestions.length}
        </p>
        <p className="mb-2">
          Best score: {bestScore} / {shuffledQuestions.length}
        </p>
        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setAnswer(null);
            setTimeLeft(15);
            setShuffledQuestions(shuffleArray(questions));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
      <div className="flex justify-between mb-2">
        <div>
          Question {current + 1} of {shuffledQuestions.length}
        </div>
        <div>Time left: {timeLeft}s</div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Is this email a phishing attempt?</h2>
      <p className="mb-4 italic">"{question.text}"</p>

      {question.type === "multiplechoice" ? (
        <div className="space-y-2 mb-4">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answer !== null}
              className="block w-full px-4 py-2 bg-gray-100 text-gray-900 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-x-2 mb-4">
          <button
            onClick={() => handleAnswer(true)}
            disabled={answer !== null}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={answer !== null}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            No
          </button>
        </div>
      )}

      {answer !== null && (
        <>
          <p className="mb-2 font-bold">
            {answer === "timeout"
              ? "Time's up! Moving to next question."
              : answer === question.correctAnswer
              ? "Correct!"
              : "Oops, not quite."}
          </p>
          <p className="mb-4 text-sm italic">{question.tip}</p>
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {current + 1 === shuffledQuestions.length ? "Finish" : "Next"}
          </button>
        </>
      )}
    </div>
  );
}
