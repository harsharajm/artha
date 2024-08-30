import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key';
import  nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import Wallet from "./Wallet";
import Details from "./Details";
import './Wallets.css';


function Wallets() {
//  const mnemonic = 'throw job million bundle focus around network door bargain improve traffic evil'; // For testing. Remove and add as props.
  const mnemonic = 'chapter they cage donate misery august spawn budget tool hunt valve caught'; // For testing. Remove and add as props.

  const [solpublicKeys, setSolPublicKeys] = useState([]);
  const [solprivateKeys, setSolPrivateKeys] = useState([]);
  const [currentSolIndex, setCurrentSolIndex] = useState(0);

  return (
    <div className="wallets_menu">
      <Details></Details>

      <div className="switch_wallets">
   
        <button
          onClick={async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentSolIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString('hex')).key;

            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);

            setCurrentSolIndex(x => x + 1);
            setSolPublicKeys(prev => [...prev, keypair.publicKey]);
            setSolPrivateKeys(prev => [...prev, keypair.secretKey]);
          }}
        >
          SOL
        </button>
        <button>ETH</button>
      </div>
      <div>
        {solpublicKeys.map((e, i) => {
          return (<>
                 <Wallet image={true} publicKey={e.toBase58()} privateKey={bs58.encode(solprivateKeys[i])} />
                </>
          );
        })}
      </div>
    </div>
  );
}

export default Wallets;
