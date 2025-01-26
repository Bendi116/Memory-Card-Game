import { useState,useEffect } from "react";


export function GameBoard({selectedChampions,handleGameEnd,maxCount,bestCount}){
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



   

    return(
        <div className="gameBoardContainer">
            <h2>LOL Memory Card Game</h2>
            <h3>Best Count: {bestCount}</h3>
            <h3>Count: {count}</h3>
            <div className="memorycardContainer">{memoryList}
            </div>
        </div>
    )
}


function Card({id,onClicked}){
    const [rotation,setRotation] = useState(0)

    /*AT roatte logic ai help beacuse i think i do thsi with css only!*/

    function handleMouseMove(e){
        const card = e.currentTarget
        const rect = card.getBoundingClientRect();
        console.log(rect)
        const mouseX = e.clientX - rect.left;
    
        if (mouseX < rect.width / 2) {
          setRotation(-40);
          console.log("left")
        } else {
          setRotation(40);
          console.log("right")

        }
      };
    

    const handleMouseLeave = () => {
        setRotation(0);}
      

    return <div className="memoryCard" onMouseLeave={()=>handleMouseLeave()} onMouseMove={(e)=>handleMouseMove(e)} style={{ transform: `rotateY(${rotation}deg)` }}> <img key={id} id={id}  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`} alt="" onClick={(e)=>onClicked(e) } /></div>
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