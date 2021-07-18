import { shuffleArray } from "./utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  difficulty: string;
  type: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionState = Question & {
  answers: string[];
};

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const api = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(api)).json();
  // console.log(data);
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
