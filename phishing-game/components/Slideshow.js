import { useState } from "react";

const slides = [
  {
    description:
      "Emails that create urgency, like 'Verify your password now!' These try to pressure you into acting quickly without thinking.",
    image: "/images/phishing1.jpg",
  },
  {
    description:
      "Unexpected prize claims such as 'You won a Million Dollars!' are often scams designed to steal your personal information.",
    image: "/images/phishing2.jpg",
  },
  {
    description:
      "Suspicious links asking for personal info or login credentials should always raise red flags.",
    image: "/images/phishing3.jpg",
  },
  {
    title: "What is Phishing?",
    description:
      "Phishing is a cyberattack technique where attackers impersonate trusted entities to trick you into revealing sensitive data.",
    image: "/images/phishing_info1.jpg",
  },
  {
    title: "Common Scam Techniques",
    description:
      "Scammers use fake emails, websites, phone calls, or texts to lure victims into giving up passwords, credit card numbers, or other data.",
    image: "/images/phishing_info2.jpg",
  },
  {
    title: "How to Protect Yourself",
    description:
      "Always verify the sender’s address, avoid clicking on suspicious links, and never share passwords or personal info via email.",
    image: "/images/phishing_info3.jpg",
  },
];

export default function Slideshow({ onFinish }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish();
    }
  };

  const slide = slides[current];

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
      {slide.image && (
        <img src={slide.image} alt={slide.title} className="mb-4 rounded" />
      )}
      <p className="mb-4">{slide.description}</p>
      <button
        onClick={nextSlide}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {current < slides.length - 1 ? "Next" : "Start Quiz"}
      </button>
    </div>
  );
}
