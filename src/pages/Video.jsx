import React from 'react';
import PlayVideo from '../components/PlayVideo';
import Recommended from '../components/Recommended';

const Video = () => {
  return (
    <div className='bg-[#f9f9f9] px-[2%] py-5 flex justify-between flex-wrap'>
      <PlayVideo />
      <Recommended />
    </div>
  );
};

export default Video;
