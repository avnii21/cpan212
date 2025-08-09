import { useState } from "react";
import Slideshow from "../components/Slideshow";
import Quiz from "../components/Quiz";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Phishing Awareness Game</h1>
      {!started ? (
        <Slideshow onFinish={() => setStarted(true)} />
      ) : (
        <Quiz />
      )}
    </main>
  );
}
