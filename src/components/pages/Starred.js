import React from 'react'

const Starred = () => {
  const [starred] = useShows();
  const [shows,setShows] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = usestate(null);

  useEffect(() => {
    if(starred && starred.length>0){

      const promises = starred.map(showId => apiGet(`/shows/${showId}`))
      promises.all(promises).then(results => {
        setShows(results);
        setIsLoading(false);
      }) .catch(err => {
        setError(err.message);
        setIsLoading(false);
      })

    } else {
      setIsLoading(false);
    }
  }, [starred])
  return (
    <MainPageLayout>
    {isLoading && <div>Shows are still Loading</div>}
    {error && <div>Error Occured : {error}</div>}
    {!isLoading && !shows <div>No shows were added</div>}
    {!isLoading && !error && shows && <ShowGrid  data={shows}/>
    </MainPageLayout>
  );
}

export default Starred
