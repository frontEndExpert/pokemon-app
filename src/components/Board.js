import React,{useState, useEffect} from 'react';
import LifeBar from './LifeBar'


const Board = () => {

const [health, setHealth] = useState([100,100])
const [face, setFace] = useState([1,2])
const [gameover, setGameover] = useState(false)
const [winner, setWinner] = useState("")
const [playerHistory, setPlayerHistory] = useState([0,0])
const [pokemon0, setPokeMon0] = useState()
const [pokemon1, setPokeMon1] = useState()

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  

  useEffect(()=>{
            var num = getRandomInt(100)
            var urlApi = "https://pokeapi.co/api/v2/pokemon/" + num

            fetch(urlApi, {muteHttpExceptions: true}) 
            .then( response => response.json() )
            .then(  data =>  {
                var poky = data
                var poke = { 'name': poky.name , 'pic': poky.sprites.back_default}
                setPokeMon0(poke)
               // bigpoke.push(poke)
            })
            .catch( err => {
                if(!err.response){
                    throw err;
                }
            }) 
        

            num = getRandomInt(100)
            urlApi = "https://pokeapi.co/api/v2/pokemon/" + num
            fetch(urlApi, {muteHttpExceptions: true}) 
            .then( response => response.json() )
            .then(  data =>  {
                var poky = data
                var poke = { 'name': poky.name , 'pic': poky.sprites.back_default}
                setPokeMon1(poke)
            })
            .catch( err => {
                if(!err.response){
                    throw err;
                }
            }) 

},[])  



useEffect(()=>{
    // reload new pokemon images
    if(JSON.stringify(playerHistory)==='[0,0]'){
            var num = getRandomInt(100)
            var urlApi = "https://pokeapi.co/api/v2/pokemon/" + num

            fetch(urlApi, {muteHttpExceptions: true}) 
            .then( response => response.json() )
            .then(  data =>  {
                var poky = data
                var poke = { 'name': poky.name , 'pic': poky.sprites.back_default}
                setPokeMon0(poke)
               // bigpoke.push(poke)
            })
            .catch( err => {
                if(!err.response){
                    throw err;
                }
            }) 
        

            num = getRandomInt(100)
            urlApi = "https://pokeapi.co/api/v2/pokemon/" + num
            fetch(urlApi, {muteHttpExceptions: true}) 
            .then( response => response.json() )
            .then(  data =>  {
                var poky = data
                var poke = { 'name': poky.name , 'pic': poky.sprites.back_default}
                setPokeMon1(poke)
            })
            .catch( err => {
                if(!err.response){
                    throw err;
                }
            }) 

        }
},[playerHistory])  



useEffect(()=>{
    if(health[0]<=0 && health[0] < health[1]){
        setGameover(true)
        setWinner("Opponent")
     }else if(health[1]<=0 && health[1] < health[0]){
        setGameover(true)
        setWinner("Player")
     }
},[health])




  const startGame = () => {
    setPlayerHistory([0,0])
    setHealth([100,100])
    setGameover(false)
  }  

  const continueGame = () => {
        const temp = playerHistory ? [...playerHistory] : [0,0]
        if(winner==='Player'){
            temp[0] = temp[0] + 1 ;
        } else {
            temp[1] = temp[1] + 1 ;
        }
      setPlayerHistory(temp )

    setHealth([100,100])
    setGameover(false)
  
  }  

const rollDice = (e) => {
    e.preventDefault()
    e.stopPropagation()
    var temp1 = getRandomInt(5) 
    var temp2 = getRandomInt(5)
    setFace([temp1,temp2])
    var temp3 = [...health]
    temp3[0] = temp3[0] - temp1;
    temp3[1] = temp3[1] - temp2;
    setHealth([...temp3])

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
                <LifeBar health={health[0]} player1={true} />
            {pokemon0 &&  <img className="pic" width="80px" height="80px" 
            src={pokemon0 && pokemon0.pic}  alt="player" 
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://placeimg.com/80/80/animals";
              }} /> }
                <p>{pokemon0 && pokemon0.name}</p>
            </div>
            <div className="center-board" >
                <div className="cube">{face[0]}</div><div className="cube">{face[1]}</div>
                <div className="col10">
                    You hit for {face[0]}<br/>
                    Your opponent hit for {face[1]}
                </div>
              {gameover ? <><p className="winner">{ winner==='Opponent' ? "Game Over" : "You Win!"}</p>
                <button className="btn attack" onClick={startGame} >Start with New PokeMon!</button>
                <button className="btn attack" onClick={continueGame} >Play Again with your Pokemon!</button>
                </>
               : <button className="btn attack" onClick={rollDice} >Attack!</button> }
            {playerHistory !== [0,0] &&  <p className="win_lose" >Win:{playerHistory[0]}/ Lose: {playerHistory[1]}</p>}
            </div>
            <div className="col2" ><p className="title2">Opponent</p>
                <LifeBar health={health[1]} player1={false} />
                {pokemon1 &&  <img className="pic" width="80px" height="80px"  
                src={pokemon1.pic} alt="opponent" 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="https://placeimg.com/80/80/animals";
                  }} /> }
                <p>{pokemon1 && pokemon1.name}</p>
            </div>
        </div>

    </>)
}

export default Board