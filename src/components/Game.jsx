import React, { useState, useRef } from 'react'
import './Game.css'

  const Game = ({gameOver, verify, word, category, acertos, erros, life, score}) => {
  const [entrada, setEntrada] = useState("")
  const referencia = useRef(null)
  
  const verifySubmit = (e) => {
    e.preventDefault();
    
    verify(entrada)
    
    setEntrada("")
    referencia.current.focus()
  }

 return(
   <div className='game'>
    <h2>ADIVINHA A PALAVRA</h2>
    <p>Dica: {category}</p>
    
    <div className="info">
      <p className='score'>
        <span>Pontuação Atual: {score}</span>
      </p>
      <p className="life">
        <span>Vidas: {life}</span>
      </p>
    </div>

    <div className="containerWord">
      {word.map((e, i) => (
        acertos.includes(e) ? (<span key={i} className='certo'>{e.toUpperCase()}</span>):(<span key={i} className="errado"></span>)
      ))}
    </div>

    <form className="form" onSubmit={verifySubmit}>
        <input type="text" name='word' maxLength={1} 
          onChange={(e) => setEntrada(e.target.value.toUpperCase())}
          value={entrada}
          ref={referencia}
        />
        <button>Jogar</button>
    </form>

    <div className="tentativas">
      <p>Tetativas anteriores:</p>
      {erros.map((e, i) => (
        <span key={i}> {e},</span>
      ))}
    </div>
   </div>
 )
}

export default Game
