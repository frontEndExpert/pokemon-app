import React,{useState, useEffect} from 'react';
import PlayerCard from './PlayerCard';
import Cube from './Cube';
import Modal from './Modal';
import HitLine from './HitLine';



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
        <Modal className="modalContainer" show={gameover} >
                <p className="winner">{ winner==='Opponent' ? "Game Over" : "You Win!"}</p>
                <button className="btn attack" onClick={startGame} >Start with New PokeMon!</button>
                <button className="btn attack" onClick={continueGame} >Play Again with your Pokemon!</button>
        </Modal>
        <div className="big-board">
            <h1>Pokemon Battle Simulator</h1> 
            <div className="layout" >
            
                <PlayerCard  title="Player"  health={health[0]} place="left" pic={pokemon0.pic} name={pokemon0.name}  />
                <div className="center-board" >
                    <Cube value={face[0]} /><Cube value={face[1]} />
                    <HitLine line="You hit for" value={face[0]} />
                    <HitLine line="Your opponent hit for" value={face[1]} />
                    
                <button className="btn attack" onClick={rollDice} >Attack!</button> 
                
                {playerHistory !== [0,0] &&  <p className="win_lose" >
                        Win:{playerHistory[0]}/ Lose: {playerHistory[1]}
                    </p>}
                </div>

                <PlayerCard  title="Opponent"  health={health[1]} place="right" pic={pokemon1.pic} name={pokemon1.name}  />
            </div>
        </div>
    </>)
}

export default Board