import React from 'react'
import './GameOver.css'

const GameOver = ({home, score}) => {
  return (
    <div className="Container_GameOver">
      <h1>GAME OVER</h1>
      <h2>Pontuação final: <span>{score}</span></h2>
      <button onClick={home}>Voltar</button>
    </div>
  )
}

export default GameOver