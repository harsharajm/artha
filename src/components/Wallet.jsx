import solana_logo from '../images/solana_logo.png';
import eth_logo from '../images/eth_logo.png';
import { useState } from 'react';
import copy_icon from '../images/copy_icon.svg';

function Wallet({ image, publicKey, privateKey, onClick }) {
  const [hovering, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      borderRadius: '50px',
      width: '100%',
      margin: '4px 0',
      boxSizing: 'border-box',
      backgroundColor: hovering ? '#252526' : '#0E0E0E',
      transition: 'background-color ease-in 300ms'
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={onClick}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between'
      }}>
        <img
          src={image ? solana_logo : eth_logo}
          style={{
            height: '3em',
            width: '3em',
            borderRadius: '50%',
            marginRight: '1em',
            backgroundColor: 'black'
          }}
          alt="logo"
        />
        <div>
          <div style={{
            fontSize: '0.7em'
          }}>
            {copied ? "Copied to clipboard" : publicKey.slice(0,4) + '....' + publicKey.slice(-4)}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8em'
          }}>
          </div>
        </div>
        <div style={{display:'flex'}}>
          <img onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(publicKey).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }} style={{height:'1em', width: '1em'}} src={copy_icon} alt="copy" />
          <button style={{
            all: 'unset',
            fontSize: '0.9em',
            height: '45px',
            width: '45px',
            borderRadius: '100%',
            backgroundColor: "#005BA4",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;