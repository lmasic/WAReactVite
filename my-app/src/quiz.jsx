import { useState } from "react";
import "./Quiz.css";

const QUESTIONS = [
  {
    text: "Hlavní město České republiky?",
    answers: ["Brno", "Praha", "Ostrava"],
    correct: 1,
  },
  {
    text: "Kolik je 7 × 6?",
    answers: ["36", "42", "48"],
    correct: 1,
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[current];

  function selectAnswer(index) {
    if (finished) return;

    setAnswers({
      ...answers,
       [current]:index,
    });
  }

  function evaluate() {
    setFinished(true);
  }

  return (
    <div className="quiz">
      <h2>{question.text}</h2>

      {question.answers.map((answer, index) => {
        let className = "";

        if (finished) {
          if (index === question.correct) {
            className = "correct";
          } else if (answers[current] === index) {
            className = "wrong";
          }
        }

        return (
          <label key={index} className={className}>
            <input
              type="radio"
              disabled={finished}
              checked={answers[current] === index}
              onChange={() => selectAnswer(index)}
            />
            {answer}
          </label>
        );
      })}

      <div className="navigation">
        <button
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
        >
          Zpět
        </button>

        <button
          onClick={() => setCurrent(current + 1)}
          disabled={current === QUESTIONS.length - 1}
        >
          Vpřed
        </button>
      </div>

      <button onClick={evaluate} className="evaluate">
        Vyhodnotit test
      </button>
    </div>
  );
}