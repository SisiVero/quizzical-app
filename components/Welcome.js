import React from "react";

export default function Welcome(props) {
  return (
    <div className="welcome-contents">
    <img src={"./images/top.png"} className="welcome-top-img" alt="Top Image" />
          <p className="welcome-text">Welcome to Quizzical</p>
          <p className="welcome-body-text">
            Get ready to challenge your knowledge with a fun and exciting quiz experience. Let's
            see how much you really know. Get quizzical with Quizzcal!
          </p>
          <button onClick={props.questionsPage} className="start-btn">Start quiz</button>
      <img src={"./images/bottom.png"} className="welcome-bottom-img" alt="Bottom Image" />
    </div>
  );
}
