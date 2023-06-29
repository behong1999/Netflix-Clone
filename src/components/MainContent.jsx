import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import requests from '../utils/Request';

const MainContent = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <div className='w-full h-[500px]'>
      <div className='bg-gradient-to-r from-gray-900 w-full h-[500px] absolute'></div>
      <img
        className='w-full h-full object-cover '
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className='absolute w-full top-[20%] p-4 md:p-8'>
        <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
        <div className='my-4'>
          <button className='border bg-gray-300 text-black font-semibold border-gray-300 py-2 px-5 '>
            <FaPlay className='mr-2 inline-block' />
            Play
          </button>
          <button className='border border-gray-300 py-2 px-5 ml-4'>
            Watch Later
          </button>
        </div>
        <p className='text-justify w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[38%] text-white'>
          {movie?.overview}
        </p>
      </div>
    </div>
  );
};

export default MainContent;
