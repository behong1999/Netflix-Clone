import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const { user } = UserAuth();

  const movieRef = doc(db, 'users', user?.email);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user?.email) {
        const docSnap = await getDoc(movieRef);
        const favorites = docSnap.data()?.favorites;
        if (favorites && favorites.some((fav) => fav.id === item.id)) {
          setLike(true);
        }
      }
    };
    checkFavorite();
  }, [item.id, movieRef, user?.email]);

  const favoriteShow = async () => {
    if (user?.email) {
      const docSnap = await getDoc(movieRef);
      const favorites = docSnap.data()?.favorites;
      if (like) {
        setLike(!like);
        const updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
        await updateDoc(movieRef, {
          favorites: updatedFavorites,
        });
      } else {
        setLike(!like);
        await updateDoc(movieRef, {
          favorites: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      }
    } else {
      alert('Please log in to add it to your Favorite List');
    }
  };

  return (
    <div className='select-none w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] relative inline-block cursor-pointer p-1'>
      <img
        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100'>
        <p className='h-full text-xs md:text-sm font-bold flex justify-center items-center text-center'>
          {item?.title}
        </p>
        <p onClick={favoriteShow}>
          {like ? (
            <FaHeart className='absolute top-4 left-4 text-gray-400' />
          ) : (
            <FaRegHeart className='absolute top-4 left-4 text-gray-400' />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
