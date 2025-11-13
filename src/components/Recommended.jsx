import React from 'react';
import thumbnail1 from "../assets/thumbnail1.png";
import thumbnail2 from "../assets/thumbnail2.png";
import thumbnail3 from "../assets/thumbnail3.png";

const Recommended = () => {
  const thumbnails = [thumbnail1, thumbnail2, thumbnail3];

  return (
    <div className='w-[31%] flex flex-col gap-4 mt-5'>
      {thumbnails.map((thumb, index) => (
        <div key={index} className='flex gap-3 mb-4'>
          <img src={thumb} alt={`thumbnail ${index+1}`} className='w-[60%] rounded-lg' />

          <div className='flex flex-col'>
            <h4 className='font-semibold text-sm'>Best Channel for web developemnt</h4>
            <p className='text-xs text-gray-500'>GreatStack</p>
            <p className='text-xs text-gray-500'>199K views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommended;
