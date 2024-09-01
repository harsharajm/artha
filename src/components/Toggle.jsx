import { useState } from "react"

function Toggle({text,initial,toggle}) {
    const [on,setOn] = useState(initial)
  return (
    <div style={{display:'flex',alignItems:'center',marginBottom:'6px'}}>
    <p>{text}</p>
    <div
    style={{
        width:"2em",
        height : '1em',
        borderRadius : '1em',
        backgroundColor : on?'lightgreen': "tomato",
        transition : 'all ease-in-out 0.2s',
        marginLeft : '1em'
    }}
    onClick={()=>{
        setOn(x=>!x);    
        toggle();
    }}>
        <div style={{
            height:'100%',
            width:'50%',
            borderRadius: '100%',
            backgroundColor : 'white',
            transform: on?'translateX(1em)':'translateX(0em)',
            transition : 'all ease-in 0.1s'
        }}>
        </div>
    </div>
    </div>
  )
}

export default Toggle