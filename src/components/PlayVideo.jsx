import React from 'react';
import video1 from '../assets/video.mp4';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import share from '../assets/share.png';
import save from '../assets/save.png';
import jack from '../assets/jack.png';
import user_profile from '../assets/user_profile.jpg';

const PlayVideo = () => {
  return (
    <div className='flex-[0_0_69%] p-5'>
      <video src={video1} controls autoPlay muted className='w-full rounded-lg' />

      <h3 className='mt-2.5 font-semibold text-xl'>Best Youtube Channel To Learn Web Development</h3>

      <div className='flex items-center justify-between mt-2.5 text-sm text-[#5a5a5a]'>
        <p>1525 Views &bull; 2 days ago</p>
        <div className='flex'>
          <span className='flex items-center ml-4'><img src={like} className='w-5 mr-2' alt="like" />125</span>
          <span className='flex items-center ml-4'><img src={dislike} className='w-5 mr-2' alt="dislike" />2</span>
          <span className='flex items-center ml-4'><img src={share} className='w-5 mr-2' alt="share" />Share</span>
          <span className='flex items-center ml-4'><img src={save} className='w-5 mr-2' alt="save" />Save</span>
        </div>
      </div>

      <hr className='border-0 h-[1px] bg-[#ccc] my-4' />

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img src={jack} className='w-12 h-12 rounded-full mr-4' alt="channel" />
          <div className='flex flex-col'>
            <p className='font-semibold'>GreatStack</p>
            <span className='text-sm text-[#5a5a5a]'>1M Subscribers</span>
          </div>
        </div>
        <button className='bg-red-600 text-white px-4 py-1 rounded'>Subscribe</button>
      </div>

      <div className='mt-4'>
        <p>Channel that makes learning easy</p>
        <p>Subscribe GreatStack to watch more tutorials on Web Development</p>
      </div>

      <hr className='border-0 h-[1px] bg-[#ccc] my-4' />

      <h4 className='font-semibold mb-4'>100 Comments</h4>

      <div className='flex items-start mb-4'>
        <img src={user_profile} className='w-10 h-10 rounded-full mr-4' alt="user" />
        <div>
          <h3 className='font-semibold'>Jack Nicolson <span className='text-sm text-[#5a5a5a]'>1 day ago</span></h3>
          <p>Nice channel</p>
          <div className='flex items-center mt-1 text-sm text-[#5a5a5a]'>
            <img src={like} className='w-4 mr-1' alt="like" />
            <span className='mr-3'>244</span>
            <img src={dislike} className='w-4 mr-1' alt="dislike" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PlayVideo;
