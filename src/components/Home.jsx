function Home({setView}) {
  return (
    <>
    <button onClick={
        ()=>{setView('popup')}

    }>Generate Mnemonic</button>
    </>
  )
}

export default Home