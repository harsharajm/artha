import React, { useState, useEffect } from 'react';
import './Popup.css';
import { generateMnemonic } from 'bip39';
import Dashboard from './Dashboard';
function Popup({setView}) {
  const [mnemonic, setMnemonic] = useState('');

  // Use useEffect to avoid setting state directly in the render phase
  useEffect(() => {
    const generatedMnemonic = generateMnemonic();
    setMnemonic(generatedMnemonic);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
    <div className="popup">
      <h3>Recovery Phrase</h3>
      <div className="words">
        {mnemonic.split(' ').map((word, index) => (
          <div className="word" key={index}>{word}</div>
    
        ))}
        <button onClick={()=>setView('dashboard')}>Continue</button>
      </div>
    </div>
    </>

    
  );
}

export default Popup;
