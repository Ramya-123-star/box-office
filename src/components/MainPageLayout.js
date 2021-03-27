import React from 'react'

export const MainPageLayout = ( {children} ) => {
  return (
    <div>
      <Title title="BOX OFFICE"
       subtitle="Are you looking for a movie or an actor?"
       />
    <Navs />

    { children }
   
    </div>
  
  )
}
