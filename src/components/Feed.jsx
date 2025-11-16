import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_KEY, views_Converter } from "../data";
import moment from "moment"

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const res = await fetch(videoList_url);
      const result = await res.json();

      const validItems = (result.items || []).filter(
        (item) => item && item.snippet && item.id
      );
      console.log("valid Items",validItems);

      setData(validItems);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setData([]); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
  <>
    {data.length === 0 ? (
      <div className="flex items-center justify-center w-full h-screen bg-[#f9f9f9]">
        <div className="w-46 h-46 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-4 mt-1.5 ml-5 bg-[#f9f9f9] p-5 gap-3">
        {data.map((item) => (
          <Link
            to={`video/${item.snippet.categoryId || "0"}/${item.id}`}
            key={item.id}
            className="cursor-pointer"
          >
            <img
              src={item.snippet.thumbnails?.medium?.url || ""}
              alt={item.snippet.title}
              className="w-full rounded-2xl hover:scale-[1.02] transition-transform duration-200"
            />
            <h2 className="text-[16px] text-black mx-2 mt-2 font-semibold line-clamp-2">
              {item.snippet.title}
            </h2>
            <h3 className="text-[13px] text-[#555] mx-2 my-1 font-medium">
              {item.snippet.channelTitle}
            </h3>
            <p className="text-[14px] mx-2 text-gray-600">
              {views_Converter(item.statistics?.viewCount)} •{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))}
      </div>
    )}
  </>
);

};

export default Feed;
