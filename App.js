import React from "react"
import Welcome from "./components/Welcome"
import Questions from "./components/Questions"


export default function App(){
    
    const [currentScreen, setCurrentScreen] = React.useState("welcome")
    

function questionsPage(){
    setCurrentScreen("questions")
}

function welcomePage(){
    setCurrentScreen("welcome")
}
    
     
    return (
      <div>
      {currentScreen === "welcome" && <Welcome questionsPage={questionsPage} />}
      {currentScreen === "questions" && <Questions welcomePage={welcomePage}/>}
      </div>
    )
}