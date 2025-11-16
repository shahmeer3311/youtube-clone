import React, { useEffect, useState } from 'react';
import thumbnail1 from "../assets/thumbnail1.png";
import thumbnail2 from "../assets/thumbnail2.png";
import thumbnail3 from "../assets/thumbnail3.png";
import { API_KEY } from '../data';
import { views_Converter } from '../data';
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}) => {

  const [apiData,setApiData]=useState([]);

  const fetchData=async()=>{
    const url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;  
    await fetch(url).then(res=>res.json()).then(data=>setApiData(data.items || []))
  }
 
  useEffect(()=>{
   if(categoryId){
    fetchData();
   }
  },[categoryId]);

  console.log(apiData);

  return (
    <div className='w-[31%] flex flex-col gap-4 mt-5'>
      {apiData.map((thumb, index) => (
        <Link to={`/video/${thumb.snippet.categoryId}/${thumb.id}`} key={index} className='flex gap-3 mb-4 cursor-pointer'>
          <img src={thumb.snippet.thumbnails.medium.url} alt={`thumbnail ${index+1}`} className='w-[60%] rounded-lg' />

          <div className='flex flex-col'>
            <h4 className='font-semibold text-sm'>{thumb.snippet.title}</h4>
            <p className='text-xs text-gray-500'>{thumb.snippet.channelTitle}</p>
            <p className='text-xs text-gray-500'>{views_Converter(thumb.statistics.viewCount)}views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
