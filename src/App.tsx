import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { QuestionState, fetchQuizQuestions } from "./API";
import { Difficulty } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameFinish, setGameFinish] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startQuiz = async () => {
    setLoading(true);
    setGameFinish(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  console.log(questions);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameFinish) {
      // User answer
      const answer = e.currentTarget.value;
      //Check the answer
      const correct = questions[number].correct_answer === answer;
      // Add score if correct
      if (correct) {
        setScore((prev) => prev + 1);
      }
      // save answer in the array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestionNumber = number + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameFinish(true);
    } else {
      setNumber(nextQuestionNumber);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameFinish || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {!gameFinish && (
          <p className="score">
            Score: {score} / {TOTAL_QUESTIONS}
          </p>
        )}

        {loading && <p>Loading questions...</p>}

        {!loading && !gameFinish && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameFinish &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next question
            </button>
          )}
      </Wrapper>
    </>
  );
}

export default App;
