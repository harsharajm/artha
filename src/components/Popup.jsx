import React, { useState, useEffect } from 'react';
import './Popup.css';
import { generateMnemonic } from 'bip39';

function Popup({setView}) {
  const mnemonic = generateMnemonic();
  return (
    <>
    <div className="popup" >

    <div className="copy" style={{ display: 'flex',justifyContent:'space-around'
    }}>

      <h3>Recovery Phrase</h3>
      <button style={{height:'23px'}} onClick={()=>{navigator.clipboard.writeText(mnemonic);}} >Copy</button>
    
      </div>
      <div className="words">
        {mnemonic.split(' ').map((word) => (
          <div className="word">{word}</div>
    
        ))}
        <button onClick={()=>setView('dashboard')}>Continue</button>
      </div>

    </div>
    </>

    
  );
}

export default Popup;
