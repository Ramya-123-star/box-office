import React , { useState } from 'react'
import MainPageLayout from './componenets/MainPageLayout';
import {apiGet} from '../misc/config'

const Home = () => {
  const [input , setInput] = useState('');
  const [results, setResults] = useState(null);
  const onSearch = () => {
    apiGet(`search/shows?q=${input}`).then(result => {
      setResults(result);
    });
    //https://api.tvmaze.com/search/shows?q=woman

  };
  const onInputChange = ev => {
    setInput(ev.target.value);
    //console.log(ev);
  }
  const onKeyDown = (ev) => {
    if (ev.keyCode===13) {
      onSearch();
    }
  }
  const renderResults = () => {
    if (results && results.length===0){
      return <div>No Results </div>

    }
    if (results && results.length>0){
      return (
        <div>
          
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>

          ))}
          </div>
      );

    }
    return null;
  };
  
  return (
    <MainPageLayout>
      <input type="text"  onChane={onInputChange} onKeyDown={onKeyDown} val={input}/>
      <button type="button" onClick={onSearch}>Search</button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home
