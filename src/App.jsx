import { useEffect, useState } from 'react'
import './App.css'
import {Menu} from './components/Menu'
import {GameBoard} from "./components/GameBoard"
import './styles/style.css'

function App() {
  const [champions,setChampions] = useState([]);
  const [selectedChampions,setSelectedChampions] = useState([])
  const [bestCount,setBestCount] = useState(0)
  const [difficulty,setDifficulty] = useState(0)
  const [hasWin,setHasWin] = useState(false)


  useEffect(()=>{    
    fetch("https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json",{mode: 'cors'})
    .then(function(response){
        return response.json()
    })
    .then(function(response){
      setChampions(Object.values(response["data"]).map(d=>d.id))
    })
    .catch(function(err){
      console.log("Not get response: ",err)
    })
  },[])


  function generateRandChamps(diff){
    console.log("Generate rand champs")
      const tempArray = [];
      for(let i = 0; i < diff*5;++i){
        let random =  Math.floor((Math.random() % champions.length)*100)
        
        if(tempArray.includes(champions[random])){
          while(tempArray.includes(champions[random])){
            random =  Math.floor((Math.random() % champions.length)*100)
          }
        }
        tempArray.push(champions[random])
      }
      setSelectedChampions([...tempArray])
      setHasWin(false)
  }


  function handleMenuInput(diff){
    generateRandChamps(diff)
    setDifficulty(diff)
  }


  function handleGameEnd(count){
    if( count == difficulty * 5) setHasWin(true)
    if(count > bestCount) {setBestCount(count)}
    setSelectedChampions([])
  }


  return (
    <>
     <h1>Hi</h1>
     <h3>Best count : {bestCount}</h3>
      { selectedChampions.length===0 &&  <Menu onClick={(diff)=>{handleMenuInput(diff)}}></Menu> }
      { selectedChampions.length!==0 && <GameBoard selectedChampions={selectedChampions}  handleGameEnd={(count)=>handleGameEnd(count)} maxCount={difficulty*5}></GameBoard>}
      
      {(selectedChampions.length===0 && bestCount!==0) && <dialog open className='reTryDialog'>
        {hasWin==true ? <h1>You WIN!!!</h1>: <h2>You Lose!!</h2>}
            <form method="dialog">
              <button onClick={()=>generateRandChamps(difficulty)}>{hasWin==true?"PLAY AGAIN":"TRY AGAIn"}</button>
              <button>Exit</button>
            </form>
      </dialog>}
   

    </>
  )
}

export default App



