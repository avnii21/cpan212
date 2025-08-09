import { useState } from "react";

const questions = [
  {
    text: 'Your account will be suspended unless you verify your password.',
    correctAnswer: true,
    tip: 'This is a common phishing tactic to create urgency.',
  },
  {
    text: 'Your recent order has been shipped.',
    correctAnswer: false,
    tip: 'This message is usually safe if it matches your recent activity.',
  },
  {
    text: 'Click this link to win a free iPhone!',
    correctAnswer: true,
    tip: 'Be suspicious of unexpected prize claims or offers.',
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(null);

  const handleAnswer = (choice) => {
    setAnswer(choice);
    if (choice === questions[current].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setAnswer(null);
    setCurrent(current + 1);
  };

  if (current >= questions.length) {
    return (
      <div className="p-4 max-w-md mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="mb-2">Your score: {score} / {questions.length}</p>
        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-2">Is this email a phishing attempt?</h2>
      <p className="mb-4 italic">"{question.text}"</p>
      <div className="space-x-2 mb-4">
        <button
          onClick={() => handleAnswer(true)}
          disabled={answer !== null}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={answer !== null}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          No
        </button>
      </div>

      {answer !== null && (
        <>
          <p className="mb-2 font-bold">
            {answer === question.correctAnswer ? "Correct!" : "Oops, not quite."}
          </p>
          <p className="mb-4 text-sm italic">{question.tip}</p>
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
