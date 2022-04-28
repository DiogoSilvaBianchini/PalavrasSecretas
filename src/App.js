// React
import { useEffect, useState, useCallback } from 'react';
//Data
import {wordsList} from './data/words'
//Componente
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//Css
import './App.css';

const stage = [
  {id: 1, name: "Start"},
  {id: 2, name: "Game"},
  {id: 3, name: "End"}
]


function App() {
  const [gameStage, setGameStage] = useState(stage[0].name)
  const [categoria, setCategoria] = useState("")
  // eslint-disable-next-line
  const [palavra, setPlavra] = useState("")
  const [wordLettlers, setwordLettlers] = useState("")

  const [acertos, setAcertos] = useState([])
  const [erros, setErros] = useState([])
  const [life, setLife] = useState(5)
  const [score, setScore] = useState(0)

  const PegarCategoria = useCallback(() => {
    //Categoria Aleatoria
    const categorias = Object.keys(wordsList)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]  
 
    //Palavra aleatoria
    const word = wordsList[categoria][Math.floor(Math.random() * wordsList[categoria].length)]
    
    return {word, categoria}
  }, [])
  const start = useCallback(() => {
    const {word, categoria} = PegarCategoria()

    let wordLettlers = word.split("")
    wordLettlers = wordLettlers.map((l) => l.toUpperCase()) 
    setwordLettlers(wordLettlers)
    setCategoria(categoria)
    console.log(wordLettlers)
    setPlavra(word)

    reset()
    setGameStage(stage[1].name)
  }, [PegarCategoria])

  const home = () => {
    setGameStage(stage[0].name)
    setScore(0)
  }


  const verifyLettler = (words) => {
    console.log(erros)
    if(acertos.includes(words) || erros.includes(words) || words === "" || words === " "){
      return
    }

    if(wordLettlers.includes(words)){
      setAcertos((acertos) => [
        ...acertos, words,
      ])
    }else{
      setErros((erros) => [
        ...erros, words,
      ])
      setLife(() => life - 1)
    }
  }


  const reset = () => {
    setErros([])
    setAcertos([])
    setLife(5)
  }

  useEffect(() => {
    if(life <= 0){
      setGameStage(stage[2].name)
      reset()
    }

  }, [life])

  useEffect(() => {
    const PalavrasUnicas = [...new Set(wordLettlers)]
    
    if(acertos.length === PalavrasUnicas.length && acertos.length !== 0){
      setScore((score) => score += 100)
      start()
      console.log(palavra)
    }

    
  },[acertos, palavra, wordLettlers, start])

  return (
    <div className="App">
      {gameStage === "Start"&& <StartScreen start={start}/>}
      {gameStage === "Game" && <Game 
      verify={verifyLettler} 
      word={wordLettlers} 
      category={categoria} 
      acertos={acertos}
      erros={erros}
      life={life}
      score={score}
      />}
      {gameStage === "End" && <GameOver score={score} home={home}/>}
    </div>
  );
}

export default App;