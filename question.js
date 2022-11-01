import React from "react";

export default function Question(props) {
    const [answer, setanswer] = React.useState("")

    //the answers come from the API coded in html, this normalices that
    function decodeHtmlCharCodes(str) { 
        return str.replace(/(&#?(\d*|\w*);)/g, function(match, capture, charCode) {
          return String.fromCharCode(charCode);
        });
      }
    
      React.useEffect(() => {
        props.inform(props.id, props.data.correct_answer, answer)
      },[answer])

    //build the answer´s set in JSX
    const recivedAnswers = [props.data.correct_answer, ...props.data.incorrect_answers]
    const sorted = recivedAnswers.sort()
    const Answers = sorted.map(e => {
        let clase = ""
        if(e===props.data.correct_answer) {clase = "correcta"}
        else if (answer===e && answer!=props.data.correct_answer) {clase = "erronea"}
        else {clase = ""}
        return <span>
            <input 
            type="radio" 
            id={e} 
            name={props.data.question} 
            value={e}
            checked={answer === e}
            onChange={event => setanswer(event.target.value)}
            disabled={props.ev}
            />
            <label 
            htmlFor={e}
            className={clase}
            >{decodeHtmlCharCodes(e)}</label>
        </span>
    })


    return <div className="question">
        <h5>{decodeHtmlCharCodes(props.data.question)}</h5>
        <form>
            {Answers}
        </form>

    </div>
}