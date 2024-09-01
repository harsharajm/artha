import React from 'react'

function Send({setSendMenu}) {
  return (
    <div style={{
        position:'absolute',
        top:'120%',
  
        border : '1px solid white',
        borderRadius: '12px',
        width : '100%',
        backgroundColor : 'black',

        

        display:'flex',
        gap:'1em',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        zIndex: '2',
        padding: '1em',
        paddingTop : '2em',
        boxSizing:'border-box',

        
    }}>
        <input  style={{fontSize:'1.5em',width:'98%',color:'black'}} className='destination' type="text" placeholder='Paste Destination Wallet Address' />
        <input style={{fontSize:'1.5em',width:'98%',color:'black'}} type="text" className="amounnt" placeholder='Enter amount you want to Transfer'/>
        <button>Proceed to Pay</button>
        <h5 style={{
            cursor:'pointer'
        }} onClick={()=>{setSendMenu(false)}}>Close</h5>
    </div>
  )
}

export default Send