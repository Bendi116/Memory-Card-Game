import { useState,useEffect } from "react";


export function GameBoard({selectedChampions,handleGameEnd,maxCount}){
    const [count,setCount] = useState(0)

    const [memoryCards,setMemoryCards]=useState(selectedChampions.map(champ=>{return {id:champ,hasClicked:false} }))
    const memoryList = memoryCards.map(memo=>{
        return <Card key={memo.id} id={memo.id} onClicked={onClicked} hasClicked={matchMedia.hasClicked}></Card>
    });

    if(count==maxCount)handleGameEnd(count)
   

    const shuffle = (array) => { 
        for (let i = array.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
      }; 

    function hasAlredyClicked(id){
        if(count==maxCount)handleGameEnd(count)
        memoryCards.forEach(memo => {
            if(memo.id == id ){
                if( memo.hasClicked==true)
                    {
                    handleGameEnd(count)
            }
            }
            
        });
    }


    function onClicked(e){
        hasAlredyClicked(e.target.id)
        const shuffledArray =  shuffle(memoryCards.map(memo=> memo.id===e.target.id ? {id:e.target.id,hasClicked:true}:memo))
        setMemoryCards([...shuffledArray])
        setCount(count+1)
        
        
    }


    function handleGameEvent(){
    }
   

    return(
        <div>
            <h2>Game Board</h2>
            <h3>Count:{count}</h3>
            
{memoryList}
        </div>
    )
}


function Card({id,onClicked}){
    return <img key={id} id={id} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`} alt="" onClick={(e)=>onClicked(e) } />
}






 /*bestCount -> props?*/

    /*from diff create x Cards*/
    /*Cards
        -id (champ name)
        -hasClicked bool
        -updateMemoryCards
    */

    /* champs -> contain the x champ for create the memoryCards*/    

    /*??? ha lassu a fetch vagy nem sikerül?? Addig a game el se induljon?*/