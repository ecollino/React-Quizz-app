import React from "react";

export default function Intro(props) {
    const [hiden, setHiden] = React.useState(false)

    function hide() {
        setHiden(prev => !prev)
    }

    return <div id="intro" className={hiden ? "hide" : ""}>
        <h2>Quizzical</h2>
        <p>click the button to set your quizz</p>
        <button onClick={hide}>
            {props.trivdata ? "Start Quiz" : "Loading..."}
        </button>
    </div>
}