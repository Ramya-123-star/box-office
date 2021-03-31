/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
import Cast from '../show/Cast';
import Details from '../show/Details';
import Seasons from '../show/Seasons';
import ShowMainData from '../show/ShowMainData';


const reducer = (prevState,action)  => {
  switch(action.type) {
    case 'FETCH_SUCESS' : {
      return {isLoading: false,error: null,show: action.show}
    }
    case 'FETCH_FAILED' : {
      return {...prevState,isLoading: false,error: action.error}
    }
    default:
      return prevState;
  }
};

const initialState = {
  show=null,
  isLoading=true,
  error=null
}

const Show = () => {
  const { id } = useParams();
  const [{isLoading,show,error},dispatch] = useReducer(reducer,initialState);

  //const [show, setShow] = useState(null);
  //const [isLoading , setIsLoading] = useState(true);
  //const [error , setError] = useState(null);


  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
    .then(results => {
        if (isMounted){

          dispatch( { type : 'FETCH_SUCESS' , show : results} )         
        }            
    })
    .catch(err => {
      if (isMounted){
        dispatch( { type : 'FETCH_FAILED' , error : err.message} )
        
      }      
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  //console.log('show', show);
  if (isLoading) {
    return <div>Data is being loaded</div>
  }
  if (error){
    return <div>Error Occured:{error} </div>
  }

  return <div>
    <ShowMainData image={show.image}  name={show.name}  rating={show.rating} summary={show.summary} tags={show.genres}/>
    <div>
      <h2>Details</h2>
        <Details status={show.status} network={show.network} premiered={show.premiered} />
    </div>

    <div>
      <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
    </div>

    <div>
      <h2>Cast</h2>
        <Cast  cast={show._embedded.seasons}/>
    </div>

  </div>;
};

export default Show;
