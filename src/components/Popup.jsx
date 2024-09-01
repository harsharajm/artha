import './Popup.css';
import { generateMnemonic } from 'bip39';
import copy_icon from '../images/copy_icon.svg';
import { useEffect, useState } from 'react';

function Popup({setView, setMnemonic}) {
  const [localMnemonic, setLocalMnemonic] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newMnemonic = generateMnemonic();
    setLocalMnemonic(newMnemonic);
    setMnemonic(newMnemonic);
  }, [setMnemonic]);

  const handleCopy = () => {
    navigator.clipboard.writeText(localMnemonic).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="popup">
      <div className="copy" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
        <h3>Recovery Phrase</h3>
        {copied ? "Copied to clipboard" : <img onClick={handleCopy} style={{height: '1em', width: '1em'}} src={copy_icon} alt="copy" />}
      </div>
      <div className="words">
        {localMnemonic.split(' ').map((word, index) => 
          (<div key={index} className="word">{word}</div>)
        )}
      </div>  
      <button style={{
        marginTop: '5px',
        marginBottom: '70px'
      }} onClick={() => setView('wallets')}>Continue</button>
    </div>
  );
}

export default Popup;