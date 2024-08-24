import React, { useState, useEffect } from 'react';
import './Popup.css';
import { generateMnemonic } from 'bip39';

function Popup({setView}) {
  const [mnemonic, setMnemonic] = useState('');

  // Use useEffect to avoid setting state directly in the render phase
  useEffect(() => {
    setMnemonic(generateMnemonic());
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
    <div className="popup" onClick={()=>{
      navigator.clipboard.writeText(mnemonic);
    }}>
      <h3>Recovery Phrase</h3>
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
