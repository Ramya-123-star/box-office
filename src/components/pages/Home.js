import React , { useState } from 'react'

const Home = () => {
  const [input , setInput] = useState('');
  const onSearch = () => {
    //https://api.tvmaze.com/search/shows?q=woman
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r => r.json()).then(result => {
      console.log(result);
    })

  }
  const onInputChange = ev => {
    setInput(ev.target.value);
    //console.log(ev);
  }
  const onKeyDown = (ev) => {
    if (ev.keyCode===13) {
      onSearch();
    }
  }
  
  return (
    <MainPageLayout>
      <input type="text"  onChane={onInputChange} onKeyDown={onKeyDown} val={input}/>
      <button type="button" onClick={onSearch}>Search</button>
    </MainPageLayout>
  )
}

export default Home
