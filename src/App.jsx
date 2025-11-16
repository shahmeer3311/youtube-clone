import React, { useState } from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Video from './pages/Video'
import Search from './pages/Search'

const App = () => {
  const [showSidebar,setShowSidebar]=useState(false);
  return (
    <div>
      <Navbar setShowSidebar={setShowSidebar} />
      <Routes>
        <Route path='/' element={<Home showSidebar={showSidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
        <Route path='/search/:query' element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
