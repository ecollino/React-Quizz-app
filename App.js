import React from "react"
import './App.css';
import Intro from "./intro";
import Question from "./question";


export default function App() {
  const [trivdata, setTrivdata] = React.useState(false)
  const [quizz, setQuizz] = React.useState([{},{},{},{},{}])
  const [evaluate, setEvaluate] = React.useState(false)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => setTrivdata(data.results))
  }, [])

  function inform(id, cor_ans, gvn_ans) {
    setQuizz(prev => prev.map((e,i)=> {
      return i === id ?
             {c_answ: cor_ans, given_answ: gvn_ans } :
             e
    }))
  }

  function getev(event) {
    event.preventDefault()
    setEvaluate(true)
  }

  var hits = 0;
  quizz.forEach(e => {
    return e.c_answ === e.given_answ && hits++;
  })

  return (
    <div className="App">
      <header className="App-header">
        <Intro trivdata={trivdata} />
        {trivdata && 
        <div className={evaluate ? "evaluation" : ""} >
          <Question data={trivdata[0]} id={0} inform={inform} ev={evaluate} />
          <Question data={trivdata[1]} id={1} inform={inform} ev={evaluate} />
          <Question data={trivdata[2]} id={2} inform={inform} ev={evaluate} />
          <Question data={trivdata[3]} id={3} inform={inform} ev={evaluate} />
          <Question data={trivdata[4]} id={4} inform={inform} ev={evaluate} />

        {evaluate ?
         <div><h6>{hits}/5 correct answers</h6></div>: 
         <form><button onClick={getev} >Check answers</button></form>}
        <form className="playagain"><button>Play again</button></form>
        </div>}
      </header>
    </div>
  );
}


