export function Menu({onClick}){
    return(
        <div className="menuButtons">
            <button onClick={()=>onClick(1)}>Easy</button>
            <button onClick={()=>onClick(2)}>Medium</button>
            <button onClick={()=>onClick(3)}>Hard</button>

        </div>
        /*3 difficulty*/ 
        /*Callback -> start game*/
    )
}