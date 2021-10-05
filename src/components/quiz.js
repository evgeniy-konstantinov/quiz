import React, { useState } from 'react';
import styled from 'styled-components';

const Quiz_main = styled.div`
  background: #252d4a;
  width: 650px;
  min-height: 300px;
  border-radius: 15px;
  padding: 20px;
  display: flex;

  box-shadow: 10px 10px 35px 0 rgba(0, 0, 0, 0.75);
`;

const Quiz_quiz = styled.div`
  display: flex;
  flex-direction: column;
`;
const Question_section = styled.form``;
const Question_count = styled.div`
  margin-bottom: 20px;
  color: #fff;
  font-size: 18px;
  display: flex;
  justify-content: center;
`;
const Span = styled.span`
  color: #fff;
  font-size: 18px;
`;
const Question_text = styled.div`
  color: #fff;
  font-size: 22px;
`;
const Question_area = styled.input`
  padding: 0 0 0 10px;
  height: 70px;
  width: 630px;
  margin: 30px 0 50px 0;
  font-size: 18px;
  outline: none;
`;
const Next_question = styled.button`
  height: 40px;
  width: 180px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 7px;
`;

export default function Quiz() {
  const question = [
    {
      questionText: 'Ваше имя ?',
    },
    {
      questionText: 'Ваша фамилия ?',
    },
    {
      questionText: 'Ваш год рождения ?',
    },
    {
      questionText: 'Ваш любимый цвет ?',
    },
    {
      questionText: 'Ваше любимое блюдо ?',
    },
    {
      questionText: 'Где предпочитаете отдыхать ?',
    },
    {
      questionText: 'Как вы относитесь к продукции Aplle ?',
    },
    {
      questionText: 'Назовите столицу Мадагаскара ?',
    },
    {
      questionText: 'Кто написал третий закон Ньютона ?',
    },
    {
      questionText: 'Скажите,понравился ли вам опрос ?',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const nextQuestionClick = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  return (
    <Quiz_main>
      <Quiz_quiz>
        <Question_count>
          <Span>Вопрос {currentQuestion + 1}</Span> / {question.length}
        </Question_count>
        <Question_text>{question[currentQuestion].questionText}</Question_text>
        <Question_section>
          <Question_area type="text" placeholder="Ваш ответ"></Question_area>
        </Question_section>
        <Next_question onClick={() => nextQuestionClick()}>
          Следующий вопрос
        </Next_question>
      </Quiz_quiz>
    </Quiz_main>
  );
}
