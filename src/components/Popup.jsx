import React from 'react'
import './Popup.css'

function Popup() {

  function generateMnemonic(){
    const words = ["word1","word2","word3",
      "word4","word5","word6",
      "word7","word8","word9",
      "word10","word11","word12"];
    return words;
  }

    const words = generateMnemonic();
  return (
    <div className='popup'>
      <h3>Recovery Phrase</h3>
      <div className='words'>
        <div className='word'>{words[0]}</div>
        <div className='word'>{words[1]}</div>
        <div className='word'>{words[2]}</div>
        <div className='word'>{words[3]}</div>
        <div className='word'>{words[4]}</div>
        <div className='word'>{words[5]}</div>
        <div className='word'>{words[6]}</div>
        <div className='word'>{words[7]}</div>
        <div className='word'>{words[8]}</div>
        <div className='word'>{words[9]}</div>
        <div className='word'>{words[10]}</div>
        <div className='word'>{words[11]}</div>
      </div>
    </div>
  )
}

export default Popup