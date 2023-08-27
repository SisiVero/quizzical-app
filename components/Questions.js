import React, { useState, useEffect } from "react";

export default function Questions(props) {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  const checkAnswers = () => {
    setShowResults(true);
  };

  const restartQuiz = () => {
    setPlayAgain(false);
    setSelectedAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    fetchQuestions(); // Fetch new questions
  };

  const fetchQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setSelectedAnswers(Array(data.results.length).fill(null));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (selectedAnswers.filter((answer) => answer !== null).length === questions.length) {
      setAllQuestionsAnswered(true);
    } else {
      setAllQuestionsAnswered(false);
    }
  }, [selectedAnswers, questions]);

  const handleOptionClick = (questionIndex, optionIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[questionIndex] = optionIndex;
      return newSelectedAnswers;
    });

    if (showResults) {
      setShowResults(false);
      setPlayAgain(true);
    }
  };

  return (
    <div className="questions-screen">
          <img src={"./images/top.png"} className="welcome-top-img qustn-top" alt="Top Image" />

      {questions.length > 0 && (
        <div>
        <button className="back-home" onClick={props.welcomePage}>Back</button>
          <p className="questions"> Questions </p>
          <div className="questions-list">
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question">
                <p className="question-text">{question.question}</p>
                <div className="options-list">
                  {question.incorrect_answers.map((option, optionIndex) => {
                    const isSelected = selectedAnswers[questionIndex] === optionIndex;
                    const isCorrectAnswer = optionIndex === question.correct_answer_index;
                    const shouldHighlightWrongAnswer = showResults && isSelected && !isCorrectAnswer;

                    return (
                      <button
                        key={optionIndex}
                        className={`option-button ${isSelected ? "selected" : ""}  ${shouldHighlightWrongAnswer ? "highlight-incorrect" : ""}`}
                        onClick={() => handleOptionClick(questionIndex, optionIndex)}
                      >
                        {option}
                      </button>
                    );
                  })}
                  <button
                    className={`option-button ${
                      selectedAnswers[questionIndex] === question.correct_answer_index ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick(questionIndex, question.correct_answer_index)}
                  >
                    {question.correct_answer}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="button-group">
            {showResults ? (
              <div className="score">
                You scored{" "}
                {selectedAnswers.filter(
                  (answer, index) =>
                    answer === questions[index].correct_answer_index
                ).length}/{questions.length}
              </div>
            ) : null}
            <button
              onClick={showResults ? restartQuiz : checkAnswers}
              disabled={!allQuestionsAnswered && !showResults}
              className={allQuestionsAnswered ? "question-btn" : "disabled-cursor"}
            >
              {showResults ? "Play Again" : "Check Answers"}
            </button>
          </div>
        </div>
      )}
      <img src={"./images/bottom.png"}
       className="questions-bottom-img" alt="Bottom Image" />
    </div>
  );
}
