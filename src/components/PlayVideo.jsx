import React, { useEffect, useState } from "react";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import { API_KEY, views_Converter } from "../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [showLess, setShowLess] = useState(true);
  const [channelInfo, setChannelInfo] = useState(null);
  const [comments, setComments] = useState([]);

  const videoData = async () => {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`);
    const data = await res.json();
    setApiData(data.items?.[0] || null);
  };

  const channelData = async () => {
    if (!apiData?.snippet?.channelId) return;
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`);
    const data = await res.json();
    setChannelInfo(data.items?.[0] || null);
  };

  const channelComments = async () => {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`);
    const data = await res.json();
    setComments(data.items || []);
  };

  useEffect(() => { videoData(); }, [videoId]);
  useEffect(() => { channelData(); }, [apiData]);
  useEffect(() => { channelComments(); }, [videoId]);

  const fullDescription = apiData?.snippet?.description || "";
  const shortDescription = fullDescription.length > 150 ? fullDescription.slice(0, 150) + "..." : fullDescription;
  const showDescription = showLess ? shortDescription : fullDescription;

  console.log(comments);

  return (
    <div className="flex-[0_0_69%] p-5">
      <iframe className="rounded-lg" width="100%" height="550px" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      <h3 className="mt-2.5 font-semibold text-xl">{apiData?.snippet?.title}</h3>
      <div className="flex items-center justify-between mt-2.5 text-sm text-[#5a5a5a]">
        <p>{views_Converter(apiData?.statistics?.viewCount)} Views • {moment(apiData?.snippet?.publishedAt).fromNow()}</p>
        <div className="flex">
          <span className="flex items-center ml-4"><img src={like} className="w-5 mr-2" alt="like" />{views_Converter(apiData?.statistics?.likeCount)}</span>
          <span className="flex items-center ml-4"><img src={dislike} className="w-5 mr-2" alt="dislike" /></span>
          <span className="flex items-center ml-4"><img src={share} className="w-5 mr-2" alt="share" />Share</span>
          <span className="flex items-center ml-4"><img src={save} className="w-5 mr-2" alt="save" />Save</span>
        </div>
      </div>
      <hr className="border-0 h-px bg-[#ccc] my-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={channelInfo?.snippet?.thumbnails?.default?.url} className="w-12 h-12 rounded-full mr-4" alt="channel" />
          <div className="flex flex-col">
            <p className="font-semibold">{apiData?.snippet?.channelTitle}</p>
            <span className="text-sm text-[#5a5a5a]">{views_Converter(channelInfo?.statistics?.subscriberCount || 0)} Subscribers</span>
          </div>
        </div>
        <button className="bg-red-600 text-white px-4 py-1 rounded">Subscribe</button>
      </div>
      <div className="mt-4">
        <p>{showDescription}</p>
        {fullDescription.length > 150 && (
          <button onClick={() => setShowLess(!showLess)} className="text-blue-600">{showLess ? "Show more" : "Show less"}</button>
        )}
      </div>
      <hr className="border-0 h-px bg-[#ccc] my-4" />
      <h4 className="font-semibold mb-4">{views_Converter(apiData?.statistics?.commentCount)} Comments</h4>
      {comments.map((item, index) => {
        const c = item.snippet.topLevelComment.snippet;
        console.log(c);
        return (
          <div key={index} className="flex items-start mb-4">
            <img src={c.authorProfileImageUrl || "https://i.pravatar.cc/100" } className="w-10 h-10 rounded-full mr-4" alt="user" />
            <div>
              <h3 className="font-semibold">{c.authorDisplayName} <span className="text-sm text-[#5a5a5a]">{moment(c.publishedAt).fromNow()}</span></h3>
              <p dangerouslySetInnerHTML={{ __html: c.textDisplay }}></p>
              <div className="flex items-center mt-1 text-sm text-[#5a5a5a]">
                <img src={like} className="w-4 mr-1" alt="like" />
                <span className="mr-3">{c.likeCount}</span>
                <img src={dislike} className="w-4 mr-1" alt="dislike" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayVideo;
