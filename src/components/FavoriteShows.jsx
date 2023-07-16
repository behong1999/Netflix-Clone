import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const FavoriteShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const movieRef = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    onSnapshot(movieRef, (doc) => {
      setMovies(doc.data()?.favorites);
    });
  }, [movieRef, user.email]);

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const removeShow = async (passedId) => {
    try {
      const result = movies.filter((item) => item.id !== passedId);
      await setDoc(movieRef, {
        favorites: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='text-white font-bold p-4 md:text-xl'>Favorite Show</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='left:0 bg-white text-slate-800 rounded-full absolute opacity-20 hover:opacity-100 z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={'slider'}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {movies.map((item) => (
            <div
              key={item.id}
              className='select-none w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] relative inline-block cursor-pointer p-1'
            >
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div
                className='absolute top-0 left-0 w-full h-full
               hover:bg-black/80 opacity-0 hover:opacity-100'
              >
                <p className='h-full text-xs md:text-sm font-bold flex justify-center items-center text-center overflow-hidden whitespace-nowrap'>
                  {item?.title}
                </p>
                <p
                  onClick={() => removeShow(item.id)}
                  className='absolute top-4 right-4 text-gray-400'
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='right-0 bg-white text-slate-800 rounded-full absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default FavoriteShows;
