import React from 'react'
import Sidebar from '../components/sidebar'
import Feed from '../components/feed'
import { useState   } from 'react'

const Home = ({showSidebar}) => {
  const [category,setCategory]=useState(0);
  return (
    <div className='flex' >
      <Sidebar showSidebar={showSidebar} category={category} setCategory={setCategory} />
      <Feed category={category} />
    </div>
  )
}

export default Home
