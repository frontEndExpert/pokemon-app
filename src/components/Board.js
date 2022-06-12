import React,{useState, useEffect} from 'react';
import player from '../images/logo192.png'
import opponent from '../images/logo512.png'
import LifeBar from './LifeBar'


const Board = () => {

const [health, setHealth] = useState([100,100])
const [face, setFace] = useState([1,2])
const [player1, setPlayer1] = useState(true)
const [gameover, setGameover] = useState(false)
const [winner, setWinner] = useState("")
const [playerHistory, setPlayerHistory] = useState([0,0])

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

useEffect(()=>{
    console.log("health:", health)
    if(health[0]<=0 && health[0] < health[1]){
        setGameover(true)
        setWinner("Opponent")
     }else if(health[1]<=0 && health[1] < health[0]){
        setGameover(true)
        setWinner("Player")
     }
},[health[0],health[1]])

  const startGame = () => {
    setPlayerHistory([0,0])
    setHealth([100,100])
    setGameover(false)
  }  

  const continueGame = () => {
      setPlayerHistory( history => {
        (winner=='player') ? 
        history[0] = history[0] + 1 :
        history[1] = history[1] + 1;
        return history
      })

    setHealth([100,100])
    setGameover(false)
  }  

const rollDice = () => {
    var temp1 = getRandomInt(5) 
    var temp2 = getRandomInt(5)
    setFace([temp1,temp2])
    console.log("roll")
    setHealth(health => {
        console.log(temp1,temp2)
       health[0] = health[0] - temp1;
       health[1] = health[1] - temp2;
       return health;
     } )

     if(health[0]<=0 && health[0] < health[1]){
        setGameover(true)
        setWinner("Opponent")
     }else if(health[1]<=0 && health[1] < health[0]){
        setGameover(true)
        setWinner("Player")
     }

}


    return (<>
        <h1>Pokemon Battle Simulator</h1>
        <div className="layout" >
            <div className="col1" >
                <p className="title1">Player</p>
                <LifeBar health={health[0]} player1={player1} />
                <img className="pic" width="80px" height="80px" src={player} alt="player" />
            </div>
            <div className="center-board" >
                <div className="cube">{face[0]}</div><div className="cube">{face[1]}</div>
                <div className="col10">
                    You hit for {face[0]}<br/>
                    Your opponent hit for {face[1]}
                </div>
              {gameover ? <><p className="winner">{ winner=='opponent' ? "Game Over" : "You Win!"}</p>
                <button className="btn attack" onClick={startGame} >Start with New PokeMone!</button>
                <button className="btn attack" onClick={continueGame} >Play Again with your Pokemon!</button>
                </>
               : <button className="btn attack" onClick={rollDice} >Attack!</button> }
            {playerHistory != [0,0] &&  <p className="win_lose" >Win:{playerHistory[0]}/ Lose: {playerHistory[1]}</p>}
            </div>
            <div className="col2" ><p className="title2">Opponent</p>
                <LifeBar health={health[1]} player1={!player1} />
                <img className="pic" width="80px" height="80px"  src={opponent} alt="opponent" />
            </div>
        </div>

    </>)
}

export default Board