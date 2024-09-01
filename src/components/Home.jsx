import { useState } from "react";

function Home({ setView, setMnemonic }) {
  const [inp, setInp] = useState(true);
  const [mnemonicInput, setMnemonicInput] = useState(""); 

  return (
    <>
      <button
      style={{
        marginBottom:'1em'
      }}
        onClick={() => {
          setView('popup');
        }}
      >
        Create Wallet
      </button>

      {inp?<button onClick={() => {setInp(x => !x);}}>Import Wallet</button>:
        <>
          <input
            style={{
              fontSize: "1.5em",
              width: '100%',
              borderRadius: "4px", 
              color : 'black'
            }}
            type="text"
            placeholder="Paste 12 word seed phrase"
            value={mnemonicInput} 
            onChange={(e) => setMnemonicInput(e.target.value)} 
          />
          <button
            onClick={() => {
              setMnemonic(mnemonicInput);
              setView('wallets');
            }}
          >
            Proceed
          </button>
        </>}
    </>
  );
}

export default Home;
