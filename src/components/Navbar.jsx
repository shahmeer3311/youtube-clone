import React, { useState } from 'react'
import menu from "../assets/menu.png"
import logo from "../assets/logo.png"
import search from "../assets/search.png"
import notification from "../assets/notification.png"
import more from "../assets/more.png"
import upload from "../assets/upload.png"
import jack from "../assets/jack.png"
import { useNavigate } from 'react-router-dom'

const Navbar = ({setShowSidebar}) => {

  const [searchQuery,setSearchQuery]=useState("");
  
  const handleSearch=()=>{
    if(!searchQuery) return;
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  }

  const navigate=useNavigate();
  return (
    <div className='w-full h-20 flex items-center justify-between shadow-md px-15'>
      <div className='flex gap-5'>
       {[menu,logo].map((link,i)=>(
        <img key={i} src={link} 
        className={`h-6 ${i==0? "cursor-pointer" : ""}`}
        onClick={
         i==0 ?
         () => setShowSidebar((prev) => !prev)  
         :
         () => navigate("/") 
        }
        />
       ))}
      </div>
      <div className='flex items-center justify-between w-[40%] border-2 border-gray-300 rounded-full px-3 py-1 '>
        <input type="text" 
        placeholder="Search" 
        onChange={(e)=>setSearchQuery(e.target.value)}
        className="flex-1 border-none outline-0 bg-transparent" 
        />
        <img src={search} 
        className='w-5 h-5 cursor-pointer'
        onClick={handleSearch}
        />
      </div>
      <div className='flex gap-5'>
       { [upload,more,notification].map((link,i)=>(
        <img src={link} key={i}  className='w-8 h-8' />
       ))}
        <img src={jack} className='w-8 h-8 rounded-full' />
      </div>
    </div>
  )
}

export default Navbar
