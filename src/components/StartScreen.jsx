import React from 'react'
import './StartScreen.css'
const StartScreen = ({start}) => {

  return (
    <div className="StartScreen">
        <h2>Screen Word</h2>
        <p>Click no botão para iniciar!</p>
        <button onClick={start}>Iniciar</button>
    </div>
  )
}

export default StartScreen