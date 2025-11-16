import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY, views_Converter } from '../data';

const Search = () => {
  const {query}=useParams();
  const [channelData,setChannelData]=useState([]);
  const [loading,setLoading]=useState(false);
  
  const fetchResult=async()=>{
    setLoading(true);
    const searchUrl =`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=5&q=${query}&key=${API_KEY}`;
    const searchRes=await fetch(searchUrl);
    const searchData=await searchRes.json(); //gives all 5 channel Info

    const channelDetails=await Promise.all(
      searchData.items.map(async(item)=>{
        const channelId=item.snippet.channelId;
         
        const channelInfoUrl =`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
         const channelInfoRes=await fetch(channelInfoUrl);
         const channelInfoData=await channelInfoRes.json();
         const channelInfo=channelInfoData.items[0];

         const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=6&order=date&type=video&key=${API_KEY}`;
         const videosRes = await fetch(videosUrl);
        const videosData = await videosRes.json();
         const videoDetails=await Promise.all(
          videosData.items.map(async(vid)=>{
        const videoId=vid.id.videoId;

         const videoDetailUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
         const detailRes = await fetch(videoDetailUrl);
          const detailData = await detailRes.json();

          const categoryId=detailData.items?.[0]?.snippet?.categoryId || "0";
          return {
            ...vid,
            snippet: {
              ...vid.snippet,
              categoryId: categoryId,
            }
          }
          })
         );
        return {
          id: channelId,
          title: channelInfo.snippet.title,
          description: channelInfo.snippet.description,
          thumbnail: channelInfo.snippet.thumbnails?.default?.url,
          subscribers: channelInfo.statistics.subscriberCount,
          videos: videoDetails
        } 
      })
    )
     setChannelData(channelDetails);
      setLoading(false);
  }

  useEffect(()=>{
   fetchResult();
  },[query]);

  console.log(channelData);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for <span className="text-blue-500">"{query}"</span>
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        channelData.map((channel) => (
          <div key={channel.id} className="mb-10 border-b border-gray-300 pb-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={channel.thumbnail}
                alt="Channel"
                className="w-16 h-16 rounded-full border"
              />

              <div>
                <h3 className="text-xl font-semibold">{channel.title}</h3>
                <p className="text-gray-600 text-sm">{channel.description}</p>
                <p className="text-gray-500 text-sm">
                  {views_Converter(channel.subscribers)} subscribers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {channel.videos.map((video) => (
                <Link
                  to={`/video/${video.snippet.categoryId}/${video.id.videoId}`}
                  key={video.id.videoId}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    className="w-full h-40 object-cover"
                    alt="Video Thumbnail"
                  />

                  <div className="p-3">
                    <h4 className="text-sm font-medium line-clamp-2">
                      {video.snippet.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Search
