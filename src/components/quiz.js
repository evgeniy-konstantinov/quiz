import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { CSVLink } from 'react-csv';

const QuizMain = styled.div`
  background: #252d4a;
  width: 650px;
  min-height: 300px;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  position: relative;
  box-shadow: 10px 10px 35px 0 rgba(0, 0, 0, 0.75);
`;

const QuizList = styled.div`
  background: #252d4a;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: #fff;
`;
const QuizFlex = styled.div`
  width: 600px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  justify-content: space-around;
`;

const QuizQuiz = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuestionForm = styled.form``;
const QuestionCount = styled.div`
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
const QuestionText = styled.div`
  color: #fff;
  font-size: 22px;
`;
const QuestionInput = styled.input`
  padding: 0 0 0 10px;
  height: 70px;
  width: 630px;
  margin: 30px 0 50px 0;
  font-size: 18px;
  outline: none;
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionButton = styled.button`
  /* height: 40px; */
  padding: 5px 0;
  width: 140px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 7px;
`;

const Select = styled.select`
  height: 30px;
  position: absolute;
`;
const ButtonFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Td = styled.td`
  padding: 10px;
`;

export default function Quiz() {
  const question = [
    'Напишите Ваше имя ?',
    'Напишите Вашу фамилию ?',
    'Напишите Ваш год рождения ?',
    'Какой Ваш любимый цвет ?',
    'Какое Ваше любимое блюдо ?',
    'Где Вы предпочитаете отдыхать ?',
    'Как вы относитесь к продукции Aplle ?',
    'Назовите столицу Мадагаскара ?',
    'Кто написал третий закон Ньютона ?',
    'Скажите,понравился ли вам опрос ?',
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [answerList, setAnswerList] = useState(false);
  const [changeAnswerList, setChangeAnswerList] = useState(null);
  const [disableSelect, setDisableSelect] = useState(true);

  const nextQuestionClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setAnswerList(true);
    }
  };
  const prevQuestionClick = () => {
    const prevQuestion = currentQuestion - 1;

    if (prevQuestion < question.length && prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };
  const onChange = (e) => {
    answer[currentQuestion] = e.target.value;
    setAnswer([...answer]);
  };
  const onChangeSelect = () => {
    setAnswerList(false);
    setDisableSelect(false);
  };
  function changeSelect(e) {
    console.log(typeof e.target.value);
    setCurrentQuestion(Number(e.target.value));
  }
  const onChangeList = (e, i) => {};
  useEffect(() => {
    const change = (e) => {
      if (e.key === 'Enter') {
        onChangeList(e);
      }
    };
    window.addEventListener('keydown', change);
    return () => window.removeEventListener('keydown', change);
  }, [onChangeList]);

  // const fullListToCSV = [...question, ...answer].join(';');

  return (
    <QuizMain>
      {answerList ? (
        <QuizList>
          <QuizFlex>
            <table border="1" bordercolor="#c6c6c6" bgcolor="#727272">
              <tbody>
                {question.map((el, i) => (
                  <tr key={i}>
                    <Td>{el}</Td>
                    <Td>
                      {changeAnswerList === i ? (
                        <>
                          <input type="text" onChange />
                          <button
                            onClick={() => {
                              setChangeAnswerList(null);
                            }}
                          >
                            x
                          </button>
                        </>
                      ) : (
                        <div onDoubleClick={() => setChangeAnswerList(i)}>
                          {answer[i]}
                        </div>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </QuizFlex>
          <ButtonFlex>
            <QuestionButton
              onClick={() => {
                setAnswer([]);
                setAnswerList(false);
                setCurrentQuestion(0);
                setDisableSelect(true);
              }}
            >
              Reset
            </QuestionButton>
            <QuestionButton onClick={onChangeSelect}>Change</QuestionButton>
            <QuestionButton>
              {/* <CSVLink data={fullListToCSV}>Save as CSV</CSVLink> */}
            </QuestionButton>
          </ButtonFlex>
        </QuizList>
      ) : (
        <QuizQuiz>
          <Select
            value={currentQuestion}
            hidden={disableSelect}
            onChange={changeSelect}
          >
            {question.map((item, index) => (
              <option value={index} key={index}>
                Перейти к вопросу : {index + 1}
              </option>
            ))}
          </Select>
          <QuestionCount>
            <Span>Вопрос {currentQuestion + 1}</Span> / {question.length}
          </QuestionCount>
          <QuestionText>{question[currentQuestion]}</QuestionText>
          <QuestionForm onSubmit={(e) => e.preventDefault()}>
            <QuestionInput
              type="text"
              onChange={onChange}
              value={answer[currentQuestion] || ''}
              placeholder="Ваш ответ"
            ></QuestionInput>
          </QuestionForm>
          <ButtonSection>
            <QuestionButton onClick={() => prevQuestionClick()}>
              Предыдущий вопрос
            </QuestionButton>

            <QuestionButton onClick={() => nextQuestionClick()}>
              Следующий вопрос
            </QuestionButton>
          </ButtonSection>
        </QuizQuiz>
      )}
    </QuizMain>
  );
}
