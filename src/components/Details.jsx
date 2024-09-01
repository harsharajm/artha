import './Details.css'
import settings_icon from '../images/settings_icon.svg';
import arrow_icon from '../images/arrow_icon.svg';
import update_icon from '../images/update_icon.svg';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Connection, PublicKey } from '@solana/web3.js';
import Toggle from './Toggle';
import Send from './Send';

function Details({ selectedWallet, testMode,setTestMode }) {
    const [rotate, setRotate] = useState(false);
    const [settings,setSettings] = useState(false);
    const [balance, setBalance] = useState('Select a Wallet');
    const [showPrivateKey,setShowPrivateKey] = useState(false);
    const [fetch,setFetch] = useState(true);
    const [get,setGet] = useState(false);
    const [sendMenu,setSendMenu] = useState(false);

    useEffect(() => {
        async function fetchBalance() {
            if (selectedWallet) {
                if (selectedWallet.type === 'SOL') {
                    const connection = new Connection(testMode ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com');
                    const balance = await connection.getBalance(new PublicKey(selectedWallet.publicKey));
                    setBalance((balance / 1000000000).toFixed(9) + ' SOL');
                } else if (selectedWallet.type === 'ETH') {
                    const provider = new ethers.JsonRpcProvider(testMode ? 'https://rpc.ankr.com/eth_goerli' : 'https://rpc.ankr.com/eth');
                    const balance = await provider.getBalance(selectedWallet.publicKey);
                    setBalance(ethers.formatEther(balance) + ' ETH');
                }
            } else {
                setBalance('Select a Wallet');
            }
        }
        fetchBalance();
    }, [selectedWallet, testMode,fetch]);

    return (
        <div className="details">
            {sendMenu?<Send setSendMenu={setSendMenu}></Send>:''}
            <img src={settings_icon}
                style={{margin: '6px',
                    width:'1.5em',
                    height:'1.5em',
                    transform : rotate?'rotate(45deg)':'rotate(0deg)',
                    transition : 'transform ease-in .2s',
                    zIndex : '2'
                
                }}
                onMouseEnter={()=>{
                    setRotate(x=>!x)
                    setTimeout(()=>{setRotate(x=>!x)},200)
                }}
                onClick={()=>{
                    setSettings(x=>!x);
                }}  
                
                alt=""
            />
            {settings?<div className='setting_menu'>
                <Toggle text={"Show Private Key"} initial={false} toggle={()=>{setShowPrivateKey(x=>!x)}}/> 
                <Toggle text={"Testnet RPC"} initial={true} toggle={()=>{setTestMode(x=>!x)}} /> 
                
            
            </div>:''}
            

            <div className='info'>
                {selectedWallet ? (
                    <>
                        <p id='balance'>{balance}</p>

                        <div style={{display:'flex',justifyContent:'center'}}>
                            <div className='option' onClick={()=>setFetch(x=>!x)}><img className='up' src={update_icon} alt="" />Refresh</div>
                            <div className='option' onClick={()=>{setSendMenu(true)}}><img className='up' src={arrow_icon} alt="" />Send</div>
                            <div className='option' onClick={()=>{
                                setGet(x=>!x);
                                setTimeout(()=>{setGet(x=>!x)},3000)
                            }}><img className='down' src={arrow_icon} alt="" />Get</div>
                        </div>

                        <p style={{margin:'5px'}}>Wallet Address: <span id='public'>{selectedWallet.publicKey}</span></p>
                        {showPrivateKey?<p>Private Key: <span id='private'>{selectedWallet.privateKey}</span></p>:''}
                    </>
                ) : (
                    <p>Select a wallet to view details</p>
                )}
            </div>
        </div>
    )
}

export default Details;