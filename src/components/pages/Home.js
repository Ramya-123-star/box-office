import React , { useState } from 'react'
import MainPageLayout from './componenets/MainPageLayout';
import {apiGet} from '../misc/config'
import ShowGrid from '../show/ShowGrid';
import ActorGrid from '../actor/ActorGrid';

const Home = () => {
  const [input , setInput] = useState('');
  const [results, setResults] = useState(null);
  const [SearchOption,setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows'; 
 
  const onSearch = () => {
    apiGet(`search/${SearchOption}?q=${input}`).then(result => {
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
  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);

  }
  console.log(SearchOption);
  const renderResults = () => {
    if (results && results.length===0){
      return <div>No Results </div>

    }
    if (results && results.length>0) {
      return results[0].show ? ( 
      <ShowGrid data={results} />
         )  : (
            <ActorGrid  data={results} />
         );
    
    }
    return null;
  };    
  
  return (
    <MainPageLayout>
      <input type="text" placeholder="Search for Something" onChange={onInputChange} onKeyDown={onKeyDown} val={input}/>
      <div>
        <label htmlFor="shows-search">
        Shows
        <input id="shows-search" type = "radio" value="shows" checked={isShowsSearch} onChange={onRadioChange} /> 
        </label>
        <label htmlFor="actors-search">
        Actors
        <input id="actors-search" type = "radio" value="people" checked={!isShowsSearch} onChange={onRadioChange}/> 
        </label>
        </div>
      <button type="button" onClick={onSearch}>Search</button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home
